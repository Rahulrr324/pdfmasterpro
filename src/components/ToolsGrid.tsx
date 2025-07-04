import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToolCard } from "./ToolCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Scissors, 
  Merge, 
  Archive, 
  FileImage, 
  FileSpreadsheet,
  Lock,
  Unlock,
  RotateCcw,
  Crop,
  PenTool,
  Search,
  Wand2,
  Shield,
  Eye,
  Download,
  Upload,
  Zap,
  Bot,
  Sparkles,
  ScanLine,
  AlertTriangle,
  Wrench,
  Accessibility,
  Clock,
  Hash
} from "lucide-react";

const tools = [
  // Convert Tools
  { id: "pdf-to-word", title: "PDF to Word", description: "Convert PDF documents to editable Word format", icon: FileText, category: "convert" as const },
  { id: "pdf-to-excel", title: "PDF to Excel", description: "Extract tables and data to Excel spreadsheets", icon: FileSpreadsheet, category: "convert" as const },
  { id: "pdf-to-jpg", title: "PDF to JPG", description: "Convert PDF pages to high-quality images", icon: FileImage, category: "convert" as const },
  { id: "word-to-pdf", title: "Word to PDF", description: "Convert Word documents to PDF format", icon: FileText, category: "convert" as const },
  { id: "excel-to-pdf", title: "Excel to PDF", description: "Convert spreadsheets to PDF documents", icon: FileSpreadsheet, category: "convert" as const },
  { id: "jpg-to-pdf", title: "JPG to PDF", description: "Combine images into a single PDF", icon: FileImage, category: "convert" as const },

  // Edit Tools
  { id: "edit-pdf", title: "Edit PDF", description: "Add text, images, and annotations to PDFs", icon: PenTool, category: "edit" as const },
  { id: "rotate-pdf", title: "Rotate PDF", description: "Rotate pages in your PDF documents", icon: RotateCcw, category: "edit" as const },
  { id: "crop-pdf", title: "Crop PDF", description: "Crop and resize PDF pages", icon: Crop, category: "edit" as const },
  { id: "watermark-pdf", title: "Add Watermark", description: "Add text or image watermarks to PDFs", icon: Eye, category: "edit" as const },

  // Organize Tools
  { id: "merge-pdf", title: "Merge PDF", description: "Combine multiple PDFs into one document", icon: Merge, category: "organize" as const },
  { id: "split-pdf", title: "Split PDF", description: "Extract pages or split PDF into multiple files", icon: Scissors, category: "organize" as const },
  { id: "compress-pdf", title: "Compress PDF", description: "Reduce PDF file size without quality loss", icon: Archive, category: "organize" as const },
  { id: "extract-pages", title: "Extract Pages", description: "Extract specific pages from PDF documents", icon: Download, category: "organize" as const },
  { id: "delete-pages", title: "Delete Pages", description: "Remove unwanted pages from PDFs", icon: AlertTriangle, category: "organize" as const },

  // Security Tools
  { id: "protect-pdf", title: "Protect PDF", description: "Add password protection to your PDFs", icon: Lock, category: "security" as const },
  { id: "unlock-pdf", title: "Unlock PDF", description: "Remove password protection from PDFs", icon: Unlock, category: "security" as const },
  { id: "sign-pdf", title: "Sign PDF", description: "Add digital signatures to documents", icon: PenTool, category: "security" as const },
  { id: "virus-scan", title: "Virus Scanner", description: "Scan PDFs for malware and threats", icon: Shield, category: "security" as const, isNew: true },

  // AI-Powered Tools
  { id: "ai-metadata", title: "AI Metadata Enhancement", description: "Automatically generate metadata and tags", icon: Bot, category: "ai" as const, isPremium: true, isNew: true },
  { id: "pdf-expiry", title: "PDF Expiration System", description: "Set automatic expiration dates for PDFs", icon: Clock, category: "ai" as const, isPremium: true, isNew: true },
  { id: "plagiarism-scanner", title: "Plagiarism Scanner", description: "Check document originality with AI", icon: ScanLine, category: "ai" as const, isPremium: true, isNew: true },
  { id: "pdf-repair", title: "PDF Repair Toolkit", description: "Fix corrupted or damaged PDF files", icon: Wrench, category: "ai" as const, isPremium: true, isNew: true },
  { id: "accessible-pdf", title: "Accessible PDF Generator", description: "Create ADA-compliant accessible PDFs", icon: Accessibility, category: "ai" as const, isPremium: true, isNew: true },
  { id: "smart-ocr", title: "Smart OCR", description: "Extract text from scanned documents", icon: Sparkles, category: "ai" as const, isPremium: true },
  { id: "content-analysis", title: "Content Analysis", description: "AI-powered document analysis and insights", icon: Zap, category: "ai" as const, isPremium: true }
];

export const ToolsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  const categories = [
    { id: "all", label: "All Tools", count: tools.length },
    { id: "convert", label: "Convert", count: tools.filter(t => t.category === "convert").length },
    { id: "edit", label: "Edit", count: tools.filter(t => t.category === "edit").length },
    { id: "organize", label: "Organize", count: tools.filter(t => t.category === "organize").length },
    { id: "security", label: "Security", count: tools.filter(t => t.category === "security").length },
    { id: "ai", label: "AI Tools", count: tools.filter(t => t.category === "ai").length }
  ];

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (toolId: string) => {
    const workingTools = ["merge-pdf", "split-pdf", "protect-pdf", "compress-pdf"];
    if (workingTools.includes(toolId)) {
      navigate(`/tool/${toolId}`);
    } else {
      // Show coming soon for other tools
      alert("This tool is coming soon! Try our working tools: Merge PDF, Split PDF, Protect PDF, or Compress PDF.");
    }
  };

  return (
    <section id="tools" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete PDF Toolkit
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our comprehensive collection of PDF tools, including unique AI-powered features 
            you won't find anywhere else.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              isNew={tool.isNew}
              isPremium={tool.isPremium}
              onClick={() => handleToolClick(tool.id)}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground">PDF Tools</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-organize mb-2">10MB</div>
            <div className="text-muted-foreground">Max File Size</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-security mb-2">100%</div>
            <div className="text-muted-foreground">Secure</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-ai mb-2">Free</div>
            <div className="text-muted-foreground">No Limits</div>
          </div>
        </div>
      </div>
    </section>
  );
};