
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FileText, Merge, Scissors, Minimize, RotateCw, 
  Shield, Unlock, Edit, Upload, Image, FileImage, 
  FileSpreadsheet
} from "lucide-react";

export const AllToolsDropdown = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Convert",
      tools: [
        { name: "PDF to Word", href: "/tool/pdf-to-word", icon: FileText },
        { name: "PDF to Excel", href: "/tool/pdf-to-excel", icon: FileSpreadsheet },
        { name: "PDF to JPG", href: "/tool/pdf-to-jpg", icon: FileImage },
        { name: "Word to PDF", href: "/tool/word-to-pdf", icon: Upload },
        { name: "Image to PDF", href: "/tool/image-to-pdf", icon: Image },
      ]
    },
    {
      name: "Organize",
      tools: [
        { name: "Merge PDF", href: "/tool/merge-pdf", icon: Merge },
        { name: "Split PDF", href: "/tool/split-pdf", icon: Scissors },
        { name: "Rotate PDF", href: "/tool/rotate-pdf", icon: RotateCw },
      ]
    },
    {
      name: "Optimize", 
      tools: [
        { name: "Compress PDF", href: "/tool/compress-pdf", icon: Minimize },
      ]
    },
    {
      name: "Security",
      tools: [
        { name: "Protect PDF", href: "/tool/protect-pdf", icon: Shield },
        { name: "Unlock PDF", href: "/tool/unlock-pdf", icon: Unlock },
        { name: "Edit PDF", href: "/tool/edit-pdf", icon: Edit },
      ]
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-purple-50 hover:text-purple-700 data-[active]:bg-purple-50 data-[state=open]:bg-purple-50">
            <span className="font-medium">All Tools</span>
            <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[800px] p-6 bg-white border border-gray-200 shadow-2xl rounded-lg">
              <div className="grid grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                      {category.name}
                    </h3>
                    <div className="space-y-1">
                      {category.tools.map((tool) => (
                        <Button
                          key={tool.name}
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(tool.href)}
                          className="w-full justify-start h-auto p-2 hover:bg-purple-50 hover:text-purple-700 text-left"
                        >
                          <tool.icon className="h-4 w-4 mr-2 text-gray-600" />
                          <span className="text-sm">{tool.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
