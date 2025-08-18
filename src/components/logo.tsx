
import { ModernPDFLogo } from "@/components/icons/modern-pdf-logo";
import { SITE_CONFIG } from "@/lib/config";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <ModernPDFLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          {SITE_CONFIG.brand.name}
        </span>
        <span className="text-xs text-muted-foreground -mt-1">{SITE_CONFIG.brand.tagline}</span>
      </div>
    </div>
  );
};
