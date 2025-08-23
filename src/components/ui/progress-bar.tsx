
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showText = true,
  animated = true
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        {showText && (
          <span className="text-sm font-medium text-foreground">
            Processing...
          </span>
        )}
        {showText && (
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 ease-out",
            animated && "animate-pulse"
          )}
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
};
