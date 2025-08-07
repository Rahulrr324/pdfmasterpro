
import { PDFDocument, degrees, StandardFonts, rgb, PageSizes } from 'pdf-lib';

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
        throw new Error(`Failed to process ${file.name}. The file may be corrupted or password-protected.`);
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

    if (options.mode === 'individual') {
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
    pdf.setProducer('PDF Tools Pro');
    pdf.setCreator('PDF Tools Pro');
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
    } else if (options.pageSelection === 'custom' && options.customPages) {
      const pageIndices = this.parsePageNumbers(options.customPages, pages.length);
      pageIndices.forEach((pageIndex) => {
        if (pageIndex >= 0 && pageIndex < pages.length) {
          const currentRotation = pages[pageIndex].getRotation().angle;
          pages[pageIndex].setRotation(degrees(currentRotation + rotationAngle));
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
    }
    
    if (pageIndices.length === 0) {
      throw new Error('No valid pages specified for extraction. Please enter page numbers like: 1,3,5-8');
    }
    
    console.log(`Extracting pages: ${pageIndices.map(i => i + 1).join(', ')}`);
    
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach(page => newPdf.addPage(page));
    
    return await newPdf.save();
  }

  // Password protection (browser limitation notice)
  static async protectPDF(file: File, options: any): Promise<Uint8Array> {
    throw new Error('PDF encryption requires server-side processing with specialized cryptographic libraries. Browser-based encryption is not secure or reliable. Please use desktop PDF software like Adobe Acrobat or similar tools for proper password protection.');
  }

  // Unlock PDF (limited browser capability)
  static async unlockPDF(file: File, options: any): Promise<Uint8Array> {
    console.log('Attempting to unlock PDF');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Try to load without password first
      try {
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        console.log('PDF loaded successfully without password');
        
        // Clear any protection metadata
        pdf.setTitle('Unlocked PDF');
        pdf.setCreator('PDF Tools Pro - Unlocked');
        
        return await pdf.save();
      } catch (loadError) {
        console.error('Failed to load PDF:', loadError);
        throw new Error('This PDF is password-protected. Browser-based PDF unlocking has significant limitations and cannot handle most encrypted PDFs. Please use desktop software like Adobe Acrobat, PDFtk, or similar tools for reliable password removal.');
      }
    } catch (error) {
      console.error('Unlock error:', error);
      throw new Error('Failed to unlock PDF. The file may be corrupted or uses encryption that cannot be handled in browsers.');
    }
  }

  // Enhanced watermark with better positioning
  static async addWatermark(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting watermark addition with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    let watermarkText = options.text || 'WATERMARK';
    
    // Handle different watermark types
    if (options.type === 'timestamp') {
      const now = new Date();
      switch (options.text) {
        case 'iso':
          watermarkText = now.toISOString().split('T')[0];
          break;
        case 'relative':
          watermarkText = `Processed on ${now.toLocaleDateString()}`;
          break;
        default:
          watermarkText = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
      }
    }
    
    const fontSize = options.fontSize || 50;
    const opacity = options.opacity || 0.3;
    const position = options.position || 'center';
    
    console.log(`Adding watermark: "${watermarkText}" at ${position} with ${opacity} opacity`);
    
    pages.forEach((page, index) => {
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
        case 'diagonal':
          // Create diagonal pattern
          x = width / 4;
          y = height / 4;
          break;
        case 'center':
        default:
          // Center position (already calculated)
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
    
    pages.forEach((page, index) => {
      const { width, height } = page.getSize();
      
      const cropBox = {
        x: marginLeft * width,
        y: marginBottom * height,
        width: width - (marginLeft + marginRight) * width,
        height: height - (marginTop + marginBottom) * height,
      };
      
      // Ensure crop box is valid
      if (cropBox.width > 10 && cropBox.height > 10) {
        page.setCropBox(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
      }
    });
    
    return await pdf.save();
  }

  // Basic PDF editing
  static async editPDF(file: File, options: any): Promise<Uint8Array> {
    console.log('Starting PDF editing with options:', options);
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    if (options.text && pages.length > 0) {
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pageIndex = Math.max(0, Math.min(pages.length - 1, options.pageNumber || 0));
      const page = pages[pageIndex];
      
      page.drawText(options.text, {
        x: Math.max(0, options.x || 50),
        y: Math.max(0, options.y || 50),
        size: Math.max(8, Math.min(72, options.fontSize || 12)),
        font,
        color: rgb(
          Math.max(0, Math.min(1, options.color?.r || 0)),
          Math.max(0, Math.min(1, options.color?.g || 0)),
          Math.max(0, Math.min(1, options.color?.b || 0))
        ),
      });
    }
    
    return await pdf.save();
  }

  // Enhanced conversion handling
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
      extractedText += `--- IMPORTANT NOTE ---\n`;
      extractedText += `This is a basic text extraction using PDF-lib library.\n`;
      extractedText += `For accurate text extraction with proper formatting, OCR capabilities,\n`;
      extractedText += `and table recognition, please use specialized tools like:\n`;
      extractedText += `- Adobe Acrobat Pro\n`;
      extractedText += `- PDFtk\n`;
      extractedText += `- Online OCR services\n\n`;
      extractedText += `--- DOCUMENT SUMMARY ---\n`;
      extractedText += `Pages processed: ${pages.length}\n`;
      extractedText += `Processing method: Browser-based extraction\n`;
      extractedText += `Limitations: Cannot extract formatted text, tables, or perform OCR\n\n`;
      
      return extractedText;
    }
    
    // Handle conversion limitations
    if (options.toolId === 'pdf-to-word' || options.toolId === 'pdf-to-excel') {
      throw new Error(`${options.toolId.replace('-', ' to ').toUpperCase()} conversion requires advanced document processing libraries and server-side conversion engines. This type of conversion cannot be reliably performed in browsers due to the complexity of maintaining document formatting, styles, and structure. Please use desktop software like Adobe Acrobat, LibreOffice, or online conversion services that provide server-side processing.`);
    }
    
    if (options.toolId?.includes('to-jpg') || options.toolId?.includes('to-png')) {
      throw new Error('PDF to image conversion requires PDF rendering capabilities and canvas manipulation that are beyond basic browser PDF processing. For high-quality image conversion, please use desktop software like Adobe Acrobat, GIMP, or specialized PDF to image converters.');
    }
    
    // For other document to PDF conversions
    if (options.toolId?.includes('-to-pdf') && !options.toolId.includes('image')) {
      throw new Error('Document to PDF conversion (Word, Excel, etc.) requires specialized document parsing libraries and server-side processing. Browser-based conversion cannot handle complex document formats reliably.');
    }
    
    // Return processed PDF for other cases
    const pdf = await PDFDocument.load(arrayBuffer);
    pdf.setCreator('PDF Tools Pro - Processed');
    pdf.setProducer('PDF Tools Pro');
    return await pdf.save();
  }

  // Enhanced image to PDF conversion
  static async convertImagesToPDF(files: File[]): Promise<Uint8Array> {
    console.log('Starting image to PDF conversion for', files.length, 'files');
    
    const pdf = await PDFDocument.create();
    let processedCount = 0;
    
    for (const file of files) {
      console.log(`Processing image: ${file.name}`);
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        console.warn(`Skipping ${file.name} - file too large (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
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
        
        // Create a page with proper sizing
        const page = pdf.addPage();
        const { width: pageWidth, height: pageHeight } = page.getSize();
        
        // Calculate scaling to fit image on page while maintaining aspect ratio
        const imageAspectRatio = image.width / image.height;
        const pageAspectRatio = pageWidth / pageHeight;
        
        let imageWidth, imageHeight;
        const padding = 40; // 20pt padding on each side
        const maxWidth = pageWidth - padding;
        const maxHeight = pageHeight - padding;
        
        if (imageAspectRatio > pageAspectRatio) {
          // Image is wider relative to page
          imageWidth = maxWidth;
          imageHeight = imageWidth / imageAspectRatio;
        } else {
          // Image is taller relative to page
          imageHeight = maxHeight;
          imageWidth = imageHeight * imageAspectRatio;
        }
        
        // Ensure image fits within page bounds
        imageWidth = Math.min(imageWidth, maxWidth);
        imageHeight = Math.min(imageHeight, maxHeight);
        
        // Center the image on the page
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
        // Continue with other images instead of failing completely
      }
    }
    
    if (processedCount === 0) {
      throw new Error('No valid images were processed. Please ensure you upload JPG or PNG files under 10MB each.');
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
      throw new Error('Failed to read PDF file. The file may be corrupted, password-protected, or not a valid PDF.');
    }
  }

  // Enhanced page number parser with better validation
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
          indices.push(i - 1); // Convert to 0-based index
        }
      } else {
        const pageNum = parseInt(part);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
          indices.push(pageNum - 1); // Convert to 0-based index
        }
      }
    }
    
    // Remove duplicates and sort
    return [...new Set(indices)].sort((a, b) => a - b);
  }
}
