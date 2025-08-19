
import React from "react";

export const ReactPDFLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="reactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#61DAFB" />
        <stop offset="50%" stopColor="#21D4FD" />
        <stop offset="100%" stopColor="#1E90FF" />
      </linearGradient>
      <linearGradient id="atomGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#61DAFB" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    
    {/* Outer glow effect */}
    <circle cx="24" cy="24" r="22" fill="url(#atomGlow)" opacity="0.2" />
    
    {/* Electron orbits */}
    <ellipse 
      cx="24" 
      cy="24" 
      rx="20" 
      ry="8" 
      stroke="url(#reactGradient)" 
      strokeWidth="2" 
      fill="none"
      opacity="0.7"
    />
    <ellipse 
      cx="24" 
      cy="24" 
      rx="20" 
      ry="8" 
      stroke="url(#reactGradient)" 
      strokeWidth="2" 
      fill="none"
      transform="rotate(60 24 24)"
      opacity="0.7"
    />
    <ellipse 
      cx="24" 
      cy="24" 
      rx="20" 
      ry="8" 
      stroke="url(#reactGradient)" 
      strokeWidth="2" 
      fill="none"
      transform="rotate(-60 24 24)"
      opacity="0.7"
    />
    
    {/* Central nucleus */}
    <circle 
      cx="24" 
      cy="24" 
      r="4" 
      fill="url(#reactGradient)"
      className="animate-pulse"
    />
    
    {/* PDF document overlay */}
    <rect 
      x="16" 
      y="28" 
      width="16" 
      height="18" 
      rx="2" 
      fill="white" 
      stroke="url(#reactGradient)" 
      strokeWidth="1.5"
      opacity="0.9"
    />
    
    {/* Document fold */}
    <path 
      d="M28 28 L32 32 L28 32 Z" 
      fill="url(#reactGradient)" 
      opacity="0.6"
    />
    
    {/* Document lines */}
    <line x1="18" y1="34" x2="26" y2="34" stroke="url(#reactGradient)" strokeWidth="1" opacity="0.8" />
    <line x1="18" y1="37" x2="24" y2="37" stroke="url(#reactGradient)" strokeWidth="1" opacity="0.6" />
    <line x1="18" y1="40" x2="26" y2="40" stroke="url(#reactGradient)" strokeWidth="1" opacity="0.4" />
    
    {/* PDF badge */}
    <rect 
      x="19" 
      y="42" 
      width="10" 
      height="3" 
      rx="1.5" 
      fill="url(#reactGradient)"
    />
    <text 
      x="24" 
      y="44.2" 
      textAnchor="middle" 
      className="text-[6px] font-bold fill-white"
      style={{ fontSize: '6px', fontFamily: 'system-ui, sans-serif' }}
    >
      PDF
    </text>
  </svg>
);
