
import { ReactPDFLogo } from "@/components/icons/react-pdf-logo";
import { SITE_CONFIG } from "@/lib/config";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <ReactPDFLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {SITE_CONFIG.brand.name}
        </span>
        <span className="text-xs text-muted-foreground -mt-1">{SITE_CONFIG.brand.tagline}</span>
      </div>
    </div>
  );
};
