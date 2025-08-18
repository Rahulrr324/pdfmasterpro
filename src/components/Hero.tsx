
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowDown, Shield, Zap, Users } from "lucide-react";

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
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 text-center">
        {/* Trust badge */}
        <Badge variant="secondary" className="mb-4 bg-white/80 backdrop-blur-sm text-blue-700 border-blue-200">
          <Shield className="w-3 h-3 mr-1" />
          Trusted by 10M+ users worldwide
        </Badge>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Every PDF tool you'll
          <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text">
            ever need
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Convert, edit, and manage PDF files with our complete set of professional tools
        </p>

        {/* CTA Button */}
        <Button 
          size="lg" 
          onClick={scrollToTools} 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-8 py-3 rounded-full mb-8"
        >
          <FileText className="w-5 h-5 mr-2" />
          Start Using Tools
          <ArrowDown className="w-4 h-4 ml-2" />
        </Button>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
    </section>
  );
};
