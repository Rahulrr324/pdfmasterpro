
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopToolsMenu = () => {
  const navigate = useNavigate();

  const topTools = [
    { name: "Merge PDF", href: "/tool/merge-pdf" },
    { name: "Compress PDF", href: "/tool/compress-pdf" },
    { name: "PDF to Word", href: "/tool/pdf-to-word" },
    { name: "Split PDF", href: "/tool/split-pdf" },
  ];

  return (
    <div className="hidden lg:flex items-center space-x-2">
      {topTools.map((tool) => (
        <Button
          key={tool.name}
          variant="ghost"
          size="sm"
          onClick={() => navigate(tool.href)}
          className="text-sm font-medium transition-colors hover:text-purple-600 hover:bg-purple-50"
        >
          {tool.name}
        </Button>
      ))}
    </div>
  );
};
