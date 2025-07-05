
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type ProcessingTool = "merge" | "split" | "compress" | "protect" | "convert" | "rotate" | "crop" | "extract" | "watermark";

interface PDFToolOptionsProps {
  tool: ProcessingTool;
  options: Record<string, any>;
  onOptionsChange: (options: Record<string, any>) => void;
}

export const PDFToolOptions = ({ tool, options, onOptionsChange }: PDFToolOptionsProps) => {
  const updateOption = (key: string, value: any) => {
    onOptionsChange({ ...options, [key]: value });
  };

  switch (tool) {
    case "protect":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={options.password || ""}
              onChange={(e) => updateOption("password", e.target.value)}
              placeholder="Enter password for PDF protection"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="restrict-printing"
              checked={options.restrictPrinting || false}
              onCheckedChange={(checked) => updateOption("restrictPrinting", checked)}
            />
            <Label htmlFor="restrict-printing">Restrict Printing</Label>
          </div>
        </div>
      );

    case "compress":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Compression Level</Label>
            <Select value={options.level || "medium"} onValueChange={(value) => updateOption("level", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select compression level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Better Quality)</SelectItem>
                <SelectItem value="medium">Medium (Balanced)</SelectItem>
                <SelectItem value="high">High (Smaller Size)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case "split":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Split Mode</Label>
            <Select value={options.mode || "pages"} onValueChange={(value) => updateOption("mode", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select split mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pages">Split by Pages</SelectItem>
                <SelectItem value="range">Page Range</SelectItem>
                <SelectItem value="size">File Size</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {options.mode === "range" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-page">Start Page</Label>
                <Input
                  id="start-page"
                  type="number"
                  min="1"
                  value={options.startPage || 1}
                  onChange={(e) => updateOption("startPage", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-page">End Page</Label>
                <Input
                  id="end-page"
                  type="number"
                  min="1"
                  value={options.endPage || 1}
                  onChange={(e) => updateOption("endPage", parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>
      );

    case "rotate":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Rotation Angle</Label>
            <Select value={options.angle?.toString() || "90"} onValueChange={(value) => updateOption("angle", parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select rotation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90">90° Clockwise</SelectItem>
                <SelectItem value="180">180°</SelectItem>
                <SelectItem value="270">270° Clockwise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case "watermark":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="watermark-text">Watermark Text</Label>
            <Input
              id="watermark-text"
              value={options.text || ""}
              onChange={(e) => updateOption("text", e.target.value)}
              placeholder="Enter watermark text"
            />
          </div>
          <div className="space-y-2">
            <Label>Opacity: {options.opacity || 0.3}</Label>
            <Slider
              value={[options.opacity || 0.3]}
              onValueChange={(value) => updateOption("opacity", value[0])}
              max={1}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};
