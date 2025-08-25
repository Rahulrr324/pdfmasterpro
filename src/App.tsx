
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RobustErrorBoundary } from "@/components/RobustErrorBoundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { initializeOptimizations } from "@/utils/deploymentOptimizer";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const MergePDF = React.lazy(() => import("./pages/tools/MergePDF"));
const SplitPDF = React.lazy(() => import("./pages/tools/SplitPDF"));
const CompressPDF = React.lazy(() => import("./pages/tools/CompressPDF"));
const ImageToPDF = React.lazy(() => import("./pages/tools/ImageToPDF"));
const RemoveBackground = React.lazy(() => import("./pages/tools/RemoveBackground"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Initialize optimizations
React.useEffect(() => {
  initializeOptimizations();
}, []);

const App: React.FC = () => {
  return (
    <RobustErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="pdfmaster-pro-theme">
            <TooltipProvider delayDuration={300}>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/tools/merge-pdf" element={<MergePDF />} />
                    <Route path="/tools/split-pdf" element={<SplitPDF />} />
                    <Route path="/tools/compress-pdf" element={<CompressPDF />} />
                    <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
                    <Route path="/tools/remove-background" element={<RemoveBackground />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </RobustErrorBoundary>
  );
};

export default App;
