
import { robustSupabase, withSupabaseBackend } from '@/integrations/supabase/robust-client';
import { toast } from '@/hooks/use-toast';

export interface BackendProcessRequest {
  toolId: string;
  files: File[];
  options?: Record<string, any>;
  userId?: string;
}

export interface BackendProcessResponse {
  success: boolean;
  data?: Blob | Blob[] | string;
  error?: string;
  requiresAuth?: boolean;
}

class BackendToolsService {
  private getToolEndpoint(toolId: string): string {
    const endpoints: Record<string, string> = {
      'pdf-to-word': 'convert-pdf-to-word',
      'pdf-to-excel': 'convert-pdf-to-excel',
      'pdf-to-jpg': 'convert-pdf-to-image',
      'pdf-to-png': 'convert-pdf-to-image',
      'word-to-pdf': 'convert-word-to-pdf',
      'excel-to-pdf': 'convert-excel-to-pdf',
      'html-to-pdf': 'convert-html-to-pdf',
      'protect-pdf': 'protect-pdf',
      'unlock-pdf': 'unlock-pdf',
      'edit-pdf': 'edit-pdf',
      'ocr-pdf': 'ocr-pdf',
      'translate-pdf': 'translate-pdf',
      'summarize-pdf': 'ai-summarize-pdf',
      'chat-pdf': 'ai-chat-pdf'
    };
    return endpoints[toolId] || 'generic-pdf-tool';
  }

  async processWithBackend(request: BackendProcessRequest): Promise<BackendProcessResponse> {
    try {
      return await withSupabaseBackend(
        async (supabase) => {
          const endpoint = this.getToolEndpoint(request.toolId);
          
          // Prepare form data for file upload
          const formData = new FormData();
          request.files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
          });
          
          if (request.options) {
            formData.append('options', JSON.stringify(request.options));
          }
          
          formData.append('toolId', request.toolId);

          // Call Supabase Edge Function
          const { data, error } = await supabase.functions.invoke(endpoint, {
            body: formData
          });

          if (error) {
            throw new Error(error.message || 'Backend processing failed');
          }

          return {
            success: true,
            data: data.result
          };
        },
        // Fallback for when Supabase is not available
        async () => {
          console.warn(`Backend processing not available for ${request.toolId}`);
          return {
            success: false,
            error: 'Backend processing requires server connection. Please check your Supabase configuration.',
            requiresAuth: true
          };
        }
      );
    } catch (error: any) {
      console.error('Backend processing error:', error);
      
      // Handle specific error cases
      if (error.message?.includes('auth')) {
        return {
          success: false,
          error: 'Authentication required for this feature',
          requiresAuth: true
        };
      }

      return {
        success: false,
        error: error.message || 'Processing failed. Please try again.'
      };
    }
  }

  async checkBackendStatus(): Promise<{ available: boolean; services: string[] }> {
    try {
      return await withSupabaseBackend(
        async (supabase) => {
          const { data, error } = await supabase.functions.invoke('health-check');
          
          if (error) throw error;
          
          return {
            available: true,
            services: data?.services || []
          };
        },
        async () => ({
          available: false,
          services: []
        })
      );
    } catch (error) {
      console.error('Backend status check failed:', error);
      return {
        available: false,
        services: []
      };
    }
  }

  // Simulate backend processing for development/demo
  async simulateProcessing(request: BackendProcessRequest): Promise<BackendProcessResponse> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Demo Mode",
      description: `${request.toolId} processing simulated. Connect to Supabase for full functionality.`,
      variant: "default"
    });

    return {
      success: true,
      data: new Blob(['Demo result for ' + request.toolId], { type: 'text/plain' })
    };
  }
}

export const backendToolsService = new BackendToolsService();

// AI-powered tools specific functions
export const aiToolsService = {
  async chatWithPDF(file: File, question: string): Promise<string> {
    return await withSupabaseBackend(
      async (supabase) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('question', question);

        const { data, error } = await supabase.functions.invoke('ai-chat-pdf', {
          body: formData
        });

        if (error) throw error;
        return data.response;
      },
      async () => {
        return "AI chat requires backend connection. Please configure Supabase to use this feature.";
      }
    );
  },

  async summarizePDF(file: File, options?: { length?: 'short' | 'medium' | 'long' }): Promise<string> {
    return await withSupabaseBackend(
      async (supabase) => {
        const formData = new FormData();
        formData.append('file', file);
        if (options) {
          formData.append('options', JSON.stringify(options));
        }

        const { data, error } = await supabase.functions.invoke('ai-summarize-pdf', {
          body: formData
        });

        if (error) throw error;
        return data.summary;
      },
      async () => {
        return "PDF summarization requires backend connection. Please configure Supabase to use this feature.";
      }
    );
  },

  async translatePDF(file: File, targetLanguage: string): Promise<Blob> {
    return await withSupabaseBackend(
      async (supabase) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetLanguage', targetLanguage);

        const { data, error } = await supabase.functions.invoke('ai-translate-pdf', {
          body: formData
        });

        if (error) throw error;
        return new Blob([data.translatedPdf], { type: 'application/pdf' });
      },
      async () => {
        throw new Error("PDF translation requires backend connection. Please configure Supabase to use this feature.");
      }
    );
  },

  async ocrPDF(file: File): Promise<{ text: string; searchablePdf: Blob }> {
    return await withSupabaseBackend(
      async (supabase) => {
        const formData = new FormData();
        formData.append('file', file);

        const { data, error } = await supabase.functions.invoke('ocr-pdf', {
          body: formData
        });

        if (error) throw error;
        
        return {
          text: data.extractedText,
          searchablePdf: new Blob([data.searchablePdf], { type: 'application/pdf' })
        };
      },
      async () => {
        throw new Error("OCR processing requires backend connection. Please configure Supabase to use this feature.");
      }
    );
  }
};
