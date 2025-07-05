
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
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

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    const validFiles = selectedFiles.filter(file => {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds ${maxSizeInMB}MB limit`,
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    onFilesChange(allowMultiple ? [...files, ...validFiles] : validFiles);
  }, [files, onFilesChange, allowMultiple, maxSizeInMB, toast]);

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Select {allowMultiple ? 'PDF Files' : 'PDF File'}</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
          <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <Input
            id="file-upload"
            type="file"
            accept={acceptedTypes}
            multiple={allowMultiple}
            onChange={handleFileSelect}
            className="cursor-pointer"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Maximum file size: {maxSizeInMB}MB {allowMultiple ? "• Multiple files allowed" : ""}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <Label>Selected Files:</Label>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">{file.name}</span>
                  <Badge variant="secondary">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
