// Advanced API Types for React 19 Application

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Data Management Types
export interface OptimisticUpdate<T> {
  id: string;
  data: T;
  pending: boolean;
  error?: ApiError;
}

export interface FormState<T = any> {
  data: T;
  pending: boolean;
  error?: ApiError;
  success?: boolean;
}

// Web Platform API Types
export interface ViewTransitionOptions {
  duration?: number;
  easing?: string;
  direction?: 'forward' | 'backward';
}

export interface IntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export interface ResizeObserverEntry {
  target: Element;
  contentRect: DOMRectReadOnly;
  borderBoxSize: ResizeObserverSize[];
  contentBoxSize: ResizeObserverSize[];
  devicePixelContentBoxSize: ResizeObserverSize[];
}

// PWA API Types
export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  actions?: any[];
  requireInteraction?: boolean;
}

export interface CacheOptions {
  cacheName: string;
  strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  maxAge?: number;
}

// Performance API Types
export interface SpeculationRule {
  source: 'list' | 'document';
  where?: { href_matches?: string; selector_matches?: string };
  eagerness?: 'conservative' | 'moderate' | 'immediate';
}

export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

// Worker API Types
export interface WorkerMessage<T = any> {
  type: string;
  payload: T;
  id: string;
}

export interface WorkerResponse<T = any> {
  id: string;
  result?: T;
  error?: string;
}