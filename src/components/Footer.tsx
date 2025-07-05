
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Shield, Zap } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const toolCategories = [
    {
      title: "Convert Tools",
      links: [
        "PDF to Word",
        "PDF to Excel", 
        "PDF to JPG",
        "Word to PDF",
        "Excel to PDF",
        "JPG to PDF"
      ]
    },
    {
      title: "Edit & Organize",
      links: [
        "Merge PDF",
        "Split PDF", 
        "Compress PDF",
        "Edit PDF",
        "Rotate PDF",
        "Crop PDF"
      ]
    },
    {
      title: "Security & AI",
      links: [
        "Protect PDF",
        "Unlock PDF",
        "AI Metadata",
        "Plagiarism Scanner",
        "PDF Repair",
        "Accessible PDF"
      ]
    }
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
                <span className="text-lg font-bold">PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  PdfMaster Pro
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Professional PDF Tools</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The most comprehensive PDF toolkit on the web. Convert, edit, organize, and secure 
              your documents with 25+ professional tools, all completely free.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-orange-600" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Tool Categories */}
          {toolCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} PdfMaster Pro. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#privacy" className="text-muted-foreground hover:text-orange-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-orange-600 transition-colors">
                Terms of Service
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-orange-600 transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-950/20">
              <Mail className="h-4 w-4 mr-2" />
              Newsletter
            </Button>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ for PDF lovers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
