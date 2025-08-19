
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
    tools: [
      { id: "pdf-to-word", title: "PDF to Word" },
      { id: "pdf-to-excel", title: "PDF to Excel" },
      { id: "pdf-to-jpg", title: "PDF to JPG" },
      { id: "pdf-to-png", title: "PDF to PNG" },
      { id: "word-to-pdf", title: "Word to PDF" },
      { id: "excel-to-pdf", title: "Excel to PDF" },
      { id: "html-to-pdf", title: "HTML to PDF" },
      { id: "image-to-pdf", title: "Image to PDF" },
      { id: "pdf-to-text", title: "PDF to Text" },
    ]
  },
  {
    title: "Edit",
    icon: Edit3,
    tools: [
      { id: "edit-pdf", title: "Edit PDF" },
      { id: "rotate-pdf", title: "Rotate PDF" },
      { id: "crop-pdf", title: "Crop PDF" },
      { id: "watermark-pdf", title: "Add Watermark" },
      { id: "view-pdf", title: "View PDF" },
    ]
  },
  {
    title: "Organize",
    icon: FolderOpen,
    tools: [
      { id: "merge-pdf", title: "Merge PDF" },
      { id: "split-pdf", title: "Split PDF" },
      { id: "extract-pages", title: "Extract Pages" },
    ]
  },
  {
    title: "Security",
    icon: Shield,
    tools: [
      { id: "protect-pdf", title: "Protect PDF" },
      { id: "unlock-pdf", title: "Unlock PDF" },
    ]
  },
  {
    title: "Optimize",
    icon: Zap,
    tools: [
      { id: "compress-pdf", title: "Compress PDF" },
    ]
  },
  {
    title: "AI Tools",
    icon: Settings,
    tools: [
      { id: "ocr-pdf", title: "OCR PDF" },
      { id: "translate-pdf", title: "Translate PDF" },
      { id: "summarize-pdf", title: "Summarize PDF" },
      { id: "chat-pdf", title: "Chat with PDF" },
    ]
  },
];

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
        className="w-[800px] p-6 bg-white dark:bg-gray-900 border shadow-xl z-50" 
        align="start"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="space-y-3">
              <div 
                className="flex items-center space-x-2 font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleCategoryClick(category.title)}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.title}</span>
              </div>
              <div className="space-y-1">
                {category.tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 px-2 py-1 rounded transition-colors"
                  >
                    {tool.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
