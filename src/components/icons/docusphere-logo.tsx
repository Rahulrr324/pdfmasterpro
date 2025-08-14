
import { cn } from "@/lib/utils";

interface DocuSphereLogoProps {
  className?: string;
}

export const DocuSphereLogo = ({ className }: DocuSphereLogoProps) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("w-8 h-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer sphere/globe */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        fill="hsl(var(--primary))"
        fillOpacity="0.1"
      />
      
      {/* Document icon inside sphere */}
      <rect
        x="12"
        y="10"
        width="16"
        height="20"
        rx="2"
        fill="hsl(var(--primary))"
        fillOpacity="0.8"
      />
      
      {/* Document lines */}
      <rect
        x="15"
        y="14"
        width="10"
        height="1.5"
        rx="0.75"
        fill="hsl(var(--primary-foreground))"
      />
      <rect
        x="15"
        y="17"
        width="8"
        height="1.5"
        rx="0.75"
        fill="hsl(var(--primary-foreground))"
      />
      <rect
        x="15"
        y="20"
        width="10"
        height="1.5"
        rx="0.75"
        fill="hsl(var(--primary-foreground))"
      />
      
      {/* Globe grid lines */}
      <path
        d="M2 20 C2 20, 20 15, 38 20"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M2 20 C2 20, 20 25, 38 20"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M20 2 C15 2, 15 20, 20 38 C25 38, 25 20, 20 2"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
};
