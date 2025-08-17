
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  Edit3, 
  Layers, 
  Shield, 
  Zap,
  Archive
} from "lucide-react";

const categories = [
  {
    id: "convert",
    title: "Convert Tools",
    description: "Transform PDFs to different formats and vice versa",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-300 dark:border-blue-800",
    toolCount: 8
  },
  {
    id: "edit",
    title: "Edit Tools", 
    description: "Modify and enhance your PDF documents",
    icon: Edit3,
    color: "bg-green-500/10 text-green-700 border-green-200 dark:text-green-300 dark:border-green-800",
    toolCount: 5
  },
  {
    id: "organize",
    title: "Organize Tools",
    description: "Manage and structure your PDF files efficiently",
    icon: Layers,
    color: "bg-purple-500/10 text-purple-700 border-purple-200 dark:text-purple-300 dark:border-purple-800",
    toolCount: 3
  },
  {
    id: "security",
    title: "Security Tools",
    description: "Protect and secure your PDF documents",
    icon: Shield,
    color: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-300 dark:border-red-800",
    toolCount: 2
  },
  {
    id: "optimize",
    title: "Optimize Tools",
    description: "Reduce file size and improve PDF performance",
    icon: Archive,
    color: "bg-teal-500/10 text-teal-700 border-teal-200 dark:text-teal-300 dark:border-teal-800",
    toolCount: 1
  },
  {
    id: "ai",
    title: "AI-Powered Tools",
    description: "Advanced AI-powered features for your PDFs",
    icon: Zap,
    color: "bg-orange-500/10 text-orange-700 border-orange-200 dark:text-orange-300 dark:border-orange-800",
    toolCount: 1
  }
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">PDF Tool Categories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive collection of PDF tools organized by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2" 
              onClick={() => handleCategoryClick(category.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className={category.color}>
                    {category.toolCount} tools
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
