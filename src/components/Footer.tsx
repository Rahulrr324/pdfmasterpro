import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, Github, Twitter, Linkedin } from "lucide-react";
import { BRAND_NAME } from "@/lib/brand";
import { PDFProLogo } from "@/components/icons/pdfpro-logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const toolCategories = [
    {
      title: "Convert Tools",
      links: [
        { name: "PDF to Word", href: "/tool/pdf-to-word" },
        { name: "PDF to Excel", href: "/tool/pdf-to-excel" }, 
        { name: "PDF to JPG", href: "/tool/pdf-to-jpg" },
        { name: "Word to PDF", href: "/tool/word-to-pdf" },
        { name: "Excel to PDF", href: "/tool/excel-to-pdf" },
        { name: "Image to PDF", href: "/tool/image-to-pdf" }
      ]
    },
    {
      title: "Edit & Organize",
      links: [
        { name: "Merge PDF", href: "/tool/merge-pdf" },
        { name: "Split PDF", href: "/tool/split-pdf" }, 
        { name: "Compress PDF", href: "/tool/compress-pdf" },
        { name: "Edit PDF", href: "/tool/edit-pdf" },
        { name: "Rotate PDF", href: "/tool/rotate-pdf" },
        { name: "Crop PDF", href: "/tool/crop-pdf" }
      ]
    },
    {
      title: "Security & More",
      links: [
        { name: "Protect PDF", href: "/tool/protect-pdf" },
        { name: "Unlock PDF", href: "/tool/unlock-pdf" },
        { name: "View PDF", href: "/tool/view-pdf" },
        { name: "Extract Pages", href: "/tool/extract-pages" },
        { name: "Watermark PDF", href: "/tool/watermark-pdf" },
        { name: "All Categories", href: "/categories" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Github", href: "#github", icon: Github },
    { name: "Twitter", href: "#twitter", icon: Twitter },
    { name: "LinkedIn", href: "#linkedin", icon: Linkedin }
  ];

  return (
    <footer className="bg-muted/30 border-t" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <PDFProLogo className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">
                  {BRAND_NAME}
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Professional PDF Suite</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The most comprehensive and professional PDF toolkit on the web. Convert, edit, organize, and secure 
              your documents with 25+ advanced tools, all completely free and secure.
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
                <span>100% Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-purple-600" aria-hidden="true" />
                <span>Lightning Fast Processing</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
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
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-purple-600 transition-colors focus:outline-none focus:text-purple-600 focus:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Professional PDF tools for everyone. No registration required, completely free and secure.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Made with ❤️ for PDF professionals worldwide
          </div>
        </div>
      </div>
    </footer>
  );
};
