
import { Shield, Zap, Users, FileText, Globe, Lock, Settings, Clock } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Why Choose ArcPDF
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for Modern PDF Processing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly design to deliver the 
            best PDF processing experience on the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Lightning Fast Processing */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast Processing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hybrid client-side and server-side processing for optimal speed and performance.
            </p>
          </div>

          {/* Bank-Level Security */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              End-to-end encryption, virus scanning, and automatic file deletion after 2 hours.
            </p>
          </div>

          {/* Privacy First */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Many tools work entirely in your browser - your files never leave your device.
            </p>
          </div>

          {/* Mobile Optimized */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Perfect responsive design that works flawlessly on any device or screen size.
            </p>
          </div>

          {/* No File Limits */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No File Limits</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Process unlimited files up to 10MB each. No registration or payment required.
            </p>
          </div>

          {/* AI-Powered Tools */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Tools</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Unique AI features like metadata enhancement, plagiarism detection, and PDF repair.
            </p>
          </div>

          {/* SEO Optimized */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO Optimized</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Built for search engines with structured data and optimized performance.
            </p>
          </div>

          {/* No Registration */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Registration</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Start using all tools immediately. No sign-up, no personal information required.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-orange-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">10MB</div>
              <div className="text-sm text-gray-600">Maximum file size</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">2 Hours</div>
              <div className="text-sm text-gray-600">Auto-deletion time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">256-bit</div>
              <div className="text-sm text-gray-600">Encryption strength</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
