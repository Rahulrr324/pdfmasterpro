
import React from 'react';
import { useParams } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { EnhancedPDFProcessor } from '@/components/pdf/EnhancedPDFProcessor';
import type { ProcessingTool } from '@/components/pdf/PDFProcessor';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();

  if (!toolId) {
    return <div>Tool not found</div>;
  }

  // Map tool IDs to processing tools
  const getProcessingTool = (id: string): ProcessingTool => {
    const toolMap: Record<string, ProcessingTool> = {
      'merge-pdf': 'merge',
      'split-pdf': 'split',
      'rotate-pdf': 'rotate',
      'compress-pdf': 'compress',
      'extract-pages': 'extract',
      'watermark-pdf': 'watermark',
      'crop-pdf': 'crop',
      'view-pdf': 'view',
      'pdf-to-word': 'convert',
      'pdf-to-excel': 'convert',
      'pdf-to-jpg': 'convert',
      'pdf-to-png': 'convert',
      'word-to-pdf': 'convert',
      'excel-to-pdf': 'convert',
      'html-to-pdf': 'convert',
      'pdf-to-text': 'convert',
      'image-to-pdf': 'convert',
      'protect-pdf': 'protect',
      'unlock-pdf': 'unlock',
      'edit-pdf': 'edit'
    };
    return toolMap[id] || 'view';
  };

  const getToolTitle = (id: string) => {
    const titles: Record<string, string> = {
      'merge-pdf': 'Merge PDF Files Online - Combine Multiple PDFs',
      'split-pdf': 'Split PDF Pages - Extract & Separate PDF Files',
      'compress-pdf': 'Compress PDF Size - Reduce PDF File Size Online',
      'rotate-pdf': 'Rotate PDF Pages - Fix PDF Orientation Online',
      'extract-pages': 'Extract PDF Pages - Get Specific Pages from PDF',
      'watermark-pdf': 'Add Watermark to PDF - Protect Your Documents',
      'crop-pdf': 'Crop PDF Pages - Trim PDF Documents Online',
      'view-pdf': 'View PDF Online - Open & Read PDF Files',
      'pdf-to-word': 'Convert PDF to Word - Free PDF to DOC Converter',
      'pdf-to-excel': 'Convert PDF to Excel - PDF to XLS Converter',
      'pdf-to-jpg': 'Convert PDF to JPG - PDF to Image Converter',
      'pdf-to-png': 'Convert PDF to PNG - High Quality PDF to Image',
      'word-to-pdf': 'Convert Word to PDF - DOC to PDF Converter',
      'excel-to-pdf': 'Convert Excel to PDF - XLS to PDF Converter',
      'html-to-pdf': 'Convert HTML to PDF - Web Page to PDF',
      'pdf-to-text': 'Extract Text from PDF - PDF to TXT Converter',
      'image-to-pdf': 'Convert Images to PDF - JPG/PNG to PDF',
      'protect-pdf': 'Password Protect PDF - Secure PDF Files',
      'unlock-pdf': 'Unlock PDF Password - Remove PDF Protection',
      'edit-pdf': 'Edit PDF Online - Modify PDF Documents'
    };
    return titles[id] || 'PDF Tool';
  };

  const getToolDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      'merge-pdf': 'Easily combine multiple PDF files into one document online. Fast, secure, and completely free PDF merger tool.',
      'split-pdf': 'Split large PDF files into smaller documents or extract specific pages. Professional PDF splitting tool.',
      'compress-pdf': 'Reduce PDF file size while maintaining quality. Free online PDF compression tool for faster sharing.',
      'rotate-pdf': 'Rotate PDF pages to correct orientation. Simple tool to fix upside-down or sideways PDF documents.',
      'extract-pages': 'Extract specific pages from PDF documents. Select and save only the pages you need.',
      'watermark-pdf': 'Add text or image watermarks to protect your PDF documents. Professional watermarking tool.',
      'crop-pdf': 'Crop and trim PDF pages to remove unwanted margins or content. Precise PDF cropping tool.',
      'view-pdf': 'View and read PDF files online without downloading. Secure PDF viewer with zoom and navigation.',
      'pdf-to-word': 'Convert PDF documents to editable Word files. Maintain formatting with our advanced converter.',
      'pdf-to-excel': 'Convert PDF tables and data to Excel spreadsheets. Extract structured data from PDFs.',
      'pdf-to-jpg': 'Convert PDF pages to high-quality JPG images. Perfect for sharing PDF content as pictures.',
      'pdf-to-png': 'Convert PDF to PNG images with transparency support. High-quality PDF to image conversion.',
      'word-to-pdf': 'Convert Word documents to PDF format. Preserve formatting and create professional PDFs.',
      'excel-to-pdf': 'Convert Excel spreadsheets to PDF documents. Perfect for reports and data sharing.',
      'html-to-pdf': 'Convert web pages and HTML files to PDF format. Save web content as PDF documents.',
      'pdf-to-text': 'Extract text content from PDF documents. Convert PDF text to editable TXT format.',
      'image-to-pdf': 'Convert images (JPG, PNG, GIF) to PDF documents. Combine multiple images into one PDF.',
      'protect-pdf': 'Add password protection to PDF files. Secure sensitive documents with encryption.',
      'unlock-pdf': 'Remove password protection from PDF files. Unlock encrypted PDFs you own.',
      'edit-pdf': 'Edit PDF documents online. Add text, images, and annotations to your PDFs.'
    };
    return descriptions[id] || 'Professional PDF processing tool';
  };

  return (
    <>
      <SEOHead 
        title={getToolTitle(toolId)}
        description={getToolDescription(toolId)}
        keywords={`${toolId.replace('-', ' ')}, PDF tool, online PDF, free PDF converter, PDF editor`}
        canonicalUrl={`/tool/${toolId}`}
      />
      <EnhancedPDFProcessor 
        tool={getProcessingTool(toolId)} 
        toolId={toolId}
      />
    </>
  );
};

export default ToolPage;
