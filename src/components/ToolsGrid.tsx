import { useNavigate } from "react-router-dom";
import { ToolCard } from "./ToolCard";
import { 
  Zap,
  Star,
  TrendingUp,
  Sparkles
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
    description: "Combine multiple PDF documents into a single file instantly",
    icon: MergePDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "split-pdf", 
    title: "Split PDF Pages",
    description: "Extract specific pages or split PDF into multiple documents",
    icon: SplitPDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF Pages", 
    description: "Rotate PDF pages 90, 180, or 270 degrees permanently",
    icon: RotatePDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "crop-pdf",
    title: "Crop PDF Pages", 
    description: "Trim and resize PDF pages to custom dimensions",
    icon: CropPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "extract-pages",
    title: "Extract PDF Pages",
    description: "Extract and save specific pages from PDF documents",
    icon: ExtractPDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "view-pdf",
    title: "View PDF Online",
    description: "Preview and view PDF documents with zoom and navigation",
    icon: ViewPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "watermark-pdf",
    title: "Add PDF Watermark",
    description: "Insert text or image watermarks into PDF documents",
    icon: WatermarkPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text Extractor",
    description: "Extract and copy text content from PDF documents",
    icon: TextExtractIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "compress-pdf",
    title: "Compress PDF Size",
    description: "Reduce PDF file size while maintaining document quality",
    icon: CompressPDFIcon,
    category: "optimize" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF Converter",
    description: "Convert JPG, PNG, and other images to PDF format",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: true
  },

  // Backend-powered tools (require server processing)
  {
    id: "pdf-to-word",
    title: "PDF to Word Converter",
    description: "Convert PDF documents to editable Microsoft Word format",
    icon: WordDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel Converter",
    description: "Extract tables and data from PDF to Excel spreadsheets",
    icon: ExcelDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG Converter",
    description: "Convert PDF pages to high-quality JPG image files",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG Converter",
    description: "Transform PDF pages into PNG images with transparency",
    icon: ImageConvertIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF Converter",
    description: "Convert Microsoft Word documents to PDF format",
    icon: WordDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF Converter", 
    description: "Transform Excel spreadsheets into PDF documents",
    icon: ExcelDocIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF Converter",
    description: "Convert web pages and HTML content to PDF format",
    icon: HTMLDocIcon,
    category: "convert" as const,
    isNew: true,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "protect-pdf",
    title: "Password Protect PDF",
    description: "Add password security and encryption to PDF documents", 
    icon: PasswordIcon,
    category: "security" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "unlock-pdf",
    title: "Remove PDF Password",
    description: "Remove password protection from encrypted PDF files", 
    icon: UnlockIcon,
    category: "security" as const,
    isNew: false,
    isPremium: false,
    isClientSide: false
  },
  {
    id: "edit-pdf",
    title: "Edit PDF Online",
    description: "Add text, images, shapes, and annotations to PDF files",
    icon: EditPDFIcon,
    category: "edit" as const,
    isNew: false,
    iPremium: true,
    isClientSide: false
  },

  // Advanced/Premium AI tools
  {
    id: "ocr-pdf",
    title: "OCR PDF Scanner",
    description: "Convert scanned PDFs to searchable and editable text",
    icon: Eye,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false
  },
  {
    id: "translate-pdf",
    title: "Translate PDF",
    description: "Translate PDF documents to different languages using AI",
    icon: Globe,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false
  },
  {
    id: "summarize-pdf",
    title: "AI PDF Summarizer",
    description: "Generate intelligent summaries of your PDF documents",
    icon: Star,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false
  },
  {
    id: "chat-pdf",
    title: "Chat with PDF",
    description: "Ask questions and get answers from your PDF documents",
    icon: Settings,
    category: "ai" as const,
    isNew: true,
    isPremium: true,
    isClientSide: false
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
    if (!filter) return "Professional PDF Tools Suite";
    switch (filter) {
      case "convert": return "PDF Conversion Tools";
      case "edit": return "PDF Editing Tools";
      case "organize": return "PDF Organization Tools";
      case "security": return "PDF Security Tools";
      case "ai": return "AI-Powered PDF Tools";
      case "optimize": return "PDF Optimization Tools";
      default: return "Professional PDF Tools Suite";
    }
  };

  const getSectionDescription = () => {
    if (!filter) return "Transform, edit, organize, and secure your PDF documents with our comprehensive suite of 30+ professional tools";
    switch (filter) {
      case "convert": return "Convert PDFs to various formats and vice versa with professional-grade quality and speed";
      case "edit": return "Modify, enhance, and customize your PDF documents with powerful editing capabilities";
      case "organize": return "Merge, split, and organize your PDF files for optimal document management";
      case "security": return "Protect and secure your PDF documents with advanced encryption and access controls";
      case "ai": return "Leverage cutting-edge AI technology for intelligent PDF processing and automation";
      case "optimize": return "Reduce file sizes and optimize PDFs for web, email, and efficient storage";
      default: return "Professional PDF processing tools for all your document workflow needs";
    }
  };

  return (
    <section className={`py-16 ${!filter ? 'bg-gradient-to-b from-background via-blue-50/30 to-background dark:via-blue-950/10' : ''}`} id="tools">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-3">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm font-semibold text-primary">30+ Professional Tools Available</span>
                <Sparkles className="w-5 h-5 text-purple-500 ml-2" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {getSectionTitle()}
            </h2>
            <p className="text-muted-foreground max-w-4xl mx-auto text-xl leading-relaxed mb-8">
              {getSectionDescription()}
            </p>
            
            {/* Popular tools indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Most popular tools highlighted</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              isNew={tool.isNew}
              isPremium={tool.isPremium}
              onClick={() => handleToolClick(tool.id)}
            />
          ))}
        </div>
        
        {!filter && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg">
              <Zap className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Advanced PDF Processing • Lightning Fast • Bank-Level Security
              </span>
            </div>
            
            {/* Additional SEO content */}
            <div className="mt-12 max-w-4xl mx-auto text-left">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                Why Choose Our PDF Tools?
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">Professional Quality</h4>
                  <p className="leading-relaxed">
                    Our PDF tools maintain the highest quality standards, preserving document integrity, formatting, and metadata across all conversions and edits.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">Enterprise Security</h4>
                  <p className="leading-relaxed">
                    All processing happens securely with SSL encryption. Your files are automatically deleted after processing, ensuring complete privacy and data protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
