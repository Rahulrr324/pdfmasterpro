
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG, checkSupabaseConnection, TROUBLESHOOTING_GUIDE } from '@/config/supabase-credentials';
import type { Database } from './types';

class RobustSupabaseClient {
  private client: SupabaseClient<Database> | null = null;
  private isConnected: boolean = false;
  private connectionAttempts: number = 0;
  private maxRetries: number = 3;

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    try {
      // Try main configuration first
      this.client = createClient<Database>(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey,
        SUPABASE_CONFIG.options
      );

      // Test connection
      this.isConnected = await checkSupabaseConnection();
      
      if (!this.isConnected && this.connectionAttempts < this.maxRetries) {
        this.connectionAttempts++;
        console.warn(`Supabase connection attempt ${this.connectionAttempts} failed. Retrying...`);
        
        // Try fallback configuration
        this.client = createClient<Database>(
          SUPABASE_CONFIG.fallback.url,
          SUPABASE_CONFIG.fallback.anonKey,
          SUPABASE_CONFIG.options
        );

        this.isConnected = await checkSupabaseConnection();
      }

      if (!this.isConnected) {
        console.error('Supabase connection failed after all attempts');
        console.log(TROUBLESHOOTING_GUIDE);
      } else {
        console.log('✅ Supabase connected successfully');
      }

    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      console.log(TROUBLESHOOTING_GUIDE);
    }
  }

  public getClient(): SupabaseClient<Database> {
    if (!this.client) {
      throw new Error('Supabase client not initialized. Check your configuration.');
    }
    return this.client;
  }

  public isReady(): boolean {
    return this.isConnected && this.client !== null;
  }

  public async retryConnection(): Promise<boolean> {
    this.connectionAttempts = 0;
    await this.initializeClient();
    return this.isConnected;
  }

  public getConnectionStatus(): { connected: boolean; attempts: number; troubleshooting: string } {
    return {
      connected: this.isConnected,
      attempts: this.connectionAttempts,
      troubleshooting: TROUBLESHOOTING_GUIDE
    };
  }
}

// Export singleton instance
export const robustSupabase = new RobustSupabaseClient();

// Export the client for compatibility with existing code
export const supabase = robustSupabase.getClient();

// Export connection utilities
export { checkSupabaseConnection, TROUBLESHOOTING_GUIDE };

// Helper function for backend operations with proper typing
export const withSupabaseBackend = async <T>(
  operation: (client: SupabaseClient<Database>) => Promise<T>,
  fallback?: () => Promise<T>
): Promise<T> => {
  try {
    if (!robustSupabase.isReady()) {
      const reconnected = await robustSupabase.retryConnection();
      if (!reconnected && fallback) {
        console.warn('Using fallback operation due to Supabase connection issues');
        return await fallback();
      }
    }

    const client = robustSupabase.getClient();
    return await operation(client);
  } catch (error) {
    console.error('Supabase operation failed:', error);
    if (fallback) {
      console.warn('Using fallback operation');
      return await fallback();
    }
    throw error;
  }
};
