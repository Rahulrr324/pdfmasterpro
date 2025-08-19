
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, Shield, Globe, Smartphone, 
  Cloud, Users, Award, HeartHandshake 
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Advanced algorithms ensure rapid PDF processing without compromising quality",
      badge: "Performance"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your files are processed securely and automatically deleted after processing",
      badge: "Security"
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Access from any device, any browser, anywhere in the world",
      badge: "Accessibility"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Full functionality on smartphones and tablets with responsive design",
      badge: "Mobile"
    },
    {
      icon: Cloud,
      title: "No Software Installation",
      description: "Everything runs in your browser - no downloads or installations required",
      badge: "Convenience"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share processed files instantly with team members and clients",
      badge: "Collaboration"
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Industry-standard processing ensures professional-grade results every time",
      badge: "Quality"
    },
    {
      icon: HeartHandshake,
      title: "Free & Premium Options",
      description: "Essential tools free forever, advanced features with premium account",
      badge: "Value"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ArcPDF?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the perfect combination of power, security, and simplicity in PDF processing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="outline" className="text-xs font-medium">
                  {feature.badge}
                </Badge>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
