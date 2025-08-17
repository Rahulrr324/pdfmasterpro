
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Shield, Smartphone, ArrowRight, Star } from "lucide-react";

export const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
            20+ Professional PDF Tools Available
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Professional PDF Tools
            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            PDFMaster Pro offers a powerful and intuitive suite of tools to handle all your PDF needs. 
            Secure, fast, and entirely in your browser.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" aria-hidden="true" />
              <span>Trusted by 100K+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>100% Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Lightning Fast Processing</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-orange-500/50 px-8 py-4 text-lg"
              aria-label="Start processing PDF files"
            >
              <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
              Start Processing PDFs
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Process your PDFs instantly with optimized algorithms
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Bank-Level Security</h3>
              <p className="text-muted-foreground text-sm">
                Your files are encrypted and processed locally
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Works Everywhere</h3>
              <p className="text-muted-foreground text-sm">
                Perfect on desktop, tablet, and mobile devices
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
