
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";
import { Download, FileText, Merge, Scissors, Lock, RotateCcw, Archive, Eye, AlertTriangle } from "lucide-react";
import { FileUploader } from "./FileUploader";
import { ProgressTracker } from "./ProgressTracker";
import { PDFToolOptions } from "./PDFToolOptions";
import { PDFEngine } from "./PDFEngine";

export type ProcessingTool = "merge" | "split" | "compress" | "protect" | "convert" | "rotate" | "crop" | "extract" | "watermark" | "edit";

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
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const validateFiles = useCallback(() => {
    if (files.length === 0) {
      throw new Error("Please select PDF files to process");
    }

    if (tool === "merge" && files.length < 2) {
      throw new Error("Please select at least 2 files to merge");
    }

    if (tool !== "merge" && files.length > 1) {
      throw new Error("This tool only accepts one file at a time");
    }

    // Validate file types
    for (const file of files) {
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        throw new Error(`${file.name} is not a valid PDF file`);
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        throw new Error(`${file.name} is too large. Maximum size is 50MB`);
      }
    }

    // Tool-specific validations
    if (tool === "protect" && !options.password) {
      throw new Error("Please enter a password to protect the PDF");
    }

    if (tool === "split" && options.mode === "range") {
      if (!options.startPage || !options.endPage) {
        throw new Error("Please specify start and end page numbers");
      }
      if (parseInt(options.startPage) > parseInt(options.endPage)) {
        throw new Error("Start page must be less than or equal to end page");
      }
    }

    if (tool === "extract" && options.pageNumbers && typeof options.pageNumbers === 'string') {
      const pageStr = options.pageNumbers.trim();
      if (!pageStr) {
        throw new Error("Please specify page numbers to extract");
      }
    }

    if (tool === "watermark" && !options.text && options.type !== "timestamp") {
      throw new Error("Please enter watermark text");
    }
  }, [files, tool, options]);

  const processFiles = async () => {
    setError("");
    setProgress(0);
    setCurrentStep("");

    try {
      validateFiles();
      
      setIsProcessing(true);
      setCurrentStep("Initializing...");
      setProgress(5);

      // Simulate initialization delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentStep("Loading PDF files...");
      setProgress(15);

      let result: Uint8Array | Uint8Array[];
      let filename: string;
      let isMultipleFiles = false;

      setCurrentStep("Processing PDF...");
      setProgress(30);

      switch (tool) {
        case "merge":
          result = await PDFEngine.mergePDFs(files);
          filename = `merged-${Date.now()}.pdf`;
          setProgress(70);
          break;
          
        case "split":
          result = await PDFEngine.splitPDF(files[0], options);
          filename = "split";
          isMultipleFiles = true;
          setProgress(70);
          break;
          
        case "compress":
          result = await PDFEngine.compressPDF(files[0], options);
          filename = `compressed-${files[0].name}`;
          setProgress(70);
          break;
          
        case "protect":
          result = await PDFEngine.protectPDF(files[0], options);
          filename = `protected-${files[0].name}`;
          setProgress(70);
          break;

        case "rotate":
          result = await PDFEngine.rotatePDF(files[0], options);
          filename = `rotated-${files[0].name}`;
          setProgress(70);
          break;

        case "watermark":
          result = await PDFEngine.addWatermark(files[0], options);
          filename = `watermarked-${files[0].name}`;
          setProgress(70);
          break;

        case "extract":
          result = await PDFEngine.extractPages(files[0], options);
          filename = `extracted-${files[0].name}`;
          setProgress(70);
          break;

        case "crop":
          result = await PDFEngine.cropPDF(files[0], options);
          filename = `cropped-${files[0].name}`;
          setProgress(70);
          break;

        case "edit":
          result = await PDFEngine.editPDF(files[0], options);
          filename = `edited-${files[0].name}`;
          setProgress(70);
          break;

        case "convert":
          result = await PDFEngine.convertPDF(files[0], options);
          filename = `converted-${files[0].name}`;
          setProgress(70);
          break;
          
        default:
          throw new Error("Tool not implemented");
      }

      setCurrentStep("Preparing download...");
      setProgress(85);

      // Handle file download
      if (Array.isArray(result)) {
        result.forEach((pdfBytes, index) => {
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          saveAs(blob, `${filename}-${index + 1}.pdf`);
        });
        
        toast({
          title: "Success!",
          description: `${result.length} files have been processed and downloaded`,
        });
      } else {
        const blob = new Blob([result], { type: "application/pdf" });
        saveAs(blob, filename);
        
        toast({
          title: "Success!",
          description: "Your PDF has been processed and downloaded",
        });
      }

      setProgress(100);
      setCurrentStep("Complete!");

    } catch (error) {
      console.error("Processing error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      
      toast({
        title: "Processing failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setCurrentStep("");
        setError("");
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
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground font-normal text-base">{description}</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8 p-8">
        <FileUploader
          files={files}
          onFilesChange={setFiles}
          allowMultiple={allowMultiple}
          maxSizeInMB={50}
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
          error={error}
          totalFiles={files.length}
          processedFiles={isProcessing ? Math.floor(progress / 100 * files.length) : 0}
        />

        <div className="flex flex-col gap-4">
          <Button 
            onClick={processFiles} 
            disabled={isProcessing || files.length === 0}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Process PDF{files.length > 1 ? 's' : ''}
              </div>
            )}
          </Button>

          {files.length === 0 && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm justify-center">
              <AlertTriangle className="w-4 h-4" />
              Please upload PDF files to get started
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-green-800 dark:text-green-200 text-sm">
                🔒 Your Privacy is Protected
              </p>
              <p className="text-green-700 dark:text-green-300 text-xs leading-relaxed">
                All PDF processing happens locally in your browser. Your files are never uploaded to our servers 
                and are automatically cleared from memory after processing. We never store or access your documents.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
