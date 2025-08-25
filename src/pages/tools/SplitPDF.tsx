
import React, { useState, useCallback } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { FileUploader } from '@/components/pdf/FileUploader';
import { PDFEngine } from '@/components/pdf/PDFEngine';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { FileCard } from '@/components/ui/file-card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fileCleanupService } from '@/services/FileCleanupService';
import { toast } from '@/hooks/use-toast';
import { Scissors, Download } from 'lucide-react';

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processedFiles, setProcessedFiles] = useState<Array<{ blob: Blob; filename: string }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [splitMode, setSplitMode] = useState<'individual' | 'range' | 'intervals'>('individual');
  const [startPage, setStartPage] = useState('1');
  const [endPage, setEndPage] = useState('1');
  const [interval, setInterval] = useState('1');

  const handleFileChange = useCallback((selectedFiles: File[]) => {
    setFile(selectedFiles[0] || null);
    setProcessedFiles([]);
    setProgress(0);
  }, []);

  const handleSplit = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to split",
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

      const options = {
        mode: splitMode,
        startPage: parseInt(startPage),
        endPage: parseInt(endPage),
        interval: parseInt(interval)
      };

      const results = await PDFEngine.splitPDF(file, options);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      const processedFiles = results.map((data, index) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const filename = splitMode === 'individual' 
          ? `page-${index + 1}.pdf` 
          : `split-${index + 1}.pdf`;
        
        fileCleanupService.storeFile(blob, filename);
        return { blob, filename };
      });

      setProcessedFiles(processedFiles);
      
      toast({
        title: "✨ Split completed!",
        description: `PDF split into ${processedFiles.length} files.`,
      });

    } catch (error: any) {
      console.error('Split error:', error);
      toast({
        title: "Split failed",
        description: error.message || 'An error occurred while splitting the PDF.',
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (fileData: { blob: Blob; filename: string }) => {
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
      description: `${fileData.filename} is being downloaded.`,
    });
  };

  return (
    <>
      <SEOHead
        title="Split PDF Pages - Extract & Separate PDF Files | PDFMasterPro"
        description="Split large PDF files into smaller documents or extract specific pages. Professional PDF splitting tool with multiple options."
        keywords="split PDF, extract pages, separate PDF, PDF splitter, divide PDF"
        canonicalUrl="/tools/split-pdf"
      />
      
      <ToolLayout
        title="Split PDF Pages"
        description="Extract pages or split PDF into multiple files"
        icon={<Scissors className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Options Section */}
          <div className="space-y-6">
            <FileUploader 
              files={file ? [file] : []}
              onFilesChange={handleFileChange}
              allowMultiple={false}
              acceptedTypes=".pdf"
              title="Select PDF file to split"
              description="Choose a PDF file"
            />

            {file && (
              <Card>
                <CardHeader>
                  <CardTitle>Split Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Split Mode</Label>
                    <Select value={splitMode} onValueChange={(value: any) => setSplitMode(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Split into individual pages</SelectItem>
                        <SelectItem value="range">Extract page range</SelectItem>
                        <SelectItem value="intervals">Split by intervals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {splitMode === 'range' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Page</Label>
                        <Input 
                          type="number" 
                          min="1"
                          value={startPage}
                          onChange={(e) => setStartPage(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>End Page</Label>
                        <Input 
                          type="number" 
                          min="1"
                          value={endPage}
                          onChange={(e) => setEndPage(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {splitMode === 'intervals' && (
                    <div>
                      <Label>Pages per file</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            <ProfessionalButton 
              onClick={handleSplit}
              disabled={!file || isProcessing}
              className="w-full"
              size="lg"
              loading={isProcessing}
              gradient={true}
            >
              Split PDF
            </ProfessionalButton>

            {isProcessing && (
              <ProgressBar progress={progress} animated={true} />
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {processedFiles.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-green-600">
                  ✅ Split Complete ({processedFiles.length} files)
                </h3>
                {processedFiles.map((fileData, index) => (
                  <FileCard
                    key={index}
                    file={fileData.blob}
                    filename={fileData.filename}
                    onDownload={() => handleDownload(fileData)}
                    isProcessed={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Split files will appear here</p>
              </div>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
