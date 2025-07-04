import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Shield, 
  Zap, 
  CloudOff, 
  FileCheck, 
  Cpu,
  Globe,
  Lock
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Hybrid client-side and server-side processing for optimal speed and performance.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Bank-Level Security", 
      description: "End-to-end encryption, virus scanning, and automatic file deletion after 2 hours.",
      color: "text-security"
    },
    {
      icon: CloudOff,
      title: "Privacy First",
      description: "Many tools work entirely in your browser - your files never leave your device.",
      color: "text-organize"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect responsive design that works flawlessly on any device or screen size.",
      color: "text-edit"
    },
    {
      icon: FileCheck,
      title: "No File Limits",
      description: "Process unlimited files up to 10MB each. No registration or payment required.",
      color: "text-ai"
    },
    {
      icon: Cpu,
      title: "AI-Powered Tools",
      description: "Unique AI features like metadata enhancement, plagiarism detection, and PDF repair.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Built for search engines with structured data and optimized performance.",
      color: "text-security"
    },
    {
      icon: Lock,
      title: "No Registration",
      description: "Start using all tools immediately. No sign-up, no personal information required.",
      color: "text-organize"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary-light text-primary">
            Why Choose PDFTools Pro
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Modern PDF Processing
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly design to deliver 
            the best PDF processing experience on the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Specs */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-center mb-8">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-2">10MB</div>
              <div className="text-sm text-muted-foreground">Maximum file size</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-organize mb-2">2 Hours</div>
              <div className="text-sm text-muted-foreground">Auto-deletion time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-security mb-2">256-bit</div>
              <div className="text-sm text-muted-foreground">Encryption strength</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};