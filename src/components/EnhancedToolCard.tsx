
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface EnhancedToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
  onClick: () => void;
}

export const EnhancedToolCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick
}: EnhancedToolCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-200 bg-white overflow-hidden rounded-xl">
      <CardContent className="p-0">
        <div className={`h-20 ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-3 left-4">
            <Icon className="h-7 w-7 text-white drop-shadow-lg" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
          <div className="absolute top-2 right-2 w-6 h-6 bg-white/15 rounded-full"></div>
        </div>
        
        <div className="p-5 space-y-3">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
          
          <Button
            onClick={onClick}
            variant="ghost"
            size="sm"
            className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-50 group-hover:to-blue-50 group-hover:text-purple-700 transition-all duration-300 justify-between font-medium h-9"
          >
            <span>Use Tool</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
