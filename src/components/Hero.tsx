
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

export const Hero = () => {
  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent leading-tight">
              Professional PDF Tools
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Transform, edit, and organize your PDFs with advanced tools. 
              <span className="text-purple-600 font-medium"> Convert, merge, split, and secure</span> - all in one place.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToTools}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg group"
            >
              Start Processing
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              View All Tools
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Zap className="h-6 w-6 text-purple-500" />
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Shield className="h-6 w-6 text-blue-500" />
              <span className="font-medium">100% Secure</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-600">
              <Clock className="h-6 w-6 text-pink-500" />
              <span className="font-medium">No Registration Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
