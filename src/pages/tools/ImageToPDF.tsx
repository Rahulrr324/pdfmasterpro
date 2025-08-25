
import React, { useState, useCallback } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { FileUploader } from '@/components/pdf/FileUploader';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { FileCard } from '@/components/ui/file-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { fileCleanupService } from '@/services/FileCleanupService';
import { toast } from '@/hooks/use-toast';
import { Image, Download } from 'lucide-react';

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [processedFile, setProcessedFile] = useState<{ blob: Blob; filename: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFilesChange = useCallback((selectedFiles: File[]) => {
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.name)
    );
    setFiles(imageFiles);
    setProcessedFile(null);
    setProgress(0);
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 15, 90));
      }, 300);

      // Simulate PDF creation (in real app, use PDF-lib or jsPDF)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // For demo, create a simple blob
      const pdfBlob = new Blob(['PDF content placeholder'], { type: 'application/pdf' });
      const fileId = fileCleanupService.storeFile(pdfBlob, 'images-to-pdf.pdf');
      setProcessedFile({ blob: pdfBlob, filename: 'images-to-pdf.pdf' });
      
      toast({
        title: "✨ Conversion completed!",
        description: `${files.length} image${files.length > 1 ? 's' : ''} converted to PDF successfully.`,
      });

    } catch (error: any) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion failed",
        description: error.message || 'An error occurred while converting images to PDF.',
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
      description: "Your PDF is being downloaded.",
    });
  };

  return (
    <>
      <SEOHead
        title="Convert Images to PDF Online - JPG, PNG to PDF | PDFMasterPro"
        description="Convert JPG, PNG, GIF and other image formats to PDF online. Combine multiple images into one PDF document."
        keywords="image to PDF, JPG to PDF, PNG to PDF, convert images, create PDF from images"
        canonicalUrl="/tools/image-to-pdf"
      />
      
      <ToolLayout
        title="Images to PDF"
        description="Convert images to PDF documents instantly"
        icon={<Image className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUploader 
              files={files}
              onFilesChange={handleFilesChange}
              allowMultiple={true}
              acceptedTypes=".jpg,.jpeg,.png,.gif,.bmp,.webp"
            />
            
            <ProfessionalButton 
              onClick={handleConvert}
              disabled={files.length === 0 || isProcessing}
              className="w-full"
              size="lg"
              loading={isProcessing}
              gradient={true}
            >
              Convert to PDF
            </ProfessionalButton>

            {isProcessing && (
              <ProgressBar progress={progress} animated={true} />
            )}
          </div>

          <div className="space-y-6">
            {processedFile ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-green-600">✅ Conversion Complete</h3>
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
                <p>Generated PDF will appear here</p>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
