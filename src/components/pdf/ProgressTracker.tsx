
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ProgressTrackerProps {
  isProcessing: boolean;
  progress: number;
  currentStep?: string;
  error?: string;
}

export const ProgressTracker = ({ isProcessing, progress, currentStep, error }: ProgressTrackerProps) => {
  if (!isProcessing && progress === 0 && !error) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        {error ? (
          <AlertCircle className="w-4 h-4 text-destructive" />
        ) : progress === 100 ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <Clock className="w-4 h-4 text-primary animate-spin" />
        )}
        <Label>
          {error ? "Processing Failed" : progress === 100 ? "Complete!" : currentStep || "Processing..."}
        </Label>
      </div>
      
      <Progress value={progress} className="w-full" />
      
      <div className="text-sm text-muted-foreground text-center">
        {error ? error : `${progress}% complete`}
      </div>
    </div>
  );
};
