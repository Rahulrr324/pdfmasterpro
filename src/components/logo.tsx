
import { PDFMasterLogo } from "@/components/icons/pdfmaster-logo";
import { BRAND_NAME } from "@/lib/brand";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <PDFMasterLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {BRAND_NAME}
        </span>
        <span className="text-xs text-muted-foreground -mt-1">Professional PDF Tools</span>
      </div>
    </div>
  );
};
