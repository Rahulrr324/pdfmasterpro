
import { PDFDocument, rgb, degrees } from "pdf-lib";

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

  static async splitPDF(file: File, options: any = {}): Promise<Uint8Array[]> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    const splitPdfs: Uint8Array[] = [];

    if (options.mode === "range" && options.startPage && options.endPage) {
      const newPdf = await PDFDocument.create();
      const startIdx = Math.max(0, options.startPage - 1);
      const endIdx = Math.min(pageCount - 1, options.endPage - 1);
      const pageIndices = Array.from({ length: endIdx - startIdx + 1 }, (_, i) => startIdx + i);
      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));
      splitPdfs.push(await newPdf.save());
    } else {
      // Default: split into individual pages
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
    
    // Basic compression simulation - in real implementation, you'd use image compression techniques
    return await pdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
  }

  static async protectPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Add protection indicator (pdf-lib doesn't support real encryption in browser)
    const pages = pdf.getPages();
    if (pages.length > 0) {
      const firstPage = pages[0];
      firstPage.drawText(`Protected with: ${options.password}`, {
        x: 50,
        y: firstPage.getHeight() - 50,
        size: 8,
        color: rgb(0.8, 0.8, 0.8),
      });
    }
    
    return await pdf.save();
  }

  static async rotatePDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      page.setRotation(degrees(options.angle || 90));
    });
    
    return await pdf.save();
  }

  static async addWatermark(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(options.text || "WATERMARK", {
        x: width / 2 - 50,
        y: height / 2,
        size: 24,
        color: rgb(0.8, 0.8, 0.8),
        opacity: options.opacity || 0.3,
        rotate: degrees(45),
      });
    });
    
    return await pdf.save();
  }

  static async extractPages(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
    
    // Extract page numbers from options or default to all pages
    let pageNumbers: number[] = [];
    if (options.pageNumbers && Array.isArray(options.pageNumbers)) {
      pageNumbers = options.pageNumbers;
    } else if (options.startPage && options.endPage) {
      pageNumbers = Array.from(
        { length: options.endPage - options.startPage + 1 }, 
        (_, i) => options.startPage + i
      );
    } else {
      pageNumbers = Array.from({ length: pdf.getPageCount() }, (_, i) => i + 1);
    }
    
    const pageIndices = pageNumbers.map(num => num - 1).filter(idx => idx >= 0 && idx < pdf.getPageCount());
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
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
        x: options.x || 0,
        y: options.y || 0,
        width: options.width || width,
        height: options.height || height
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
      const firstPage = pages[0];
      firstPage.drawText(options.addText, {
        x: options.textX || 50,
        y: options.textY || 50,
        size: options.textSize || 12,
        color: rgb(options.textColor?.r || 0, options.textColor?.g || 0, options.textColor?.b || 0),
      });
    }
    
    return await pdf.save();
  }

  static async convertPDF(file: File, options: any = {}): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // For now, this is a placeholder that just returns the PDF
    // Real conversion would require different libraries for different formats
    return await pdf.save();
  }
}
