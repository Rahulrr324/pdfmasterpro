
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug, Wifi, WifiOff } from "lucide-react";
import { robustSupabase } from "@/integrations/supabase/robust-client";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
  backendStatus?: boolean;
}

export class RobustErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by RobustErrorBoundary:", error, errorInfo);
    
    // Check backend status
    const backendStatus = robustSupabase.isReady();
    
    this.setState({ 
      errorInfo,
      backendStatus
    });

    // Try to log error to backend if available
    try {
      if (backendStatus) {
        const supabase = robustSupabase.getClient();
        await supabase.from('error_logs').insert({
          error_id: this.state.errorId,
          error_message: error.message,
          error_stack: error.stack,
          component_stack: errorInfo.componentStack,
          user_agent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
      }
    } catch (logError) {
      console.warn("Failed to log error to backend:", logError);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleReportBug = () => {
    const subject = encodeURIComponent(`Bug Report - ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
Error: ${this.state.error?.message}
URL: ${window.location.href}
Browser: ${navigator.userAgent}
Time: ${new Date().toISOString()}

Please describe what you were doing when this error occurred:

`);
    
    window.open(`mailto:support@your-domain.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      const isNetworkError = this.state.error?.message?.includes('network') || 
                           this.state.error?.message?.includes('fetch');
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20 px-4">
          <Card className="w-full max-w-2xl shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" aria-hidden="true" />
                </div>
              </div>
              <CardTitle className="text-2xl text-foreground">
                {isNetworkError ? "Connection Issue" : "Oops! Something went wrong"}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  {isNetworkError 
                    ? "We're having trouble connecting to our services. Please check your internet connection and try again."
                    : "We encountered an unexpected error. This has been logged and our team will investigate."
                  }
                </p>
                
                {/* Backend Status */}
                <div className="flex justify-center mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full border ${
                    this.state.backendStatus 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                  }`}>
                    {this.state.backendStatus ? (
                      <>
                        <Wifi className="w-3 h-3 mr-1 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          Backend Connected
                        </span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3 h-3 mr-1 text-orange-600 dark:text-orange-400" />
                        <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                          Backend Offline
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {this.state.errorId && (
                  <div className="text-xs text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">
                    Error ID: {this.state.errorId}
                  </div>
                )}
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left bg-muted p-4 rounded-lg text-sm mb-4">
                    <summary className="cursor-pointer font-medium mb-2">
                      Error Details (Development Mode)
                    </summary>
                    <pre className="whitespace-pre-wrap text-xs text-red-600 dark:text-red-400">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={this.handleReload}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Reload Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={this.handleGoHome}
                >
                  <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                  Go to Home
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={this.handleReportBug}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Bug className="w-4 h-4 mr-2" aria-hidden="true" />
                  Report Bug
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  If this problem persists, please contact our support team with the error ID above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
