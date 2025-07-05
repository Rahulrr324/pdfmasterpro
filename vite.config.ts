
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for InfinityFree deployment
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015', // Better compatibility
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-lib': ['pdf-lib'],
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-toast', '@radix-ui/react-progress', '@radix-ui/react-select'],
          'file-utils': ['file-saver']
        },
        // Optimize for web hosting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    // Additional optimizations for InfinityFree
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets
  },
  base: './', // Important for InfinityFree hosting
  define: {
    // Ensure compatibility
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'pdf-lib', 'file-saver'],
    exclude: ['lucide-react'] // Tree-shake unused icons
  }
}));
