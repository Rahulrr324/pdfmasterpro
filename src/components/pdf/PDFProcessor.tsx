
import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { FileUploader } from './FileUploader';
import { ProgressTracker } from './ProgressTracker';
import { PDFEngine } from './PDFEngine';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';

export type ProcessingTool = 
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

export interface PDFProcessorProps {
  tool: ProcessingTool;
  onBack?: () => void;
  toolId?: string;
}

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

export const PDFProcessor: React.FC<PDFProcessorProps> = ({ tool, onBack, toolId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const [options, setOptions] = useState<Record<string, any>>({});

  const processFiles = useCallback(async () => {
    if (files.length === 0) {
      toast.error('Please select files to process');
      return;
    }

    setProcessing(true);
    setProgress(0);
    setError('');
    setResults([]);
    setCurrentStep('Initializing...');

    try {
      let processedResults: { name: string; url: string }[] = [];

      // Process files based on tool type
      if (tool === "image-to-pdf") {
        // Handle image to PDF conversion
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) {
          throw new Error('Please select image files for conversion');
        }

        setCurrentStep('Converting images to PDF...');
        setProgress(25);
        
        const result = await PDFEngine.convertImagesToPDF(imageFiles);
        const blob = new Blob([result], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        processedResults.push({
          name: 'converted_images.pdf',
          url: url
        });

        setProgress(100);
      } else if (tool === "merge") {
        setCurrentStep('Merging PDF files...');
        setProgress(50);
        const result = await PDFEngine.mergePDFs(files);
        const blob = new Blob([result], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        processedResults.push({
          name: 'merged_document.pdf',
          url: url
        });
        setProgress(100);
      } else {
        // Handle other PDF operations
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileProgress = ((i + 1) / files.length) * 100;

          setCurrentStep(`Processing ${file.name}...`);
          setProgress(fileProgress);

          let result: Uint8Array;
          switch (tool) {
            case "split":
              const splitResults = await PDFEngine.splitPDF(file, options);
              for (let j = 0; j < splitResults.length; j++) {
                const blob = new Blob([splitResults[j]], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                processedResults.push({
                  name: `${file.name.split('.')[0]}_part_${j + 1}.pdf`,
                  url: url
                });
              }
              continue;
            case "compress":
              result = await PDFEngine.compressPDF(file, options);
              break;
            case "rotate":
              result = await PDFEngine.rotatePDF(file, options);
              break;
            case "protect":
              result = await PDFEngine.protectPDF(file, options);
              break;
            case "unlock":
              result = await PDFEngine.unlockPDF(file, options);
              break;
            case "watermark":
              result = await PDFEngine.addWatermark(file, options);
              break;
            case "extract":
              result = await PDFEngine.extractPages(file, options);
              break;
            case "crop":
              result = await PDFEngine.cropPDF(file, options);
              break;
            case "edit":
              result = await PDFEngine.editPDF(file, options);
              break;
            case "convert":
              const convertResult = await PDFEngine.convertPDF(file, { ...options, toolId });
              if (typeof convertResult === 'string') {
                // Text extraction result
                const blob = new Blob([convertResult], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                processedResults.push({
                  name: `${file.name.split('.')[0]}.txt`,
                  url: url
                });
                continue;
              } else {
                result = convertResult;
              }
              break;
            default:
              throw new Error(`Tool ${tool} not implemented`);
          }

          const blob = new Blob([result], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          processedResults.push({
            name: `processed_${file.name}`,
            url: url
          });
        }
      }

      setCurrentStep('Processing complete!');
      setProgress(100);
      setResults(processedResults);
      
      toast.success(`Successfully processed ${processedResults.length} file(s)`);
      
    } catch (error) {
      console.error('Processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Processing failed: ${errorMessage}`);
    } finally {
      setProcessing(false);
    }
  }, [files, tool, options, toolId]);

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
      />

      {/* Processing */}
      {(processing || results.length > 0) && (
        <div className="space-y-6">
          <ProgressTracker 
            isProcessing={processing}
            progress={progress}
            currentStep={currentStep}
            error={error}
            totalFiles={files.length}
            processedFiles={progress === 100 ? files.length : Math.floor((progress / 100) * files.length)}
          />
          
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
