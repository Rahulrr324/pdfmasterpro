
// Supabase Configuration - Edit these values if connection fails
export const SUPABASE_CONFIG = {
  // Main configuration (from environment)
  url: import.meta.env.VITE_SUPABASE_URL || "https://nabzkoeoawdpttveuklq.supabase.co",
  anonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYnprb2VvYXdkcHR0dmV1a2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjE5MDQsImV4cCI6MjA3MTEzNzkwNH0.3B7vpLU9SDrVNxqIgNqhEVRbEcotck4F71bx3xB2L50",
  
  // Backup configuration (edit these if main config fails)
  fallback: {
    url: "https://nabzkoeoawdpttveuklq.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYnprb2VvYXdkcHR0dmV1a2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjE5MDQsImV4cCI6MjA3MTEzNzkwNH0.3B7vpLU9SDrVNxqIgNqhEVRbEcotck4F71bx3xB2L50"
  },
  
  // Connection settings
  options: {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'PDF-Master-Pro'
      }
    }
  }
};

// Connection status checker
export const checkSupabaseConnection = async () => {
  try {
    const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};

// Instructions for troubleshooting
export const TROUBLESHOOTING_GUIDE = `
🔧 SUPABASE CONNECTION TROUBLESHOOTING GUIDE

If you're experiencing connection issues:

1. Check your Supabase project status at https://supabase.com/dashboard
2. Verify your project URL and API keys are correct
3. Update the fallback credentials in this file if needed
4. Ensure your Supabase project is active and not paused

Current Configuration:
- Project URL: ${SUPABASE_CONFIG.url}
- Project ID: nabzkoeoawdpttveuklq
- Region: Auto-detected

To update credentials:
1. Go to your Supabase dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. Update the fallback object in this file
5. Restart your development server

Need help? Check: https://supabase.com/docs/guides/getting-started
`;
