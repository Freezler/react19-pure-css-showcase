// Advanced APIs Library - Main Export
// React 19 Compatible Modern Web APIs

// Type definitions
export * from './types';

// Core API modules
export * from './api/data-management';
export * from './api/web-platform';
export * from './api/pwa';
export * from './api/performance';

// Error handling and validation
export * from './error-handling';

// React hooks for APIs
export * from '../hooks/useAdvancedAPIs';

/**
 * Library version and information
 */
export const ADVANCED_APIS_VERSION = '1.0.0';
export const SUPPORTED_REACT_VERSION = '19.x';

/**
 * Quick feature detection utility
 */
export function getAPISupport() {
  return {
    // Modern Web Platform APIs
    viewTransitions: 'startViewTransition' in document,
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    webShare: 'share' in navigator,
    navigationAPI: 'navigation' in window,
    
    // PWA APIs
    serviceWorker: 'serviceWorker' in navigator,
    notifications: 'Notification' in window,
    pushManager: 'PushManager' in window,
    cacheAPI: 'caches' in window,
    backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
    
    // Performance APIs
    speculationRules: 'speculationRules' in HTMLScriptElement.prototype,
    webWorkers: 'Worker' in window,
    performanceObserver: 'PerformanceObserver' in window,
    
    // Storage APIs
    indexedDB: 'indexedDB' in window,
    localStorage: 'localStorage' in window,
    sessionStorage: 'sessionStorage' in window,
    
    // Security APIs
    credentialsAPI: 'credentials' in navigator,
    webAuthn: 'credentials' in navigator && 'create' in (navigator as any).credentials,
  };
}

/**
 * Initialize advanced APIs with optional configuration
 */
export interface APIConfig {
  // Error handling
  enableGlobalErrorHandler?: boolean;
  logErrors?: boolean;
  
  // Performance
  enablePerformanceMonitoring?: boolean;
  speculationRulesEnabled?: boolean;
  
  // PWA
  serviceWorkerPath?: string;
  enableNotifications?: boolean;
  
  // Feature detection
  gracefulDegradation?: boolean;
}

export function initializeAPIs(config: APIConfig = {}) {
  const support = getAPISupport();
  
  console.log('🚀 Advanced APIs Library initialized');
  console.log('📊 Feature Support:', support);
  
  // Setup global error handling if enabled
  if (config.enableGlobalErrorHandler) {
    import('./error-handling').then(({ ErrorHandler }) => {
      ErrorHandler.addListener((error) => {
        if (config.logErrors) {
          console.error('Global API Error:', error);
        }
      });
    });
  }
  
  // Setup speculation rules if supported and enabled
  if (config.speculationRulesEnabled && support.speculationRules) {
    import('./api/performance').then(({ SpeculationAPI }) => {
      // Add conservative prefetch rules for common patterns
      SpeculationAPI.addRules({
        prefetch: [{
          source: 'document',
          where: { selector_matches: 'a[href^="/"]' },
          eagerness: 'conservative'
        }]
      });
    });
  }
  
  // Initialize Service Worker if path provided
  if (config.serviceWorkerPath && support.serviceWorker) {
    import('./api/pwa').then(({ ServiceWorkerAPI }) => {
      ServiceWorkerAPI.register(config.serviceWorkerPath!);
    });
  }
  
  return {
    support,
    config,
    version: ADVANCED_APIS_VERSION
  };
}

/**
 * Development utilities
 */
export const devUtils = {
  logAPISupport: () => {
    const support = getAPISupport();
    console.table(support);
  },
  
  testFeature: (feature: keyof ReturnType<typeof getAPISupport>) => {
    const support = getAPISupport();
    const isSupported = support[feature];
    console.log(`${feature}: ${isSupported ? '✅ Supported' : '❌ Not supported'}`);
    return isSupported;
  },
  
  benchmarkAPI: async (name: string, operation: () => Promise<any>) => {
    const start = performance.now();
    try {
      const result = await operation();
      const end = performance.now();
      console.log(`⚡ ${name} completed in ${(end - start).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      console.error(`❌ ${name} failed after ${(end - start).toFixed(2)}ms`, error);
      throw error;
    }
  }
};

/**
 * Production utilities
 */
export const prodUtils = {
  reportError: (error: Error, context?: any) => {
    // In production, you might want to send to an error reporting service
    console.error('Production Error:', error, context);
  },
  
  trackFeatureUsage: (feature: string, success: boolean) => {
    // In production, you might want to send to analytics
    console.log(`Feature Usage: ${feature} - ${success ? 'Success' : 'Failed'}`);
  }
};

/**
 * Quick start examples for common use cases
 */
export const examples = {
  // Basic optimistic update example
  optimisticUpdate: `
import { useOptimisticMutation } from '@/lib';

const { data, mutate } = useOptimisticMutation(items, '/api/items');
await mutate(newItem);
  `,
  
  // View transitions example
  viewTransitions: `
import { useViewTransitions } from '@/lib';

const { navigate } = useViewTransitions();
await navigate(() => setPage('next'), { duration: 300 });
  `,
  
  // Web worker example
  webWorker: `
import { useWebWorker } from '@/lib';

const { postMessage, isReady } = useWebWorker('/worker.js');
const result = await postMessage('calculate', { data: numbers });
  `,
  
  // PWA notifications example
  notifications: `
import { useNotifications } from '@/lib';

const { showNotification, requestPermission } = useNotifications();
await requestPermission();
await showNotification('Hello!', { body: 'From your PWA' });
  `
};

// Default export for convenience
export default {
  initializeAPIs,
  getAPISupport,
  devUtils,
  prodUtils,
  examples,
  version: ADVANCED_APIS_VERSION
};