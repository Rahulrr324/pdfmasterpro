
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, FileText, Download, Settings } from "lucide-react";

interface ProgressTrackerProps {
  isProcessing: boolean;
  progress: number;
  currentStep?: string;
  error?: string;
  totalFiles?: number;
  processedFiles?: number;
}

export const ProgressTracker = ({ 
  isProcessing, 
  progress, 
  currentStep, 
  error,
  totalFiles = 1,
  processedFiles = 0
}: ProgressTrackerProps) => {
  if (!isProcessing && progress === 0 && !error) return null;

  const getProgressColor = () => {
    if (error) return "bg-destructive";
    if (progress === 100) return "bg-green-500";
    if (progress > 50) return "bg-primary";
    return "bg-blue-500";
  };

  const getStepIcon = () => {
    if (error) return <AlertCircle className="w-5 h-5 text-destructive" />;
    if (progress === 100) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (currentStep?.includes("Processing")) return <Settings className="w-5 h-5 text-primary animate-spin" />;
    if (currentStep?.includes("Saving")) return <Download className="w-5 h-5 text-primary animate-bounce" />;
    return <Clock className="w-5 h-5 text-primary animate-pulse" />;
  };

  const getProgressPhase = () => {
    if (progress === 100) return "Complete";
    if (progress >= 90) return "Finalizing";
    if (progress >= 70) return "Processing";
    if (progress >= 30) return "Analyzing";
    return "Initializing";
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-r from-background to-muted/30 rounded-xl border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStepIcon()}
          <div>
            <h3 className="font-semibold text-lg">
              {error ? "Processing Failed" : progress === 100 ? "Processing Complete!" : "Processing PDF"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {error ? error : currentStep || `${getProgressPhase()}...`}
            </p>
          </div>
        </div>
        
        <Badge variant={error ? "destructive" : progress === 100 ? "default" : "secondary"} className="px-3 py-1">
          {error ? "Failed" : progress === 100 ? "Done" : "In Progress"}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-3" />
          <div 
            className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* File Processing Status */}
      {totalFiles > 1 && (
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Files Processed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">{processedFiles}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-lg font-bold">{totalFiles}</span>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {isProcessing && !error && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            {["Initialize", "Process", "Optimize", "Complete"].map((step, index) => {
              const stepProgress = (index + 1) * 25;
              const isActive = progress >= stepProgress;
              const isCurrent = progress >= stepProgress - 25 && progress < stepProgress;
              
              return (
                <div key={step} className="text-center">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive ? 'bg-primary text-primary-foreground' : 
                    isCurrent ? 'bg-primary/20 text-primary animate-pulse' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <p className={`text-xs mt-1 transition-colors ${
                    isActive ? 'text-primary font-medium' : 
                    isCurrent ? 'text-primary' : 
                    'text-muted-foreground'
                  }`}>
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Success Message */}
      {progress === 100 && !error && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">
              Processing completed successfully!
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Your {totalFiles > 1 ? 'files are' : 'file is'} ready for download.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Processing failed</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
