
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";
import { Download, FileText, Merge, Scissors, Lock, RotateCcw, Archive, Eye } from "lucide-react";
import { FileUploader } from "./FileUploader";
import { ProgressTracker } from "./ProgressTracker";
import { PDFToolOptions } from "./PDFToolOptions";
import { PDFEngine } from "./PDFEngine";

type ProcessingTool = "merge" | "split" | "compress" | "protect" | "convert" | "rotate" | "crop" | "extract" | "watermark" | "edit";

interface PDFProcessorProps {
  tool: ProcessingTool;
  title: string;
  description: string;
}

export const PDFProcessor = ({ tool, title, description }: PDFProcessorProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [options, setOptions] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const processFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select PDF files to process",
        variant: "destructive"
      });
      return;
    }

    if (tool === "protect" && !options.password) {
      toast({
        title: "Password required",
        description: "Please enter a password to protect the PDF",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setCurrentStep("Initializing...");

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 15, 85));
      }, 300);

      let result: Uint8Array | Uint8Array[];
      let filename: string;

      setCurrentStep("Processing PDF...");

      switch (tool) {
        case "merge":
          result = await PDFEngine.mergePDFs(files);
          filename = "merged.pdf";
          break;
          
        case "split":
          result = await PDFEngine.splitPDF(files[0], options);
          filename = "split";
          break;
          
        case "compress":
          result = await PDFEngine.compressPDF(files[0], options);
          filename = "compressed.pdf";
          break;
          
        case "protect":
          result = await PDFEngine.protectPDF(files[0], options);
          filename = "protected.pdf";
          break;

        case "rotate":
          result = await PDFEngine.rotatePDF(files[0], options);
          filename = "rotated.pdf";
          break;

        case "watermark":
          result = await PDFEngine.addWatermark(files[0], options);
          filename = "watermarked.pdf";
          break;

        case "extract":
          result = await PDFEngine.extractPages(files[0], options);
          filename = "extracted.pdf";
          break;

        case "crop":
          result = await PDFEngine.cropPDF(files[0], options);
          filename = "cropped.pdf";
          break;

        case "edit":
          result = await PDFEngine.editPDF(files[0], options);
          filename = "edited.pdf";
          break;

        case "convert":
          result = await PDFEngine.convertPDF(files[0], options);
          filename = "converted.pdf";
          break;
          
        default:
          throw new Error("Tool not implemented");
      }

      clearInterval(progressInterval);
      setProgress(95);
      setCurrentStep("Saving files...");

      // Handle file download
      if (Array.isArray(result)) {
        result.forEach((pdfBytes, index) => {
          saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `${filename}-${index + 1}.pdf`);
        });
      } else {
        saveAs(new Blob([result], { type: "application/pdf" }), filename);
      }

      setProgress(100);
      setCurrentStep("Complete!");

      toast({
        title: "Success!",
        description: "Your PDF has been processed successfully",
      });

    } catch (error) {
      console.error("Processing error:", error);
      toast({
        title: "Processing failed",
        description: "An error occurred while processing your PDF",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setCurrentStep("");
      }, 2000);
    }
  };

  const getIcon = () => {
    switch (tool) {
      case "merge": return Merge;
      case "split": return Scissors;
      case "protect": return Lock;
      case "compress": return Archive;
      case "rotate": return RotateCcw;
      case "watermark": return Eye;
      default: return FileText;
    }
  };

  const Icon = getIcon();
  const allowMultiple = tool === "merge";

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <FileUploader
          files={files}
          onFilesChange={setFiles}
          allowMultiple={allowMultiple}
        />

        <PDFToolOptions
          tool={tool}
          options={options}
          onOptionsChange={setOptions}
        />

        <ProgressTracker
          isProcessing={isProcessing}
          progress={progress}
          currentStep={currentStep}
        />

        <Button 
          onClick={processFiles} 
          disabled={isProcessing || files.length === 0}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Process PDF
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
          🔒 Your files are processed locally in your browser and automatically deleted after processing. 
          We never store or access your documents.
        </div>
      </CardContent>
    </Card>
  );
};
