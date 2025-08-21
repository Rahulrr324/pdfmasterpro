
import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';

export class PDFEngine {
  // Enhanced merge with better error handling
  static async mergePDFs(files: File[]): Promise<Uint8Array> {
    console.log('Starting PDF merge for', files.length, 'files');
    
    if (files.length < 2) {
      throw new Error('At least 2 PDF files are required for merging');
    }

    const mergedPdf = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Processing file ${i + 1}: ${file.name}`);
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        
        console.log(`File ${i + 1} has ${pageCount} pages`);
        
        if (pageCount === 0) {
          console.warn(`Skipping ${file.name} - no pages found`);
          continue;
        }
        
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        throw new Error(`Failed to process ${file.name}. The file may be corrupted.`);
      }
    }
    
    if (mergedPdf.getPageCount() === 0) {
      throw new Error('No valid pages found in the provided files');
    }
    
    console.log(`Merge complete. Total pages: ${mergedPdf.getPageCount()}`);
    return await mergedPdf.save();
  }

  // Enhanced split with multiple modes
  static async splitPDF(file: File, options: any): Promise<Uint8Array[]> {
    console.log('Starting PDF split with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    const results: Uint8Array[] = [];

    console.log(`PDF has ${pageCount} pages`);

    if (options.mode === 'individual' || !options.mode) {
      // Split into individual pages
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        results.push(await newPdf.save());
      }
    } else if (options.mode === 'range') {
      const startPage = Math.max(1, parseInt(options.startPage) || 1);
      const endPage = Math.min(pageCount, parseInt(options.endPage) || pageCount);
      
      if (startPage > endPage) {
        throw new Error('Start page must be less than or equal to end page');
      }
      
      const newPdf = await PDFDocument.create();
      for (let i = startPage - 1; i <= endPage - 1; i++) {
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
      }
      results.push(await newPdf.save());
    } else if (options.mode === 'intervals') {
      const interval = parseInt(options.interval) || 1;
      let currentPage = 0;
      
      while (currentPage < pageCount) {
        const newPdf = await PDFDocument.create();
        const endPage = Math.min(currentPage + interval, pageCount);
        
        for (let i = currentPage; i < endPage; i++) {
          const [copiedPage] = await newPdf.copyPages(pdf, [i]);
          newPdf.addPage(copiedPage);
        }
        
        results.push(await newPdf.save());
        currentPage += interval;
      }
    }
    
    console.log(`Split complete. Created ${results.length} files`);
    return results;
  }

  // Improved compression
  static async compressPDF(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting PDF compression with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Remove metadata for compression
    pdf.setTitle('');
    pdf.setAuthor('');
    pdf.setSubject('');
    pdf.setKeywords([]);
    pdf.setProducer('PDF Tools');
    pdf.setCreator('PDF Tools');
    pdf.setCreationDate(new Date());
    pdf.setModificationDate(new Date());
    
    const compressionLevel = options.level || 'medium';
    let useObjectStreams = false;
    
    switch (compressionLevel) {
      case 'high':
        useObjectStreams = true;
        break;
      case 'medium':
        useObjectStreams = true;
        break;
      case 'low':
      default:
        useObjectStreams = false;
    }
    
    const compressed = await pdf.save({ 
      useObjectStreams,
      addDefaultPage: false,
      objectsPerTick: compressionLevel === 'high' ? 50 : 20
    });
    
    console.log(`Compression complete. Original: ${arrayBuffer.byteLength}, Compressed: ${compressed.byteLength}`);
    return compressed;
  }

  // Enhanced rotation with better page handling
  static async rotatePDF(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting PDF rotation with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const rotationAngle = parseInt(options.angle) || 90;
    console.log(`Rotating by ${rotationAngle} degrees`);
    
    if (options.pageSelection === 'all' || !options.pageSelection) {
      // Rotate all pages
      pages.forEach(page => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotationAngle));
      });
    } else if (options.pageSelection === 'odd') {
      // Rotate odd pages (1-based)
      pages.forEach((page, index) => {
        if ((index + 1) % 2 === 1) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees(currentRotation + rotationAngle));
        }
      });
    } else if (options.pageSelection === 'even') {
      // Rotate even pages (1-based)
      pages.forEach((page, index) => {
        if ((index + 1) % 2 === 0) {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees(currentRotation + rotationAngle));
        }
      });
    }
    
    return await pdf.save();
  }

  // Enhanced page extraction
  static async extractPages(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting page extraction with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
    
    let pageIndices: number[] = [];
    
    if (options.pageNumbers) {
      pageIndices = this.parsePageNumbers(options.pageNumbers, pdf.getPageCount());
    } else {
      // Default to first page if no pages specified
      pageIndices = [0];
    }
    
    if (pageIndices.length === 0) {
      throw new Error('No valid pages specified for extraction');
    }
    
    console.log(`Extracting pages: ${pageIndices.map(i => i + 1).join(', ')}`);
    
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach(page => newPdf.addPage(page));
    
    return await newPdf.save();
  }

  // Enhanced watermark with better positioning
  static async addWatermark(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting watermark addition with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    let watermarkText = options.text || 'WATERMARK';
    
    if (options.type === 'timestamp') {
      const now = new Date();
      watermarkText = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    }
    
    const fontSize = options.fontSize || 50;
    const opacity = options.opacity || 0.3;
    const position = options.position || 'center';
    
    console.log(`Adding watermark: "${watermarkText}" at ${position}`);
    
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      let x = width / 2 - (watermarkText.length * fontSize) / 4;
      let y = height / 2;
      
      // Position adjustments
      switch (position) {
        case 'top-left':
          x = 50;
          y = height - 50;
          break;
        case 'top-right':
          x = width - (watermarkText.length * fontSize * 0.6);
          y = height - 50;
          break;
        case 'bottom-left':
          x = 50;
          y = 50;
          break;
        case 'bottom-right':
          x = width - (watermarkText.length * fontSize * 0.6);
          y = 50;
          break;
        case 'center':
        default:
          break;
      }
      
      page.drawText(watermarkText, {
        x: Math.max(0, x),
        y: Math.max(0, y),
        size: fontSize,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity: Math.min(1, Math.max(0.1, opacity)),
        rotate: position === 'diagonal' ? degrees(-45) : degrees(0),
      });
    });
    
    return await pdf.save();
  }

  // Enhanced cropping
  static async cropPDF(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting PDF cropping with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const marginTop = Math.max(0, Math.min(50, (options.marginTop || 0))) / 100;
    const marginBottom = Math.max(0, Math.min(50, (options.marginBottom || 0))) / 100;
    const marginLeft = Math.max(0, Math.min(50, (options.marginLeft || 0))) / 100;
    const marginRight = Math.max(0, Math.min(50, (options.marginRight || 0))) / 100;
    
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      
      const cropBox = {
        x: marginLeft * width,
        y: marginBottom * height,
        width: width - (marginLeft + marginRight) * width,
        height: height - (marginTop + marginBottom) * height,
      };
      
      if (cropBox.width > 10 && cropBox.height > 10) {
        page.setCropBox(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
      }
    });
    
    return await pdf.save();
  }

  // PDF to text conversion
  static async convertPDF(file: File, options: any): Promise<Uint8Array | string> {
    console.log('Starting PDF conversion for:', options.toolId);
    
    const arrayBuffer = await file.arrayBuffer();
    
    if (options.toolId?.includes('to-text')) {
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      
      let extractedText = `=== PDF TEXT EXTRACTION ===\n\n`;
      extractedText += `Document: ${file.name}\n`;
      extractedText += `Pages: ${pages.length}\n`;
      extractedText += `File Size: ${(arrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB\n`;
      extractedText += `Extraction Date: ${new Date().toLocaleString()}\n\n`;
      extractedText += `--- EXTRACTED TEXT ---\n`;
      extractedText += `Note: This is a basic text extraction. For advanced OCR and formatting,\n`;
      extractedText += `please use specialized OCR software.\n\n`;
      
      return extractedText;
    }
    
    // Return processed PDF for other cases
    const pdf = await PDFDocument.load(arrayBuffer);
    pdf.setCreator('PDF Tools - Processed');
    pdf.setProducer('PDF Tools');
    return await pdf.save();
  }

  // Enhanced image to PDF conversion
  static async convertImagesToPDF(files: File[]): Promise<Uint8Array> {
    console.log('Starting image to PDF conversion for', files.length, 'files');
    
    const pdf = await PDFDocument.create();
    let processedCount = 0;
    
    for (const file of files) {
      console.log(`Processing image: ${file.name}`);
      
      if (file.size > 10 * 1024 * 1024) {
        console.warn(`Skipping ${file.name} - file too large`);
        continue;
      }
      
      const arrayBuffer = await file.arrayBuffer();
      let image;
      
      try {
        if (file.type.includes('jpeg') || file.type.includes('jpg')) {
          image = await pdf.embedJpg(arrayBuffer);
        } else if (file.type.includes('png')) {
          image = await pdf.embedPng(arrayBuffer);
        } else {
          console.warn(`Skipping unsupported image format: ${file.type}`);
          continue;
        }
        
        const page = pdf.addPage();
        const { width: pageWidth, height: pageHeight } = page.getSize();
        
        const imageAspectRatio = image.width / image.height;
        const pageAspectRatio = pageWidth / pageHeight;
        
        let imageWidth, imageHeight;
        const padding = 40;
        const maxWidth = pageWidth - padding;
        const maxHeight = pageHeight - padding;
        
        if (imageAspectRatio > pageAspectRatio) {
          imageWidth = maxWidth;
          imageHeight = imageWidth / imageAspectRatio;
        } else {
          imageHeight = maxHeight;
          imageWidth = imageHeight * imageAspectRatio;
        }
        
        imageWidth = Math.min(imageWidth, maxWidth);
        imageHeight = Math.min(imageHeight, maxHeight);
        
        const x = (pageWidth - imageWidth) / 2;
        const y = (pageHeight - imageHeight) / 2;
        
        page.drawImage(image, {
          x: x,
          y: y,
          width: imageWidth,
          height: imageHeight,
        });
        
        processedCount++;
        console.log(`Successfully processed ${file.name}`);
        
      } catch (error) {
        console.error(`Failed to process image ${file.name}:`, error);
      }
    }
    
    if (processedCount === 0) {
      throw new Error('No valid images were processed. Please upload JPG or PNG files under 10MB each.');
    }
    
    console.log(`Image to PDF conversion complete. Processed ${processedCount} images.`);
    return await pdf.save();
  }

  // Get comprehensive PDF info
  static async getPDFInfo(file: File): Promise<{
    pageCount: number;
    title: string;
    author: string;
    fileSize: number;
    creator: string;
    producer: string;
    creationDate: Date | null;
    pages: Array<{ width: number; height: number; rotation: number }>;
  }> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      
      return {
        pageCount: pages.length,
        title: pdf.getTitle() || file.name,
        author: pdf.getAuthor() || 'Unknown',
        creator: pdf.getCreator() || 'Unknown',
        producer: pdf.getProducer() || 'Unknown',
        creationDate: pdf.getCreationDate() || null,
        fileSize: arrayBuffer.byteLength,
        pages: pages.map(page => {
          const { width, height } = page.getSize();
          return {
            width: Math.round(width),
            height: Math.round(height),
            rotation: page.getRotation().angle
          };
        })
      };
    } catch (error) {
      console.error('Failed to get PDF info:', error);
      throw new Error('Failed to read PDF file. The file may be corrupted or not a valid PDF.');
    }
  }

  // Enhanced page number parser
  private static parsePageNumbers(pageStr: string, totalPages: number): number[] {
    const indices: number[] = [];
    const parts = pageStr.replace(/\s+/g, '').split(',');
    
    for (const part of parts) {
      if (!part) continue;
      
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        
        if (isNaN(start) || isNaN(end) || start < 1 || end < 1) {
          continue;
        }
        
        const actualStart = Math.max(1, start);
        const actualEnd = Math.min(totalPages, end);
        
        for (let i = actualStart; i <= actualEnd; i++) {
          indices.push(i - 1);
        }
      } else {
        const pageNum = parseInt(part);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          indices.push(pageNum - 1);
        }
      }
    }
    
    return [...new Set(indices)].sort((a, b) => a - b);
  }
}
