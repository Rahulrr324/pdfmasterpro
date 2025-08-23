
// Deployment optimization utilities for InfinityFree
export class DeploymentOptimizer {
  // Optimize images for web delivery
  static optimizeImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(blob || file);
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Lazy load components for better performance
  static createLazyComponent<T>(importFn: () => Promise<{ default: React.ComponentType<T> }>) {
    return React.lazy(importFn);
  }

  // Preload critical resources
  static preloadCriticalResources() {
    const criticalStyles = [
      '/assets/index.css',
    ];

    criticalStyles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  // Service worker registration for offline capability
  static registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Memory optimization
  static optimizeMemoryUsage() {
    // Clear image caches periodically
    setInterval(() => {
      if (performance.memory && performance.memory.usedJSHeapSize > 50 * 1024 * 1024) {
        // Clear caches when memory usage exceeds 50MB
        console.log('Optimizing memory usage...');
        window.gc && window.gc();
      }
    }, 30000);
  }

  // Static asset optimization
  static getOptimizedAssetPath(path: string): string {
    // For InfinityFree deployment, ensure relative paths
    return path.startsWith('/') ? `.${path}` : path;
  }
}

// Initialize optimization on app start
export const initializeOptimizations = () => {
  DeploymentOptimizer.preloadCriticalResources();
  DeploymentOptimizer.registerServiceWorker();
  DeploymentOptimizer.optimizeMemoryUsage();
};
