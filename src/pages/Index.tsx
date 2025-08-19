
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
    document.title = SITE_CONFIG.seo.title;
    
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

    // Basic SEO tags
    updateMetaTag('description', SITE_CONFIG.seo.description);
    updateMetaTag('keywords', SITE_CONFIG.seo.keywords);
    updateMetaTag('author', SITE_CONFIG.seo.author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMetaTag('', SITE_CONFIG.seo.title, 'og:title');
    updateMetaTag('', SITE_CONFIG.seo.description, 'og:description');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', window.location.origin, 'og:url');
    updateMetaTag('', `${window.location.origin}/og-image.jpg`, 'og:image');
    updateMetaTag('', SITE_CONFIG.brand.name, 'og:site_name');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', SITE_CONFIG.seo.title);
    updateMetaTag('twitter:description', SITE_CONFIG.seo.description);
    updateMetaTag('twitter:image', `${window.location.origin}/og-image.jpg`);
    
    // Additional SEO tags
    updateMetaTag('theme-color', '#3B82F6');
    updateMetaTag('msapplication-TileColor', '#3B82F6');
    
    // Language and locale
    updateMetaTag('', 'en_US', 'og:locale');
    document.documentElement.lang = 'en';
    
    // Structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": SITE_CONFIG.brand.name,
      "description": SITE_CONFIG.seo.description,
      "url": window.location.origin,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "10000"
      },
      "publisher": {
        "@type": "Organization",
        "name": SITE_CONFIG.brand.name,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        }
      }
    };
    
    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup structured data on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <section id="tools" className="py-0" aria-label="PDF Tools Collection">
          <ToolsGrid />
        </section>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
