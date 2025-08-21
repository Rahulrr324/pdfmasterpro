
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Edit3, FolderOpen, Shield, Zap, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  {
    title: "Convert",
    icon: FileText,
    description: "Transform PDFs to different formats",
    tools: [
      { id: "pdf-to-word", title: "PDF to Word", badge: "Server-side" },
      { id: "pdf-to-excel", title: "PDF to Excel", badge: "Server-side" },
      { id: "pdf-to-jpg", title: "PDF to JPG", badge: "Server-side" },
      { id: "pdf-to-png", title: "PDF to PNG", badge: "Server-side" },
      { id: "word-to-pdf", title: "Word to PDF", badge: "Server-side" },
      { id: "excel-to-pdf", title: "Excel to PDF", badge: "Server-side" },
      { id: "html-to-pdf", title: "HTML to PDF", badge: "Server-side" },
      { id: "image-to-pdf", title: "Image to PDF", badge: "Client-side" },
      { id: "pdf-to-text", title: "PDF to Text", badge: "Client-side" },
    ]
  },
  {
    title: "Edit",
    icon: Edit3,
    description: "Modify and enhance PDFs",
    tools: [
      { id: "edit-pdf", title: "Edit PDF", badge: "AI-Powered" },
      { id: "rotate-pdf", title: "Rotate PDF", badge: "Client-side" },
      { id: "crop-pdf", title: "Crop PDF", badge: "Client-side" },
      { id: "watermark-pdf", title: "Add Watermark", badge: "Client-side" },
      { id: "view-pdf", title: "View PDF", badge: "Client-side" },
    ]
  },
  {
    title: "Organize",
    icon: FolderOpen,
    description: "Manage PDF structure",
    tools: [
      { id: "merge-pdf", title: "Merge PDF", badge: "Client-side" },
      { id: "split-pdf", title: "Split PDF", badge: "Client-side" },
      { id: "extract-pages", title: "Extract Pages", badge: "Client-side" },
    ]
  },
  {
    title: "Security",
    icon: Shield,
    description: "Protect your documents",
    tools: [
      { id: "protect-pdf", title: "Protect PDF", badge: "Server-side" },
      { id: "unlock-pdf", title: "Unlock PDF", badge: "Server-side" },
    ]
  },
  {
    title: "Optimize",
    icon: Zap,
    description: "Improve performance",
    tools: [
      { id: "compress-pdf", title: "Compress PDF", badge: "Client-side" },
    ]
  },
  {
    title: "AI Tools",
    icon: Settings,
    description: "AI-powered features",
    tools: [
      { id: "ocr-pdf", title: "OCR PDF", badge: "AI-Powered" },
      { id: "translate-pdf", title: "Translate PDF", badge: "AI-Powered" },
      { id: "summarize-pdf", title: "Summarize PDF", badge: "AI-Powered" },
      { id: "chat-pdf", title: "Chat with PDF", badge: "AI-Powered" },
    ]
  },
];

const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "Client-side":
      return "bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full";
    case "Server-side":
      return "bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full";
    case "AI-Powered":
      return "bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full";
    default:
      return "bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full";
  }
};

export const AllToolsDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
    setIsOpen(false);
  };

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(`/category/${categoryTitle.toLowerCase()}`);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Button 
            variant="ghost" 
            className="font-medium hover:text-primary hover:bg-primary/10 transition-colors"
          >
            All Tools
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[900px] p-6 bg-white dark:bg-gray-900 border shadow-2xl z-50" 
        align="start"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="grid grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div 
                className="flex items-center space-x-3 font-semibold text-foreground cursor-pointer hover:text-primary transition-colors group"
                onClick={() => handleCategoryClick(category.title)}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="block">{category.title}</span>
                  <span className="text-xs text-muted-foreground font-normal">{category.description}</span>
                </div>
              </div>
              <div className="space-y-2 pl-2">
                {category.tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between group cursor-pointer"
                    onClick={() => handleToolClick(tool.id)}
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 px-2 py-1 rounded transition-colors flex-1">
                      {tool.title}
                    </span>
                    <span className={getBadgeStyle(tool.badge)}>
                      {tool.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-green-600">Client-side:</span> Process locally in your browser • 
              <span className="font-medium text-blue-600 ml-2">Server-side:</span> Advanced processing • 
              <span className="font-medium text-purple-600 ml-2">AI-Powered:</span> Machine learning features
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigate('/categories');
                setIsOpen(false);
              }}
              className="hover:bg-primary hover:text-white transition-colors"
            >
              View All Categories →
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
