import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Download, Clock, Info, Wifi, WifiOff } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { PDFViewer } from './PDFViewer';
import { PDFToolOptions } from './PDFToolOptions';
import { ProgressTracker } from './ProgressTracker';
import { PDFEngine } from './PDFEngine';
import { backendToolsService, aiToolsService } from '@/services/BackendToolsService';
import { robustSupabase } from '@/integrations/supabase/robust-client';
import { toast } from '@/hooks/use-toast';

export type ProcessingTool = 'merge' | 'split' | 'rotate' | 'compress' | 'extract' | 'watermark' | 'crop' | 'view' | 'convert' | 'protect' | 'unlock' | 'edit';

interface PDFProcessorProps {
  tool: ProcessingTool;
  toolId?: string;
}

const CLIENT_SIDE_TOOLS = [
  'merge-pdf', 'split-pdf', 'rotate-pdf', 'compress-pdf', 
  'extract-pages', 'watermark-pdf', 'crop-pdf', 'view-pdf', 
  'pdf-to-text', 'image-to-pdf'
];

const SERVER_SIDE_TOOLS = [
  'pdf-to-word', 'pdf-to-excel', 'pdf-to-jpg', 'pdf-to-png',
  'word-to-pdf', 'excel-to-pdf', 'html-to-pdf', 'protect-pdf',
  'unlock-pdf', 'edit-pdf', 'ocr-pdf', 'translate-pdf', 
  'summarize-pdf', 'chat-pdf'
];

