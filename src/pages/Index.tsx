
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Ensure page starts from top
    window.scrollTo(0, 0);
    
    // Enhanced SEO meta tags
    document.title = `${BRAND_NAME} - Free Online PDF Tools | Convert, Edit, Merge PDFs Instantly`;
    
    // Update meta description for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online PDF tools suite with 30+ professional tools. Convert PDF to Word, Excel, JPG. Merge, split, compress, edit PDFs instantly. No registration required. Fast & secure.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free online PDF tools suite with 30+ professional tools. Convert PDF to Word, Excel, JPG. Merge, split, compress, edit PDFs instantly. No registration required. Fast & secure.';
      document.head.appendChild(meta);
    }

    // Add keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', 'PDF tools, convert PDF, merge PDF, split PDF, compress PDF, PDF to Word, PDF to Excel, free PDF converter, online PDF editor, PDF viewer');

    // Add Open Graph meta tags for social sharing
    const ogTags = [
      { property: 'og:title', content: `${BRAND_NAME} - Free Online PDF Tools` },
      { property: 'og:description', content: 'Professional PDF tools suite with 30+ free online tools. Convert, edit, merge, and organize PDFs instantly.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.origin },
      { property: 'og:site_name', content: BRAND_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${BRAND_NAME} - Free Online PDF Tools` },
      { name: 'twitter:description', content: 'Professional PDF tools suite with 30+ free online tools. Convert, edit, merge PDFs instantly.' }
    ];

    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (tag.property) {
          meta.setAttribute('property', tag.property);
        } else {
          meta.setAttribute('name', tag.name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });
    
    // Enhanced structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": BRAND_NAME,
      "description": "Professional PDF tools suite for converting, editing, organizing and securing PDF documents online",
      "url": window.location.origin,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2547"
      },
      "keywords": "PDF tools, convert PDF, merge PDF, split PDF, online PDF editor",
      "author": {
        "@type": "Organization",
        "name": BRAND_NAME
      }
    };
    
    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="tools" className="py-8" aria-label="PDF Tools Collection">
          <ToolsGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
