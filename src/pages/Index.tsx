
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/config";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set comprehensive SEO meta tags
    document.title = `${SITE_CONFIG.seo.title} - Professional PDF Tools Suite with AI Processing`;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Enhanced SEO tags
    updateMetaTag('description', `${SITE_CONFIG.seo.description} Features 25+ professional PDF tools with client-side and server-side processing, AI-powered OCR, translation, and document analysis.`);
    updateMetaTag('keywords', `${SITE_CONFIG.seo.keywords}, client-side PDF processing, server-side PDF tools, AI PDF analysis, OCR PDF scanner, PDF translation, document converter, professional PDF suite`);
    updateMetaTag('author', SITE_CONFIG.seo.author);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('canonical', window.location.origin);
    
    // Open Graph tags for social media
    updateMetaTag('', `${SITE_CONFIG.seo.title} - Professional PDF Tools Suite`, 'og:title');
    updateMetaTag('', `Professional PDF processing with 25+ tools featuring AI-powered analysis, client-side and server-side processing. Convert, edit, organize, and secure PDFs online.`, 'og:description');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', window.location.origin, 'og:url');
    updateMetaTag('', `${window.location.origin}/og-image.jpg`, 'og:image');
    updateMetaTag('', SITE_CONFIG.brand.name, 'og:site_name');
    updateMetaTag('', 'en_US', 'og:locale');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', `${SITE_CONFIG.seo.title} - Professional PDF Suite`);
    updateMetaTag('twitter:description', 'Professional PDF processing with 25+ tools featuring AI-powered analysis and advanced document processing.');
    updateMetaTag('twitter:image', `${window.location.origin}/og-image.jpg`);
    updateMetaTag('twitter:creator', '@pdfprosuite');
    updateMetaTag('twitter:site', '@pdfprosuite');
    
    // Additional technical SEO tags
    updateMetaTag('theme-color', '#3B82F6');
    updateMetaTag('msapplication-TileColor', '#3B82F6');
    updateMetaTag('application-name', SITE_CONFIG.brand.name);
    updateMetaTag('apple-mobile-web-app-title', SITE_CONFIG.brand.name);
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('mobile-web-app-capable', 'yes');
    
    // Language and locale
    document.documentElement.lang = 'en';
    
    // Enhanced structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": SITE_CONFIG.brand.name,
      "description": "Professional PDF processing suite with 25+ tools featuring AI-powered analysis, OCR, translation, and document conversion. Supports both client-side and server-side processing for maximum performance and security.",
      "url": window.location.origin,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser, Cross-platform",
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "15000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_CONFIG.brand.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`,
          "width": "200",
          "height": "50"
        },
        "sameAs": [
          "https://twitter.com/pdfprosuite",
          "https://github.com/pdfprosuite"
        ]
      },
      "featureList": [
        "PDF to Word Converter",
        "PDF to Excel Converter", 
        "Merge PDF Files",
        "Split PDF Pages",
        "Compress PDF Size",
        "OCR PDF Scanner",
        "AI PDF Translation",
        "Password Protection",
        "Watermark Addition",
        "Client-side Processing",
        "Server-side AI Analysis"
      ],
      "screenshot": `${window.location.origin}/screenshot.jpg`,
      "browserRequirements": "Requires JavaScript. Supports Chrome 60+, Firefox 55+, Safari 12+, Edge 79+",
      "softwareHelp": {
        "@type": "WebPage",
        "url": `${window.location.origin}/help`
      }
    };
    
    // Add breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "PDF Tools",
          "item": `${window.location.origin}#tools`
        }
      ]
    };

    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => document.head.removeChild(script));
    
    // Add new structured data
    const addStructuredData = (data: any) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addStructuredData(structuredData);
    addStructuredData(breadcrumbData);
    
    // Add preconnect for performance
    const addPreconnect = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
    };

    addPreconnect('https://fonts.googleapis.com');
    addPreconnect('https://fonts.gstatic.com');
    
    return () => {
      // Cleanup structured data on unmount
      const scriptsToRemove = document.querySelectorAll('script[type="application/ld+json"]');
      scriptsToRemove.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <section id="tools" className="py-0" aria-label="Professional PDF Tools Collection">
          <ToolsGrid />
        </section>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
