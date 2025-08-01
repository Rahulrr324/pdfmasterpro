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
  FilePlus
} from "lucide-react";

const tools = [
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: Layers,
    category: "organize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "split-pdf", 
    title: "Split PDF",
    description: "Split PDF into multiple files or extract page ranges",
    icon: Scissors,
    category: "organize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF", 
    description: "Rotate PDF pages by 90, 180, or 270 degrees",
    icon: RotateCcw,
    category: "edit" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    icon: Archive,
    category: "optimize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "extract-pages",
    title: "Extract Pages",
    description: "Extract specific pages from PDF documents",
    icon: Download,
    category: "organize" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Add password protection to your PDF documents", 
    icon: Shield,
    category: "security" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove password protection from PDF documents", 
    icon: Unlock,
    category: "security" as const,
    isNew: true,
    isPremium: false
  },
  {
    id: "watermark-pdf",
    title: "Add Watermark",
    description: "Add text or image watermarks to PDFs",
    icon: Eye,
    category: "edit" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "crop-pdf",
    title: "Crop PDF", 
    description: "Crop and resize PDF pages to custom dimensions",
    icon: Crop,
    category: "edit" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Add text, images, and annotations to PDFs",
    icon: Edit3,
    category: "edit" as const,
    isNew: false,
    isPremium: true
  },
  {
    id: "view-pdf",
    title: "View PDF",
    description: "Preview PDF documents with zoom and navigation",
    icon: Eye,
    category: "edit" as const,
    isNew: true,
    isPremium: false
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word format",
    icon: FileText,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Extract tables and data to Excel spreadsheets",
    icon: FileSpreadsheet,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to high-quality images",
    icon: FileImage,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG image format",
    icon: Image,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text",
    description: "Extract text content from PDF documents",
    icon: Type,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    icon: FileUp,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    icon: FileUp,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    description: "Convert JPG, PNG images to PDF documents",
    icon: FilePlus,
    category: "convert" as const,
    isNew: false,
    isPremium: false
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert web pages and HTML to PDF",
    icon: FileDown,
    category: "convert" as const,
    isNew: true,
    isPremium: false
  }
];

interface ToolsGridProps {
  filter?: "convert" | "edit" | "organize" | "security" | "ai" | "optimize";
}

export const ToolsGrid = ({ filter }: ToolsGridProps) => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  const filteredTools = filter ? tools.filter(tool => {
    if (filter === "ai") return tool.isPremium; // AI tools are premium tools
    if (filter === "optimize") return tool.category === "optimize";
    return tool.category === filter;
  }) : tools;

  const getSectionTitle = () => {
    if (!filter) return "Professional PDF Tools";
    switch (filter) {
      case "convert": return "Convert PDF Tools";
      case "edit": return "Edit PDF Tools";
      case "organize": return "Organize PDF Tools";
      case "security": return "Security PDF Tools";
      case "ai": return "AI-Powered PDF Tools";
      case "optimize": return "Optimize PDF Tools";
      default: return "Professional PDF Tools";
    }
  };

  const getSectionDescription = () => {
    if (!filter) return "Everything you need to work with PDF files. Fast, secure, and completely free.";
    switch (filter) {
      case "convert": return "Transform PDFs to different formats and vice versa.";
      case "edit": return "Modify and enhance your PDF documents.";
      case "organize": return "Manage and structure your PDF files efficiently.";
      case "security": return "Protect and secure your PDF documents.";
      case "ai": return "Advanced AI-powered features for your PDFs.";
      case "optimize": return "Reduce file size and improve PDF performance.";
      default: return "Everything you need to work with PDF files. Fast, secure, and completely free.";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {getSectionTitle()}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {getSectionDescription()}
          </p>
        </div>
        
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
      </div>
    </section>
  );
};
