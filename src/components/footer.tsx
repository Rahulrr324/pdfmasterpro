import { DocuSphereLogo } from "@/components/icons/docusphere-logo";
import { BRAND_NAME } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Shield, Zap, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const toolCategories = [
    {
      title: "Convert Tools",
      links: [
        { name: "PDF to Word", href: "/tool/pdf-to-word" },
        { name: "PDF to Excel", href: "/tool/pdf-to-excel" }, 
        { name: "PDF to JPG", href: "/tool/pdf-to-jpg" },
        { name: "Word to PDF", href: "#word-to-pdf" },
        { name: "Excel to PDF", href: "#excel-to-pdf" },
        { name: "JPG to PDF", href: "#jpg-to-pdf" }
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
      title: "Security & AI",
      links: [
        { name: "Protect PDF", href: "/tool/protect-pdf" },
        { name: "Unlock PDF", href: "#unlock-pdf" },
        { name: "AI Metadata", href: "#ai-metadata" },
        { name: "Plagiarism Scanner", href: "#plagiarism-scanner" },
        { name: "PDF Repair", href: "#pdf-repair" },
        { name: "Accessible PDF", href: "#accessible-pdf" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Github", href: "#github", icon: Github },
    { name: "Twitter", href: "#twitter", icon: Twitter },
    { name: "LinkedIn", href: "#linkedin", icon: Linkedin }
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Contact Us", href: "#contact" },
    { name: "Help Center", href: "#help" }
  ];

  return (
    <footer className="bg-muted/30 border-t" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <DocuSphereLogo className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {BRAND_NAME}
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Professional PDF Tools</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The most comprehensive PDF toolkit on the web. Convert, edit, organize, and secure 
              your documents with 25+ professional tools, all completely free.
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-orange-600" aria-hidden="true" />
                <span>Lightning Fast</span>
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
                      className="text-sm text-muted-foreground hover:text-orange-600 transition-colors focus:outline-none focus:text-orange-600 focus:underline"
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
              Professional PDF tools for everyone. No registration required.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Policy Links */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {policyLinks.map((policy, index) => (
                <a 
                  key={index}
                  href={policy.href} 
                  className="text-muted-foreground hover:text-orange-600 transition-colors focus:outline-none focus:text-orange-600 focus:underline"
                >
                  {policy.name}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/20 hover:bg-primary/5 focus:ring-2 focus:ring-primary"
              >
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                Newsletter
              </Button>
              <div className="text-sm text-muted-foreground">
                Made with ❤️ for PDF lovers
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
