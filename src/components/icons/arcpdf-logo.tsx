
import { cn } from "@/lib/utils";

interface ArcPDFLogoProps {
  className?: string;
}

export const ArcPDFLogo = ({ className }: ArcPDFLogoProps) => {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("w-10 h-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Arc background with gradient */}
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="url(#arcGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Arc symbol */}
      <path
        d="M12 24 Q24 8 36 24 Q24 40 12 24"
        stroke="white"
        strokeWidth="3"
        fill="none"
        className="drop-shadow-sm"
      />
      
      {/* PDF Document overlay */}
      <g transform="translate(16, 14)">
        {/* Document background */}
        <rect
          x="0"
          y="0"
          width="16"
          height="20"
          rx="2"
          fill="white"
          stroke="url(#docBorder)"
          strokeWidth="1"
          className="drop-shadow-md"
        />
        
        {/* Document fold corner */}
        <path
          d="M12 0 L16 4 L12 4 Z"
          fill="url(#foldGradient)"
        />
        
        {/* Content lines */}
        <rect x="2" y="6" width="10" height="1" rx="0.5" fill="url(#textGradient)" opacity="0.7" />
        <rect x="2" y="8" width="8" height="1" rx="0.5" fill="url(#textGradient)" opacity="0.6" />
        <rect x="2" y="10" width="9" height="1" rx="0.5" fill="url(#textGradient)" opacity="0.5" />
        
        {/* PDF Badge */}
        <rect
          x="3"
          y="14"
          width="10"
          height="4"
          rx="2"
          fill="url(#badgeGradient)"
          className="drop-shadow-sm"
        />
        <text
          x="8"
          y="17"
          textAnchor="middle"
          className="text-[6px] font-bold fill-white"
          style={{ fontSize: '6px', fontFamily: 'system-ui, sans-serif' }}
        >
          PDF
        </text>
      </g>
      
      {/* Modern gradients */}
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667EEA" />
          <stop offset="50%" stopColor="#764BA2" />
          <stop offset="100%" stopColor="#F093FB" />
        </linearGradient>
        
        <linearGradient id="docBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667EEA" />
          <stop offset="100%" stopColor="#764BA2" />
        </linearGradient>
        
        <linearGradient id="foldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#667EEA" />
          <stop offset="100%" stopColor="#764BA2" />
        </linearGradient>
        
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667EEA" />
          <stop offset="100%" stopColor="#4C51BF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
