
import { cn } from "@/lib/utils";

interface ModernPDFLogoProps {
  className?: string;
}

export const ModernPDFLogo = ({ className }: ModernPDFLogoProps) => {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("w-10 h-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Modern gradient background */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill="url(#modernGradient)"
        className="drop-shadow-lg"
      />
      
      {/* PDF Document Stack */}
      <g transform="translate(8, 6)">
        {/* Back document shadow */}
        <rect
          x="3"
          y="5"
          width="28"
          height="36"
          rx="4"
          fill="rgba(0,0,0,0.1)"
        />
        
        {/* Middle document */}
        <rect
          x="2"
          y="3"
          width="28"
          height="36"
          rx="4"
          fill="url(#docGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        
        {/* Front document */}
        <rect
          x="0"
          y="0"
          width="28"
          height="36"
          rx="4"
          fill="white"
          stroke="url(#borderGradient)"
          strokeWidth="1"
          className="drop-shadow-md"
        />
        
        {/* Document fold corner */}
        <path
          d="M20 0 L28 8 L20 8 Z"
          fill="url(#foldGradient)"
        />
        <path
          d="M20 0 L20 8 L28 8"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.5"
          fill="none"
        />
        
        {/* Content lines */}
        <rect x="4" y="12" width="16" height="2" rx="1" fill="url(#textGradient)" opacity="0.6" />
        <rect x="4" y="16" width="14" height="2" rx="1" fill="url(#textGradient)" opacity="0.5" />
        <rect x="4" y="20" width="18" height="2" rx="1" fill="url(#textGradient)" opacity="0.4" />
        <rect x="4" y="24" width="12" height="2" rx="1" fill="url(#textGradient)" opacity="0.3" />
        
        {/* PDF Badge */}
        <rect
          x="6"
          y="28"
          width="16"
          height="6"
          rx="3"
          fill="url(#badgeGradient)"
          className="drop-shadow-sm"
        />
        <text
          x="14"
          y="32.5"
          textAnchor="middle"
          className="text-[8px] font-bold fill-white"
          style={{ fontSize: '8px', fontFamily: 'system-ui, sans-serif' }}
        >
          PDF
        </text>
      </g>
      
      {/* Modern gradients */}
      <defs>
        <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        
        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="foldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
};
