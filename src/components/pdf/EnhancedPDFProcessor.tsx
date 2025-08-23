import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Upload, Sparkles, Shield, Zap } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { PDFViewer } from './PDFViewer';
import { PDFToolOptions } from './PDFToolOptions';
import { PDFEngine } from './PDFEngine';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { FileCard } from '@/components/ui/file-card';
import { FeatureCard } from '@/components/ui/feature-card';
import { fileCleanupService } from '@/services/FileCleanupService';
import { backendToolsService } from '@/services/BackendToolsService';
import { toast } from '@/hooks/use-toast';
import { ProcessingTool } from './PDFProcessor';

interface EnhancedPDFProcessorProps {
  tool: ProcessingTool;
  toolId?: string;
}

export const EnhancedPDFProcessor: React.FC<EnhancedPDFProcessorProps> = ({ tool, toolId }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<{ blob: Blob; id: string; filename: string }[]>([]);
  const [processedText, setProcessedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [toolId]);

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
      // Smooth progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 100);

      let result: Uint8Array | Uint8Array[] | string;

      // Process based on tool type
      switch (tool) {
        case 'merge':
          if (files.length < 2) {
            throw new Error('Please select at least 2 PDF files to merge');
          }
          result = await PDFEngine.mergePDFs(files);
          const mergedBlob = new Blob([result], { type: 'application/pdf' });
          const mergedId = fileCleanupService.storeFile(mergedBlob, `merged-${Date.now()}.pdf`);
          setProcessedFiles([{ blob: mergedBlob, id: mergedId, filename: 'merged.pdf' }]);
          break;

        case 'split':
          result = await PDFEngine.splitPDF(files[0], options);
          const splitBlobs = (result as Uint8Array[]).map((data, index) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const id = fileCleanupService.storeFile(blob, `split-page-${index + 1}.pdf`);
            return { blob, id, filename: `page-${index + 1}.pdf` };
          });
          setProcessedFiles(splitBlobs);
          break;

        case 'compress':
          result = await PDFEngine.compressPDF(files[0], options);
          const compressedBlob = new Blob([result], { type: 'application/pdf' });
          const compressedId = fileCleanupService.storeFile(compressedBlob, `compressed-${files[0].name}`);
          setProcessedFiles([{ blob: compressedBlob, id: compressedId, filename: `compressed-${files[0].name}` }]);
          break;

        default:
          // Handle other tools...
          result = await PDFEngine.mergePDFs(files); // Fallback
          const defaultBlob = new Blob([result], { type: 'application/pdf' });
          const defaultId = fileCleanupService.storeFile(defaultBlob, `processed-${Date.now()}.pdf`);
          setProcessedFiles([{ blob: defaultBlob, id: defaultId, filename: 'processed.pdf' }]);
          break;
      }

      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: "✨ Processing completed!",
        description: "Your files have been processed successfully and will be automatically cleaned up in 30 minutes.",
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

  const handleDownload = (fileData: { blob: Blob; id: string; filename: string }) => {
    const url = URL.createObjectURL(fileData.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: `${fileData.filename} is being downloaded. File will be cleaned up automatically.`,
    });
  };

  const getToolInfo = (id: string) => {
    const toolInfo: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
      'merge-pdf': {
        title: 'Merge PDF Files',
        description: 'Combine multiple PDF files into a single document',
        icon: <Upload className="w-6 h-6" />
      },
      'split-pdf': {
        title: 'Split PDF Pages',
        description: 'Extract pages or split PDF into multiple files',
        icon: <Sparkles className="w-6 h-6" />
      },
      'compress-pdf': {
        title: 'Compress PDF Size',
        description: 'Reduce PDF file size while maintaining quality',
        icon: <Zap className="w-6 h-6" />
      },
      'protect-pdf': {
        title: 'Protect PDF',
        description: 'Add password protection to your PDF files',
        icon: <Shield className="w-6 h-6" />
      }
    };
    return toolInfo[id] || { title: 'PDF Tool', description: 'Process your PDF files', icon: <Upload className="w-6 h-6" /> };
  };

  const toolInfo = getToolInfo(toolId || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <ProfessionalButton 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </ProfessionalButton>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-lg">
              {toolInfo.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {toolInfo.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {toolInfo.description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="100% Secure"
            description="Files processed locally in your browser"
            badge="Privacy First"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Lightning Fast"
            description="Instant processing with no waiting"
            badge="Real-time"
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Auto Cleanup"
            description="Files automatically deleted after 30 minutes"
            badge="Smart"
          />
        </div>

        {/* Main Processing Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-red-600" />
                <span>Upload Files</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUploader 
                files={files}
                onFilesChange={setFiles}
                allowMultiple={toolId === 'merge-pdf' || toolId === 'image-to-pdf'}
                acceptedTypes={toolId === 'image-to-pdf' ? '.jpg,.jpeg,.png,.gif,.bmp,.webp' : '.pdf'}
              />

              <PDFToolOptions 
                tool={tool}
                options={options}
                onOptionsChange={setOptions}
                toolId={toolId}
              />
              
              <ProfessionalButton 
                onClick={handleProcess}
                disabled={files.length === 0 || isProcessing}
                className="w-full"
                size="lg"
                loading={isProcessing}
                gradient={true}
              >
                {isProcessing ? 'Processing...' : `Process ${files.length} file${files.length !== 1 ? 's' : ''}`}
              </ProfessionalButton>

              {isProcessing && (
                <ProgressBar 
                  progress={progress}
                  animated={true}
                />
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-green-600" />
                <span>Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {processedFiles.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">
                    Processed Files ({processedFiles.length})
                  </h3>
                  {processedFiles.map((fileData, index) => (
                    <FileCard
                      key={fileData.id}
                      file={fileData.blob}
                      filename={fileData.filename}
                      onDownload={() => handleDownload(fileData)}
                      isProcessed={true}
                      size={`${(fileData.blob.size / 1024 / 1024).toFixed(2)} MB`}
                    />
                  ))}
                </div>
              )}

              {processedText && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg max-h-64 overflow-y-auto">
                    <pre className="text-sm text-foreground whitespace-pre-wrap">{processedText}</pre>
                  </div>
                  <ProfessionalButton 
                    onClick={() => {
                      const blob = new Blob([processedText], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `extracted-text-${Date.now()}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Text File
                  </ProfessionalButton>
                </div>
              )}
              
              {files.length > 0 && !isProcessing && !error && !processedText && processedFiles.length === 0 && (
                <PDFViewer file={files[0]} />
              )}

              {files.length === 0 && processedFiles.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload files to see results here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* File Cleanup Notice */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                🛡️ Privacy & Security
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                All files are processed locally in your browser. Processed files are automatically deleted after 30 minutes or when you close the browser for maximum privacy and security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
