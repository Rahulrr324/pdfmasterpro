
import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { PDFViewer } from './PDFViewer';
import { PDFToolOptions } from './PDFToolOptions';
import { ProgressTracker } from './ProgressTracker';

export type ProcessingTool = 'merge' | 'split' | 'rotate' | 'compress' | 'extract' | 'watermark' | 'crop' | 'view' | 'convert' | 'protect' | 'unlock' | 'edit';

interface PDFProcessorProps {
  tool: ProcessingTool;
  toolId?: string;
}

export const PDFProcessor: React.FC<PDFProcessorProps> = ({ tool, toolId }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  // Scroll to top when component mounts or tool changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [toolId]);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProcessedFile(null);
    setError(null);
    setProgress(0);
  }, []);

  const handleOptionsChange = useCallback((newOptions: Record<string, any>) => {
    setOptions(newOptions);
  }, []);

  const handleProcess = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      let progressInterval: NodeJS.Timeout;
      
      // Simulate processing with progress updates
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Check if tool requires backend processing
      const backendTools = [
        'pdf-to-word', 'pdf-to-excel', 'word-to-pdf', 'excel-to-pdf', 
        'html-to-pdf', 'protect-pdf', 'unlock-pdf', 'edit-pdf', 
        'ocr-pdf', 'translate-pdf', 'summarize-pdf', 'chat-pdf',
        'pdf-to-jpg', 'pdf-to-png'
      ];

      if (toolId && backendTools.includes(toolId)) {
        // Show "Coming Soon" message for backend tools
        clearInterval(progressInterval);
        setProgress(100);
        setError('This tool is coming soon! Backend processing features are under development.');
      } else {
        // Simulate client-side processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearInterval(progressInterval);
        setProgress(100);
        
        // Create a dummy processed file for demo
        const dummyBlob = new Blob(['Processed PDF content'], { type: 'application/pdf' });
        setProcessedFile(dummyBlob);
      }
    } catch (err) {
      setError('An error occurred while processing the file.');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `processed-${toolId || 'file'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getToolTitle = (id: string) => {
    const toolTitles: Record<string, string> = {
      'merge-pdf': 'Merge PDF Files',
      'split-pdf': 'Split PDF Pages',
      'compress-pdf': 'Compress PDF Size',
      'pdf-to-word': 'PDF to Word Converter',
      'pdf-to-excel': 'PDF to Excel Converter',
      'rotate-pdf': 'Rotate PDF Pages',
      'crop-pdf': 'Crop PDF Pages',
      'watermark-pdf': 'Add Watermark',
      'extract-pages': 'Extract Pages',
      'protect-pdf': 'Protect PDF',
      'unlock-pdf': 'Unlock PDF',
      'edit-pdf': 'Edit PDF',
      'view-pdf': 'View PDF',
      'pdf-to-text': 'PDF to Text',
      'image-to-pdf': 'Image to PDF',
      'pdf-to-jpg': 'PDF to JPG',
      'pdf-to-png': 'PDF to PNG',
      'word-to-pdf': 'Word to PDF',
      'excel-to-pdf': 'Excel to PDF',
      'html-to-pdf': 'HTML to PDF',
      'ocr-pdf': 'OCR PDF Scanner',
      'translate-pdf': 'Translate PDF',
      'summarize-pdf': 'AI PDF Summarizer',
      'chat-pdf': 'Chat with PDF'
    };
    return toolTitles[id] || 'PDF Tool';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <h1 className="text-3xl font-bold text-foreground">
          {getToolTitle(toolId || '')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader 
              onFilesSelected={handleFilesSelected}
              maxFiles={toolId === 'merge-pdf' ? 10 : 1}
              acceptedTypes={['.pdf']}
            />
            
            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Selected Files:</h3>
                <ul className="space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <PDFToolOptions 
              tool={tool}
              options={options}
              onOptionsChange={handleOptionsChange}
              toolId={toolId}
            />
            
            <Button 
              onClick={handleProcess}
              disabled={files.length === 0 || isProcessing}
              className="w-full mt-4"
            >
              {isProcessing ? 'Processing...' : `Process ${getToolTitle(toolId || '')}`}
            </Button>
          </CardContent>
        </Card>

        {/* Preview/Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview & Results</CardTitle>
          </CardHeader>
          <CardContent>
            {(isProcessing || progress > 0) && (
              <ProgressTracker 
                isProcessing={isProcessing}
                progress={progress}
                error={error}
              />
            )}
            
            {error && !isProcessing && (
              <div className="flex items-center space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-yellow-800">{error}</span>
              </div>
            )}
            
            {files.length > 0 && !isProcessing && !error && (
              <PDFViewer file={files[0]} />
            )}
            
            {processedFile && (
              <div className="mt-4">
                <Button onClick={handleDownload} className="w-full">
                  Download Processed File
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
