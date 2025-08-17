
import { useNavigate } from "react-router-dom";
import { ToolCard } from "./ToolCard";
import { 
  FileText, 
  Scissors, 
  RotateCcw, 
  Archive, 
  Shield, 
  Eye, 
  FileImage,
  FileSpreadsheet,
  Download,
  Crop,
  Edit3,
  Layers,
  Lock,
  Unlock,
  FileUp,
  FileDown,
  Image,
  Type,
  FilePlus,
  Zap,
  Settings,
  Star
} from "lucide-react";
import { 
  MergePDFIcon, 
  SplitPDFIcon, 
  CompressPDFIcon, 
  ConvertPDFIcon, 
  SecurityIcon, 
  EditPDFIcon 
} from "./icons/tool-icons";

const tools = [
  {
    id: "merge-pdf",
    title: "Merge PDF Files",
    description: "Combine multiple PDF documents into a single file instantly",
    icon: MergePDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "split-pdf", 
    title: "Split PDF Pages",
    description: "Extract specific pages or split PDF into multiple documents",
    icon: SplitPDFIcon,
    category: "organize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "compress-pdf",
    title: "Compress PDF Size",
    description: "Reduce PDF file size while maintaining document quality",
    icon: CompressPDFIcon,
    category: "optimize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word Converter",
    description: "Convert PDF documents to editable Microsoft Word format",
    icon: ConvertPDFIcon,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel Converter",
    description: "Extract tables and data from PDF to Excel spreadsheets",
    icon: FileSpreadsheet,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG Converter",
    description: "Convert PDF pages to high-quality JPG image files",
    icon: FileImage,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG Converter",
    description: "Transform PDF pages into PNG images with transparency",
    icon: Image,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF Converter",
    description: "Convert Microsoft Word documents to PDF format",
    icon: FileUp,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF Converter", 
    description: "Transform Excel spreadsheets into PDF documents",
    icon: FileUp,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF Converter",
    description: "Convert JPG, PNG, and other images to PDF format",
    icon: FilePlus,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "protect-pdf",
    title: "Password Protect PDF",
    description: "Add password security and encryption to PDF documents", 
    icon: SecurityIcon,
    category: "security" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "unlock-pdf",
    title: "Remove PDF Password",
    description: "Remove password protection from encrypted PDF files", 
    icon: Unlock,
    category: "security" as const,
    isNew: true,
    isPremium: false
  },
  {
    id: "edit-pdf",
    title: "Edit PDF Online",
    description: "Add text, images, shapes, and annotations to PDF files",
    icon: EditPDFIcon,
    category: "edit" as const,
    isNew: false,
    isPremium: true
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF Pages", 
    description: "Rotate PDF pages 90, 180, or 270 degrees permanently",
    icon: RotateCcw,
    category: "edit" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "crop-pdf",
    title: "Crop PDF Pages", 
    description: "Trim and resize PDF pages to custom dimensions",
    icon: Crop,
    category: "edit" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "watermark-pdf",
    title: "Add PDF Watermark",
    description: "Insert text or image watermarks into PDF documents",
    icon: Eye,
    category: "edit" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "extract-pages",
    title: "Extract PDF Pages",
    description: "Extract and save specific pages from PDF documents",
    icon: Download,
    category: "organize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "view-pdf",
    title: "View PDF Online",
    description: "Preview and view PDF documents with zoom and navigation",
    icon: Eye,
    category: "edit" as const,
    isNew: true,
    isPremium: false
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text Extractor",
    description: "Extract and copy text content from PDF documents",
    icon: Type,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF Converter",
    description: "Convert web pages and HTML content to PDF format",
    icon: FileDown,
    category: "convert" as const,
    isNew: true,
    isPremium: false
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
    if (filter === "ai") return tool.isPremium;
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
    if (!filter) return "Transform, edit, organize, and secure your PDF documents with our comprehensive suite of professional tools";
    switch (filter) {
      case "convert": return "Convert PDFs to various formats and vice versa with high-quality results";
      case "edit": return "Modify, enhance, and customize your PDF documents with advanced editing features";
      case "organize": return "Merge, split, and organize your PDF files for better document management";
      case "security": return "Protect and secure your PDF documents with password encryption and permissions";
      case "ai": return "Leverage artificial intelligence for advanced PDF processing and automation";
      case "optimize": return "Reduce file sizes and optimize PDFs for web, email, and storage";
      default: return "Professional PDF processing tools for all your document needs";
    }
  };

  return (
    <section className={`py-12 ${!filter ? 'bg-gradient-to-b from-background via-primary/5 to-background' : ''}`} id="tools">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-primary">25+ Professional Tools</span>
              <Star className="w-6 h-6 text-yellow-500 ml-2" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">
              {getSectionTitle()}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              {getSectionDescription()}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full">
              <Zap className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                All tools are completely free • No registration required • Secure processing
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
