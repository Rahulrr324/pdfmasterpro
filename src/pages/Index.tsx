
import { SEOHead } from "@/components/SEOHead";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF Master Pro",
    "description": "Complete suite of professional PDF tools for merging, splitting, compressing, converting, and editing PDF files online.",
    "url": "https://your-domain.com",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "featureList": [
      "Merge PDF Files",
      "Split PDF Pages", 
      "Compress PDF Size",
      "Convert PDF to Word",
      "Convert PDF to Excel",
      "PDF to Image Converter",
      "Protect PDF with Password",
      "OCR PDF Scanner",
      "AI PDF Chat",
      "PDF Translator"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="PDF Master Pro - Professional PDF Tools Online"
        description="Complete suite of professional PDF tools. Merge, split, compress, convert, and edit PDF files online. Fast, secure, and free PDF processing with AI capabilities."
        keywords="PDF tools, merge PDF, split PDF, compress PDF, convert PDF, edit PDF, PDF converter, online PDF tools, AI PDF chat, OCR PDF, PDF translator"
        structuredData={structuredData}
      />
      
      <Header />
      <main>
        <Hero />
        <ToolsGrid />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
