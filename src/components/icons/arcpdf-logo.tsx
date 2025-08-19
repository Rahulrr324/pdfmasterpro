
import React from "react";

export const ArcPDFLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    
    {/* Outer arc */}
    <path 
      d="M20 4C29.941 4 38 12.059 38 22C38 31.941 29.941 40 20 40C10.059 40 2 31.941 2 22C2 12.059 10.059 4 20 4Z" 
      fill="url(#arcGradient)" 
      fillOpacity="0.1"
    />
    
    {/* Main arc design */}
    <path 
      d="M8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20" 
      stroke="url(#arcGradient)" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    
    {/* PDF document representation */}
    <rect 
      x="15" 
      y="18" 
      width="10" 
      height="14" 
      rx="1" 
      fill="white" 
      stroke="url(#arcGradient)" 
      strokeWidth="1.5"
    />
    
    {/* Document lines */}
    <line x1="17" y1="22" x2="23" y2="22" stroke="url(#arcGradient)" strokeWidth="1" />
    <line x1="17" y1="25" x2="21" y2="25" stroke="url(#arcGradient)" strokeWidth="1" />
    <line x1="17" y1="28" x2="23" y2="28" stroke="url(#arcGradient)" strokeWidth="1" />
    
    {/* Corner fold */}
    <path 
      d="M23 18L23 20L25 20Z" 
      fill="url(#arcGradient)" 
      fillOpacity="0.3"
    />
  </svg>
);
