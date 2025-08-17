
import { PDFProLogo } from "@/components/icons/pdfpro-logo";
import { BRAND_NAME } from "@/lib/brand";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <PDFProLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">
          {BRAND_NAME}
        </span>
        <span className="text-xs text-muted-foreground -mt-1">Professional PDF Suite</span>
      </div>
    </div>
  );
};
