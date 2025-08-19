
import React from "react";

// Convert Tools Icons
export const PDFToWordIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="wordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="24" height="24" rx="4" fill="url(#wordGradient)" />
    <path d="M8 12h16v2H8zm0 4h16v2H8zm0 4h12v2H8z" fill="white" />
    <circle cx="22" cy="8" r="6" fill="#ef4444" />
    <text x="22" y="12" textAnchor="middle" className="text-[8px] font-bold fill-white">W</text>
  </svg>
);

export const PDFToExcelIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="excelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="24" height="24" rx="4" fill="url(#excelGradient)" />
    <rect x="8" y="10" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="14" y="10" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="20" y="10" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="8" y="16" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="14" y="16" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="20" y="16" width="4" height="4" fill="white" opacity="0.8" />
    <circle cx="22" cy="8" r="6" fill="#f59e0b" />
    <text x="22" y="12" textAnchor="middle" className="text-[8px] font-bold fill-white">X</text>
  </svg>
);

export const PDFToImageIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="imageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="24" height="24" rx="4" fill="url(#imageGradient)" />
    <circle cx="12" cy="12" r="2" fill="white" />
    <path d="M8 24l4-4 3 3 5-5 4 4v2a2 2 0 01-2 2H10a2 2 0 01-2-2z" fill="white" opacity="0.8" />
    <circle cx="22" cy="8" r="6" fill="#ec4899" />
    <text x="22" y="12" textAnchor="middle" className="text-[8px] font-bold fill-white">IMG</text>
  </svg>
);

// Edit Tools Icons
export const EditPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="editGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="20" height="24" rx="3" fill="url(#editGradient)" />
    <path d="M8 12h12v2H8zm0 4h12v2H8zm0 4h8v2H8z" fill="white" />
    <path d="M20 8l4-4 4 4-4 4-4-4z" fill="#f59e0b" />
    <path d="M24 12l-2 2-4-4 2-2 4 4z" fill="#fbbf24" />
  </svg>
);

export const RotatePDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="rotateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="16" height="16" rx="3" fill="url(#rotateGradient)" />
    <path d="M12 14h8v2h-8zm0 4h6v2h-6z" fill="white" />
    <path d="M16 4a12 12 0 0112 12h-3l4 4 4-4h-3A16 16 0 0016 0v4z" fill="#ef4444" />
  </svg>
);

// Organize Tools Icons  
export const MergePDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="mergeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="12" height="16" rx="2" fill="url(#mergeGradient)" opacity="0.8" />
    <rect x="6" y="10" width="12" height="16" rx="2" fill="url(#mergeGradient)" />
    <path d="M20 16h8l-4-4m4 4l-4 4" stroke="#10b981" strokeWidth="2" fill="none" />
  </svg>
);

export const SplitPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="splitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <rect x="8" y="6" width="16" height="20" rx="3" fill="url(#splitGradient)" />
    <line x1="16" y1="10" x2="16" y2="22" stroke="white" strokeWidth="2" strokeDasharray="2,2" />
    <path d="M4 16l4-4m-4 4l4 4m16-4l4-4m-4 4l4 4" stroke="#ef4444" strokeWidth="2" fill="none" />
  </svg>
);

// Security Tools Icons
export const ProtectPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="protectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="16" height="20" rx="3" fill="url(#protectGradient)" />
    <path d="M8 14h8v2H8zm0 4h6v2H8z" fill="white" />
    <path d="M24 12a4 4 0 00-8 0v2h-2v8h12v-8h-2v-2zm-6 0a2 2 0 114 0v2h-4v-2z" fill="#fbbf24" />
  </svg>
);

// Optimize Tools Icons
export const CompressPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="compressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="20" height="20" rx="3" fill="url(#compressGradient)" />
    <path d="M10 12h12v2H10zm0 4h10v2H10zm0 4h8v2h-8z" fill="white" />
    <path d="M16 2v6m0-6l-2 2m2-2l2 2m0 24v-6m0 6l-2-2m2 2l2-2" stroke="#10b981" strokeWidth="2" />
  </svg>
);

// AI Tools Icons  
export const OCRPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="ocrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="16" height="24" rx="3" fill="url(#ocrGradient)" />
    <path d="M8 10h8v2H8zm0 4h6v2H8zm0 4h8v2H8z" fill="white" />
    <circle cx="24" cy="8" r="6" fill="#8b5cf6" />
    <path d="M22 6l2 2 2-2" stroke="white" strokeWidth="1.5" fill="none" />
    <circle cx="24" cy="8" r="1.5" fill="white" />
  </svg>
);
