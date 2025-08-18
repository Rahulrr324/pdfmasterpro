
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { ModernPDFLogo } from "@/components/icons/modern-pdf-logo";

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

  const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
  };

  // Filter social links based on configuration
  const visibleSocialLinks = Object.entries(SITE_CONFIG.social)
    .filter(([_, config]) => config.show)
    .map(([platform, config]) => ({
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      href: config.url,
      icon: socialIcons[platform as keyof typeof socialIcons],
    }));

  return (
    <footer className="bg-gray-50 border-t" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <ModernPDFLogo className="w-10 h-10" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {SITE_CONFIG.brand.name}
                </span>
                <span className="text-xs text-muted-foreground -mt-1">{SITE_CONFIG.brand.tagline}</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {SITE_CONFIG.brand.description}
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span>100% Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-blue-600" />
                <span>Lightning Fast</span>
              </div>
            </div>
            {/* Social Links */}
            {visibleSocialLinks.length > 0 && (
              <div className="flex space-x-3">
                {visibleSocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
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
                      className="text-sm text-muted-foreground hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600 focus:underline"
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
              © {currentYear} {SITE_CONFIG.brand.name}. All rights reserved.
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
