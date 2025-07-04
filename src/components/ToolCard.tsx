import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: "convert" | "edit" | "organize" | "security" | "ai";
  isNew?: boolean;
  isPremium?: boolean;
  onClick?: () => void;
}

const categoryColors = {
  convert: "bg-convert/10 text-convert border-convert/20",
  edit: "bg-edit/10 text-edit border-edit/20", 
  organize: "bg-organize/10 text-organize border-organize/20",
  security: "bg-security/10 text-security border-security/20",
  ai: "bg-ai/10 text-ai border-ai/20"
};

const categoryLabels = {
  convert: "Convert",
  edit: "Edit", 
  organize: "Organize",
  security: "Security",
  ai: "AI Powered"
};

export const ToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  category, 
  isNew, 
  isPremium,
  onClick 
}: ToolCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryColors[category]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex gap-2">
            {isNew && (
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                New
              </Badge>
            )}
            {isPremium && (
              <Badge variant="secondary" className="bg-ai/10 text-ai text-xs">
                AI
              </Badge>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={categoryColors[category]}>
            {categoryLabels[category]}
          </Badge>
          
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            Use Tool →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};