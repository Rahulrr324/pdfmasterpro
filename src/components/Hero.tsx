import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Shield, Smartphone } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-secondary opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-primary-light text-primary">
            <Zap className="w-3 h-3 mr-1" />
            25+ PDF Tools Available
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Professional PDF Tools for
            <span className="bg-gradient-to-r from-primary to-edit bg-clip-text text-transparent">
              {" "}Every Need
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Convert, edit, organize, and secure your PDF documents with our comprehensive suite of online tools. 
            Fast, secure, and completely free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary-hover">
              <FileText className="w-5 h-5 mr-2" />
              Start Processing PDFs
            </Button>
            <Button variant="outline" size="lg">
              View All Tools
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Process your PDFs instantly with our optimized algorithms
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Secure</h3>
              <p className="text-muted-foreground text-sm">
                Your files are encrypted and automatically deleted after processing
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-edit/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-edit" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Mobile Friendly</h3>
              <p className="text-muted-foreground text-sm">
                Works perfectly on all devices - desktop, tablet, and mobile
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};