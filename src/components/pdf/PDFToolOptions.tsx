
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessingTool } from "./PDFProcessor";

interface PDFToolOptionsProps {
  tool: ProcessingTool;
  options: Record<string, any>;
  onOptionsChange: (options: Record<string, any>) => void;
}

export const PDFToolOptions = ({ tool, options, onOptionsChange }: PDFToolOptionsProps) => {
  const updateOption = (key: string, value: any) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const renderSplitOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Split Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Split Mode</Label>
          <Select value={options.mode || "individual"} onValueChange={(value) => updateOption("mode", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select split mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Split into individual pages</SelectItem>
              <SelectItem value="range">Extract page range</SelectItem>
              <SelectItem value="intervals">Split by intervals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {options.mode === "range" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startPage">Start Page</Label>
              <Input
                id="startPage"
                type="number"
                min="1"
                value={options.startPage || ""}
                onChange={(e) => updateOption("startPage", e.target.value)}
                placeholder="e.g., 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endPage">End Page</Label>
              <Input
                id="endPage"
                type="number"
                min="1"
                value={options.endPage || ""}
                onChange={(e) => updateOption("endPage", e.target.value)}
                placeholder="e.g., 5"
              />
            </div>
          </div>
        )}

        {options.mode === "intervals" && (
          <div className="space-y-2">
            <Label htmlFor="interval">Pages per file</Label>
            <Input
              id="interval"
              type="number"
              min="1"
              value={options.interval || ""}
              onChange={(e) => updateOption("interval", e.target.value)}
              placeholder="e.g., 2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderRotateOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rotation Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Rotation Angle</Label>
          <Select value={options.angle?.toString() || "90"} onValueChange={(value) => updateOption("angle", parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select rotation angle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90">90° Clockwise</SelectItem>
              <SelectItem value="180">180°</SelectItem>
              <SelectItem value="270">270° Clockwise</SelectItem>
              <SelectItem value="-90">90° Counter-clockwise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Apply to Pages</Label>
          <Select value={options.pageSelection || "all"} onValueChange={(value) => updateOption("pageSelection", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select pages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pages</SelectItem>
              <SelectItem value="odd">Odd Pages Only</SelectItem>
              <SelectItem value="even">Even Pages Only</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {options.pageSelection === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="customPages">Page Numbers (e.g., 1,3,5-8)</Label>
            <Input
              id="customPages"
              value={options.customPages || ""}
              onChange={(e) => updateOption("customPages", e.target.value)}
              placeholder="1,3,5-8"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderCompressOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Compression Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Compression Quality</Label>
          <div className="px-2">
            <Slider
              value={[options.quality || 80]}
              onValueChange={(value) => updateOption("quality", value[0])}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Smaller</span>
              <span>{options.quality || 80}%</span>
              <span>Larger</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="removeMetadata"
            checked={options.removeMetadata || false}
            onCheckedChange={(checked) => updateOption("removeMetadata", checked)}
          />
          <Label htmlFor="removeMetadata">Remove metadata to reduce size</Label>
        </div>
      </CardContent>
    </Card>
  );

  const renderExtractOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Extract Pages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pageNumbers">Page Numbers to Extract</Label>
          <Input
            id="pageNumbers"
            value={options.pageNumbers || ""}
            onChange={(e) => updateOption("pageNumbers", e.target.value)}
            placeholder="e.g., 1,3,5-8,10"
          />
          <p className="text-sm text-muted-foreground">
            Use commas to separate pages and hyphens for ranges (e.g., 1,3,5-8,10)
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderWatermarkOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Watermark Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Watermark Type</Label>
          <Select value={options.type || "text"} onValueChange={(value) => updateOption("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select watermark type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Custom Text</SelectItem>
              <SelectItem value="timestamp">Timestamp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {options.type === "text" && (
          <div className="space-y-2">
            <Label htmlFor="watermarkText">Watermark Text</Label>
            <Input
              id="watermarkText"
              value={options.text || ""}
              onChange={(e) => updateOption("text", e.target.value)}
              placeholder="Enter watermark text"
            />
          </div>
        )}

        {options.type === "timestamp" && (
          <div className="space-y-2">
            <Label>Timestamp Format</Label>
            <Select value={options.text || "default"} onValueChange={(value) => updateOption("text", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (MM/DD/YYYY HH:MM)</SelectItem>
                <SelectItem value="iso">ISO Format</SelectItem>
                <SelectItem value="relative">Relative (Processed on...)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Position</Label>
          <Select value={options.position || "center"} onValueChange={(value) => updateOption("position", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="diagonal">Diagonal Pattern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Opacity</Label>
          <div className="px-2">
            <Slider
              value={[options.opacity ? options.opacity * 100 : 30]}
              onValueChange={(value) => updateOption("opacity", value[0] / 100)}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Light</span>
              <span>{Math.round((options.opacity || 0.3) * 100)}%</span>
              <span>Dark</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderProtectOptions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Password Protection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={options.password || ""}
            onChange={(e) => updateOption("password", e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Note: This adds a basic protection layer. For full encryption, use dedicated PDF security software.
        </p>
      </CardContent>
    </Card>
  );

  const renderOptions = () => {
    switch (tool) {
      case "split":
        return renderSplitOptions();
      case "rotate":
        return renderRotateOptions();
      case "compress":
        return renderCompressOptions();
      case "extract":
        return renderExtractOptions();
      case "watermark":
        return renderWatermarkOptions();
      case "protect":
        return renderProtectOptions();
      default:
        return null;
    }
  };

  const optionsComponent = renderOptions();
  
  if (!optionsComponent) {
    return null;
  }

  return (
    <div className="space-y-4">
      {optionsComponent}
    </div>
  );
};