export const PDFProcessor: React.FC<PDFProcessorProps> = ({ tool, toolId }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<Blob[]>([]);
  const [processedText, setProcessedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [backendStatus, setBackendStatus] = useState<{ available: boolean; services: string[] }>({ available: false, services: [] });

  const isClientSide = toolId ? CLIENT_SIDE_TOOLS.includes(toolId) : false;
  const isServerSide = toolId ? SERVER_SIDE_TOOLS.includes(toolId) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    checkBackendStatus();
  }, [toolId]);

  const checkBackendStatus = async () => {
    try {
      const status = await backendToolsService.checkBackendStatus();
      setBackendStatus(status);
    } catch (error) {
      console.error('Failed to check backend status:', error);
      setBackendStatus({ available: false, services: [] });
    }
  };

  const handleFilesChange = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProcessedFiles([]);
    setProcessedText('');
    setError(null);
    setProgress(0);
  }, []);

  const handleOptionsChange = useCallback((newOptions: Record<string, any>) => {
    setOptions(newOptions);
  }, []);

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setProcessedFiles([]);
    setProcessedText('');

    try {
      let progressInterval: NodeJS.Timeout;
      
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Handle server-side tools with backend processing
      if (isServerSide) {
        if (!backendStatus.available) {
          // Use simulation for demo purposes
          const result = await backendToolsService.simulateProcessing({
            toolId: toolId!,
            files,
            options
          });
          
          if (result.success && result.data) {
            if (typeof result.data === 'string') {
              setProcessedText(result.data);
            } else if (result.data instanceof Blob) {
              setProcessedFiles([result.data]);
            } else if (Array.isArray(result.data)) {
              setProcessedFiles(result.data);
            }
          } else {
            throw new Error(result.error || 'Processing failed');
          }
        } else {
          // Use actual backend processing
          const result = await backendToolsService.processWithBackend({
            toolId: toolId!,
            files,
            options
          });

          if (result.success && result.data) {
            if (typeof result.data === 'string') {
              setProcessedText(result.data);
            } else if (result.data instanceof Blob) {
              setProcessedFiles([result.data]);
            } else if (Array.isArray(result.data)) {
              setProcessedFiles(result.data);
            }
          } else {
            if (result.requiresAuth) {
              throw new Error('This feature requires authentication. Please sign in to continue.');
            }
            throw new Error(result.error || 'Processing failed');
          }
        }
      } else {
        // Handle client-side processing
        let result: Uint8Array | Uint8Array[] | string;

        switch (tool) {
          case 'merge':
            if (files.length < 2) {
              throw new Error('Please select at least 2 PDF files to merge');
            }
            result = await PDFEngine.mergePDFs(files);
            setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            break;

          case 'split':
            result = await PDFEngine.splitPDF(files[0], options);
            const splitBlobs = (result as Uint8Array[]).map(data => 
              new Blob([data], { type: 'application/pdf' })
            );
            setProcessedFiles(splitBlobs);
            break;

          case 'compress':
            result = await PDFEngine.compressPDF(files[0], options);
            setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            break;

          case 'rotate':
            result = await PDFEngine.rotatePDF(files[0], options);
            setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            break;

          case 'extract':
            result = await PDFEngine.extractPages(files[0], options);
            setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            break;

          case 'watermark':
            result = await PDFEngine.addWatermark(files[0], options);
            setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            break;

          case 'crop':
            result = await PDFEngine.cropPDF(files[0], options);
            setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            break;

          case 'convert':
            if (toolId === 'pdf-to-text') {
              result = await PDFEngine.convertPDF(files[0], { toolId });
              setProcessedText(result as string);
            } else if (toolId === 'image-to-pdf') {
              result = await PDFEngine.convertImagesToPDF(files);
              setProcessedFiles([new Blob([result], { type: 'application/pdf' })]);
            } else {
              throw new Error('This conversion tool requires server processing');
            }
            break;

          default:
            throw new Error(`Tool ${tool} requires server processing`);
        }
      }

      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: "Processing completed",
        description: "Your file has been processed successfully",
      });

    } catch (err: any) {
      console.error('Processing error:', err);
      setError(err.message || 'An error occurred while processing the file.');
      toast({
        title: "Processing failed",
        description: err.message || 'An error occurred while processing the file.',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (fileIndex: number = 0) => {
    if (processedText) {
      const blob = new Blob([processedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted-text-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (processedFiles[fileIndex]) {
      const url = URL.createObjectURL(processedFiles[fileIndex]);
      const a = document.createElement('a');
      a.href = url;
      const suffix = processedFiles.length > 1 ? `-${fileIndex + 1}` : '';
      a.download = `processed-${toolId || 'file'}${suffix}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadAll = () => {
    processedFiles.forEach((_, index) => {
      setTimeout(() => handleDownload(index), index * 500);
    });
  };

  const getToolTitle = (id: string) => {
    const toolTitles: Record<string, string> = {
      'merge-pdf': 'Merge PDF Files',
      'split-pdf': 'Split PDF Pages',
      'compress-pdf': 'Compress PDF Size',
      'rotate-pdf': 'Rotate PDF Pages',
      'crop-pdf': 'Crop PDF Pages',
      'watermark-pdf': 'Add Watermark',
      'extract-pages': 'Extract Pages',
      'view-pdf': 'View PDF',
      'pdf-to-text': 'PDF to Text',
      'image-to-pdf': 'Image to PDF',
      'pdf-to-word': 'PDF to Word',
      'pdf-to-excel': 'PDF to Excel',
      'pdf-to-jpg': 'PDF to JPG',
      'pdf-to-png': 'PDF to PNG',
      'word-to-pdf': 'Word to PDF',
      'excel-to-pdf': 'Excel to PDF',
      'html-to-pdf': 'HTML to PDF',
      'protect-pdf': 'Protect PDF',
      'unlock-pdf': 'Unlock PDF',
      'edit-pdf': 'Edit PDF',
      'ocr-pdf': 'OCR PDF Scanner',
      'translate-pdf': 'Translate PDF',
      'summarize-pdf': 'AI PDF Summarizer',
      'chat-pdf': 'Chat with PDF'
    };
    return toolTitles[id] || 'PDF Tool';
  };

  const getAcceptedTypes = () => {
    if (toolId === 'image-to-pdf') {
      return '.jpg,.jpeg,.png,.gif,.bmp,.webp';
    }
    return '.pdf';
  };

  const allowMultiple = toolId === 'merge-pdf' || toolId === 'image-to-pdf';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            {getToolTitle(toolId || '')}
          </h1>
          <p className="text-muted-foreground text-sm mb-2">
            {isClientSide ? 'Instant processing in your browser' : 'Advanced server-side processing'}
          </p>
          
          {/* Backend Status Indicator */}
          <div className="flex justify-center items-center gap-2 mb-4">
            {robustSupabase.isReady() ? (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <Wifi className="w-3 h-3 mr-1 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  Backend Connected
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <WifiOff className="w-3 h-3 mr-1 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                  Demo Mode
                </span>
              </div>
            )}
          </div>

          {isServerSide && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-2">
              <Clock className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {backendStatus.available ? 'Advanced Processing Available' : 'Demo Mode - Connect Backend for Full Features'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUploader 
              files={files}
              onFilesChange={handleFilesChange}
              allowMultiple={allowMultiple}
              acceptedTypes={getAcceptedTypes()}
            />

            <PDFToolOptions 
              tool={tool}
              options={options}
              onOptionsChange={handleOptionsChange}
              toolId={toolId}
            />
            
            <Button 
              onClick={handleProcess}
              disabled={files.length === 0 || isProcessing}
              className="w-full"
              size="lg"
            >
              {isProcessing ? 'Processing...' : 
               `Process with ${getToolTitle(toolId || '')}`}
            </Button>

            {isServerSide && !backendStatus.available && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Demo Mode Active
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                      This tool is running in demo mode. Connect your Supabase backend for full functionality:
                    </p>
                    <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                      <li>• High-quality document conversion</li>
                      <li>• Advanced OCR and AI capabilities</li>
                      <li>• Enterprise-grade security</li>
                      <li>• Batch processing support</li>
                    </ul>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={checkBackendStatus}
                      className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/30"
                    >
                      Check Connection
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Preview & Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(isProcessing || progress > 0) && (
              <ProgressTracker 
                isProcessing={isProcessing}
                progress={progress}
                error={error}
              />
            )}
            
            {error && !isProcessing && (
              <div className="flex items-center space-x-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}

            {processedText && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg max-h-64 overflow-y-auto">
                  <pre className="text-sm text-foreground whitespace-pre-wrap">{processedText}</pre>
                </div>
                <Button onClick={() => handleDownload()} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Text File
                </Button>
              </div>
            )}
            
            {files.length > 0 && !isProcessing && !error && !processedText && (
              <PDFViewer file={files[0]} />
            )}
            
            {processedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-foreground">
                  Processed Files ({processedFiles.length})
                </h3>
                {processedFiles.length === 1 ? (
                  <Button onClick={() => handleDownload(0)} className="w-full" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Processed File
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button onClick={handleDownloadAll} className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Download All Files
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      {processedFiles.map((_, index) => (
                        <Button 
                          key={index}
                          onClick={() => handleDownload(index)}
                          variant="outline"
                          size="sm"
                        >
                          File {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
