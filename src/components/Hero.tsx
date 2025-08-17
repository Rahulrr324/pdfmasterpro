
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, ArrowRight, Shield, Clock } from "lucide-react";

export const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 animate-fade-in">
            <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
            25+ Professional PDF Tools - Completely Free
          </Badge>

          {/* Main Heading - Optimized for SEO */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight animate-fade-in">
            Professional PDF Tools
            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
              Made Simple & Fast
            </span>
          </h1>

          {/* Subtitle - Enhanced for conversions */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto animate-fade-in">
            Transform, edit, organize, and secure your PDF documents instantly. No registration required, 
            completely free, and lightning fast processing.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 animate-fade-in">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-600" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-orange-600" />
              <span>No Registration</span>
            </div>
          </div>

          {/* CTA Button - Optimized for conversions */}
          <div className="flex justify-center mb-6">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-orange-500/50 px-8 py-3 text-lg animate-scale-in"
              aria-label="Start processing PDF files for free"
            >
              <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
              Start Processing PDFs
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Trusted by 100,000+ users worldwide • Process files up to 100MB
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
