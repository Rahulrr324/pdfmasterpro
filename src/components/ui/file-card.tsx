
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { FileText, Download, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileCardProps {
  file: File | Blob;
  filename: string;
  onDownload?: () => void;
  onPreview?: () => void;
  onRemove?: () => void;
  isProcessed?: boolean;
  size?: string;
  className?: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  filename,
  onDownload,
  onPreview,
  onRemove,
  isProcessed = false,
  size,
  className
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileSize = size || (file instanceof File ? formatFileSize(file.size) : 'Unknown size');

  return (
    <Card className={cn("hover:shadow-md transition-shadow duration-200", className)}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {filename}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {fileSize}
            </p>
            
            <div className="flex items-center space-x-2 mt-2">
              {isProcessed && (
                <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Processed
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex space-x-1">
            {onPreview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onPreview}
                className="w-8 h-8 p-0"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
            
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                className="w-8 h-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="w-8 h-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
