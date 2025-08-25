
import React from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Page Not Found - PDFMasterPro"
        description="The page you're looking for doesn't exist. Explore our PDF tools instead."
        canonicalUrl="/404"
      />
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
              <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="space-y-4">
              <ProfessionalButton
                onClick={() => navigate('/')}
                className="w-full"
                gradient={true}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </ProfessionalButton>
              
              <ProfessionalButton
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full"
              >
                Go Back
              </ProfessionalButton>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
