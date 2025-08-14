
import { DocuSphereLogo } from "@/components/icons/docusphere-logo";
import { BRAND_NAME } from "@/lib/brand";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <DocuSphereLogo />
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        {BRAND_NAME}
      </span>
    </div>
  );
};
