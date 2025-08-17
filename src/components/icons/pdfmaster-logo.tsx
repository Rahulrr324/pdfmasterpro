
import { cn } from "@/lib/utils";

interface PDFMasterLogoProps {
  className?: string;
}

export const PDFMasterLogo = ({ className }: PDFMasterLogoProps) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("w-8 h-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle with gradient */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#gradient)"
        stroke="url(#strokeGradient)"
        strokeWidth="2"
      />
      
      {/* Document layers */}
      <rect
        x="10"
        y="8"
        width="20"
        height="24"
        rx="2"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="12"
        y="10"
        width="16"
        height="20"
        rx="1"
        fill="url(#docGradient)"
      />
      
      {/* PDF text */}
      <text
        x="20"
        y="17"
        textAnchor="middle"
        className="text-[8px] font-bold fill-white"
        style={{ fontSize: '8px' }}
      >
        PDF
      </text>
      
      {/* Master indicator */}
      <circle
        cx="30"
        cy="12"
        r="4"
        fill="url(#accentGradient)"
      />
      <text
        x="30"
        y="14"
        textAnchor="middle"
        className="text-[4px] font-bold fill-white"
        style={{ fontSize: '4px' }}
      >
        M
      </text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF8E53" />
        </linearGradient>
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5252" />
          <stop offset="100%" stopColor="#FF7043" />
        </linearGradient>
        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF8E53" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#45A049" />
        </linearGradient>
      </defs>
    </svg>
  );
};
