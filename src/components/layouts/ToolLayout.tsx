
import React from 'react';
import { ArrowLeft, Shield, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProfessionalButton } from '@/components/ui/professional-button';
import { FeatureCard } from '@/components/ui/feature-card';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  icon,
  children
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <ProfessionalButton 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </ProfessionalButton>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4 shadow-lg text-white">
              {icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="100% Secure"
            description="Files processed locally in your browser"
            badge="Privacy First"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Lightning Fast"
            description="Instant processing with no waiting"
            badge="Real-time"
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Auto Cleanup"
            description="Files automatically deleted after 30 minutes"
            badge="Smart"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-0">
          {children}
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                🛡️ Privacy & Security
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                All files are processed locally in your browser. No uploads to servers. 
                Processed files are automatically deleted after 30 minutes for maximum privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
