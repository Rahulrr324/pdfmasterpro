import React, { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { FileUploader } from './FileUploader';
import { ProgressTracker } from './ProgressTracker';
import { PDFEngine } from './PDFEngine';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';

type ProcessingTool = 
  | "view" 
  | "rotate" 
  | "split" 
  | "convert" 
  | "edit" 
  | "merge" 
  | "compress" 
  | "protect" 
  | "unlock" 
  | "crop" 
  | "extract" 
  | "watermark"
  | "image-to-pdf";

interface PDFProcessorProps {
  tool: ProcessingTool;
  onBack?: () => void;
}

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

export const PDFProcessor: React.FC<PDFProcessorProps> = ({ tool, onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [steps, setSteps] = useState<ProcessingStep[]>([]);
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const pdfEngineRef = useRef<PDFEngine>();

  const processFiles = useCallback(async () => {
    if (files.length === 0) {
      toast.error('Please select files to process');
      return;
    }

    setProcessing(true);
    setResults([]);

    try {
      if (!pdfEngineRef.current) {
        pdfEngineRef.current = new PDFEngine();
      }

      const engine = pdfEngineRef.current;
      let processedResults: { name: string; url: string }[] = [];

      // Initialize processing steps based on tool type
      const processingSteps = getProcessingSteps(tool, files.length);
      setSteps(processingSteps);

      // Process files based on tool type
      if (tool === "image-to-pdf") {
        // Handle image to PDF conversion
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) {
          throw new Error('Please select image files for conversion');
        }

        updateStep('converting', 'processing', 0);
        
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const progress = ((i + 1) / imageFiles.length) * 100;
          
          updateStep('converting', 'processing', progress);
          
          const result = await engine.imageToPdf(file);
          processedResults.push({
            name: `${file.name.split('.')[0]}.pdf`,
            url: result
          });
        }

        updateStep('converting', 'completed', 100);
      } else {
        // Handle other PDF operations
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const progress = ((i + 1) / files.length) * 100;

          updateStep('processing', 'processing', progress);

          let result: string;
          switch (tool) {
            case "merge":
              result = await engine.merge(files);
              break;
            case "split":
              result = await engine.split(file);
              break;
            case "compress":
              result = await engine.compress(file);
              break;
            case "rotate":
              result = await engine.rotate(file, 90);
              break;
            case "convert":
              result = await engine.convertToImage(file);
              break;
            case "protect":
              result = await engine.protect(file, 'password123');
              break;
            case "unlock":
              result = await engine.unlock(file, 'password123');
              break;
            case "watermark":
              result = await engine.addWatermark(file, 'CONFIDENTIAL');
              break;
            case "extract":
              result = await engine.extractPages(file, [1, 2]);
              break;
            case "crop":
              result = await engine.crop(file, { x: 0, y: 0, width: 500, height: 700 });
              break;
            case "edit":
              result = await engine.editText(file, 'New text content');
              break;
            default:
              throw new Error(`Tool ${tool} not implemented`);
          }

          processedResults.push({
            name: `processed_${file.name}`,
            url: result
          });
        }

        updateStep('processing', 'completed', 100);
      }

      updateStep('finalizing', 'completed', 100);
      setResults(processedResults);
      
      toast.success(`Successfully processed ${processedResults.length} file(s)`);
      
    } catch (error) {
      console.error('Processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Processing failed: ${errorMessage}`);
      
      // Mark current step as error
      setSteps(prev => prev.map(step => 
        step.status === 'processing' 
          ? { ...step, status: 'error' as const }
          : step
      ));
    } finally {
      setProcessing(false);
    }
  }, [files, tool]);

  const getProcessingSteps = (tool: ProcessingTool, fileCount: number): ProcessingStep[] => {
    const baseSteps = [
      { id: 'validation', name: 'Validating files', status: 'completed' as const, progress: 100 },
    ];

    if (tool === "image-to-pdf") {
      return [
        ...baseSteps,
        { id: 'converting', name: 'Converting images to PDF', status: 'pending' as const, progress: 0 },
        { id: 'finalizing', name: 'Finalizing documents', status: 'pending' as const, progress: 0 },
      ];
    }

    return [
      ...baseSteps,
      { id: 'processing', name: `Processing ${fileCount} file(s)`, status: 'pending' as const, progress: 0 },
      { id: 'finalizing', name: 'Finalizing results', status: 'pending' as const, progress: 0 },
    ];
  };

  const updateStep = (stepId: string, status: ProcessingStep['status'], progress: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status, progress }
        : step
    ));
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllFiles = () => {
    results.forEach(result => {
      downloadFile(result.url, result.name);
    });
    toast.success('All files downloaded successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-bold capitalize">{tool.replace('-', ' ')} Tool</h1>
          <p className="text-muted-foreground">
            {tool === "image-to-pdf" 
              ? "Convert your images to PDF format"
              : `Process your PDF files with our ${tool} tool`
            }
          </p>
        </div>
      </div>

      {/* File Upload */}
      <FileUploader
        files={files}
        onFilesChange={setFiles}
        acceptedTypes={tool === "image-to-pdf" ? "image/*" : ".pdf"}
        maxFiles={tool === "merge" ? 10 : 1}
        disabled={processing}
      />

      {/* Processing */}
      {(processing || results.length > 0) && (
        <div className="space-y-6">
          <ProgressTracker steps={steps} />
          
          {/* Process Button */}
          {files.length > 0 && !processing && results.length === 0 && (
            <div className="flex justify-center">
              <Button 
                onClick={processFiles}
                size="lg"
                className="px-8"
              >
                Start Processing
              </Button>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Processing Complete</h3>
                <Button onClick={downloadAllFiles} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download All
                </Button>
              </div>
              
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{result.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(result.url, result.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
