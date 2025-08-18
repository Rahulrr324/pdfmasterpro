
import React from "react";

// Enhanced Merge PDF Icon
export const MergePDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2" y="3" width="8" height="11" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="4" y="5" width="8" height="11" rx="1" fill="currentColor" opacity="0.4" />
    <rect x="6" y="7" width="8" height="11" rx="1" fill="currentColor" />
    <path d="M14 10L18 10M16 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Enhanced Split PDF Icon
export const SplitPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="4" y="4" width="7" height="10" rx="1" fill="currentColor" />
    <rect x="13" y="4" width="7" height="10" rx="1" fill="currentColor" opacity="0.6" />
    <path d="M8 18L4 18M6 16L6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 18L16 18M18 16L18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Enhanced Compress Icon
export const CompressPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="5" y="3" width="10" height="14" rx="2" fill="currentColor" opacity="0.2" />
    <rect x="7" y="5" width="10" height="14" rx="2" fill="currentColor" />
    <path d="M9 8H13M9 10H12M9 12H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 20L7 16L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12L17 16L21 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Enhanced Convert Icon
export const ConvertPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="4" width="7" height="9" rx="1" fill="currentColor" opacity="0.3" />
    <rect x="14" y="4" width="7" height="9" rx="1" fill="currentColor" />
    <path d="M10 8.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 6.5L14 8.5L12 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.2" />
    <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.2" />
  </svg>
);

// Enhanced Security Icon
export const SecurityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="5" y="6" width="10" height="12" rx="2" fill="currentColor" opacity="0.2" />
    <rect x="7" y="8" width="10" height="12" rx="2" fill="currentColor" />
    <path d="M9 6V4C9 2.89543 9.89543 2 11 2H13C14.1046 2 15 2.89543 15 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="13" r="2" fill="white" />
    <path d="M12 15V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Enhanced Edit Icon
export const EditPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="4" width="12" height="16" rx="2" fill="currentColor" opacity="0.2" />
    <path d="M7 8H11M7 10H9M7 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 3L21 8L13 16L8 17L9 12L16 3Z" fill="currentColor" />
    <path d="M16 3L21 8M13 16L8 17L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Professional PDF Viewer Icon
export const ViewPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="4" y="3" width="12" height="16" rx="2" fill="currentColor" opacity="0.2" />
    <rect x="6" y="5" width="12" height="16" rx="2" fill="currentColor" />
    <path d="M8 8H12M8 10H14M8 12H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="10" r="4" fill="currentColor" opacity="0.8" />
    <path d="M16 8L20 12M18 10H18.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Professional Extract Pages Icon
export const ExtractPagesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="4" width="10" height="12" rx="2" fill="currentColor" opacity="0.3" />
    <rect x="7" y="6" width="10" height="12" rx="2" fill="currentColor" />
    <path d="M9 9H13M9 11H11M9 13H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 2L22 6L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 6H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Professional Watermark Icon
export const WatermarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="4" y="3" width="12" height="16" rx="2" fill="currentColor" opacity="0.2" />
    <rect x="6" y="5" width="12" height="16" rx="2" fill="currentColor" />
    <path d="M8 8H12M8 10H14M8 12H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" opacity="0.5" />
    <path d="M10 10L14 14M14 10L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Professional Text Extract Icon
export const TextExtractIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="4" y="3" width="10" height="14" rx="2" fill="currentColor" opacity="0.2" />
    <path d="M6 6H10M6 8H12M6 10H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 8H21M15 12H19M15 16H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 6L18 10L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
