
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const categoryInfo = {
  "convert": {
    title: "Convert PDF Tools",
    description: "Transform PDFs to different formats and vice versa with high-quality results"
  },
  "edit": {
    title: "Edit PDF Tools",
    description: "Modify and enhance your PDF documents with advanced editing features"
  },
  "organize": {
    title: "Organize PDF Tools", 
    description: "Manage and structure your PDF files efficiently with merge, split, and extract tools"
  },
  "security": {
    title: "Security PDF Tools",
    description: "Protect and secure your PDF documents with password encryption and permissions"
  },
  "optimize": {
    title: "Optimize PDF Tools",
    description: "Reduce file size and improve PDF performance while maintaining quality"
  },
  "ai": {
    title: "AI-Powered PDF Tools",
    description: "Advanced AI-powered features for OCR, translation, summarization, and document intelligence"
  }
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const category = categoryInfo[categoryId as keyof typeof categoryInfo];
  
  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested category could not be found.</p>
          <Button onClick={() => navigate("/categories")}>Back to Categories</Button>
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
          onClick={() => navigate("/categories")}
          className="mb-6 hover:bg-muted/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {category.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
        
        <ToolsGrid
          filter={categoryId as any}
          showTitle={false}
        />
      </main>
      <Footer />
    </div>
  );
}
