
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  WordDocIcon, 
  ExcelDocIcon, 
  ImageConvertIcon, 
  TextExtractIcon,
  HTMLDocIcon
} from "./icons/professional-tool-icons";

const fromPDFTools = [
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    icon: WordDocIcon,
  },
  {
    id: "pdf-to-excel", 
    title: "PDF to Excel",
    icon: ExcelDocIcon,
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG", 
    icon: ImageConvertIcon,
  },
  {
    id: "pdf-to-png",
    title: "PDF to PNG",
    icon: ImageConvertIcon,
  },
  {
    id: "pdf-to-text",
    title: "PDF to Text",
    icon: TextExtractIcon,
  }
];

const toPDFTools = [
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    icon: WordDocIcon,
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF", 
    icon: ExcelDocIcon,
  },
  {
    id: "image-to-pdf",
    title: "Image to PDF",
    icon: ImageConvertIcon,
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    icon: HTMLDocIcon,
  }
];

export const ConversionDropdowns = () => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Conversion Tools</h2>
          <p className="text-gray-600">Convert your files to and from PDF format</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          {/* Convert from PDF Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-white hover:bg-red-50 border-red-200 text-red-700 hover:text-red-800 shadow-md hover:shadow-lg transition-all"
              >
                Convert from PDF
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white shadow-xl border-0 rounded-lg p-2" align="center">
              {fromPDFTools.map((tool) => (
                <DropdownMenuItem 
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="flex items-center p-3 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <tool.icon className="w-5 h-5 mr-3 text-red-600" />
                  <span className="text-gray-900">{tool.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Convert to PDF Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="w-full sm:w-auto bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 shadow-md hover:shadow-lg transition-all"
              >
                Convert to PDF
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white shadow-xl border-0 rounded-lg p-2" align="center">
              {toPDFTools.map((tool) => (
                <DropdownMenuItem 
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="flex items-center p-3 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <tool.icon className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="text-gray-900">{tool.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
};
