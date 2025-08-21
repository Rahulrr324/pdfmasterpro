
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Edit3, FolderOpen, Shield, Zap, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const categories = [
  {
    title: "Convert",
    icon: FileText,
    description: "Transform PDFs to different formats",
    tools: [
      { id: "pdf-to-word", title: "PDF to Word", comingSoon: true },
      { id: "pdf-to-excel", title: "PDF to Excel", comingSoon: true },
      { id: "pdf-to-jpg", title: "PDF to JPG", comingSoon: true },
      { id: "pdf-to-png", title: "PDF to PNG", comingSoon: true },
      { id: "word-to-pdf", title: "Word to PDF", comingSoon: true },
      { id: "excel-to-pdf", title: "Excel to PDF", comingSoon: true },
      { id: "html-to-pdf", title: "HTML to PDF", comingSoon: true },
      { id: "image-to-pdf", title: "Image to PDF", comingSoon: false },
      { id: "pdf-to-text", title: "PDF to Text", comingSoon: false },
    ]
  },
  {
    title: "Edit",
    icon: Edit3,
    description: "Modify and enhance PDFs",
    tools: [
      { id: "edit-pdf", title: "Edit PDF", comingSoon: true },
      { id: "rotate-pdf", title: "Rotate PDF", comingSoon: false },
      { id: "crop-pdf", title: "Crop PDF", comingSoon: false },
      { id: "watermark-pdf", title: "Add Watermark", comingSoon: false },
      { id: "view-pdf", title: "View PDF", comingSoon: false },
    ]
  },
  {
    title: "Organize",
    icon: FolderOpen,
    description: "Manage PDF structure",
    tools: [
      { id: "merge-pdf", title: "Merge PDF", comingSoon: false },
      { id: "split-pdf", title: "Split PDF", comingSoon: false },
      { id: "extract-pages", title: "Extract Pages", comingSoon: false },
    ]
  },
  {
    title: "Security",
    icon: Shield,
    description: "Protect your documents",
    tools: [
      { id: "protect-pdf", title: "Protect PDF", comingSoon: true },
      { id: "unlock-pdf", title: "Unlock PDF", comingSoon: true },
    ]
  },
  {
    title: "Optimize",
    icon: Zap,
    description: "Improve performance",
    tools: [
      { id: "compress-pdf", title: "Compress PDF", comingSoon: false },
    ]
  },
  {
    title: "AI Tools",
    icon: Brain,
    description: "AI-powered features",
    tools: [
      { id: "ocr-pdf", title: "OCR PDF", comingSoon: true },
      { id: "translate-pdf", title: "Translate PDF", comingSoon: true },
      { id: "summarize-pdf", title: "Summarize PDF", comingSoon: true },
      { id: "chat-pdf", title: "Chat with PDF", comingSoon: true },
    ]
  },
];

export const AllToolsDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  let hoverTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
    setIsOpen(false);
  };

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(`/category/${categoryTitle.toLowerCase()}`);
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout);
    };
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
        className="w-[900px] p-6 bg-background border shadow-2xl z-50" 
        align="start"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                    {tool.comingSoon && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                        Soon
                      </span>
                    )}
                    {!tool.comingSoon && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
                        Ready
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium text-green-600 dark:text-green-400">Ready:</span> Available now • 
              <span className="font-medium text-blue-600 dark:text-blue-400 ml-2">Soon:</span> Coming with advanced features
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigate('/categories');
                setIsOpen(false);
              }}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Categories →
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
