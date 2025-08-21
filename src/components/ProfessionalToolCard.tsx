
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ProfessionalToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  category: "convert" | "edit" | "organize" | "security" | "ai" | "optimize";
  isNew?: boolean;
  onClick?: () => void;
  toolId?: string;
}

const categoryColors = {
  convert: "from-blue-500/20 to-blue-600/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  edit: "from-green-500/20 to-green-600/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300", 
  organize: "from-purple-500/20 to-purple-600/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
  security: "from-red-500/20 to-red-600/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",
  ai: "from-orange-500/20 to-orange-600/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300",
  optimize: "from-teal-500/20 to-teal-600/20 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300"
};

const categoryLabels = {
  convert: "Convert",
  edit: "Edit", 
  organize: "Organize",
  security: "Security",
  ai: "AI Powered",
  optimize: "Optimize"
};

export const ProfessionalToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  category, 
  isNew,
  onClick,
  toolId
}: ProfessionalToolCardProps) => {
  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/20 bg-card dark:bg-card overflow-hidden" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`${title} - ${description}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${categoryColors[category]} border`}>
            <Icon className="w-7 h-7" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1">
                New
              </Badge>
            )}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors leading-tight text-foreground">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${categoryColors[category]} border font-medium`}>
            {categoryLabels[category]}
          </Badge>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground transform group-hover:scale-105"
            tabIndex={-1}
            aria-hidden="true"
          >
            Use Tool →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
