// Performance & User Experience APIs
import { SpeculationRule, WorkerMessage, WorkerResponse } from '../types';

/**
 * Speculation Rules API for intelligent prefetching
 */
export class SpeculationAPI {
  static isSupported(): boolean {
    return 'speculationRules' in HTMLScriptElement.prototype;
  }

  static addRules(rules: {
    prerender?: SpeculationRule[];
    prefetch?: SpeculationRule[];
  }): HTMLScriptElement | null {
    if (!this.isSupported()) {
      console.warn('Speculation Rules API not supported');
      return null;
    }

    const script = document.createElement('script');
    script.type = 'speculationrules';
    script.textContent = JSON.stringify(rules);
    
    document.head.appendChild(script);
    return script;
  }

  static preloadPage(url: string, eagerness: 'conservative' | 'moderate' | 'immediate' = 'moderate'): HTMLScriptElement | null {
    return this.addRules({
      prerender: [{
        source: 'list',
        where: { href_matches: url },
        eagerness
      }]
    });
  }

  static prefetchAPI(pattern: string, eagerness: 'conservative' | 'moderate' | 'immediate' = 'conservative'): HTMLScriptElement | null {
    return this.addRules({
      prefetch: [{
        source: 'list',
        where: { href_matches: pattern },
        eagerness
      }]
    });
  }

  static removeRules(script: HTMLScriptElement): void {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  }

  static addDocumentRules(selector: string): HTMLScriptElement | null {
    return this.addRules({
      prerender: [{
        source: 'document',
        where: { selector_matches: selector },
        eagerness: 'moderate'
      }]
    });
  }
}

/**
 * Web Workers API for heavy computations
 */
export class WorkerAPI {
  private static workers = new Map<string, Worker>();
  private static pendingMessages = new Map<string, {
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }>();

  static isSupported(): boolean {
    return 'Worker' in window;
  }

  static create(
    script: string | URL,
    options?: WorkerOptions & { id?: string }
  ): string | null {
    if (!this.isSupported()) {
      console.warn('Web Workers not supported');
      return null;
    }

    const workerId = options?.id || crypto.randomUUID();

    try {
      const worker = new Worker(script, options);
      
      worker.onmessage = (event) => {
        const response: WorkerResponse = event.data;
        const pending = this.pendingMessages.get(response.id);
        
        if (pending) {
          if (response.error) {
            pending.reject(new Error(response.error));
          } else {
            pending.resolve(response.result);
          }
          this.pendingMessages.delete(response.id);
        }
      };

      worker.onerror = (error) => {
        console.error('Worker error:', error);
      };

      this.workers.set(workerId, worker);
      return workerId;
    } catch (error) {
      console.error('Worker creation failed:', error);
      return null;
    }
  }

  static async postMessage<T = any>(
    workerId: string,
    message: Omit<WorkerMessage, 'id'>
  ): Promise<T> {
    const worker = this.workers.get(workerId);
    if (!worker) {
      throw new Error(`Worker ${workerId} not found`);
    }

    const messageId = crypto.randomUUID();
    const fullMessage: WorkerMessage = {
      ...message,
      id: messageId,
    };

    return new Promise((resolve, reject) => {
      this.pendingMessages.set(messageId, { resolve, reject });
      worker.postMessage(fullMessage);
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.pendingMessages.has(messageId)) {
          this.pendingMessages.delete(messageId);
          reject(new Error('Worker message timeout'));
        }
      }, 30000);
    });
  }

  static terminate(workerId: string): void {
    const worker = this.workers.get(workerId);
    if (worker) {
      worker.terminate();
      this.workers.delete(workerId);
    }
  }

  static terminateAll(): void {
    this.workers.forEach((worker, id) => {
      worker.terminate();
    });
    this.workers.clear();
    this.pendingMessages.clear();
  }

  /**
   * Create worker from inline code
   */
  static createInline(
    code: string,
    options?: WorkerOptions & { id?: string }
  ): string | null {
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    
    const workerId = this.create(url, options);
    
    // Clean up blob URL after worker is created
    if (workerId) {
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
    
    return workerId;
  }

  /**
   * Common worker tasks
   */
  static async processImage(
    workerId: string,
    imageData: ImageData,
    operation: string,
    params?: any
  ): Promise<ImageData> {
    return this.postMessage(workerId, {
      type: 'process-image',
      payload: { imageData, operation, params }
    });
  }

  static async calculateHash(
    workerId: string,
    data: string,
    algorithm = 'SHA-256'
  ): Promise<string> {
    return this.postMessage(workerId, {
      type: 'calculate-hash',
      payload: { data, algorithm }
    });
  }

  static async sortLargeArray(
    workerId: string,
    array: any[],
    compareFn?: string
  ): Promise<any[]> {
    return this.postMessage(workerId, {
      type: 'sort-array',
      payload: { array, compareFn }
    });
  }
}

/**
 * Performance monitoring and metrics
 */
export class PerformanceAPI {
  static measurePageLoad(): PerformanceNavigationTiming | null {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation || null;
  }

  static getVitalMetrics(): {
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
  } {
    const metrics: any = {};

    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Observer not supported
      }
    }

    return metrics;
  }

  static measureFunction<T extends (...args: any[]) => any>(
    fn: T,
    name: string
  ): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
      performance.mark(`${name}-start`);
      const result = fn(...args);
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      return result;
    }) as T;
  }

  static async measureAsync<T>(
    asyncFn: () => Promise<T>,
    name: string
  ): Promise<T> {
    performance.mark(`${name}-start`);
    try {
      const result = await asyncFn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      return result;
    } catch (error) {
      performance.mark(`${name}-error`);
      performance.measure(name, `${name}-start`, `${name}-error`);
      throw error;
    }
  }

  static getMemoryUsage(): any | null {
    return (performance as any).memory || null;
  }

  static clearMeasures(name?: string): void {
    if (name) {
      performance.clearMeasures(name);
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(`${name}-end`);
      performance.clearMarks(`${name}-error`);
    } else {
      performance.clearMeasures();
      performance.clearMarks();
    }
  }
}

/**
 * Resource preloading utilities
 */
export class PreloadAPI {
  static preloadResource(
    href: string,
    as: 'script' | 'style' | 'font' | 'image' | 'fetch',
    options?: {
      crossorigin?: 'anonymous' | 'use-credentials';
      type?: string;
      media?: string;
    }
  ): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (options?.crossorigin) {
      link.crossOrigin = options.crossorigin;
    }
    
    if (options?.type) {
      link.type = options.type;
    }
    
    if (options?.media) {
      link.media = options.media;
    }

    document.head.appendChild(link);
    return link;
  }

  static prefetchResource(href: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    
    document.head.appendChild(link);
    return link;
  }

  static preconnect(
    href: string,
    crossorigin?: boolean
  ): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    
    if (crossorigin) {
      link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
    return link;
  }

  static dnsPrefetch(href: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    
    document.head.appendChild(link);
    return link;
  }

  static removePreload(link: HTMLLinkElement): void {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }
}