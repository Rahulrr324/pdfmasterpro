
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessingTool } from "./PDFProcessor";
import { Settings, Shield, Scissors, RotateCcw, Type, Palette } from "lucide-react";

interface PDFToolOptionsProps {
  tool: ProcessingTool;
  options: Record<string, any>;
  onOptionsChange: (options: Record<string, any>) => void;
}

export const PDFToolOptions = ({ tool, options, onOptionsChange }: PDFToolOptionsProps) => {
  const updateOption = (key: string, value: any) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const getToolIcon = () => {
    switch (tool) {
      case "protect": return Shield;
      case "split": return Scissors;
      case "rotate": return RotateCcw;
      case "watermark": return Type;
      default: return Settings;
    }
  };

  const ToolIcon = getToolIcon();

  switch (tool) {
    case "protect":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-primary" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base font-medium">Master Password</Label>
              <Input
                id="password"
                type="password"
                value={options.password || ""}
                onChange={(e) => updateOption("password", e.target.value)}
                placeholder="Enter strong password"
                className="font-mono"
              />
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge variant={options.password?.length >= 8 ? "default" : "secondary"}>
                  {options.password?.length >= 8 ? "Strong" : "Weak"}
                </Badge>
                <span>Use 8+ characters with numbers and symbols</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="restrict-printing" className="font-medium">Restrict Printing</Label>
                  <p className="text-xs text-muted-foreground">Prevent document printing</p>
                </div>
                <Switch
                  id="restrict-printing"
                  checked={options.restrictPrinting || false}
                  onCheckedChange={(checked) => updateOption("restrictPrinting", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="restrict-copying" className="font-medium">Restrict Copying</Label>
                  <p className="text-xs text-muted-foreground">Prevent text selection/copying</p>
                </div>
                <Switch
                  id="restrict-copying"
                  checked={options.restrictCopying || false}
                  onCheckedChange={(checked) => updateOption("restrictCopying", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="restrict-editing" className="font-medium">Restrict Editing</Label>
                  <p className="text-xs text-muted-foreground">Prevent document modifications</p>
                </div>
                <Switch
                  id="restrict-editing"
                  checked={options.restrictEditing || false}
                  onCheckedChange={(checked) => updateOption("restrictEditing", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="allow-annotations" className="font-medium">Allow Annotations</Label>
                  <p className="text-xs text-muted-foreground">Permit comments and markups</p>
                </div>
                <Switch
                  id="allow-annotations"
                  checked={options.allowAnnotations || false}
                  onCheckedChange={(checked) => updateOption("allowAnnotations", checked)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Encryption Level</Label>
              <Select value={options.encryptionLevel || "128"} onValueChange={(value) => updateOption("encryptionLevel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select encryption strength" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="40">40-bit (Basic)</SelectItem>
                  <SelectItem value="128">128-bit (Standard)</SelectItem>
                  <SelectItem value="256">256-bit (Maximum)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      );

    case "compress":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="w-5 h-5 text-primary" />
              Compression Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Compression Level</Label>
              <Select value={options.level || "medium"} onValueChange={(value) => updateOption("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compression level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Better Quality, Larger Size)</SelectItem>
                  <SelectItem value="medium">Medium (Balanced)</SelectItem>
                  <SelectItem value="high">High (Smaller Size, Lower Quality)</SelectItem>
                  <SelectItem value="maximum">Maximum (Smallest Size)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">
                Image Quality: {options.imageQuality || 75}%
              </Label>
              <Slider
                value={[options.imageQuality || 75]}
                onValueChange={(value) => updateOption("imageQuality", value[0])}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Lower Quality</span>
                <span>Higher Quality</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="optimize-images" className="font-medium">Optimize Images</Label>
                  <p className="text-xs text-muted-foreground">Compress embedded images</p>
                </div>
                <Switch
                  id="optimize-images"
                  checked={options.optimizeImages !== false}
                  onCheckedChange={(checked) => updateOption("optimizeImages", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="remove-metadata" className="font-medium">Remove Metadata</Label>
                  <p className="text-xs text-muted-foreground">Strip document properties</p>
                </div>
                <Switch
                  id="remove-metadata"
                  checked={options.removeMetadata || false}
                  onCheckedChange={(checked) => updateOption("removeMetadata", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "split":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scissors className="w-5 h-5 text-primary" />
              Split Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Split Method</Label>
              <Select value={options.mode || "pages"} onValueChange={(value) => updateOption("mode", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select split method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pages">Split into Individual Pages</SelectItem>
                  <SelectItem value="range">Extract Page Range</SelectItem>
                  <SelectItem value="intervals">Split by Page Intervals</SelectItem>
                  <SelectItem value="size">Split by File Size</SelectItem>
                  <SelectItem value="bookmarks">Split by Bookmarks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {options.mode === "range" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-page" className="font-medium">Start Page</Label>
                    <Input
                      id="start-page"
                      type="number"
                      min="1"
                      value={options.startPage || 1}
                      onChange={(e) => updateOption("startPage", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-page" className="font-medium">End Page</Label>
                    <Input
                      id="end-page"
                      type="number"
                      min="1"
                      value={options.endPage || 1}
                      onChange={(e) => updateOption("endPage", parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Pages {options.startPage || 1} to {options.endPage || 1} will be extracted
                  </p>
                </div>
              </div>
            )}

            {options.mode === "intervals" && (
              <div className="space-y-3">
                <Label htmlFor="interval" className="font-medium">Pages per File</Label>
                <Input
                  id="interval"
                  type="number"
                  min="1"
                  max="50"
                  value={options.interval || 1}
                  onChange={(e) => updateOption("interval", parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Each output file will contain {options.interval || 1} page(s)
                </p>
              </div>
            )}

            {options.mode === "size" && (
              <div className="space-y-3">
                <Label htmlFor="maxSize" className="font-medium">Maximum File Size (MB)</Label>
                <Input
                  id="maxSize"
                  type="number"
                  min="1"
                  max="50"
                  value={options.maxSize || 5}
                  onChange={(e) => updateOption("maxSize", parseInt(e.target.value))}
                />
              </div>
            )}

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Label htmlFor="preserve-bookmarks" className="font-medium">Preserve Bookmarks</Label>
                <p className="text-xs text-muted-foreground">Keep navigation structure</p>
              </div>
              <Switch
                id="preserve-bookmarks"
                checked={options.preserveBookmarks || false}
                onCheckedChange={(checked) => updateOption("preserveBookmarks", checked)}
              />
            </div>
          </CardContent>
        </Card>
      );

    case "rotate":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <RotateCcw className="w-5 h-5 text-primary" />
              Rotation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Rotation Angle</Label>
              <Select value={options.angle?.toString() || "90"} onValueChange={(value) => updateOption("angle", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rotation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90° Clockwise</SelectItem>
                  <SelectItem value="180">180° (Upside Down)</SelectItem>
                  <SelectItem value="270">270° Clockwise (90° Counter-clockwise)</SelectItem>
                  <SelectItem value="-90">90° Counter-clockwise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Apply to Pages</Label>
              <Select value={options.pageSelection || "all"} onValueChange={(value) => updateOption("pageSelection", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pages to rotate" />
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
                <Label htmlFor="custom-pages" className="font-medium">Page Numbers</Label>
                <Input
                  id="custom-pages"
                  placeholder="e.g., 1,3,5-10,15"
                  value={options.customPages || ""}
                  onChange={(e) => updateOption("customPages", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Use commas for individual pages and hyphens for ranges
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      );

    case "watermark":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Type className="w-5 h-5 text-primary" />
              Watermark Design
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Watermark Type</Label>
              <Select value={options.type || "text"} onValueChange={(value) => updateOption("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select watermark type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Watermark</SelectItem>
                  <SelectItem value="image">Image Watermark</SelectItem>
                  <SelectItem value="timestamp">Timestamp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {options.type !== "image" && (
              <div className="space-y-3">
                <Label htmlFor="watermark-text" className="font-medium">
                  {options.type === "timestamp" ? "Timestamp Format" : "Watermark Text"}
                </Label>
                {options.type === "timestamp" ? (
                  <Select value={options.text || "default"} onValueChange={(value) => updateOption("text", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timestamp format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">MM/DD/YYYY HH:MM</SelectItem>
                      <SelectItem value="iso">YYYY-MM-DD HH:MM:SS</SelectItem>
                      <SelectItem value="relative">Processed on [Date]</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Textarea
                    id="watermark-text"
                    value={options.text || ""}
                    onChange={(e) => updateOption("text", e.target.value)}
                    placeholder="Enter watermark text"
                    rows={3}
                  />
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="font-medium">
                  Opacity: {Math.round((options.opacity || 0.3) * 100)}%
                </Label>
                <Slider
                  value={[options.opacity || 0.3]}
                  onValueChange={(value) => updateOption("opacity", value[0])}
                  max={1}
                  min={0.1}
                  step={0.05}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium">Font Size</Label>
                <Slider
                  value={[options.fontSize || 24]}
                  onValueChange={(value) => updateOption("fontSize", value[0])}
                  max={72}
                  min={8}
                  step={2}
                  className="w-full"
                />
                <div className="text-center text-xs text-muted-foreground">
                  {options.fontSize || 24}pt
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Position</Label>
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
                  <SelectItem value="diagonal">Diagonal (Repeated)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Rotation Angle</Label>
              <Select value={options.rotation?.toString() || "45"} onValueChange={(value) => updateOption("rotation", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rotation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0° (Horizontal)</SelectItem>
                  <SelectItem value="45">45° (Diagonal)</SelectItem>
                  <SelectItem value="90">90° (Vertical)</SelectItem>
                  <SelectItem value="-45">-45° (Reverse Diagonal)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="repeat-watermark" className="font-medium">Repeat Pattern</Label>
                  <p className="text-xs text-muted-foreground">Tile across page</p>
                </div>
                <Switch
                  id="repeat-watermark"
                  checked={options.repeat || false}
                  onCheckedChange={(checked) => updateOption("repeat", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label htmlFor="behind-text" className="font-medium">Behind Text</Label>
                  <p className="text-xs text-muted-foreground">Place behind content</p>
                </div>
                <Switch
                  id="behind-text"
                  checked={options.behindText !== false}
                  onCheckedChange={(checked) => updateOption("behindText", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "extract":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scissors className="w-5 h-5 text-primary" />
              Page Extraction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="page-numbers" className="font-medium">Page Numbers to Extract</Label>
              <Input
                id="page-numbers"
                placeholder="e.g., 1,3,5-10,15"
                value={options.pageNumbers || ""}
                onChange={(e) => updateOption("pageNumbers", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use commas for individual pages and hyphens for ranges
              </p>
            </div>
          </CardContent>
        </Card>
      );

    case "crop":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="w-5 h-5 text-primary" />
              Crop Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop-x">X Position</Label>
                <Input
                  id="crop-x"
                  type="number"
                  min="0"
                  value={options.x || 0}
                  onChange={(e) => updateOption("x", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-y">Y Position</Label>
                <Input
                  id="crop-y"
                  type="number"
                  min="0"
                  value={options.y || 0}
                  onChange={(e) => updateOption("y", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-width">Width</Label>
                <Input
                  id="crop-width"
                  type="number"
                  min="1"
                  value={options.width || 595}
                  onChange={(e) => updateOption("width", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-height">Height</Label>
                <Input
                  id="crop-height"
                  type="number"
                  min="1"
                  value={options.height || 842}
                  onChange={(e) => updateOption("height", parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "edit":
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Type className="w-5 h-5 text-primary" />
              Text Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-text" className="font-medium">Add Text</Label>
              <Textarea
                id="add-text"
                value={options.addText || ""}
                onChange={(e) => updateOption("addText", e.target.value)}
                placeholder="Enter text to add to PDF"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="text-x">X Position</Label>
                <Input
                  id="text-x"
                  type="number"
                  value={options.textX || 50}
                  onChange={(e) => updateOption("textX", parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text-y">Y Position</Label>
                <Input
                  id="text-y"
                  type="number"
                  value={options.textY || 50}
                  onChange={(e) => updateOption("textY", parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ToolIcon className="w-5 h-5 text-primary" />
              Tool Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-4">
              No additional options available for this tool.
            </p>
          </CardContent>
        </Card>
      );
  }
};
