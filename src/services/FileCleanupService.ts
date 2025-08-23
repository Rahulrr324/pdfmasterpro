
interface StoredFile {
  id: string;
  blob: Blob;
  timestamp: number;
  filename: string;
}

class FileCleanupService {
  private static instance: FileCleanupService;
  private fileStorage: Map<string, StoredFile> = new Map();
  private cleanupInterval: number | null = null;
  private readonly CLEANUP_DELAY = 30 * 60 * 1000; // 30 minutes in milliseconds

  private constructor() {
    this.startCleanupInterval();
    this.setupBeforeUnloadCleanup();
  }

  public static getInstance(): FileCleanupService {
    if (!FileCleanupService.instance) {
      FileCleanupService.instance = new FileCleanupService();
    }
    return FileCleanupService.instance;
  }

  public storeFile(blob: Blob, filename: string): string {
    const fileId = this.generateFileId();
    const storedFile: StoredFile = {
      id: fileId,
      blob,
      timestamp: Date.now(),
      filename
    };

    this.fileStorage.set(fileId, storedFile);
    
    // Schedule automatic cleanup for this specific file
    setTimeout(() => {
      this.removeFile(fileId);
    }, this.CLEANUP_DELAY);

    console.log(`File stored: ${filename} (ID: ${fileId}). Will be cleaned up in 30 minutes.`);
    return fileId;
  }

  public getFile(fileId: string): StoredFile | null {
    return this.fileStorage.get(fileId) || null;
  }

  public removeFile(fileId: string): boolean {
    const file = this.fileStorage.get(fileId);
    if (file) {
      // Revoke blob URL to free memory
      if (file.blob) {
        URL.revokeObjectURL(URL.createObjectURL(file.blob));
      }
      this.fileStorage.delete(fileId);
      console.log(`File cleaned up: ${file.filename} (ID: ${fileId})`);
      return true;
    }
    return false;
  }

  public cleanupExpiredFiles(): void {
    const now = Date.now();
    const expiredFiles: string[] = [];

    this.fileStorage.forEach((file, fileId) => {
      if (now - file.timestamp > this.CLEANUP_DELAY) {
        expiredFiles.push(fileId);
      }
    });

    expiredFiles.forEach(fileId => {
      this.removeFile(fileId);
    });

    if (expiredFiles.length > 0) {
      console.log(`Cleaned up ${expiredFiles.length} expired files`);
    }
  }

  public getStorageInfo(): { totalFiles: number; totalSize: number; oldestFile: number | null } {
    let totalSize = 0;
    let oldestTimestamp: number | null = null;

    this.fileStorage.forEach(file => {
      totalSize += file.blob.size;
      if (!oldestTimestamp || file.timestamp < oldestTimestamp) {
        oldestTimestamp = file.timestamp;
      }
    });

    return {
      totalFiles: this.fileStorage.size,
      totalSize,
      oldestFile: oldestTimestamp
    };
  }

  private generateFileId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private startCleanupInterval(): void {
    // Run cleanup every 5 minutes
    this.cleanupInterval = window.setInterval(() => {
      this.cleanupExpiredFiles();
    }, 5 * 60 * 1000);
  }

  private setupBeforeUnloadCleanup(): void {
    window.addEventListener('beforeunload', () => {
      this.cleanupAllFiles();
    });

    // Also cleanup when page becomes hidden (mobile background)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.cleanupExpiredFiles();
      }
    });
  }

  private cleanupAllFiles(): void {
    this.fileStorage.forEach((file, fileId) => {
      if (file.blob) {
        URL.revokeObjectURL(URL.createObjectURL(file.blob));
      }
    });
    this.fileStorage.clear();
    
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  public destroy(): void {
    this.cleanupAllFiles();
    FileCleanupService.instance = null as any;
  }
}

export const fileCleanupService = FileCleanupService.getInstance();
