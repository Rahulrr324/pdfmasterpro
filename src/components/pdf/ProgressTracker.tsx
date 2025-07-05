
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, FileText, Download, Settings, Zap, Shield } from "lucide-react";

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
    if (progress > 75) return "bg-blue-500";
    if (progress > 50) return "bg-primary";
    return "bg-orange-500";
  };

  const getStepIcon = () => {
    if (error) return <AlertCircle className="w-6 h-6 text-destructive" />;
    if (progress === 100) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (currentStep?.includes("Processing")) return <Zap className="w-6 h-6 text-primary animate-pulse" />;
    if (currentStep?.includes("download") || currentStep?.includes("Preparing")) return <Download className="w-6 h-6 text-primary animate-bounce" />;
    if (currentStep?.includes("Loading")) return <FileText className="w-6 h-6 text-primary animate-pulse" />;
    return <Settings className="w-6 h-6 text-primary animate-spin" />;
  };

  const getProgressPhase = () => {
    if (error) return "Failed";
    if (progress === 100) return "Complete";
    if (progress >= 85) return "Finalizing";
    if (progress >= 70) return "Processing";
    if (progress >= 30) return "Loading";
    if (progress >= 15) return "Analyzing";
    return "Initializing";
  };

  const getEstimatedTime = () => {
    if (progress === 0) return "Calculating...";
    if (progress === 100) return "Completed";
    if (error) return "Failed";
    
    const remainingProgress = 100 - progress;
    const estimatedSeconds = Math.ceil((remainingProgress / progress) * 2);
    
    if (estimatedSeconds < 60) return `~${estimatedSeconds}s remaining`;
    const minutes = Math.ceil(estimatedSeconds / 60);
    return `~${minutes}m remaining`;
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-background via-muted/30 to-background rounded-xl border-2 border-muted shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">
            {getStepIcon()}
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-foreground">
              {error ? "Processing Failed" : progress === 100 ? "Processing Complete!" : "Processing PDF"}
            </h3>
            <p className="text-muted-foreground">
              {error ? error : currentStep || `${getProgressPhase()}...`}
            </p>
            {!error && (
              <p className="text-xs text-muted-foreground font-medium">
                {getEstimatedTime()}
              </p>
            )}
          </div>
        </div>
        
        <div className="text-right space-y-2">
          <Badge 
            variant={error ? "destructive" : progress === 100 ? "default" : "secondary"} 
            className="px-4 py-2 text-sm font-medium"
          >
            {error ? "Failed" : progress === 100 ? "Done" : "In Progress"}
          </Badge>
          {isProcessing && !error && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              Secure local processing
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="font-semibold text-base">Progress</Label>
          <span className="text-lg font-bold text-primary">{progress}%</span>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-4 bg-muted" />
          <div 
            className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-700 ease-out ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
          {/* Animated shimmer effect */}
          {isProcessing && !error && progress < 100 && (
            <div 
              className="absolute top-0 h-4 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
              style={{ left: `${Math.max(0, progress - 8)}%` }}
            />
          )}
        </div>
      </div>

      {/* File Processing Status */}
      {totalFiles > 1 && (
        <div className="flex items-center justify-between p-4 bg-background/80 rounded-lg border border-muted">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium">Files Processed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">{processedFiles}</span>
            <span className="text-muted-foreground text-lg">/</span>
            <span className="text-2xl font-bold text-foreground">{totalFiles}</span>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {isProcessing && !error && (
        <div className="space-y-3">
          <Label className="font-semibold">Processing Steps</Label>
          <div className="grid grid-cols-4 gap-3">
            {["Initialize", "Load", "Process", "Complete"].map((step, index) => {
              const stepProgress = (index + 1) * 25;
              const isActive = progress >= stepProgress;
              const isCurrent = progress >= stepProgress - 25 && progress < stepProgress;
              
              return (
                <div key={step} className="text-center space-y-2">
                  <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isActive ? 'bg-primary text-primary-foreground shadow-lg scale-110' : 
                    isCurrent ? 'bg-primary/30 text-primary animate-pulse border-2 border-primary' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <p className={`text-xs font-medium transition-colors duration-300 ${
                    isActive ? 'text-primary font-semibold' : 
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
        <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-green-700 dark:text-green-300">
              Processing completed successfully!
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Your {totalFiles > 1 ? `${totalFiles} files are` : 'file is'} ready and have been downloaded automatically.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start space-x-3 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
          <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <p className="font-semibold text-destructive">Processing failed</p>
            <p className="text-sm text-destructive/80 leading-relaxed">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Please check your PDF files and try again. If the problem persists, try with a different file.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
