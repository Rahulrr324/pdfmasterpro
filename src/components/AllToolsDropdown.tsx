
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AllToolsDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toolCategories = [
    {
      title: "Convert from PDF",
      tools: [
        { name: "PDF to Word", href: "/tool/pdf-to-word" },
        { name: "PDF to Excel", href: "/tool/pdf-to-excel" },
        { name: "PDF to JPG", href: "/tool/pdf-to-jpg" },
        { name: "PDF to PNG", href: "/tool/pdf-to-png" },
        { name: "PDF to Text", href: "/tool/pdf-to-text" },
      ]
    },
    {
      title: "Convert to PDF",
      tools: [
        { name: "Word to PDF", href: "/tool/word-to-pdf" },
        { name: "Excel to PDF", href: "/tool/excel-to-pdf" },
        { name: "Image to PDF", href: "/tool/image-to-pdf" },
        { name: "HTML to PDF", href: "/tool/html-to-pdf" },
      ]
    },
    {
      title: "Edit & Organize",
      tools: [
        { name: "Merge PDF", href: "/tool/merge-pdf" },
        { name: "Split PDF", href: "/tool/split-pdf" },
        { name: "Compress PDF", href: "/tool/compress-pdf" },
        { name: "Rotate PDF", href: "/tool/rotate-pdf" },
        { name: "Crop PDF", href: "/tool/crop-pdf" },
        { name: "Extract Pages", href: "/tool/extract-pages" },
      ]
    },
    {
      title: "Security & More",
      tools: [
        { name: "Protect PDF", href: "/tool/protect-pdf" },
        { name: "Unlock PDF", href: "/tool/unlock-pdf" },
        { name: "Watermark PDF", href: "/tool/watermark-pdf" },
        { name: "Edit PDF", href: "/tool/edit-pdf" },
        { name: "View PDF", href: "/tool/view-pdf" },
      ]
    }
  ];

  const handleToolClick = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-purple-600 hover:bg-purple-50"
        >
          All Tools
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[600px] p-6" align="start">
        <div className="grid grid-cols-2 gap-8">
          {toolCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-purple-700 text-sm">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.tools.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => handleToolClick(tool.href)}
                    className="block w-full text-left text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-2 py-1 rounded transition-colors"
                  >
                    {tool.name}
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
