
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  SplitPDFIcon, 
  RotatePDFIcon, 
  CropPDFIcon, 
  ExtractPDFIcon,
  WatermarkPDFIcon,
  ViewPDFIcon,
  PasswordIcon,
  UnlockIcon,
  EditPDFIcon
} from "./icons/professional-tool-icons";

const additionalTools = [
  {
    id: "split-pdf",
    title: "Split PDF",
    icon: SplitPDFIcon,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100"
  },
  {
    id: "rotate-pdf", 
    title: "Rotate PDF",
    icon: RotatePDFIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100"
  },
  {
    id: "crop-pdf",
    title: "Crop PDF", 
    icon: CropPDFIcon,
    color: "text-teal-600",
    bgColor: "bg-teal-50 hover:bg-teal-100"
  },
  {
    id: "extract-pages",
    title: "Extract Pages",
    icon: ExtractPDFIcon,
    color: "text-pink-600", 
    bgColor: "bg-pink-50 hover:bg-pink-100"
  },
  {
    id: "watermark-pdf",
    title: "Add Watermark",
    icon: WatermarkPDFIcon,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 hover:bg-indigo-100"
  },
  {
    id: "view-pdf",
    title: "View PDF",
    icon: ViewPDFIcon,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 hover:bg-cyan-100"
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    icon: PasswordIcon,
    color: "text-red-600",
    bgColor: "bg-red-50 hover:bg-red-100"
  },
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    icon: UnlockIcon,
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100"
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    icon: EditPDFIcon,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 hover:bg-yellow-100"
  }
];

export const AdditionalTools = () => {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">More PDF Tools</h2>
          <p className="text-gray-600">Additional tools for all your PDF needs</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {additionalTools.map((tool) => (
            <Card 
              key={tool.id}
              className={`${tool.bgColor} border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
              onClick={() => handleToolClick(tool.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {tool.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
