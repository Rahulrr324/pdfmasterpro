
import { useNavigate } from "react-router-dom";
import { ProfessionalToolCard } from "./ProfessionalToolCard";
import {
  MergePDFIcon,
  SplitPDFIcon,
  CompressPDFIcon,
  ConvertPDFIcon,
  SecurityPDFIcon,
  EditPDFIcon,
  RotatePDFIcon,
  WatermarkPDFIcon,
  ExtractPDFIcon,
  CropPDFIcon,
  ViewPDFIcon,
  ImageConvertIcon,
  WordDocIcon,
  ExcelDocIcon,
  HTMLDocIcon,
  TextExtractIcon,
  PasswordIcon,
  UnlockIcon
} from "./icons/professional-tool-icons";

const allTools = [
  // Client-side tools (fully functional)
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document instantly",
    icon: MergePDFIcon,
    category: "organize" as const,
    isReady: true
  },
  {
    id: "split-pdf", 
    title: "Split PDF",
    description: "Extract pages or split PDF into multiple files",
    icon: SplitPDFIcon,
    category: "organize" as const,
    isReady: true
  },
  {
    id: "compress-pdf",
    title: "Compress PDF", 
    description: "Reduce PDF file size while maintaining quality",
    icon: CompressPDFIcon,
    category: "optimize" as const,
    isReady: true
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate PDF pages 90, 180, or 270 degrees",
    icon: RotatePDFIcon,
    category: "edit" as const,
    isReady: true
  },
  {
    id: "crop-pdf",
    title: "Crop PDF",
    description: "Crop and resize PDF pages to custom dimensions",
    icon: CropPDFIcon,
    category: "edit" as const,
    isReady: true
  },
  {
    id: "watermark-pdf",
    title: "Add Watermark",
    description: "Add text or image watermarks to PDF documents",
    icon: WatermarkPDFIcon,
    category: "edit" as const,
    isReady: true
  },
  {
    id: "extract-pages",
    title: "Extract Pages",
    description: "Extract specific pages from PDF documents",
    icon: ExtractPDFIcon,
    category: "organize" as const,
    isReady: true
  },
  {
    id: "view-pdf",
    title: "View PDF",
    description: "Preview PDF documents with zoom and navigation",
    icon: ViewPDFIcon,
    category: "edit" as const,
    isReady: true
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text",
    description: "Extract text content from PDF documents",
    icon: TextExtractIcon,
    category: "convert" as const,
    isReady: true
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Convert JPG, PNG images to PDF documents",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isReady: true
  },
  
  // Server-side tools (coming soon with proper backend)
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF documents to editable Microsoft Word format",
    icon: WordDocIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "pdf-to-excel", 
    title: "PDF to Excel",
    description: "Extract tables and data from PDF to Excel spreadsheets",
    icon: ExcelDocIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG", 
    description: "Convert PDF pages to high-quality JPG image files",
    icon: ConvertPDFIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG image format",
    icon: ConvertPDFIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Microsoft Word documents to PDF format",
    icon: WordDocIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF", 
    description: "Convert Excel spreadsheets to PDF format",
    icon: ExcelDocIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert web pages and HTML content to PDF",
    icon: HTMLDocIcon,
    category: "convert" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Add password security and encryption to PDF documents",
    icon: PasswordIcon,
    category: "security" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove password protection from encrypted PDF files",
    icon: UnlockIcon,
    category: "security" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Add text, images, shapes, and annotations to PDF files",
    icon: EditPDFIcon,
    category: "edit" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "ocr-pdf",
    title: "OCR PDF Scanner",
    description: "Convert scanned PDFs to searchable text with AI",
    icon: TextExtractIcon,
    category: "ai" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "translate-pdf",
    title: "Translate PDF",
    description: "Translate PDF documents to different languages using AI",
    icon: ConvertPDFIcon,
    category: "ai" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "summarize-pdf",
    title: "AI PDF Summarizer",
    description: "Generate intelligent summaries of PDF documents",
    icon: TextExtractIcon,
    category: "ai" as const,
    isReady: false,
    requiresServer: true
  },
  {
    id: "chat-pdf",
    title: "Chat with PDF",
    description: "Ask questions and get answers from your PDF documents",
    icon: TextExtractIcon,
    category: "ai" as const,
    isReady: false,
    requiresServer: true
  }
];

export const ToolsGrid = () => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Professional PDF Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete suite of PDF processing tools for all your document needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allTools.map((tool) => (
            <ProfessionalToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              onClick={() => handleToolClick(tool.id)}
              toolId={tool.id}
              isReady={tool.isReady}
              requiresServer={tool.requiresServer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
