
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, ArrowRight } from "lucide-react";

export const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
            20+ Professional PDF Tools
          </Badge>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Professional PDF Tools
            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Transform, edit, organize, and secure your PDF documents with our comprehensive toolkit.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-8">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-orange-500/50 px-6 py-3"
              aria-label="Start processing PDF files"
            >
              <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
