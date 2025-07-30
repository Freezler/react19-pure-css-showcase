// React 19 Hooks for Advanced APIs
import { useEffect, useCallback, useOptimistic, useActionState, useState, useRef, startTransition } from 'react';
import { DataManagementAPI, createFormAction } from '../lib/api/data-management';
import { ViewTransitionsAPI, IntersectionAPI, ResizeAPI, ShareAPI } from '../lib/api/web-platform';
import { ServiceWorkerAPI, NotificationAPI } from '../lib/api/pwa';
import { SpeculationAPI, WorkerAPI, PerformanceAPI } from '../lib/api/performance';
import type { FormState, OptimisticUpdate } from '../lib/types';

/**
 * React 19 useOptimistic integration for data mutations
 */
export function useOptimisticMutation<T>(
  initialData: T[],
  endpoint: string
) {
  const [optimisticData, addOptimistic] = useOptimistic(
    initialData,
    (state: T[], action: { type: 'add' | 'update' | 'remove'; item: T }) => {
      switch (action.type) {
        case 'add':
          return [...state, action.item];
        case 'update':
          return state.map((item: any) => 
            item.id === (action.item as any).id ? action.item : item
          );
        case 'remove':
          return state.filter((item: any) => item.id !== (action.item as any).id);
        default:
          return state;
      }
    }
  );

  const mutate = useCallback((data: T) => {
    const itemWithPending = { ...data, pending: true } as T;
    
    // Add optimistic update immediately
    const exists = optimisticData.find((item: any) => item.id === (data as any).id);
    addOptimistic({ 
      type: exists ? 'update' : 'add', 
      item: itemWithPending 
    });

    // Simulate API call
    setTimeout(() => {
      startTransition(() => {
        const finalItem = { ...data, pending: false } as T;
        addOptimistic({ 
          type: 'update', 
          item: finalItem 
        });
      });
    }, 500);
  }, [optimisticData, addOptimistic]);

  return {
    data: optimisticData,
    mutate
  };
}

/**
 * React 19 useActionState integration for forms  
 */
export function useAdvancedForm<T>(
  endpoint: string,
  initialState: FormState<T>,
  options?: { optimistic?: boolean; revalidate?: string[] }
) {
  const formAction = createFormAction<T>(endpoint, options);
  const [state, dispatch, isPending] = useActionState(formAction, initialState);

  return {
    state,
    dispatch,
    isPending,
    isSuccess: state.success,
    error: state.error
  };
}

/**
 * View Transitions hook with navigation integration
 */
export function useViewTransitions() {
  const navigate = useCallback(async (
    updateFn: () => void | Promise<void>,
    options?: { duration?: number; easing?: string }
  ) => {
    await ViewTransitionsAPI.transition(updateFn, options);
  }, []);

  const setTransitionName = useCallback((element: HTMLElement, name: string) => {
    ViewTransitionsAPI.setTransitionName(element, name);
    
    return () => {
      ViewTransitionsAPI.removeTransitionName(element);
    };
  }, []);

  return {
    navigate,
    setTransitionName,
    isSupported: ViewTransitionsAPI.isSupported()
  };
}

/**
 * Enhanced Intersection Observer hook
 */
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: { threshold?: number; rootMargin?: string; root?: Element }
) {
  const observerRef = useRef<string | null>(null);

  const observe = useCallback((elements: Element | Element[]) => {
    if (observerRef.current) {
      IntersectionAPI.unobserve(observerRef.current);
    }
    
    observerRef.current = IntersectionAPI.observe(elements, callback, options);
  }, [callback, options]);

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      IntersectionAPI.unobserve(observerRef.current);
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      unobserve();
    };
  }, [unobserve]);

  return { observe, unobserve };
}

/**
 * Lazy loading hook with intersection observer
 */
export function useLazyLoad() {
  const [loadedImages, setLoadedImages] = useState(new Set<string>());
  
  const { observe } = useIntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src && !loadedImages.has(src)) {
            img.src = src;
            img.removeAttribute('data-src');
            setLoadedImages(prev => new Set([...prev, src]));
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  const registerImage = useCallback((img: HTMLImageElement) => {
    observe(img);
  }, [observe]);

  return { registerImage, loadedImages };
}

/**
 * Resize Observer hook
 */
export function useResizeObserver(
  callback: (width: number, height: number) => void
) {
  const observerRef = useRef<string | null>(null);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      ResizeAPI.unobserve(observerRef.current);
    }
    
    observerRef.current = ResizeAPI.observeContainer(element, callback);
  }, [callback]);

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      ResizeAPI.unobserve(observerRef.current);
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      unobserve();
    };
  }, [unobserve]);

  return { observe, unobserve };
}

/**
 * Web Share hook
 */
