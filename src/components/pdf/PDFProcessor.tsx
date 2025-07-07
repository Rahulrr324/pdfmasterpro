
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";
import { Download, FileText, Merge, Scissors, Lock, RotateCcw, Archive, Eye, AlertTriangle, Unlock, Shield, Crop, Edit3, Layers, Image, Type } from "lucide-react";
import { FileUploader } from "./FileUploader";
import { ProgressTracker } from "./ProgressTracker";
import { PDFToolOptions } from "./PDFToolOptions";
import { PDFEngine } from "./PDFEngine";

export type ProcessingTool = "merge" | "split" | "compress" | "protect" | "unlock" | "convert" | "rotate" | "crop" | "extract" | "watermark" | "edit" | "view" | "image-to-pdf";

interface PDFProcessorProps {
  tool: ProcessingTool;
  title: string;
  description: string;
  toolId?: string;
}

export const PDFProcessor = ({ tool, title, description, toolId }: PDFProcessorProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<Record<string, any>>({});
  const [compressionStats, setCompressionStats] = useState<{before: number, after: number} | null>(null);
  const [pdfInfo, setPdfInfo] = useState<any>(null);
  const { toast } = useToast();

  // Get PDF info for preview when files are uploaded
  useEffect(() => {
    if (files.length === 1 && files[0].type.includes('pdf')) {
      PDFEngine.getPDFInfo(files[0])
        .then(info => setPdfInfo(info))
        .catch(() => setPdfInfo(null));
    } else {
      setPdfInfo(null);
    }
  }, [files]);

  const validateFiles = useCallback(() => {
    if (files.length === 0) {
      throw new Error("Please select files to process");
    }

    // Tool-specific file count validation
    if (tool === "merge" && files.length < 2) {
      throw new Error("Please select at least 2 files to merge");
    }

    if (["split", "rotate", "compress", "extract", "protect", "unlock", "watermark", "crop", "edit", "view"].includes(tool) && files.length > 1) {
      throw new Error("This tool only accepts one file at a time");
    }

    // Validate file types and sizes
    for (const file of files) {
      if (tool === "image-to-pdf" && !file.type.includes('image')) {
        throw new Error(`${file.name} is not a valid image file`);
      } else if (tool !== "image-to-pdf" && !file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        throw new Error(`${file.name} is not a valid PDF file`);
      }
      
      if (file.size > 50 * 1024 * 1024) {
        throw new Error(`${file.name} is too large. Maximum size is 50MB`);
      }

      if (file.size === 0) {
        throw new Error(`${file.name} is empty`);
      }
    }

    // Tool-specific option validation
    if (tool === "protect" && !options.password) {
      throw new Error("Please enter a password to protect the PDF");
    }

    if (tool === "unlock" && !options.password) {
      throw new Error("Please enter the password to unlock the PDF");
    }

    if (tool === "split" && options.mode === "range") {
      if (!options.startPage || !options.endPage) {
        throw new Error("Please specify start and end page numbers");
      }
      const start = parseInt(options.startPage);
      const end = parseInt(options.endPage);
      if (start > end) {
        throw new Error("Start page must be less than or equal to end page");
      }
      if (pdfInfo && (start > pdfInfo.pageCount || end > pdfInfo.pageCount)) {
        throw new Error(`Page numbers must be between 1 and ${pdfInfo.pageCount}`);
      }
    }

    if (tool === "extract" && options.pageNumbers && typeof options.pageNumbers === 'string') {
      const pageStr = options.pageNumbers.trim();
      if (!pageStr) {
        throw new Error("Please specify page numbers to extract");
      }
    }

    if (tool === "watermark" && !options.text && options.type !== "timestamp" && options.type !== "confidential") {
      throw new Error("Please enter watermark text");
    }

    if (tool === "rotate" && !options.rotation) {
      throw new Error("Please select rotation angle");
    }
  }, [files, tool, options, pdfInfo]);

  const processFiles = async () => {
    setError("");
    setProgress(0);
    setCurrentStep("");
    setCompressionStats(null);

    try {
      validateFiles();
      
      setIsProcessing(true);
      setCurrentStep("Initializing...");
      setProgress(5);

      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentStep("Loading files...");
      setProgress(15);

      let result: Uint8Array | Uint8Array[] | string;
      let filename: string;
      let isMultipleFiles = false;
      const originalSize = files.reduce((total, file) => total + file.size, 0);

      setCurrentStep("Processing...");
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
          setCompressionStats({
            before: originalSize,
            after: (result as Uint8Array).byteLength
          });
          setProgress(70);
          break;
          
        case "protect":
          result = await PDFEngine.protectPDF(files[0], options);
          filename = `protected-${files[0].name}`;
          setProgress(70);
          break;

        case "unlock":
          result = await PDFEngine.unlockPDF(files[0], options);
          filename = `unlocked-${files[0].name}`;
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

        case "view":
          // For view mode, we don't process, just display info
          setProgress(100);
          setCurrentStep("PDF loaded for viewing");
          toast({
            title: "PDF Loaded Successfully",
            description: `${pdfInfo?.pageCount || 'Unknown'} pages • ${(files[0].size / 1024 / 1024).toFixed(2)} MB`,
          });
          return;

        case "image-to-pdf":
          result = await PDFEngine.convertImagesToPDF(files);
          filename = `images-to-pdf-${Date.now()}.pdf`;
          setProgress(70);
          break;

        case "convert":
          result = await PDFEngine.convertPDF(files[0], { ...options, toolId });
          filename = getConvertedFilename(files[0].name, toolId);
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
        const mimeType = getMimeType(toolId);
        const blob = new Blob([result], { type: mimeType });
        saveAs(blob, filename);
        
        const compressionText = compressionStats 
          ? ` (${Math.round((1 - compressionStats.after / compressionStats.before) * 100)}% smaller)` 
          : '';
        
        toast({
          title: "Success!",
          description: `Your file has been processed and downloaded${compressionText}`,
        });
      }

      setProgress(100);
      setCurrentStep("Complete!");

    } catch (error) {
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

  const getConvertedFilename = (originalName: string, toolId?: string): string => {
    const baseName = originalName.replace(/\.[^/.]+$/, "");
    switch (toolId) {
      case "pdf-to-word": return `${baseName}.docx`;
      case "pdf-to-excel": return `${baseName}.xlsx`;
      case "pdf-to-jpg": return `${baseName}.jpg`;
      case "pdf-to-png": return `${baseName}.png`;
      case "pdf-to-text": return `${baseName}.txt`;
      default: return `converted-${originalName}`;
    }
  };

  const getMimeType = (toolId?: string): string => {
    switch (toolId) {
      case "pdf-to-word": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "pdf-to-excel": return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      case "pdf-to-jpg": return "image/jpeg";
      case "pdf-to-png": return "image/png";
      case "pdf-to-text": return "text/plain";
      default: return "application/pdf";
    }
  };

  const getIcon = () => {
    switch (tool) {
      case "merge": return Merge;
      case "split": return Scissors;
      case "protect": return Lock;
      case "unlock": return Unlock;
      case "compress": return Archive;
      case "rotate": return RotateCcw;
      case "watermark": return Eye;
      case "crop": return Crop;
      case "edit": return Edit3;
      case "extract": return Layers;
      case "image-to-pdf": return Image;
      case "convert": return Type;
      case "view": return Eye;
      default: return FileText;
    }
  };

  const Icon = getIcon();
  const allowMultiple = tool === "merge" || tool === "image-to-pdf";
  const acceptedTypes = tool === "image-to-pdf" ? "image/*" : ".pdf";

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
          acceptedTypes={acceptedTypes}
          maxSizeInMB={50}
        />

        {/* Show PDF info for single PDF files */}
        {pdfInfo && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">{pdfInfo.pageCount}</p>
                <p className="text-xs text-blue-600 font-medium">Pages</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  {(pdfInfo.fileSize / 1024 / 1024).toFixed(1)}MB
                </p>
                <p className="text-xs text-blue-600 font-medium">File Size</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  {pdfInfo.pages[0]?.width.toFixed(0) || 'N/A'}
                </p>
                <p className="text-xs text-blue-600 font-medium">Width (pt)</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  {pdfInfo.pages[0]?.height.toFixed(0) || 'N/A'}
                </p>
                <p className="text-xs text-blue-600 font-medium">Height (pt)</p>
              </div>
            </div>
          </div>
        )}

        <PDFToolOptions
          tool={tool}
          options={options}
          onOptionsChange={setOptions}
          toolId={toolId}
          pdfInfo={pdfInfo}
        />

        <ProgressTracker
          isProcessing={isProcessing}
          progress={progress}
          currentStep={currentStep}
          error={error}
          totalFiles={files.length}
          processedFiles={isProcessing ? Math.floor(progress / 100 * files.length) : 0}
          compressionStats={compressionStats}
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
                {tool === "view" ? "View PDF" : `Process ${files.length > 1 ? 'Files' : 'File'}`}
              </div>
            )}
          </Button>

          {files.length === 0 && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm justify-center">
              <AlertTriangle className="w-4 h-4" />
              Please upload files to get started
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-green-800 dark:text-green-200 text-sm">
                🔒 Your Privacy is Protected
              </p>
              <p className="text-green-700 dark:text-green-300 text-xs leading-relaxed">
                All PDF processing happens locally in your browser. Your files are never uploaded to our servers 
                and are automatically cleared from memory after processing.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
