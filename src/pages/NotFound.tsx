
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const suggestedTools = [
    { name: "Merge PDF", path: "/tool/merge-pdf" },
    { name: "Split PDF", path: "/tool/split-pdf" },
    { name: "Compress PDF", path: "/tool/compress-pdf" },
    { name: "PDF to Word", path: "/tool/pdf-to-word" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-background to-red-50 dark:from-orange-950/20 dark:via-background dark:to-red-950/20 px-4">
      <Card className="w-full max-w-2xl text-center shadow-xl">
        <CardContent className="p-12">
          {/* 404 Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full flex items-center justify-center">
              <FileX className="w-12 h-12 text-orange-600 dark:text-orange-400" aria-hidden="true" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Link to="/" aria-label="Go back to home page">
                <Home className="w-5 h-5 mr-2" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
              Go Back
            </Button>
          </div>

          {/* Suggested Tools */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Popular PDF Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {suggestedTools.map((tool) => (
                <Button
                  key={tool.path}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-sm hover:bg-orange-50 dark:hover:bg-orange-950/20"
                >
                  <Link to={tool.path}>
                    {tool.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Need help finding something? 
              <Link to="/#tools" className="text-primary hover:underline ml-1">
                Browse all our PDF tools
              </Link>
              {" "}or contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
