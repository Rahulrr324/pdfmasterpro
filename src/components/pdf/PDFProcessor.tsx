
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

  // File size limit for InfinityFree hosting (10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  // Get PDF info for preview when files are uploaded
  useEffect(() => {
    const loadPdfInfo = async () => {
      if (files.length === 1 && files[0].type.includes('pdf')) {
        try {
          const info = await PDFEngine.getPDFInfo(files[0]);
          setPdfInfo(info);
          console.log('PDF Info loaded:', info);
        } catch (error) {
          console.error('Failed to get PDF info:', error);
          setPdfInfo(null);
          // Don't show error toast here as it's just for preview
        }
      } else {
        setPdfInfo(null);
      }
    };
    
    loadPdfInfo();
  }, [files]);

  const validateFiles = useCallback(() => {
    console.log('Validating files:', files.length);
    
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

    // Validate file types, sizes, and InfinityFree limits
    for (const file of files) {
      console.log(`Validating ${file.name}: ${file.size} bytes, type: ${file.type}`);
      
      // Check file size (InfinityFree 10MB limit)
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum allowed size is 10MB for free hosting compatibility.`);
      }

      if (file.size === 0) {
        throw new Error(`${file.name} is empty or corrupted`);
      }

      // File type validation
      if (tool === "image-to-pdf") {
        if (!file.type.includes('image')) {
          throw new Error(`${file.name} is not a valid image file. Please upload JPG or PNG images.`);
        }
        if (!file.type.includes('jpeg') && !file.type.includes('jpg') && !file.type.includes('png')) {
          throw new Error(`${file.name} format is not supported. Please upload JPG or PNG images only.`);
        }
      } else if (tool !== "image-to-pdf") {
        if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
          throw new Error(`${file.name} is not a valid PDF file. Please upload PDF files only.`);
        }
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
        throw new Error("Please specify both start and end page numbers for range splitting");
      }
      const start = parseInt(options.startPage);
      const end = parseInt(options.endPage);
      if (isNaN(start) || isNaN(end) || start < 1 || end < 1) {
        throw new Error("Please enter valid page numbers (starting from 1)");
      }
      if (start > end) {
        throw new Error("Start page must be less than or equal to end page");
      }
      if (pdfInfo && (start > pdfInfo.pageCount || end > pdfInfo.pageCount)) {
        throw new Error(`Page numbers must be between 1 and ${pdfInfo.pageCount}`);
      }
    }

    if (tool === "split" && options.mode === "intervals") {
      const interval = parseInt(options.interval);
      if (isNaN(interval) || interval < 1) {
        throw new Error("Please enter a valid interval (minimum 1 page per file)");
      }
    }

    if (tool === "extract") {
      if (!options.pageNumbers || typeof options.pageNumbers !== 'string') {
        throw new Error("Please specify page numbers to extract (e.g., 1,3,5-8)");
      }
      const pageStr = options.pageNumbers.trim();
      if (!pageStr) {
        throw new Error("Please enter page numbers in format: 1,3,5-8");
      }
    }

    if (tool === "watermark") {
      if (options.type === "text" && !options.text) {
        throw new Error("Please enter watermark text");
      }
      if (options.opacity && (options.opacity < 0.1 || options.opacity > 1)) {
        throw new Error("Watermark opacity must be between 10% and 100%");
      }
    }

    if (tool === "rotate") {
      if (!options.angle && options.angle !== 0) {
        throw new Error("Please select a rotation angle");
      }
    }

    console.log('File validation passed');
  }, [files, tool, options, pdfInfo, MAX_FILE_SIZE]);

  const processFiles = async () => {
    setError("");
    setProgress(0);
    setCurrentStep("");
    setCompressionStats(null);

    try {
      validateFiles();
      
      setIsProcessing(true);
      setCurrentStep("Initializing processing...");
      setProgress(5);

      // Short delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setCurrentStep("Loading and validating files...");
      setProgress(15);

      let result: Uint8Array | Uint8Array[] | string;
      let filename: string;
      let isMultipleFiles = false;
      const originalSize = files.reduce((total, file) => total + file.size, 0);

      setCurrentStep(`Processing with ${tool} tool...`);
      setProgress(30);

      console.log(`Starting ${tool} operation on ${files.length} file(s)`);

      // Add processing delay for user feedback
      await new Promise(resolve => setTimeout(resolve, 300));

      switch (tool) {
        case "merge":
          setCurrentStep("Merging PDF files...");
          result = await PDFEngine.mergePDFs(files);
          filename = `merged-${Date.now()}.pdf`;
          setProgress(70);
          break;
          
        case "split":
          setCurrentStep("Splitting PDF file...");
          result = await PDFEngine.splitPDF(files[0], options);
          filename = `split-${files[0].name.replace('.pdf', '')}`;
          isMultipleFiles = true;
          setProgress(70);
          break;
          
        case "compress":
          setCurrentStep("Compressing PDF file...");
          result = await PDFEngine.compressPDF(files[0], options);
          filename = `compressed-${files[0].name}`;
          setCompressionStats({
            before: originalSize,
            after: (result as Uint8Array).byteLength
          });
          setProgress(70);
          break;
          
        case "protect":
          setCurrentStep("Adding password protection...");
          result = await PDFEngine.protectPDF(files[0], options);
          filename = `protected-${files[0].name}`;
          setProgress(70);
          break;

        case "unlock":
          setCurrentStep("Removing password protection...");
          result = await PDFEngine.unlockPDF(files[0], options);
          filename = `unlocked-${files[0].name}`;
          setProgress(70);
          break;

        case "rotate":
          setCurrentStep("Rotating PDF pages...");
          result = await PDFEngine.rotatePDF(files[0], options);
          filename = `rotated-${files[0].name}`;
          setProgress(70);
          break;

        case "watermark":
          setCurrentStep("Adding watermark...");
          result = await PDFEngine.addWatermark(files[0], options);
          filename = `watermarked-${files[0].name}`;
          setProgress(70);
          break;

        case "extract":
          setCurrentStep("Extracting pages...");
          result = await PDFEngine.extractPages(files[0], options);
          filename = `extracted-pages-${files[0].name}`;
          setProgress(70);
          break;

        case "crop":
          setCurrentStep("Cropping PDF pages...");
          result = await PDFEngine.cropPDF(files[0], options);
          filename = `cropped-${files[0].name}`;
          setProgress(70);
          break;

        case "edit":
          setCurrentStep("Editing PDF content...");
          result = await PDFEngine.editPDF(files[0], options);
          filename = `edited-${files[0].name}`;
          setProgress(70);
          break;

        case "view":
          // For view mode, we just display the PDF info
          setProgress(100);
          setCurrentStep("PDF loaded successfully");
          
          toast({
            title: "PDF Loaded Successfully",
            description: `${pdfInfo?.pageCount || 'Unknown'} pages • ${(files[0].size / 1024 / 1024).toFixed(2)} MB`,
          });
          
          console.log('PDF viewing mode - no file processing needed');
          return;

        case "image-to-pdf":
          setCurrentStep("Converting images to PDF...");
          result = await PDFEngine.convertImagesToPDF(files);
          filename = `images-converted-${Date.now()}.pdf`;
          setProgress(70);
          break;

        case "convert":
          setCurrentStep("Converting PDF...");
          result = await PDFEngine.convertPDF(files[0], { ...options, toolId });
          filename = getConvertedFilename(files[0].name, toolId);
          setProgress(70);
          break;
          
        default:
          throw new Error(`Tool "${tool}" is not implemented yet`);
      }

      setCurrentStep("Preparing download...");
      setProgress(85);

      // Handle file download
      if (Array.isArray(result)) {
        // Multiple files (e.g., split operation)
        console.log(`Downloading ${result.length} files`);
        
        result.forEach((pdfBytes, index) => {
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          saveAs(blob, `${filename}-page-${index + 1}.pdf`);
        });
        
        toast({
          title: "Processing Complete!",
          description: `${result.length} files have been processed and downloaded successfully.`,
        });
      } else {
        // Single file
        console.log('Downloading single file:', filename);
        
        const mimeType = getMimeType(toolId);
        const blob = new Blob([result], { type: mimeType });
        saveAs(blob, filename);
        
        let successMessage = "Your file has been processed and downloaded successfully";
        
        if (compressionStats) {
          const compressionPercent = Math.round((1 - compressionStats.after / compressionStats.before) * 100);
          successMessage += ` (${compressionPercent > 0 ? compressionPercent + '% smaller' : 'size optimized'})`;
        }
        
        toast({
          title: "Processing Complete!",
          description: successMessage,
        });
      }

      setProgress(100);
      setCurrentStep("Download complete!");

      console.log(`${tool} operation completed successfully`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during processing";
      console.error('Processing error:', error);
      
      setError(errorMessage);
      
      toast({
        title: "Processing Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      // Reset UI state after delay
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
      case "word-to-pdf":
      case "excel-to-pdf":
      case "html-to-pdf":
        return `${baseName}-converted.pdf`;
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
          maxSizeInMB={10} // Updated for InfinityFree compatibility
        />

        {/* Enhanced PDF info display */}
        {pdfInfo && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">PDF Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pdfInfo.pageCount}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Pages</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {(pdfInfo.fileSize / 1024 / 1024).toFixed(1)}MB
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">File Size</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {pdfInfo.pages[0]?.width || 'N/A'}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Width (pt)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {pdfInfo.pages[0]?.height || 'N/A'}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Height (pt)</p>
              </div>
            </div>
            {pdfInfo.title !== files[0]?.name && (
              <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                <strong>Title:</strong> {pdfInfo.title}
              </div>
            )}
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

        {/* Enhanced hosting compatibility notice */}
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-green-800 dark:text-green-200 text-sm">
                  🔒 Complete Privacy Protection
                </p>
                <p className="text-green-700 dark:text-green-300 text-xs leading-relaxed">
                  All PDF processing happens entirely in your browser using the PDF-lib library. 
                  Your files never leave your device and are automatically cleared from memory after processing.
                </p>
              </div>
            </div>
          </div>

          {/* File size limit notice for InfinityFree */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-yellow-800 dark:text-yellow-200 text-sm">
                  📁 File Size Limit: 10MB per file
                </p>
                <p className="text-yellow-700 dark:text-yellow-300 text-xs leading-relaxed">
                  For optimal performance and compatibility with free hosting services, 
                  please keep individual files under 10MB. Larger files may fail to process.
                </p>
              </div>
            </div>
          </div>

          {/* Browser limitations notice for certain tools */}
          {(toolId === 'pdf-to-word' || toolId === 'pdf-to-excel' || tool === 'protect' || tool === 'unlock') && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-orange-800 dark:text-orange-200 text-sm">
                    ⚠️ Browser Processing Limitations
                  </p>
                  <p className="text-orange-700 dark:text-orange-300 text-xs leading-relaxed">
                    Advanced features like format conversion and encryption have limitations when processed in browsers. 
                    For professional-grade results, consider using desktop PDF software.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
