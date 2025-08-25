
import React, { useState, useCallback } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { FileUploader } from '@/components/pdf/FileUploader';
import { PDFEngine } from '@/components/pdf/PDFEngine';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { FileCard } from '@/components/ui/file-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { fileCleanupService } from '@/services/FileCleanupService';
import { toast } from '@/hooks/use-toast';
import { Download, Upload } from 'lucide-react';

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFile, setProcessedFile] = useState<{ blob: Blob; filename: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFilesChange = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProcessedFile(null);
    setProgress(0);
  }, []);

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Need more files",
        description: "Please select at least 2 PDF files to merge",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Smooth progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const result = await PDFEngine.mergePDFs(files);
      const mergedBlob = new Blob([result], { type: 'application/pdf' });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      const fileId = fileCleanupService.storeFile(mergedBlob, `merged-${Date.now()}.pdf`);
      setProcessedFile({ blob: mergedBlob, filename: 'merged-document.pdf' });
      
      toast({
        title: "✨ Merge completed!",
        description: "Your PDFs have been merged successfully.",
      });

    } catch (error: any) {
      console.error('Merge error:', error);
      toast({
        title: "Merge failed",
        description: error.message || 'An error occurred while merging PDFs.',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedFile) return;
    
    const url = URL.createObjectURL(processedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = processedFile.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your merged PDF is being downloaded.",
    });
  };

  return (
    <>
      <SEOHead
        title="Merge PDF Files Online - Combine Multiple PDFs | PDFMasterPro"
        description="Easily merge multiple PDF files into one document online. Fast, secure, and free PDF merger tool. No registration required."
        keywords="merge PDF, combine PDF, PDF merger, join PDF files, PDF tools online"
        canonicalUrl="/tools/merge-pdf"
      />
      
      <ToolLayout
        title="Merge PDF Files"
        description="Combine multiple PDF files into one document instantly"
        icon={<Upload className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <FileUploader 
              files={files}
              onFilesChange={setFiles}
              allowMultiple={true}
              acceptedTypes=".pdf"
              title="Select PDF files to merge"
              description="Choose 2 or more PDF files"
            />

            {files.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Files to merge ({files.length})</h3>
                {files.map((file, index) => (
                  <FileCard
                    key={`${file.name}-${index}`}
                    file={file}
                    filename={file.name}
                    onRemove={() => {
                      const newFiles = files.filter((_, i) => i !== index);
                      setFiles(newFiles);
                    }}
                  />
                ))}
              </div>
            )}
            
            <ProfessionalButton 
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className="w-full"
              size="lg"
              loading={isProcessing}
              gradient={true}
            >
              Merge {files.length} PDF{files.length !== 1 ? 's' : ''}
            </ProfessionalButton>

            {isProcessing && (
              <ProgressBar progress={progress} animated={true} />
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {processedFile ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-green-600">✅ Merge Complete</h3>
                <FileCard
                  file={processedFile.blob}
                  filename={processedFile.filename}
                  onDownload={handleDownload}
                  isProcessed={true}
                />
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Merged PDF will appear here</p>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
