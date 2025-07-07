import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';

export class PDFEngine {
  static async mergePDFs(files: File[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    return await mergedPdf.save();
  }

  static async splitPDF(file: File, options: any): Promise<Uint8Array[]> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    const results: Uint8Array[] = [];

    if (options.mode === 'single') {
      // Split into individual pages
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        results.push(await newPdf.save());
      }
    } else if (options.mode === 'range') {
      // Split by range
      const startPage = Math.max(0, parseInt(options.startPage) - 1);
      const endPage = Math.min(pageCount - 1, parseInt(options.endPage) - 1);
      
      const newPdf = await PDFDocument.create();
      for (let i = startPage; i <= endPage; i++) {
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
      }
      results.push(await newPdf.save());
    }
    
    return results;
  }

  static async compressPDF(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Simple compression by removing metadata and optimizing
    pdf.setTitle('');
    pdf.setAuthor('');
    pdf.setSubject('');
    pdf.setKeywords([]);
    pdf.setProducer('');
    pdf.setCreator('');
    
    return await pdf.save({ useObjectStreams: false });
  }

  static async rotatePDF(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const rotationAngle = parseInt(options.rotation) || 90;
    
    if (options.pageNumbers && options.pageNumbers !== 'all') {
      // Rotate specific pages
      const pageIndices = this.parsePageNumbers(options.pageNumbers, pages.length);
      pageIndices.forEach(index => {
        if (index >= 0 && index < pages.length) {
          pages[index].setRotation(degrees(rotationAngle));
        }
      });
    } else {
      // Rotate all pages
      pages.forEach(page => {
        page.setRotation(degrees(rotationAngle));
      });
    }
    
    return await pdf.save();
  }

  static async extractPages(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
    
    const pageIndices = this.parsePageNumbers(options.pageNumbers, pdf.getPageCount());
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach(page => newPdf.addPage(page));
    
    return await newPdf.save();
  }

  static async protectPDF(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Note: pdf-lib doesn't support password protection directly
    // This is a placeholder implementation
    return await pdf.save();
  }

  static async unlockPDF(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Note: pdf-lib doesn't support password removal directly
    // This is a placeholder implementation
    return await pdf.save();
  }

  static async addWatermark(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const watermarkText = options.text || options.type === 'timestamp' ? new Date().toLocaleString() : 'WATERMARK';
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - 50,
        y: height / 2,
        size: 50,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.3,
      });
    });
    
    return await pdf.save();
  }

  static async cropPDF(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      const cropBox = {
        x: (options.marginLeft || 0) * width / 100,
        y: (options.marginBottom || 0) * height / 100,
        width: width - ((options.marginLeft || 0) + (options.marginRight || 0)) * width / 100,
        height: height - ((options.marginTop || 0) + (options.marginBottom || 0)) * height / 100,
      };
      
      page.setCropBox(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    });
    
    return await pdf.save();
  }

  static async editPDF(file: File, options: any): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    if (options.text) {
      const pages = pdf.getPages();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      
      pages[0].drawText(options.text, {
        x: options.x || 50,
        y: options.y || 50,
        size: options.fontSize || 12,
        font,
        color: rgb(0, 0, 0),
      });
    }
    
    return await pdf.save();
  }

  static async convertPDF(file: File, options: any): Promise<Uint8Array> {
    // This is a placeholder - actual conversion would require additional libraries
    const arrayBuffer = await file.arrayBuffer();
    
    if (options.toolId?.includes('to-text')) {
      // Simple text extraction placeholder
      const text = `Extracted text from ${file.name}`;
      return new TextEncoder().encode(text);
    }
    
    // For other conversions, return the original file for now
    return new Uint8Array(arrayBuffer);
  }

  private static parsePageNumbers(pageStr: string, totalPages: number): number[] {
    const indices: number[] = [];
    const parts = pageStr.split(',');
    
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) {
            indices.push(i - 1); // Convert to 0-based index
          }
        }
      } else {
        const pageNum = parseInt(trimmed);
        if (pageNum >= 1 && pageNum <= totalPages) {
          indices.push(pageNum - 1); // Convert to 0-based index
        }
      }
    });
    
    return [...new Set(indices)].sort((a, b) => a - b);
  }
}
