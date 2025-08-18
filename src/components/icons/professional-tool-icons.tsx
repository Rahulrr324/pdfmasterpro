
import React from "react";

// Merge PDF Icon
export const MergePDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="4" width="7" height="10" rx="1" />
    <rect x="14" y="4" width="7" height="10" rx="1" />
    <path d="m10 9 4 0" />
    <path d="m12 7 0 4" />
    <rect x="8" y="16" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Split PDF Icon
export const SplitPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="4" width="18" height="12" rx="1" />
    <path d="m12 4 0 12" strokeDasharray="2 2" />
    <path d="m9 10 6 0" />
    <path d="m12 8 0 4" />
    <circle cx="8" cy="18" r="2" fill="currentColor" fillOpacity="0.3" />
    <circle cx="16" cy="18" r="2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

// Compress PDF Icon
export const CompressPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="m8 7 8 0" />
    <path d="m8 11 6 0" />
    <path d="m8 15 4 0" />
    <path d="m17 9 2 2-2 2" />
    <path d="m15 11 4 0" />
  </svg>
);

// Convert PDF Icon
export const ConvertPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <circle cx="12" cy="15" r="3" />
    <path d="m9 12 6 6" />
    <path d="m15 12-6 6" />
  </svg>
);

// Security PDF Icon
export const SecurityPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="M12 10v4" />
    <circle cx="12" cy="16" r="1" />
    <rect x="10" y="12" width="4" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Edit PDF Icon
export const EditPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="m15 12-3 3-2-2" />
    <circle cx="11" cy="13" r="1" fill="currentColor" />
  </svg>
);

// Rotate PDF Icon
export const RotatePDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="M12 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    <path d="m14 11-2 2 2 2" />
  </svg>
);

// Watermark PDF Icon
export const WatermarkPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <circle cx="12" cy="14" r="3" strokeDasharray="2 2" opacity="0.7" />
    <path d="m10 12 4 4" opacity="0.7" />
    <path d="m14 12-4 4" opacity="0.7" />
  </svg>
);

// Extract Pages Icon
export const ExtractPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <rect x="8" y="12" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <path d="m12 10 0 2" />
    <path d="m10 11 4 0" />
  </svg>
);

// Crop PDF Icon
export const CropPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <rect x="8" y="11" width="8" height="6" rx="1" strokeDasharray="2 2" />
    <path d="m6 11 2 0" />
    <path d="m16 11 2 0" />
    <path d="m8 9 0 2" />
    <path d="m8 17 0 2" />
  </svg>
);

// View PDF Icon
export const ViewPDFIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <circle cx="12" cy="14" r="3" />
    <path d="m12 11 0 6" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
  </svg>
);

// Image Conversion Icon
export const ImageConvertIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    <path d="M14 2H6a2 2 0 0 0-2 2v16" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

// Word Document Icon
export const WordDocIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.1" />
    <polyline points="14,2 14,8 20,8" />
    <path d="m8 13 2 4 2-4 2 4" strokeWidth="1.5" />
  </svg>
);

// Excel Spreadsheet Icon
export const ExcelDocIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.1" />
    <polyline points="14,2 14,8 20,8" />
    <path d="m8 11 8 0" strokeWidth="1" />
    <path d="m8 14 8 0" strokeWidth="1" />
    <path d="m8 17 6 0" strokeWidth="1" />
    <path d="m11 10 0 8" strokeWidth="1" />
  </svg>
);

// HTML/Web Icon
export const HTMLDocIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="m8 13 2-2 2 2" strokeWidth="1.5" />
    <path d="m8 15 2 2 2-2" strokeWidth="1.5" />
    <path d="m14 13 2-2 2 2" strokeWidth="1.5" />
    <path d="m14 15 2 2 2-2" strokeWidth="1.5" />
  </svg>
);

// Text Extract Icon
export const TextExtractIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <path d="m8 12 8 0" strokeWidth="1" />
    <path d="m8 15 6 0" strokeWidth="1" />
    <path d="m8 18 4 0" strokeWidth="1" />
    <circle cx="19" cy="15" r="2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

// Password/Lock Icon Enhanced
export const PasswordIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <rect x="10" y="12" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <path d="M12 11v1" strokeWidth="1" />
  </svg>
);

// Unlock Icon Enhanced
export const UnlockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <rect x="10" y="13" width="4" height="3" rx="1" strokeDasharray="2 2" />
    <path d="M12 11v2" strokeWidth="1" strokeDasharray="1 1" />
    <path d="m14 11 2 0" strokeWidth="1" />
  </svg>
);
