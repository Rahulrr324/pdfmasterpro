
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
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30"
    },
    {
      icon: Shield,
      title: "Bank-Level Security", 
      description: "End-to-end encryption, virus scanning, and automatic file deletion after 2 hours.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30"
    },
    {
      icon: CloudOff,
      title: "Privacy First",
      description: "Many tools work entirely in your browser - your files never leave your device.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect responsive design that works flawlessly on any device or screen size.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
    },
    {
      icon: FileCheck,
      title: "No File Limits",
      description: "Process unlimited files up to 10MB each. No registration or payment required.",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30"
    },
    {
      icon: Cpu,
      title: "AI-Powered Tools",
      description: "Unique AI features like metadata enhancement, plagiarism detection, and PDF repair.",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30"
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Built for search engines with structured data and optimized performance.",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30"
    },
    {
      icon: Lock,
      title: "No Registration",
      description: "Start using all tools immediately. No sign-up, no personal information required.",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 dark:from-orange-900/30 dark:to-red-900/30 dark:text-orange-300">
            Why Choose PdfMaster Pro
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
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Specs */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg p-8 border border-orange-100 dark:border-orange-900/30">
          <h3 className="text-xl font-semibold text-center mb-8">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">10MB</div>
              <div className="text-sm text-muted-foreground">Maximum file size</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">2 Hours</div>
              <div className="text-sm text-muted-foreground">Auto-deletion time</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">256-bit</div>
              <div className="text-sm text-muted-foreground">Encryption strength</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
