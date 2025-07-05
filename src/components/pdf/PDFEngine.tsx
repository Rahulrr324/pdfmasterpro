
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

  static async extractPages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
    
    const pageIndices = pageNumbers.map(num => num - 1).filter(idx => idx >= 0 && idx < pdf.getPageCount());
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));
    
    return await newPdf.save();
  }
}