export function useWebShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [shareResult, setShareResult] = useState<boolean | null>(null);

  const share = useCallback(async (data: {
    title?: string;
    text?: string;
    url?: string;
    files?: File[];
  }) => {
    setIsSharing(true);
    setShareResult(null);
    
    try {
      const result = await ShareAPI.share(data);
      setShareResult(result);
      return result;
    } catch (error) {
      setShareResult(false);
      return false;
    } finally {
      setIsSharing(false);
    }
  }, []);

  return {
    share,
    isSharing,
    shareResult,
    canShare: ShareAPI.canShare(),
    isSupported: ShareAPI.isSupported()
  };
}

/**
 * Service Worker hook
 */
export function useServiceWorker(scriptURL: string) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const registerSW = async () => {
      const reg = await ServiceWorkerAPI.register(scriptURL);
      setRegistration(reg);
    };

    registerSW();

    const handleUpdate = () => {
      setUpdateAvailable(true);
    };

    window.addEventListener('sw-update-available', handleUpdate);
    
    return () => {
      window.removeEventListener('sw-update-available', handleUpdate);
    };
  }, [scriptURL]);

  const update = useCallback(async () => {
    await ServiceWorkerAPI.update();
    setUpdateAvailable(false);
  }, []);

  return {
    registration,
    updateAvailable,
    update,
    isSupported: ServiceWorkerAPI.isSupported()
  };
}

/**
 * Push Notifications hook
 */
export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if (NotificationAPI.isSupported()) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await NotificationAPI.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const showNotification = useCallback(async (
    title: string,
    options?: {
      body?: string;
      icon?: string;
      tag?: string;
      data?: any;
    }
  ) => {
    return await NotificationAPI.show(title, { title, ...options });
  }, []);

  const subscribeToPush = useCallback(async (
    registration: ServiceWorkerRegistration,
    vapidKey: string
  ) => {
    const sub = await NotificationAPI.subscribeToPush(registration, vapidKey);
    setSubscription(sub);
    return sub;
  }, []);

  return {
    permission,
    subscription,
    requestPermission,
    showNotification,
    subscribeToPush,
    isSupported: NotificationAPI.isSupported()
  };
}

/**
 * Web Worker hook
 */
export function useWebWorker(script: string | (() => string)) {
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initWorker = async () => {
      setIsLoading(true);
      
      let id: string | null = null;
      
      if (typeof script === 'string') {
        id = WorkerAPI.create(script);
      } else {
        // Inline worker
        id = WorkerAPI.createInline(script());
      }
      
      setWorkerId(id);
      setIsLoading(false);
    };

    initWorker();

    return () => {
      if (workerId) {
        WorkerAPI.terminate(workerId);
      }
    };
  }, [script]);

  const postMessage = useCallback(async <T = any>(
    type: string,
    payload: any
  ): Promise<T> => {
    if (!workerId) {
      throw new Error('Worker not ready');
    }
    
    return WorkerAPI.postMessage<T>(workerId, { type, payload });
  }, [workerId]);

  return {
    workerId,
    isLoading,
    postMessage,
    isReady: !!workerId && !isLoading,
    isSupported: WorkerAPI.isSupported()
  };
}

/**
 * Performance monitoring hook
 */
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<any>({});

  const measureFunction = useCallback(<T extends (...args: any[]) => any>(
    fn: T,
    name: string
  ): T => {
    return PerformanceAPI.measureFunction(fn, name);
  }, []);

  const measureAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    name: string
  ): Promise<T> => {
    return PerformanceAPI.measureAsync(asyncFn, name);
  }, []);

  const getVitals = useCallback(() => {
    const vitals = PerformanceAPI.getVitalMetrics();
    setMetrics(prev => ({ ...prev, ...vitals }));
    return vitals;
  }, []);

  const getMemoryUsage = useCallback(() => {
    return PerformanceAPI.getMemoryUsage();
  }, []);

  return {
    metrics,
    measureFunction,
    measureAsync,
    getVitals,
    getMemoryUsage
  };
}

/**
 * Speculation Rules hook for prefetching
 */
export function useSpeculation() {
  const preloadPage = useCallback((
    url: string,
    eagerness: 'conservative' | 'moderate' | 'immediate' = 'moderate'
  ) => {
    return SpeculationAPI.preloadPage(url, eagerness);
  }, []);

  const prefetchAPI = useCallback((
    pattern: string,
    eagerness: 'conservative' | 'moderate' | 'immediate' = 'conservative'
  ) => {
    return SpeculationAPI.prefetchAPI(pattern, eagerness);
  }, []);

  return {
    preloadPage,
    prefetchAPI,
    isSupported: SpeculationAPI.isSupported()
  };
}