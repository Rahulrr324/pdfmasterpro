
import { ArcPDFLogo } from "@/components/icons/arcpdf-logo";
import { SITE_CONFIG } from "@/lib/config";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <ArcPDFLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent">
          {SITE_CONFIG.brand.name}
        </span>
        <span className="text-xs text-muted-foreground -mt-1">{SITE_CONFIG.brand.tagline}</span>
      </div>
    </div>
  );
};
