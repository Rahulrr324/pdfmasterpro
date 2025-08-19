
import { useNavigate } from "react-router-dom";
import { ProfessionalToolCard } from "@/components/ProfessionalToolCard";
import {
  FileText, Download, Upload, Merge, Scissors, 
  Minimize, RotateCw, Shield, Unlock, Eye,
  Image, FileImage, FileSpreadsheet, 
  Crop, Edit, Droplet, MessageSquare, Search
} from "lucide-react";

export const ToolsGrid = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document with custom page ordering",
      icon: Merge,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
      href: "/tool/merge-pdf"
    },
    {
      title: "Split PDF", 
      description: "Extract specific pages or split PDF into multiple smaller documents",
      icon: Scissors,
      gradient: "bg-gradient-to-br from-green-500 to-green-700",
      href: "/tool/split-pdf"
    },
    {
      title: "Compress PDF",
      description: "Reduce file size while maintaining quality for easier sharing and storage",
      icon: Minimize,
      gradient: "bg-gradient-to-br from-orange-500 to-orange-700", 
      href: "/tool/compress-pdf"
    },
    {
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word format with preserved formatting",
      icon: FileText,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
      href: "/tool/pdf-to-word"
    },
    {
      title: "PDF to Excel",
      description: "Extract tables and data from PDF to Excel spreadsheets accurately",
      icon: FileSpreadsheet,
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
      href: "/tool/pdf-to-excel"
    },
    {
      title: "PDF to JPG",
      description: "Convert PDF pages to high-quality JPG images with custom resolution",
      icon: FileImage,
      gradient: "bg-gradient-to-br from-pink-500 to-pink-700",
      href: "/tool/pdf-to-jpg"
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents to professional PDF format with layout preservation",
      icon: Upload,
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      href: "/tool/word-to-pdf"
    },
    {
      title: "Image to PDF",
      description: "Create PDF documents from images with custom page layouts and compression",
      icon: Image,
      gradient: "bg-gradient-to-br from-cyan-500 to-cyan-700",
      href: "/tool/image-to-pdf"
    },
    {
      title: "Rotate PDF",
      description: "Rotate PDF pages to correct orientation with batch processing support",
      icon: RotateCw,
      gradient: "bg-gradient-to-br from-yellow-500 to-yellow-700",
      href: "/tool/rotate-pdf"
    },
    {
      title: "Protect PDF",
      description: "Add password protection and security settings to your PDF documents",
      icon: Shield,
      gradient: "bg-gradient-to-br from-red-500 to-red-700",
      href: "/tool/protect-pdf"
    },
    {
      title: "Unlock PDF",
      description: "Remove password protection from PDF documents when authorized",
      icon: Unlock,
      gradient: "bg-gradient-to-br from-teal-500 to-teal-700",
      href: "/tool/unlock-pdf"
    },
    {
      title: "Edit PDF",
      description: "Add text, images, and annotations to existing PDF documents",
      icon: Edit,
      gradient: "bg-gradient-to-br from-violet-500 to-violet-700",
      href: "/tool/edit-pdf"
    },
  ];

  const handleToolClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Professional PDF Tools
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from our comprehensive suite of PDF tools designed for professionals and individuals alike
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ProfessionalToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            gradient={tool.gradient}
            href={tool.href}
            onClick={() => handleToolClick(tool.href)}
          />
        ))}
      </div>
    </div>
  );
};
