
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { BRAND_NAME } from "@/lib/brand";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set document title for SEO
    document.title = `${BRAND_NAME} - Professional PDF Tools Suite | Convert, Edit & Organize PDFs`;
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional PDF tools suite with 25+ free online tools. Convert PDF to Word, Excel, JPG. Merge, split, compress, edit, and secure PDFs instantly. No registration required.');
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": BRAND_NAME,
      "description": "Professional PDF tools suite for converting, editing, organizing and securing PDF documents",
      "url": window.location.origin,
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="tools" className="py-6" aria-label="PDF Tools Collection">
          <ToolsGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
