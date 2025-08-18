
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, ArrowRight, Shield, Clock, Star, Users, Award, CheckCircle } from "lucide-react";

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
    <section className="relative py-12 lg:py-20 overflow-hidden">
      {/* Enhanced Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm">
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">2M+ Users Trust Us</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Award className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">4.8★ Rating</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">100% Secure</span>
            </div>
          </div>

          {/* Premium Badge */}
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 animate-fade-in text-base px-6 py-2">
            <Star className="w-4 h-4 mr-2" />
            30+ Professional PDF Tools - Always Free
          </Badge>

          {/* Main Heading - Enhanced for SEO */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Professional PDF Tools
            <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text mt-2">
              Made Simple & Powerful
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto animate-fade-in leading-relaxed font-medium">
            Transform, convert, merge, split, and secure your PDF documents with our comprehensive suite of 
            <span className="text-primary font-semibold"> free online tools</span>. 
            No registration required, lightning-fast processing.
          </p>

          {/* Feature Highlights - Enhanced */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-gray-100">100% Secure</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Your files stay private</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-gray-100">Instant Processing</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Results in seconds</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-gray-100">No Registration</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Start immediately</div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="space-y-6">
            <Button 
              size="lg" 
              onClick={scrollToTools} 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-blue-500/50 px-10 py-6 text-xl font-semibold animate-scale-in rounded-xl" 
              aria-label="Access free PDF processing tools"
            >
              <FileText className="w-6 h-6 mr-3" />
              Start Processing PDFs Free
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            
            {/* Additional benefits */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                No file size limits
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                All formats supported
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Works on all devices
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
