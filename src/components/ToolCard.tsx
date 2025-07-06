
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: "convert" | "edit" | "organize" | "security" | "ai";
  isNew?: boolean;
  isPremium?: boolean;
  onClick?: () => void;
}

const categoryColors = {
  convert: "bg-convert/10 text-convert border-convert/20",
  edit: "bg-edit/10 text-edit border-edit/20", 
  organize: "bg-organize/10 text-organize border-organize/20",
  security: "bg-security/10 text-security border-security/20",
  ai: "bg-ai/10 text-ai border-ai/20"
};

const categoryLabels = {
  convert: "Convert",
  edit: "Edit", 
  organize: "Organize",
  security: "Security",
  ai: "AI Powered"
};

const categoryDescriptions = {
  convert: "Transform PDFs to different formats",
  edit: "Modify and enhance PDF content", 
  organize: "Manage and structure PDF files",
  security: "Protect and secure PDF documents",
  ai: "AI-powered advanced PDF features"
};

export const ToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  category, 
  isNew, 
  isPremium,
  onClick 
}: ToolCardProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card 
          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2" 
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }}
          aria-label={`${title} - ${description}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryColors[category]}`}>
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex gap-2">
                {isNew && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    New
                  </Badge>
                )}
                {isPremium && (
                  <Badge variant="secondary" className="bg-ai/10 text-ai text-xs">
                    AI
                  </Badge>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {description}
            </p>

            <div className="flex items-center justify-between">
              <Badge variant="outline" className={categoryColors[category]}>
                {categoryLabels[category]}
              </Badge>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity focus:opacity-100"
                tabIndex={-1}
                aria-hidden="true"
              >
                Use Tool →
              </Button>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{categoryDescriptions[category]}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
</ToolCard>

<lov-write file_path="src/components/ToolsGrid.tsx">
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ToolCard } from "./ToolCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
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

// Lazy load components for performance
const LazyToolCard = lazy(() => import("./ToolCard").then(module => ({ default: module.ToolCard })));

const tools = [
  // Convert Tools - Priority load
  { id: "pdf-to-word", title: "PDF to Word", description: "Convert PDF documents to editable Word format with precise formatting", icon: FileText, category: "convert" as const, priority: true },
  { id: "pdf-to-excel", title: "PDF to Excel", description: "Extract tables and data to Excel spreadsheets automatically", icon: FileSpreadsheet, category: "convert" as const, priority: true },
  { id: "pdf-to-jpg", title: "PDF to JPG", description: "Convert PDF pages to high-quality images in various formats", icon: FileImage, category: "convert" as const, priority: true },
  { id: "word-to-pdf", title: "Word to PDF", description: "Convert Word documents to PDF format while preserving layout", icon: FileText, category: "convert" as const },
  { id: "excel-to-pdf", title: "Excel to PDF", description: "Convert spreadsheets to PDF documents with formatting", icon: FileSpreadsheet, category: "convert" as const },
  { id: "jpg-to-pdf", title: "JPG to PDF", description: "Combine multiple images into a single PDF document", icon: FileImage, category: "convert" as const },

  // Edit Tools - Priority load
  { id: "edit-pdf", title: "Edit PDF", description: "Add text, images, annotations, and modify existing PDF content", icon: PenTool, category: "edit" as const, priority: true },
  { id: "rotate-pdf", title: "Rotate PDF", description: "Rotate pages in your PDF documents to correct orientation", icon: RotateCcw, category: "edit" as const, priority: true },
  { id: "crop-pdf", title: "Crop PDF", description: "Crop and resize PDF pages to remove unwanted margins", icon: Crop, category: "edit" as const },
  { id: "watermark-pdf", title: "Add Watermark", description: "Add text or image watermarks to protect your PDFs", icon: Eye, category: "edit" as const },

  // Organize Tools - Priority load
  { id: "merge-pdf", title: "Merge PDF", description: "Combine multiple PDF files into one document seamlessly", icon: Merge, category: "organize" as const, priority: true },
  { id: "split-pdf", title: "Split PDF", description: "Extract pages or split PDF into multiple separate files", icon: Scissors, category: "organize" as const, priority: true },
  { id: "compress-pdf", title: "Compress PDF", description: "Reduce PDF file size while maintaining visual quality", icon: Archive, category: "organize" as const, priority: true },
  { id: "extract-pages", title: "Extract Pages", description: "Extract specific pages from PDF documents as new files", icon: Download, category: "organize" as const },
  { id: "delete-pages", title: "Delete Pages", description: "Remove unwanted pages from PDF documents", icon: AlertTriangle, category: "organize" as const },

  // Security Tools - Priority load
  { id: "protect-pdf", title: "Protect PDF", description: "Add password protection and encryption to secure PDFs", icon: Lock, category: "security" as const, priority: true },
  { id: "unlock-pdf", title: "Unlock PDF", description: "Remove password protection from encrypted PDF files", icon: Unlock, category: "security" as const },
  { id: "sign-pdf", title: "Sign PDF", description: "Add digital signatures and certificates to documents", icon: PenTool, category: "security" as const },
  { id: "virus-scan", title: "Virus Scanner", description: "Scan PDF files for malware and security threats", icon: Shield, category: "security" as const, isNew: true },

  // AI-Powered Tools - Lazy load
  { id: "ai-metadata", title: "AI Metadata Enhancement", description: "Automatically generate metadata, tags, and document properties", icon: Bot, category: "ai" as const, isPremium: true, isNew: true },
  { id: "pdf-expiry", title: "PDF Expiration System", description: "Set automatic expiration dates and access controls for PDFs", icon: Clock, category: "ai" as const, isPremium: true, isNew: true },
  { id: "plagiarism-scanner", title: "Plagiarism Scanner", description: "Check document originality using advanced AI algorithms", icon: ScanLine, category: "ai" as const, isPremium: true, isNew: true },
  { id: "pdf-repair", title: "PDF Repair Toolkit", description: "Fix corrupted, damaged, or unreadable PDF files automatically", icon: Wrench, category: "ai" as const, isPremium: true, isNew: true },
  { id: "accessible-pdf", title: "Accessible PDF Generator", description: "Create ADA-compliant accessible PDFs with proper structure", icon: Accessibility, category: "ai" as const, isPremium: true, isNew: true },
  { id: "smart-ocr", title: "Smart OCR", description: "Extract text from scanned documents with AI-powered recognition", icon: Sparkles, category: "ai" as const, isPremium: true },
  { id: "content-analysis", title: "Content Analysis", description: "AI-powered document analysis, insights, and recommendations", icon: Zap, category: "ai" as const, isPremium: true }
];

const ToolCardSkeleton = () => (
  <div className="space-y-3 p-6">
    <div className="flex items-start justify-between">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-12" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-8 w-24" />
    </div>
  </div>
);

export const ToolsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Separate priority and lazy-loaded tools
  const priorityTools = filteredTools.filter(tool => tool.priority);
  const lazyTools = filteredTools.filter(tool => !tool.priority);

  const handleToolClick = (toolId: string) => {
    const workingTools = [
      "merge-pdf", "split-pdf", "protect-pdf", "compress-pdf", 
      "rotate-pdf", "watermark-pdf", "extract-pages", "crop-pdf",
      "pdf-to-word", "pdf-to-excel", "pdf-to-jpg", "edit-pdf"
    ];
    
    if (workingTools.includes(toolId)) {
      navigate(`/tool/${toolId}`);
    } else {
      toast({
        title: "Coming Soon!",
        description: "This advanced tool is under development. Try our other working tools!",
      });
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
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="PDF tool categories">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="tab"
              aria-selected={selectedCategory === category.id}
              aria-controls={`tools-${category.id}`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          id={`tools-${selectedCategory}`}
          role="tabpanel"
        >
          {/* Priority Tools - Load immediately */}
          {priorityTools.map((tool) => (
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
          
          {/* Lazy-loaded Tools */}
          {lazyTools.map((tool) => (
            <Suspense key={tool.id} fallback={<ToolCardSkeleton />}>
              <LazyToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                category={tool.category}
                isNew={tool.isNew}
                isPremium={tool.isPremium}
                onClick={() => handleToolClick(tool.id)}
              />
            </Suspense>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-muted-foreground">PDF Tools</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-organize mb-2">50MB</div>
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
