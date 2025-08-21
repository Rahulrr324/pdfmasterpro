
import { useNavigate } from "react-router-dom";
import { ProfessionalToolCard } from "./ProfessionalToolCard";
import { 
  Eye,
  Globe,
  Star,
  Settings,
  Zap
} from "lucide-react";
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

const tools = [
  // Client-side tools (fully functional in browser)
  {
    id: "merge-pdf",
    title: "Merge PDF Files",
    description: "Combine multiple PDF documents into a single file instantly • Client-side processing",
    icon: MergePDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "split-pdf", 
    title: "Split PDF Pages",
    description: "Extract specific pages or split PDF into multiple documents • Client-side processing",
    icon: SplitPDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF Pages", 
    description: "Rotate PDF pages 90, 180, or 270 degrees permanently • Client-side processing",
    icon: RotatePDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "crop-pdf",
    title: "Crop PDF Pages", 
    description: "Trim and resize PDF pages to custom dimensions • Client-side processing",
    icon: CropPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "extract-pages",
    title: "Extract PDF Pages",
    description: "Extract and save specific pages from PDF documents • Client-side processing",
    icon: ExtractPDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "view-pdf",
    title: "View PDF Online",
    description: "Preview and view PDF documents with zoom and navigation • Client-side processing",
    icon: ViewPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "watermark-pdf",
    title: "Add PDF Watermark",
    description: "Insert text or image watermarks into PDF documents • Client-side processing",
    icon: WatermarkPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text Extractor",
    description: "Extract and copy text content from PDF documents • Client-side processing",
    icon: TextExtractIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "compress-pdf",
    title: "Compress PDF Size",
    description: "Reduce PDF file size while maintaining document quality • Client-side processing",
    icon: CompressPDFIcon,
    category: "optimize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF Converter",
    description: "Convert JPG, PNG, and other images to PDF format • Client-side processing",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },

  // Backend-powered tools (require server processing) - Clearly labeled
  {
    id: "pdf-to-word",
    title: "PDF to Word Converter",
    description: "Convert PDF documents to editable Microsoft Word format • Server-side AI processing",
    icon: WordDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel Converter",
    description: "Extract tables and data from PDF to Excel spreadsheets • Server-side AI processing",
    icon: ExcelDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG Converter",
    description: "Convert PDF pages to high-quality JPG image files • Server-side processing",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG Converter",
    description: "Transform PDF pages into PNG images with transparency • Server-side processing",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF Converter",
    description: "Convert Microsoft Word documents to PDF format • Server-side processing",
    icon: WordDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF Converter", 
    description: "Transform Excel spreadsheets into PDF documents • Server-side processing",
    icon: ExcelDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF Converter",
    description: "Convert web pages and HTML content to PDF format • Server-side rendering",
    icon: HTMLDocIcon,
    category: "convert" as const,
    isNew: true,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "protect-pdf",
    title: "Password Protect PDF",
    description: "Add password security and encryption to PDF documents • Server-side encryption", 
    icon: PasswordIcon,
    category: "security" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "unlock-pdf",
    title: "Remove PDF Password",
    description: "Remove password protection from encrypted PDF files • Server-side decryption", 
    icon: UnlockIcon,
    category: "security" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false,
    isServerSide: true
  },
  {
    id: "edit-pdf",
    title: "Edit PDF Online",
    description: "Add text, images, shapes, and annotations to PDF files • Server-side AI processing",
    icon: EditPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: true,
    isClientSide: false,
    isServerSide: true
  },

  // Advanced/Premium AI tools - Clearly labeled as AI-powered
  {
    id: "ocr-pdf",
    title: "OCR PDF Scanner",
    description: "Convert scanned PDFs to searchable and editable text • Advanced AI OCR processing",
    icon: Eye,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false,
    isServerSide: true,
    isAIPowered: true
  },
  {
    id: "translate-pdf",
    title: "Translate PDF",
    description: "Translate PDF documents to different languages using AI • Neural translation engine",
    icon: Globe,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false,
    isServerSide: true,
    isAIPowered: true
  },
  {
    id: "summarize-pdf",
    title: "AI PDF Summarizer",
    description: "Generate intelligent summaries of your PDF documents • GPT-powered analysis",
    icon: Star,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false,
    isServerSide: true,
    isAIPowered: true
  },
  {
    id: "chat-pdf",
    title: "Chat with PDF",
    description: "Ask questions and get answers from your PDF documents • RAG-enabled AI chat",
    icon: Settings,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false,
    isServerSide: true,
    isAIPowered: true
  }
];

interface ToolsGridProps {
  filter?: "convert" | "edit" | "organize" | "security" | "ai" | "optimize";
  showTitle?: boolean;
}

export const ToolsGrid = ({ filter, showTitle = true }: ToolsGridProps) => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  const filteredTools = filter ? tools.filter(tool => {
    if (filter === "ai") return tool.category === "ai";
    if (filter === "optimize") return tool.category === "optimize";
    return tool.category === filter;
  }) : tools;

  const getSectionTitle = () => {
    if (!filter) return "Professional PDF Suite";
    switch (filter) {
      case "convert": return "PDF Conversion Tools";
      case "edit": return "PDF Editing Tools";
      case "organize": return "PDF Organization Tools";
      case "security": return "PDF Security Tools";
      case "ai": return "AI-Powered PDF Tools";
      case "optimize": return "PDF Optimization Tools";
      default: return "Professional PDF Suite";
    }
  };

  const getSectionDescription = () => {
    if (!filter) return "Transform, edit, organize, and secure your PDF documents with our comprehensive suite of professional tools featuring both client-side and server-side processing";
    switch (filter) {
      case "convert": return "Convert PDFs to various formats and vice versa with high-quality results using advanced AI and server processing";
      case "edit": return "Modify, enhance, and customize your PDF documents with advanced editing features and real-time processing";
      case "organize": return "Merge, split, and organize your PDF files for better document management with instant client-side processing";
      case "security": return "Protect and secure your PDF documents with password encryption and permissions using server-side security";
      case "ai": return "Leverage artificial intelligence for advanced PDF processing, OCR, translation, and intelligent document analysis";
      case "optimize": return "Reduce file sizes and optimize PDFs for web, email, and storage with smart compression algorithms";
      default: return "Professional PDF processing tools for all your document needs with cutting-edge technology";
    }
  };

  return (
    <section className={`py-16 ${!filter ? 'bg-gradient-to-b from-background via-primary/5 to-background' : ''}`} id="tools">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-primary">25+ Professional Tools • Client-side & Server-side • AI-Powered</span>
              <Star className="w-6 h-6 text-yellow-500 ml-2" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {getSectionTitle()}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              {getSectionDescription()}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredTools.map((tool) => (
            <ProfessionalToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              isNew={tool.isNew}
              isPremium={tool.isPremium}
              onClick={() => handleToolClick(tool.id)}
              toolId={tool.id}
            />
          ))}
        </div>
        
        {!filter && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border">
              <Zap className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">
                Advanced PDF processing • Client-side & Server-side • AI-Powered • Secure & Fast • SEO Optimized
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
