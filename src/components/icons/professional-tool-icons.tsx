
import React from "react";

// Convert Tools Icons
export const MergePDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="merge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="8" height="12" rx="2" fill="url(#merge-gradient)" opacity="0.7" />
    <rect x="6" y="8" width="8" height="12" rx="2" fill="url(#merge-gradient)" />
    <path d="M16 12h4m-2-2v4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SplitPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="split-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <rect x="6" y="4" width="12" height="16" rx="2" fill="url(#split-gradient)" />
    <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" strokeDasharray="2,2" />
    <path d="M2 12l3-3m-3 3l3 3m16-3l-3-3m3 3l-3 3" stroke="#ef4444" strokeWidth="1.5" />
  </svg>
);

export const CompressPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="compress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <rect x="5" y="6" width="14" height="12" rx="2" fill="url(#compress-gradient)" />
    <path d="M8 10h8M8 12h6M8 14h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 2v4m0-4l-2 2m2-2l2 2M12 22v-4m0 4l-2-2m2 2l2-2" stroke="#10b981" strokeWidth="2" />
  </svg>
);

export const ConvertPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="convert-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect x="2" y="4" width="8" height="10" rx="2" fill="url(#convert-gradient)" opacity="0.7" />
    <rect x="14" y="4" width="8" height="10" rx="2" fill="url(#convert-gradient)" />
    <path d="M10 9h4m-2-2l2 2-2 2" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="2" fill="#f59e0b" />
    <circle cx="18" cy="18" r="2" fill="#f59e0b" />
  </svg>
);

export const SecurityPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="security-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="12" height="14" rx="2" fill="url(#security-gradient)" opacity="0.8" />
    <rect x="6" y="6" width="8" height="2" rx="1" fill="none" stroke="url(#security-gradient)" strokeWidth="2" />
    <circle cx="10" cy="15" r="2" fill="white" />
    <path d="M10 17v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 12l2-2 2 2-2 2-2-2z" fill="#fbbf24" />
  </svg>
);

export const EditPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="edit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="12" height="16" rx="2" fill="url(#edit-gradient)" opacity="0.8" />
    <path d="M6 8h6M6 10h4M6 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 4l4-1 1 4-4 1-1-4z" fill="#f59e0b" />
    <path d="M17 7l-5 5-2 1 1-2 5-5 1 1z" fill="#fbbf24" />
  </svg>
);

export const RotatePDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="rotate-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="12" height="12" rx="2" fill="url(#rotate-gradient)" />
    <path d="M9 9h6M9 11h4M9 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 2a10 10 0 0110 10h-2l3 3 3-3h-2A12 12 0 0012 0v2z" fill="#ef4444" />
  </svg>
);

export const WatermarkPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="watermark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect x="4" y="3" width="12" height="16" rx="2" fill="url(#watermark-gradient)" />
    <path d="M7 7h6M7 9h8M7 11h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="5" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
    <text x="12" y="15" textAnchor="middle" className="text-[6px] font-bold" fill="#f59e0b">WM</text>
  </svg>
);

export const ExtractPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="extract-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="10" height="12" rx="2" fill="url(#extract-gradient)" opacity="0.7" />
    <rect x="7" y="6" width="10" height="12" rx="2" fill="url(#extract-gradient)" />
    <path d="M9 9h4M9 11h3M9 13h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 4l3 3-3 3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7h6" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CropPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="crop-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="14" height="14" rx="2" fill="url(#crop-gradient)" />
    <path d="M8 8h8M8 10h6M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 6h4M6 2v4M18 22h4M22 18v4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
    <rect x="6" y="6" width="12" height="12" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

export const ViewPDFIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="view-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <rect x="4" y="3" width="12" height="16" rx="2" fill="url(#view-gradient)" />
    <path d="M7 7h6M7 9h8M7 11h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="10" r="4" fill="#f59e0b" />
    <circle cx="18" cy="10" r="2" fill="white" />
    <circle cx="18" cy="10" r="1" fill="#f59e0b" />
  </svg>
);

export const ImageConvertIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="image-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="12" rx="2" fill="url(#image-gradient)" />
    <circle cx="8" cy="9" r="2" fill="white" />
    <path d="M3 13l4-4 3 3 4-4 3 3v3a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="white" opacity="0.8" />
    <path d="M12 18h8M16 22v-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const WordDocIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="word-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="url(#word-gradient)" />
    <path d="M8 8h8M8 10h8M8 12h6M8 14h8M8 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="16" y="6" width="6" height="6" rx="1" fill="#ef4444" />
    <text x="19" y="10.5" textAnchor="middle" className="text-[8px] font-bold" fill="white">W</text>
  </svg>
);

export const ExcelDocIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="excel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="url(#excel-gradient)" />
    <rect x="7" y="7" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="11" y="7" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="15" y="7" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="7" y="11" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="11" y="11" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="15" y="11" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="16" y="4" width="6" height="6" rx="1" fill="#f59e0b" />
    <text x="19" y="8.5" textAnchor="middle" className="text-[8px] font-bold" fill="white">X</text>
  </svg>
);

export const HTMLDocIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="html-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="url(#html-gradient)" />
    <path d="M7 7l2 2-2 2M17 7l-2 2 2 2M12 6l-2 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="16" y="4" width="6" height="6" rx="1" fill="#8b5cf6" />
    <text x="19" y="8.5" textAnchor="middle" className="text-[6px] font-bold" fill="white">HTML</text>
  </svg>
);

export const TextExtractIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="10" height="14" rx="2" fill="url(#text-gradient)" />
    <path d="M6 7h4M6 9h3M6 11h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 7h6M15 10h5M15 13h6M15 16h4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 5l3 3-3 3" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PasswordIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="password-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <rect x="3" y="8" width="14" height="12" rx="2" fill="url(#password-gradient)" opacity="0.8" />
    <rect x="5" y="6" width="10" height="4" rx="2" fill="none" stroke="url(#password-gradient)" strokeWidth="2" />
    <circle cx="10" cy="14" r="2" fill="white" />
    <path d="M10 16v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <rect x="18" y="10" width="4" height="8" rx="1" fill="#fbbf24" />
    <path d="M19 11h2M19 13h2M19 15h2" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const UnlockIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <defs>
      <linearGradient id="unlock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <rect x="3" y="8" width="14" height="12" rx="2" fill="url(#unlock-gradient)" />
    <path d="M5 8V6a5 5 0 015-5 5 5 0 015 5" stroke="#f59e0b" strokeWidth="2" fill="none" />
    <circle cx="10" cy="14" r="2" fill="white" />
    <path d="M10 16v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 10l3-3 3 3" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
