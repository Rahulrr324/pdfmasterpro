
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ProfessionalToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
  onClick: () => void;
}

export const ProfessionalToolCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick
}: ProfessionalToolCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white overflow-hidden">
      <CardContent className="p-0">
        <div className={`h-24 ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 left-4">
            <Icon className="h-8 w-8 text-white drop-shadow-lg" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/20 rounded-full"></div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          
          <Button
            onClick={onClick}
            variant="ghost"
            size="sm"
            className="w-full group-hover:bg-purple-50 group-hover:text-purple-700 transition-all duration-200 justify-between"
          >
            <span>Use Tool</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
