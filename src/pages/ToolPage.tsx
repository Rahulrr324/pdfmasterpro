
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PDFProcessor } from "@/components/pdf/PDFProcessor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const toolConfigs = {
  // Client-side tools
  "merge-pdf": {
    title: "Merge PDF Files Online",
    description: "Combine multiple PDF documents into a single file instantly and securely",
    tool: "merge" as const,
    keywords: "merge PDF, combine PDF files, join PDF documents, PDF merger online"
  },
  "split-pdf": {
    title: "Split PDF Pages Online",
    description: "Extract pages or split PDF into multiple files with precision", 
    tool: "split" as const,
    keywords: "split PDF, extract PDF pages, divide PDF, separate PDF files"
  },
  "rotate-pdf": {
    title: "Rotate PDF Pages Online",
    description: "Rotate PDF pages 90, 180, or 270 degrees permanently",
    tool: "rotate" as const,
    keywords: "rotate PDF, turn PDF pages, flip PDF, rotate PDF pages online"
  },
  "compress-pdf": {
    title: "Compress PDF Size Online", 
    description: "Reduce PDF file size while maintaining quality and readability",
    tool: "compress" as const,
    keywords: "compress PDF, reduce PDF size, optimize PDF, shrink PDF file"
  },
  "extract-pages": {
    title: "Extract PDF Pages Online",
    description: "Extract specific pages from PDF documents quickly and easily",
    tool: "extract" as const,
    keywords: "extract PDF pages, PDF page extractor, get PDF pages, pull PDF pages"
  },
  "watermark-pdf": {
    title: "Add Watermark to PDF Online",
    description: "Add text or image watermarks to PDF documents for protection",
    tool: "watermark" as const,
    keywords: "PDF watermark, add watermark PDF, protect PDF, PDF security"
  },
  "crop-pdf": {
    title: "Crop PDF Pages Online",
    description: "Crop and resize PDF pages to custom dimensions precisely",
    tool: "crop" as const,
    keywords: "crop PDF, resize PDF pages, trim PDF, adjust PDF margins"
  },
  "view-pdf": {
    title: "View PDF Online",
    description: "Preview PDF documents with zoom and navigation tools",
    tool: "view" as const,
    keywords: "view PDF online, PDF viewer, preview PDF, open PDF browser"
  },
  "pdf-to-text": {
    title: "PDF to Text Converter Online",
    description: "Extract text content from PDF documents instantly and accurately",
    tool: "convert" as const,
    keywords: "PDF to text, extract text PDF, PDF text converter, get text from PDF"
  },
  "image-to-pdf": {
    title: "Image to PDF Converter Online",
    description: "Convert JPG, PNG images to PDF documents in high quality",
    tool: "convert" as const,
    keywords: "image to PDF, JPG to PDF, PNG to PDF, convert images PDF"
  },

  // Server-side tools (coming soon)
  "pdf-to-word": {
    title: "PDF to Word Converter - Coming Soon",
    description: "Convert PDF documents to editable Microsoft Word format",
    tool: "convert" as const,
    keywords: "PDF to Word, PDF to DOC, PDF to DOCX, convert PDF Word"
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter - Coming Soon",
    description: "Extract tables and data from PDF to Excel spreadsheets",
    tool: "convert" as const,
    keywords: "PDF to Excel, PDF to XLS, PDF to XLSX, extract PDF tables"
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Converter - Coming Soon",
    description: "Convert PDF pages to high-quality JPG image files",
    tool: "convert" as const,
    keywords: "PDF to JPG, PDF to JPEG, convert PDF images, PDF to pictures"
  },
  "pdf-to-png": {
    title: "PDF to PNG Converter - Coming Soon",
    description: "Convert PDF pages to PNG image format with transparency",
    tool: "convert" as const,
    keywords: "PDF to PNG, convert PDF PNG, PDF images transparent"
  },
  "word-to-pdf": {
    title: "Word to PDF Converter - Coming Soon",
    description: "Convert Microsoft Word documents to PDF format",
    tool: "convert" as const,
    keywords: "Word to PDF, DOC to PDF, DOCX to PDF, convert Word PDF"
  },
  "excel-to-pdf": {
    title: "Excel to PDF Converter - Coming Soon",
    description: "Convert Excel spreadsheets to PDF format perfectly",
    tool: "convert" as const,
    keywords: "Excel to PDF, XLS to PDF, XLSX to PDF, convert Excel PDF"
  },
  "html-to-pdf": {
    title: "HTML to PDF Converter - Coming Soon",
    description: "Convert web pages and HTML content to PDF format",
    tool: "convert" as const,
    keywords: "HTML to PDF, web page to PDF, convert HTML PDF, webpage PDF"
  },
  "protect-pdf": {
    title: "Password Protect PDF - Coming Soon",
    description: "Add password security and encryption to PDF documents", 
    tool: "protect" as const,
    keywords: "protect PDF, password PDF, encrypt PDF, secure PDF"
  },
  "unlock-pdf": {
    title: "Remove PDF Password - Coming Soon",
    description: "Remove password protection from encrypted PDF files", 
    tool: "unlock" as const,
    keywords: "unlock PDF, remove PDF password, decrypt PDF, PDF password remover"
  },
  "edit-pdf": {
    title: "Edit PDF Online - Coming Soon",
    description: "Add text, images, shapes, and annotations to PDF files",
    tool: "edit" as const,
    keywords: "edit PDF, PDF editor, add text PDF, annotate PDF"
  },

  // AI-powered tools
  "ocr-pdf": {
    title: "OCR PDF Scanner - Coming Soon",
    description: "Convert scanned PDFs to searchable and editable text with AI",
    tool: "convert" as const,
    keywords: "OCR PDF, scan PDF text, PDF OCR scanner, searchable PDF"
  },
  "translate-pdf": {
    title: "Translate PDF - Coming Soon",
    description: "Translate PDF documents to different languages using AI",
    tool: "convert" as const,
    keywords: "translate PDF, PDF translator, multilingual PDF, AI translation"
  },
  "summarize-pdf": {
    title: "AI PDF Summarizer - Coming Soon",
    description: "Generate intelligent summaries of PDF documents with AI",
    tool: "convert" as const,
    keywords: "PDF summary, AI summarizer, document summary, PDF digest"
  },
  "chat-pdf": {
    title: "Chat with PDF - Coming Soon",
    description: "Ask questions and get answers from your PDF documents using AI",
    tool: "convert" as const,
    keywords: "chat PDF, PDF AI assistant, ask PDF questions, interactive PDF"
  }
};

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const config = toolConfigs[toolId as keyof typeof toolConfigs];
  
  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Tool Not Found - PDF Master Pro</title>
          <meta name="description" content="The requested PDF tool could not be found. Browse our complete collection of PDF processing tools." />
        </Helmet>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested PDF tool could not be found.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isComingSoon = config.title.includes("Coming Soon");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{config.title} | PDF Master Pro</title>
        <meta name="description" content={config.description} />
        <meta name="keywords" content={config.keywords} />
        <link rel="canonical" href={`https://your-domain.com/tool/${toolId}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://your-domain.com/tool/${toolId}`} />
        <meta property="og:title" content={`${config.title} | PDF Master Pro`} />
        <meta property="og:description" content={config.description} />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://your-domain.com/tool/${toolId}`} />
        <meta property="twitter:title" content={`${config.title} | PDF Master Pro`} />
        <meta property="twitter:description" content={config.description} />
        <meta property="twitter:image" content="https://your-domain.com/og-image.jpg" />

        {/* Structured Data for WebApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": config.title,
            "description": config.description,
            "url": `https://your-domain.com/tool/${toolId}`,
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser",
            "isAccessibleForFree": true,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <Header />
      <main className="container mx-auto px-4 py-6 md:py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-muted/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{config.title}</h1>
            <p className="text-muted-foreground text-sm md:text-base">{config.description}</p>
          </div>
          
          <PDFProcessor
            tool={config.tool}
            toolId={toolId}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
