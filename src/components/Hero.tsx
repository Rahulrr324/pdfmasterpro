
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, ArrowRight, Shield, Clock, Star } from "lucide-react";

export const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-8 lg:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-teal-950/20" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Premium Badge */}
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 animate-fade-in">
            <Star className="w-3 h-3 mr-1" aria-hidden="true" />
            25+ Professional PDF Tools - Always Free
          </Badge>

          {/* Main Heading - SEO Optimized */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight animate-fade-in">
            Professional PDF Tools
            <span className="block text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 bg-clip-text">
              Made Simple & Powerful
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Transform, edit, merge, split, compress, and secure your PDF documents with our comprehensive suite of professional tools. No registration required, completely free, and lightning-fast processing.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Shield className="w-4 h-4 text-green-600" aria-hidden="true" />
              <span>100% Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Zap className="w-4 h-4 text-purple-600" aria-hidden="true" />
              <span>No Registration</span>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={scrollToTools} 
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 hover:from-purple-700 hover:via-blue-700 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-purple-500/50 px-8 py-4 text-lg font-semibold animate-scale-in" 
              aria-label="Access free PDF processing tools"
            >
              <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
              Start Processing PDFs Free
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
