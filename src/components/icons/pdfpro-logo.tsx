
import { cn } from "@/lib/utils";

interface PDFProLogoProps {
  className?: string;
}

export const PDFProLogo = ({ className }: PDFProLogoProps) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("w-8 h-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Modern circular background with gradient */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="url(#backgroundGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Inner circle for depth */}
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="url(#innerGradient)"
        opacity="0.9"
      />
      
      {/* Modern document stack */}
      <g transform="translate(8, 6)">
        {/* Back document */}
        <rect
          x="2"
          y="4"
          width="20"
          height="26"
          rx="3"
          fill="url(#docGradient1)"
          opacity="0.7"
        />
        
        {/* Middle document */}
        <rect
          x="1"
          y="2"
          width="20"
          height="26"
          rx="3"
          fill="url(#docGradient2)"
          opacity="0.8"
        />
        
        {/* Front document */}
        <rect
          x="0"
          y="0"
          width="20"
          height="26"
          rx="3"
          fill="white"
          stroke="url(#strokeGradient)"
          strokeWidth="0.5"
        />
        
        {/* Document content lines */}
        <rect x="3" y="5" width="14" height="1.5" rx="0.75" fill="url(#textGradient)" opacity="0.6" />
        <rect x="3" y="8" width="12" height="1.5" rx="0.75" fill="url(#textGradient)" opacity="0.5" />
        <rect x="3" y="11" width="15" height="1.5" rx="0.75" fill="url(#textGradient)" opacity="0.4" />
        <rect x="3" y="14" width="10" height="1.5" rx="0.75" fill="url(#textGradient)" opacity="0.3" />
        
        {/* PDF badge */}
        <rect
          x="12"
          y="18"
          width="8"
          height="6"
          rx="3"
          fill="url(#badgeGradient)"
        />
        <text
          x="16"
          y="22"
          textAnchor="middle"
          className="text-[4px] font-bold fill-white"
          style={{ fontSize: '4px' }}
        >
          PDF
        </text>
      </g>
      
      {/* Professional "Pro" indicator */}
      <circle
        cx="32"
        cy="10"
        r="6"
        fill="url(#proGradient)"
        className="drop-shadow-md"
      />
      <text
        x="32"
        y="12"
        textAnchor="middle"
        className="text-[6px] font-bold fill-white"
        style={{ fontSize: '6px' }}
      >
        PRO
      </text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f093fb" />
          <stop offset="100%" stopColor="#f5576c" />
        </linearGradient>
        
        <linearGradient id="docGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#00f2fe" />
        </linearGradient>
        
        <linearGradient id="docGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#43e97b" />
          <stop offset="100%" stopColor="#38f9d7" />
        </linearGradient>
        
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ee5a24" />
        </linearGradient>
        
        <linearGradient id="proGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#feca57" />
          <stop offset="100%" stopColor="#ff9ff3" />
        </linearGradient>
      </defs>
    </svg>
  );
};
