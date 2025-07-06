
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileText, AlertCircle, CheckCircle, File } from "lucide-react";
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
  maxSizeInMB = 50 
}: FileUploaderProps) => {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeInMB * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxSizeInMB}MB limit`;
    }

    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      return `File "${file.name}" is not a valid PDF file`;
    }

    if (file.size === 0) {
      return `File "${file.name}" is empty`;
    }

    return null;
  };

  const processFiles = async (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    for (const file of selectedFiles) {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        const isDuplicate = files.some(existingFile => 
          existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (isDuplicate) {
          errors.push(`File "${file.name}" is already selected`);
        } else {
          validFiles.push(file);
        }
      }
    }

    if (errors.length > 0) {
      toast({
        title: "File Validation Error",
        description: errors.join('; '),
        variant: "destructive"
      });
    }

    if (validFiles.length > 0) {
      for (const file of validFiles) {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[file.name] || 0;
            if (currentProgress >= 100) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [file.name]: Math.min(currentProgress + 25, 100) };
          });
        }, 150);
      }

      const newFiles = allowMultiple ? [...files, ...validFiles] : validFiles;
      onFilesChange(newFiles);
      
      toast({
        title: "Files Added Successfully",
        description: `${validFiles.length} file${validFiles.length > 1 ? 's' : ''} ready for processing`,
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    processFiles(acceptedFiles);
  }, [files, allowMultiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: allowMultiple,
    maxSize: maxSizeInMB * 1024 * 1024
  });

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });

    toast({
      title: "File Removed",
      description: `${fileToRemove.name} has been removed`,
    });
  };

  const getFileStatus = (fileName: string) => {
    const progress = uploadProgress[fileName];
    if (progress === undefined) return <File className="w-5 h-5 text-muted-foreground" />;
    if (progress === 100) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (progress > 0) return <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
    return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="space-y-3">
        <div 
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragActive
              ? 'border-primary bg-primary/10 scale-[1.02] shadow-lg' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/20'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragActive
                ? 'bg-primary text-primary-foreground scale-110' 
                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}>
              <Upload className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {isDragActive ? 'Drop your files here' : 'Drag & drop PDF files here'}
              </h3>
              <p className="text-muted-foreground">
                or click to browse your computer
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <Badge variant="outline" className="px-3 py-1 bg-background">
                <FileText className="w-4 h-4 mr-1" />
                PDF files only
              </Badge>
              <Badge variant="outline" className="px-3 py-1 bg-background">
                Max {maxSizeInMB}MB per file
              </Badge>
              {allowMultiple && (
                <Badge variant="outline" className="px-3 py-1 bg-background">
                  Multiple files supported
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Selected Files ({files.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onFilesChange([]);
                setUploadProgress({});
                toast({
                  title: "All Files Cleared",
                  description: "File selection has been reset",
                });
              }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Clear All
            </Button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto border rounded-lg p-2">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="bg-card border rounded-lg p-4 transition-all hover:shadow-md hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileStatus(file.name)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-foreground">{file.name}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {formatFileSize(file.size)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(file.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                  <div className="mt-3 space-y-2">
                    <Progress value={uploadProgress[file.name]} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Processing... {uploadProgress[file.name]}%
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {files.length > 0 && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">{files.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Files Selected</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Total Size</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-600">
                {Object.values(uploadProgress).filter(p => p === 100).length}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Ready</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-600">
                {files.length * 10} {/* Estimate */}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Est. Pages</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
