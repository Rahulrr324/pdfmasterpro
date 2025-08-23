
import React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ProfessionalButtonProps extends ButtonProps {
  loading?: boolean;
  icon?: React.ReactNode;
  gradient?: boolean;
}

export const ProfessionalButton: React.FC<ProfessionalButtonProps> = ({
  children,
  loading = false,
  icon,
  gradient = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 font-semibold",
        gradient && "bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-xl",
        !gradient && "hover:shadow-lg transition-shadow",
        loading && "cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          <span className="w-4 h-4">{icon}</span>
        ) : null}
        <span>{children}</span>
      </div>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </Button>
  );
};
