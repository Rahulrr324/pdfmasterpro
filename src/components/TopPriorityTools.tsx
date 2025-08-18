
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MergePDFIcon, CompressPDFIcon } from "./icons/professional-tool-icons";

const topTools = [
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one",
    icon: MergePDFIcon,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100"
  },
  {
    id: "compress-pdf", 
    title: "Compress PDF",
    description: "Reduce PDF file size",
    icon: CompressPDFIcon,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 hover:bg-green-100"
  }
];

export const TopPriorityTools = () => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Most Popular Tools</h2>
          <p className="text-gray-600">Quick access to our most-used PDF tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {topTools.map((tool) => (
            <Card 
              key={tool.id}
              className={`${tool.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
              onClick={() => handleToolClick(tool.id)}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <Button 
                  className={`bg-gradient-to-r ${tool.color} hover:shadow-lg transition-all transform group-hover:scale-105`}
                >
                  Use Tool
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
