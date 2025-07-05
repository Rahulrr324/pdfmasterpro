
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  allowMultiple?: boolean;
  acceptedTypes?: string;
  maxSizeInMB?: number;
}

export const FileUploader = ({ 
  files, 
  onFilesChange, 
  allowMultiple = false, 
  acceptedTypes = ".pdf",
  maxSizeInMB = 10 
}: FileUploaderProps) => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const validateFile = (file: File): boolean => {
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `${file.name} exceeds ${maxSizeInMB}MB limit`,
        variant: "destructive"
      });
      return false;
    }

    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      toast({
        title: "Invalid file type",
        description: `${file.name} is not a valid PDF file`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const processFiles = async (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    
    for (const file of selectedFiles) {
      if (validateFile(file)) {
        // Simulate upload progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Progress simulation
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[file.name] || 0;
            if (currentProgress >= 100) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [file.name]: currentProgress + 20 };
          });
        }, 100);

        validFiles.push(file);
        
        // Complete progress after 500ms
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        }, 500);
      }
    }

    if (validFiles.length > 0) {
      onFilesChange(allowMultiple ? [...files, ...validFiles] : validFiles);
      toast({
        title: "Files uploaded successfully",
        description: `${validFiles.length} file(s) ready for processing`,
      });
    }
  };

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
  }, [files, onFilesChange, allowMultiple, maxSizeInMB, toast]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    processFiles(droppedFiles);
  }, [files, onFilesChange, allowMultiple]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    
    // Remove progress tracking
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });

    toast({
      title: "File removed",
      description: `${fileToRemove.name} has been removed`,
    });
  };

  const getFileIcon = (file: File) => {
    return <FileText className="w-5 h-5 text-red-500" />;
  };

  const getFileStatus = (fileName: string) => {
    const progress = uploadProgress[fileName];
    if (progress === undefined) return null;
    if (progress === 100) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (progress > 0) return <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Upload Area */}
      <div className="space-y-2">
        <Label htmlFor="file-upload" className="text-base font-semibold">
          Select {allowMultiple ? 'PDF Files' : 'PDF File'}
        </Label>
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragOver 
              ? 'border-primary bg-primary/5 scale-[1.02]' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Upload className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-sm text-muted-foreground">
                or click to browse your files
              </p>
            </div>

            <Input
              id="file-upload"
              type="file"
              accept={acceptedTypes}
              multiple={allowMultiple}
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <Badge variant="secondary" className="px-3 py-1">
                Max {maxSizeInMB}MB
              </Badge>
              {allowMultiple && (
                <Badge variant="secondary" className="px-3 py-1">
                  Multiple files supported
                </Badge>
              )}
              <Badge variant="secondary" className="px-3 py-1">
                PDF only
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">
              Selected Files ({files.length})
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onFilesChange([]);
                setUploadProgress({});
              }}
              className="text-destructive hover:text-destructive"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="bg-card border rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(file.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getFileStatus(file.name)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress bar for uploading files */}
                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                  <div className="mt-3 space-y-1">
                    <Progress value={uploadProgress[file.name]} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Uploading... {uploadProgress[file.name]}%
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Stats */}
      {files.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{files.length}</p>
              <p className="text-xs text-muted-foreground">Files Selected</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {(files.reduce((total, file) => total + file.size, 0) / (1024 * 1024)).toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Total MB</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">
                {Object.values(uploadProgress).filter(p => p === 100).length}
              </p>
              <p className="text-xs text-muted-foreground">Ready</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
