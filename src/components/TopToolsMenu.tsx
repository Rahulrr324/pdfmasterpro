
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SITE_CONFIG } from "@/lib/config";

export const TopToolsMenu = () => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <div className="hidden lg:flex items-center space-x-1">
      {SITE_CONFIG.topTools.map((tool) => (
        <Button
          key={tool.id}
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick(tool.id)}
          className="text-sm font-medium hover:text-primary hover:bg-primary/10 transition-colors"
        >
          {tool.title}
        </Button>
      ))}
    </div>
  );
};
