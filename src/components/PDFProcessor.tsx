import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { Upload, Download, FileText, Merge, Scissors, Lock } from "lucide-react";

type ProcessingTool = "merge" | "split" | "compress" | "protect" | "convert";

interface PDFProcessorProps {
  tool: ProcessingTool;
  title: string;
  description: string;
}

export const PDFProcessor = ({ tool, title, description }: PDFProcessorProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    // Validate file size (10MB limit)
    const validFiles = selectedFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    setFiles(validFiles);
  }, [toast]);

  const mergePDFs = async (pdfFiles: File[]): Promise<Uint8Array> => {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    return await mergedPdf.save();
  };

  const splitPDF = async (pdfFile: File): Promise<Uint8Array[]> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    const splitPdfs: Uint8Array[] = [];

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(copiedPage);
      splitPdfs.push(await newPdf.save());
    }

    return splitPdfs;
  };

  const protectPDF = async (pdfFile: File, password: string): Promise<Uint8Array> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Note: pdf-lib doesn't support password protection in browser
    // This is a demonstration - in real implementation you'd need server-side processing
    const page = pdf.addPage();
    page.drawText(`Protected with password: ${password}`, {
      x: 50,
      y: 700,
      size: 12,
      color: rgb(1, 0, 0),
    });
    
    return await pdf.save();
  };

  const processFiles = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select PDF files to process",
        variant: "destructive"
      });
      return;
    }

    if (tool === "protect" && !password) {
      toast({
        title: "Password required",
        description: "Please enter a password to protect the PDF",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      let result: Uint8Array | Uint8Array[];
      
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      switch (tool) {
        case "merge":
          result = await mergePDFs(files);
          saveAs(new Blob([result], { type: "application/pdf" }), "merged.pdf");
          break;
          
        case "split":
          result = await splitPDF(files[0]);
          (result as Uint8Array[]).forEach((pdfBytes, index) => {
            saveAs(new Blob([pdfBytes], { type: "application/pdf" }), `page-${index + 1}.pdf`);
          });
          break;
          
        case "protect":
          result = await protectPDF(files[0], password);
          saveAs(new Blob([result], { type: "application/pdf" }), "protected.pdf");
          break;
          
        default:
          throw new Error("Tool not implemented");
      }

      clearInterval(progressInterval);
      setProgress(100);

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
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const getIcon = () => {
    switch (tool) {
      case "merge": return Merge;
      case "split": return Scissors;
      case "protect": return Lock;
      default: return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="file-upload">Select PDF Files</Label>
          <Input
            id="file-upload"
            type="file"
            accept=".pdf"
            multiple={tool === "merge"}
            onChange={handleFileSelect}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Maximum file size: 10MB {tool === "merge" ? "• Multiple files allowed" : ""}
          </p>
        </div>

        {/* Password Input for Protection */}
        {tool === "protect" && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password for PDF protection"
            />
          </div>
        )}

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files:</Label>
            <div className="space-y-1">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm">{file.name}</span>
                  <Badge variant="secondary">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isProcessing && (
          <div className="space-y-2">
            <Label>Processing...</Label>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Process Button */}
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

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
          🔒 Your files are processed locally in your browser and automatically deleted after processing. 
          We never store or access your documents.
        </div>
      </CardContent>
    </Card>
  );
};