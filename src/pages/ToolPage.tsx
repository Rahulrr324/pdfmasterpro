
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { PDFProcessor } from "@/components/pdf/PDFProcessor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const toolConfigs = {
  "merge-pdf": {
    title: "Merge PDF Files",
    description: "Combine multiple PDF documents into a single file",
    tool: "merge" as const
  },
  "split-pdf": {
    title: "Split PDF",
    description: "Extract pages or split PDF into multiple files", 
    tool: "split" as const
  },
  "rotate-pdf": {
    title: "Rotate PDF",
    description: "Rotate pages in your PDF documents",
    tool: "rotate" as const
  },
  "compress-pdf": {
    title: "Compress PDF", 
    description: "Reduce PDF file size while maintaining quality",
    tool: "compress" as const
  },
  "extract-pages": {
    title: "Extract Pages",
    description: "Extract specific pages from PDF documents",
    tool: "extract" as const
  },
  "protect-pdf": {
    title: "Protect PDF",
    description: "Add password protection to your PDF documents",
    tool: "protect" as const
  },
  "unlock-pdf": {
    title: "Unlock PDF",
    description: "Remove password protection from PDF documents",
    tool: "unlock" as const
  },
  "watermark-pdf": {
    title: "Add Watermark",
    description: "Add text or image watermarks to PDFs",
    tool: "watermark" as const
  },
  "crop-pdf": {
    title: "Crop PDF",
    description: "Crop and resize PDF pages",
    tool: "crop" as const
  },
  "edit-pdf": {
    title: "Edit PDF",
    description: "Add text, images, and annotations to PDFs",
    tool: "edit" as const
  },
  "view-pdf": {
    title: "View PDF",
    description: "Preview PDF documents with zoom and navigation",
    tool: "view" as const
  },
  "pdf-to-word": {
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word format",
    tool: "convert" as const
  },
  "pdf-to-excel": {
    title: "PDF to Excel",
    description: "Extract tables and data to Excel spreadsheets",
    tool: "convert" as const
  },
  "pdf-to-jpg": {
    title: "PDF to JPG",
    description: "Convert PDF pages to high-quality images",
    tool: "convert" as const
  },
  "pdf-to-png": {
    title: "PDF to PNG",
    description: "Convert PDF pages to PNG image format",
    tool: "convert" as const
  },
  "pdf-to-text": {
    title: "PDF to Text",
    description: "Extract text content from PDF documents",
    tool: "convert" as const
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    tool: "convert" as const
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    tool: "convert" as const
  },
  "image-to-pdf": {
    title: "Image to PDF",
    description: "Convert JPG, PNG images to PDF documents",
    tool: "convert" as const
  },
  "html-to-pdf": {
    title: "HTML to PDF",
    description: "Convert web pages and HTML to PDF",
    tool: "convert" as const
  }
};

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const config = toolConfigs[toolId as keyof typeof toolConfigs];
  
  if (!config) {
    return (
      <div className="min-h-screen bg-background">
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

  return (
    <div className="min-h-screen bg-background">
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
