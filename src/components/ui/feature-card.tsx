
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  badge,
  className,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            {icon}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          {description}
        </p>
        
        {badge && (
          <Badge variant="secondary" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {badge}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
