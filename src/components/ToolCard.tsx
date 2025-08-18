
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  category: "convert" | "edit" | "organize" | "security" | "ai" | "optimize";
  isNew?: boolean;
  isPremium?: boolean;
  onClick?: () => void;
}

const categoryColors = {
  convert: "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-300 dark:border-blue-800",
  edit: "bg-green-500/10 text-green-700 border-green-200 dark:text-green-300 dark:border-green-800", 
  organize: "bg-purple-500/10 text-purple-700 border-purple-200 dark:text-purple-300 dark:border-purple-800",
  security: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-300 dark:border-red-800",
  ai: "bg-orange-500/10 text-orange-700 border-orange-200 dark:text-orange-300 dark:border-orange-800",
  optimize: "bg-teal-500/10 text-teal-700 border-teal-200 dark:text-teal-300 dark:border-teal-800"
};

const categoryLabels = {
  convert: "Convert",
  edit: "Edit", 
  organize: "Organize",
  security: "Security",
  ai: "AI Powered",
  optimize: "Optimize"
};

const categoryDescriptions = {
  convert: "Transform PDFs to different formats",
  edit: "Modify and enhance PDF content", 
  organize: "Manage and structure PDF files",
  security: "Protect and secure PDF documents",
  ai: "AI-powered advanced PDF features",
  optimize: "Reduce file size and improve performance"
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Card 
          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2" 
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
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex gap-2">
                {isNew && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    New
                  </Badge>
                )}
                {isPremium && (
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 text-xs">
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
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity focus:opacity-100"
                tabIndex={-1}
                aria-hidden="true"
              >
                Use Tool →
              </Button>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{categoryDescriptions[category]}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
