
import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  const currentYear = new Date().getFullYear();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF Master Pro",
    "description": "Professional PDF processing tools for merging, splitting, converting, and editing PDF documents online. Free, secure, and easy to use.",
    "url": "https://your-domain.com",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Merge PDF files",
      "Split PDF documents", 
      "Compress PDF size",
      "Convert PDF to various formats",
      "Add watermarks to PDFs",
      "Rotate PDF pages",
      "Extract PDF pages",
      "Crop PDF documents",
      "Password protect PDFs",
      "Remove PDF passwords",
      "AI-powered OCR",
      "PDF translation",
      "Document summarization"
    ]
  };

  return (
    <>
      <Helmet>
        <title>PDF Master Pro - Professional PDF Tools Online | Merge, Split, Convert PDFs</title>
        <meta name="description" content="Professional PDF processing suite with 25+ tools. Merge, split, compress, convert, edit PDFs online. Free, secure, no registration required. Works in your browser." />
        <meta name="keywords" content="PDF tools, merge PDF, split PDF, compress PDF, convert PDF, PDF editor, PDF converter, online PDF tools, free PDF tools, PDF processing, document management" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="PDF Master Pro" />
        <link rel="canonical" href="https://your-domain.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:title" content="PDF Master Pro - Professional PDF Tools Online" />
        <meta property="og:description" content="Professional PDF processing suite with 25+ tools. Merge, split, compress, convert, edit PDFs online. Free, secure, no registration required." />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />
        <meta property="og:site_name" content="PDF Master Pro" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://your-domain.com/" />
        <meta property="twitter:title" content="PDF Master Pro - Professional PDF Tools Online" />
        <meta property="twitter:description" content="Professional PDF processing suite with 25+ tools. Merge, split, compress, convert, edit PDFs online. Free, secure, no registration required." />
        <meta property="twitter:image" content="https://your-domain.com/og-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PDF Master Pro" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Additional Structured Data for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PDF Master Pro",
            "url": "https://your-domain.com",
            "logo": "https://your-domain.com/logo.png",
            "description": "Professional PDF processing tools and document management solutions",
            "sameAs": [
              "https://twitter.com/pdfmasterpro",
              "https://github.com/pdfmasterpro"
            ]
          })}
        </script>

        {/* FAQ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I merge PDF files online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use our Merge PDF tool to combine multiple PDF documents into one file. Simply upload your PDFs, arrange them in the desired order, and download the merged result."
                }
              },
              {
                "@type": "Question", 
                "name": "Is it safe to use online PDF tools?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our PDF tools process files locally in your browser for maximum security. Your files are never uploaded to our servers, ensuring complete privacy."
                }
              },
              {
                "@type": "Question",
                "name": "Are these PDF tools free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all our basic PDF processing tools are completely free. No registration required, no watermarks added, and no file size limits for most operations."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ToolsGrid />
          <Features />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
