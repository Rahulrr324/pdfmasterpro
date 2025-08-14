
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Shield, Smartphone, ArrowRight, Star, Play } from "lucide-react";
import { BRAND_NAME } from "@/lib/brand";

export const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    // Placeholder for demo functionality
    console.log('Demo functionality would go here');
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" aria-hidden="true" />
            25+ Professional PDF Tools Available
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Future of Document Management is Here
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent block">
              {BRAND_NAME}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            {BRAND_NAME} offers a powerful and intuitive suite of tools to handle all your PDF needs. 
            Secure, fast, and entirely in your browser.
          </p>
          
          {/* Enhanced subtitle */}
          <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
            Fast, secure, and completely free. No registration required, no file size limits.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" aria-hidden="true" />
              <span>Trusted by 100K+ users</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full hidden sm:block" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
              <span>100% Secure & Private</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full hidden sm:block" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Lightning Fast Processing</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-primary/50"
              aria-label="Start processing PDF files"
            >
              <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
              Start Processing PDFs
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToTools}
              className="border-primary/20 hover:bg-primary/5 focus:ring-2 focus:ring-primary"
              aria-label="View all 25+ PDF tools"
            >
              View All 25+ Tools
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={handleWatchDemo}
              className="text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary"
              aria-label="Watch product demo"
            >
              <Play className="w-4 h-4 mr-2" aria-hidden="true" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 focus-within:ring-2 focus-within:ring-primary">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Process your PDFs instantly with our optimized algorithms and hybrid processing technology
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 focus-within:ring-2 focus-within:ring-primary">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Bank-Level Security</h3>
              <p className="text-muted-foreground text-sm">
                Your files are encrypted and processed locally. Zero data retention, automatic cleanup after processing
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 focus-within:ring-2 focus-within:ring-primary">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Works Everywhere</h3>
              <p className="text-muted-foreground text-sm">
                Perfect responsive design that works flawlessly on desktop, tablet, and mobile devices
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
