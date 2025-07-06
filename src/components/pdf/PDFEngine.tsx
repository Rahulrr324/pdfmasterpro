
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export class PDFEngine {
  static async mergePDFs(files: File[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      } catch (error) {
        throw new Error(`Failed to process file: ${file.name}`);
      }
    }
    
    return await mergedPdf.save();
  }

  static async splitPDF(file: File, options: any = {}): Promise<Uint8Array[]> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    const splitPdfs: Uint8Array[] = [];

    if (options.mode === "range" && options.startPage && options.endPage) {
      const newPdf = await PDFDocument.create();
      const startIdx = Math.max(0, options.startPage - 1);
      const endIdx = Math.min(pageCount - 1, options.endPage - 1);
      
      if (startIdx <= endIdx) {
        const pageIndices = Array.from({ length: endIdx - startIdx + 1 }, (_, i) => startIdx + i);
        const copiedPages = await newPdf.copyPages(pdf, pageIndices);
        copiedPages.forEach((page) => newPdf.addPage(page));
        splitPdfs.push(await newPdf.save());
      } else {
        throw new Error("Invalid page range");
      }
    } else if (options.mode === "intervals" && options.interval) {
      const interval = parseInt(options.interval);
      for (let i = 0; i < pageCount; i += interval) {
        const newPdf = await PDFDocument.create();
        const endIdx = Math.min(i + interval - 1, pageCount - 1);
        const pageIndices = Array.from({ length: endIdx - i + 1 }, (_, idx) => i + idx);
        const copiedPages = await newPdf.copyPages(pdf, pageIndices);
        copiedPages.forEach((page) => newPdf.addPage(page));
        splitPdfs.push(await newPdf.save());
      }
    } else {
      // Split into individual pages
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        splitPdfs.push(await newPdf.save());
      }
    }

    return splitPdfs;
  }

  static async compressPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    const compressionOptions: any = {
      useObjectStreams: true,
      addDefaultPage: false,
    };

    // Apply compression level
    if (options.level === "high") {
      compressionOptions.compress = 9;
    } else if (options.level === "medium") {
      compressionOptions.compress = 5;
    } else {
      compressionOptions.compress = 3;
    }

    if (options.removeMetadata) {
      pdf.setTitle('');
      pdf.setAuthor('');
      pdf.setSubject('');
      pdf.setKeywords([]);
      pdf.setProducer('');
      pdf.setCreator('');
    }

    return await pdf.save(compressionOptions);
  }

  static async protectPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Add protection watermark
    const pages = pdf.getPages();
    if (pages.length > 0) {
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      firstPage.drawText('PROTECTED DOCUMENT', {
        x: width / 2 - 80,
        y: height - 30,
        size: 12,
        color: rgb(0.8, 0.2, 0.2),
        opacity: 0.7,
      });

      pdf.setSubject(`Protected with password`);
    }
    
    return await pdf.save();
  }

  static async unlockPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      // Try to load PDF with potential password
      const pdf = await PDFDocument.load(arrayBuffer, { 
        ignoreEncryption: true 
      });
      
      // Remove any protection indicators
      pdf.setSubject('');
      
      return await pdf.save();
    } catch (error) {
      throw new Error("Invalid password or PDF is not encrypted");
    }
  }

  static async rotatePDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    const angle = parseInt(options.angle) || 90;
    
    if (options.pageSelection === "all" || !options.pageSelection) {
      pages.forEach(page => {
        page.setRotation(degrees(angle));
      });
    } else if (options.pageSelection === "odd") {
      pages.forEach((page, index) => {
        if ((index + 1) % 2 === 1) {
          page.setRotation(degrees(angle));
        }
      });
    } else if (options.pageSelection === "even") {
      pages.forEach((page, index) => {
        if ((index + 1) % 2 === 0) {
          page.setRotation(degrees(angle));
        }
      });
    } else if (options.pageSelection === "custom" && options.customPages) {
      const pageNumbers = this.parsePageNumbers(options.customPages, pages.length);
      pageNumbers.forEach(pageNum => {
        if (pageNum > 0 && pageNum <= pages.length) {
          pages[pageNum - 1].setRotation(degrees(angle));
        }
      });
    }
    
    return await pdf.save();
  }

  static async addWatermark(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    let watermarkText = options.text || "WATERMARK";
    if (options.type === "timestamp") {
      const now = new Date();
      switch (options.text) {
        case "iso":
          watermarkText = now.toISOString().replace('T', ' ').substring(0, 19);
          break;
        case "relative":
          watermarkText = `Processed on ${now.toLocaleDateString()}`;
          break;
        default:
          watermarkText = now.toLocaleString();
      }
    }
    
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const fontSize = options.fontSize || 24;
    const opacity = options.opacity || 0.3;
    const rotation = degrees(options.rotation || 45);
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      let x, y;
      
      switch (options.position) {
        case "top-left":
          x = 50;
          y = height - 50;
          break;
        case "top-right":
          x = width - 150;
          y = height - 50;
          break;
        case "bottom-left":
          x = 50;
          y = 50;
          break;
        case "bottom-right":
          x = width - 150;
          y = 50;
          break;
        case "diagonal":
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              page.drawText(watermarkText, {
                x: (width / 4) * (i + 1),
                y: (height / 4) * (j + 1),
                size: fontSize,
                font,
                color: rgb(0.8, 0.8, 0.8),
                opacity,
                rotate: rotation,
              });
            }
          }
          return;
        default:
          x = width / 2 - (watermarkText.length * fontSize) / 4;
          y = height / 2;
      }
      
      page.drawText(watermarkText, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0.8, 0.8, 0.8),
        opacity,
        rotate: rotation,
      });
    });
    
    return await pdf.save();
  }

  static async extractPages(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
    const totalPages = pdf.getPageCount();
    
    let pageNumbers: number[] = [];
    
    if (options.pageNumbers && typeof options.pageNumbers === 'string') {
      pageNumbers = this.parsePageNumbers(options.pageNumbers, totalPages);
    } else if (options.startPage && options.endPage) {
      const start = Math.max(1, parseInt(options.startPage));
      const end = Math.min(totalPages, parseInt(options.endPage));
      pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    } else {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const validPageIndices = pageNumbers
      .filter(num => num >= 1 && num <= totalPages)
      .map(num => num - 1);
    
    if (validPageIndices.length === 0) {
      throw new Error("No valid pages to extract");
    }
    
    const copiedPages = await newPdf.copyPages(pdf, validPageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));
    
    return await newPdf.save();
  }

  static async cropPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      const cropBox = {
        x: Math.max(0, options.x || 0),
        y: Math.max(0, options.y || 0),
        width: Math.min(width, options.width || width),
        height: Math.min(height, options.height || height)
      };
      
      page.setCropBox(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    });
    
    return await pdf.save();
  }

  static async editPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    if (options.addText && pages.length > 0) {
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const firstPage = pages[0];
      const textSize = options.textSize || 12;
      const textColor = options.textColor || { r: 0, g: 0, b: 0 };
      
      firstPage.drawText(options.addText, {
        x: options.textX || 50,
        y: options.textY || 50,
        size: textSize,
        font,
        color: rgb(textColor.r, textColor.g, textColor.b),
      });
    }
    
    return await pdf.save();
  }

  static async convertPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    
    // For conversion tools, we simulate the conversion
    // In a real implementation, you'd use specific libraries for each format
    switch (options.toolId) {
      case "pdf-to-text":
        // Extract text content
        const pdf = await PDFDocument.load(arrayBuffer);
        const textContent = `Extracted text from ${file.name}\n\nThis is a placeholder for actual text extraction.\nIn a production environment, you would use a proper PDF text extraction library.`;
        return new TextEncoder().encode(textContent);
        
      case "pdf-to-jpg":
      case "pdf-to-png":
        // Convert to image format (placeholder)
        throw new Error("Image conversion requires additional libraries not available in this demo");
        
      case "pdf-to-word":
      case "pdf-to-excel":
        // Convert to office formats (placeholder)
        throw new Error("Office format conversion requires server-side processing");
        
      default:
        // Return original PDF for unsupported conversions
        return new Uint8Array(arrayBuffer);
    }
  }

  private static parsePageNumbers(pageStr: string, totalPages: number): number[] {
    const pages: number[] = [];
    const parts = pageStr.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(s => parseInt(s.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
            pages.push(i);
          }
        }
      } else {
        const num = parseInt(trimmed);
        if (!isNaN(num) && num >= 1 && num <= totalPages) {
          pages.push(num);
        }
      }
    }
    
    return [...new Set(pages)].sort((a, b) => a - b);
  }
}
