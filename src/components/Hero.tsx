
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Shield, Zap, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

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
    <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50">
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Every PDF tool you'll
            <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text">
              ever need
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Convert, edit, and e-sign PDF files with our complete set of PDF tools
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Button 
              size="lg" 
              onClick={scrollToTools} 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-full"
            >
              <FileText className="w-5 h-5 mr-2" />
              Choose PDF Tool
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>No Registration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
