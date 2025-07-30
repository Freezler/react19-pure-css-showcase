// Modern Web Platform APIs
import { ViewTransitionOptions, IntersectionObserverOptions, ResizeObserverEntry } from '../types';

/**
 * View Transitions API for smooth page navigation
 */
export class ViewTransitionsAPI {
  static isSupported(): boolean {
    return 'startViewTransition' in document;
  }

  static async transition(
    updateFunction: () => void | Promise<void>,
    options?: ViewTransitionOptions
  ): Promise<void> {
    if (!this.isSupported()) {
      // Fallback for unsupported browsers
      await updateFunction();
      return;
    }

    const transition = document.startViewTransition(async () => {
      await updateFunction();
    });

    if (options?.duration || options?.easing) {
      // Apply custom CSS properties for animation
      document.documentElement.style.setProperty(
        '--view-transition-duration',
        `${options.duration || 300}ms`
      );
      
      if (options.easing) {
        document.documentElement.style.setProperty(
          '--view-transition-easing',
          options.easing
        );
      }
    }

    await transition.finished;
  }

  static setTransitionName(element: Element, name: string): void {
    (element as HTMLElement).style.viewTransitionName = name;
  }

  static removeTransitionName(element: Element): void {
    (element as HTMLElement).style.viewTransitionName = '';
  }
}

/**
 * Enhanced Intersection Observer API
 */
export class IntersectionAPI {
  private static observers = new Map<string, IntersectionObserver>();

  static observe(
    elements: Element | Element[],
    callback: (entries: IntersectionObserverEntry[]) => void,
    options?: IntersectionObserverOptions & { id?: string }
  ): string {
    const observerId = options?.id || crypto.randomUUID();
    const elementsArray = Array.isArray(elements) ? elements : [elements];

    const observer = new IntersectionObserver(callback, {
      threshold: options?.threshold || 0.1,
      rootMargin: options?.rootMargin || '0px',
      root: options?.root || null,
    });

    elementsArray.forEach(element => observer.observe(element));
    this.observers.set(observerId, observer);

    return observerId;
  }

  static unobserve(observerId: string): void {
    const observer = this.observers.get(observerId);
    if (observer) {
      observer.disconnect();
      this.observers.delete(observerId);
    }
  }

  static observeVisibility(
    element: Element,
    callback: (isVisible: boolean, entry: IntersectionObserverEntry) => void,
    threshold = 0.1
  ): string {
    return this.observe(
      element,
      (entries) => {
        entries.forEach(entry => {
          callback(entry.isIntersecting, entry);
        });
      },
      { threshold }
    );
  }

  static observeLazyLoad(
    images: Element[],
    callback?: (element: Element) => void
  ): string {
    return this.observe(
      images,
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              callback?.(img);
            }
            
            entry.target.classList.add('loaded');
          }
        });
      },
      { threshold: 0.1 }
    );
  }
}

/**
 * Enhanced Resize Observer API
 */
export class ResizeAPI {
  private static observers = new Map<string, ResizeObserver>();

  static observe(
    elements: Element | Element[],
    callback: (entries: ResizeObserverEntry[]) => void,
    options?: { id?: string }
  ): string {
    const observerId = options?.id || crypto.randomUUID();
    const elementsArray = Array.isArray(elements) ? elements : [elements];

    const observer = new ResizeObserver(callback);
    elementsArray.forEach(element => observer.observe(element));
    
    this.observers.set(observerId, observer);
    return observerId;
  }

  static unobserve(observerId: string): void {
    const observer = this.observers.get(observerId);
    if (observer) {
      observer.disconnect();
      this.observers.delete(observerId);
    }
  }

  static observeContainer(
    element: Element,
    callback: (width: number, height: number) => void
  ): string {
    return this.observe(element, (entries) => {
      entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        callback(width, height);
      });
    });
  }
}

/**
 * Navigation API for advanced routing
 */
export class NavigationAPI {
  static isSupported(): boolean {
    return 'navigation' in window;
  }

  static navigate(
    url: string,
    options?: {
      replace?: boolean;
      state?: any;
      transition?: boolean;
    }
  ): Promise<void> {
    if (!this.isSupported()) {
      // Fallback to traditional navigation
      if (options?.replace) {
        window.location.replace(url);
      } else {
        window.location.href = url;
      }
      return Promise.resolve();
    }

    const navigation = (window as any).navigation;
    
    if (options?.transition && ViewTransitionsAPI.isSupported()) {
      return ViewTransitionsAPI.transition(() => {
        if (options.replace) {
          navigation.navigate(url, { replace: true, state: options.state });
        } else {
          navigation.navigate(url, { state: options.state });
        }
      });
    }

    if (options?.replace) {
      return navigation.navigate(url, { replace: true, state: options.state });
    }
    
    return navigation.navigate(url, { state: options.state });
  }

  static back(): void {
    if (this.isSupported()) {
      (window as any).navigation.back();
    } else {
      window.history.back();
    }
  }

  static forward(): void {
    if (this.isSupported()) {
      (window as any).navigation.forward();
    } else {
      window.history.forward();
    }
  }

  static addEventListener(
    event: string,
    handler: (event: any) => void
  ): void {
    if (this.isSupported()) {
      (window as any).navigation.addEventListener(event, handler);
    }
  }
}

/**
 * Web Share API
 */
export class ShareAPI {
  static isSupported(): boolean {
    return 'share' in navigator;
  }

  static canShare(data?: ShareData): boolean {
    if (!this.isSupported()) return false;
    
    if (data && 'canShare' in navigator) {
      return (navigator as any).canShare(data);
    }
    
    return true;
  }

  static async share(data: {
    title?: string;
    text?: string;
    url?: string;
    files?: File[];
  }): Promise<boolean> {
    if (!this.isSupported()) {
      // Fallback to clipboard or custom share UI
      await this.fallbackShare(data);
      return false;
    }

    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      console.warn('Share failed:', error);
      await this.fallbackShare(data);
      return false;
    }
  }

  private static async fallbackShare(data: {
    title?: string;
    text?: string;
    url?: string;
  }): Promise<void> {
    const shareText = `${data.title || ''} ${data.text || ''} ${data.url || ''}`.trim();
    
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(shareText);
        // Show toast notification
        console.log('Copied to clipboard');
      } catch {
        // Final fallback - could show custom share modal
        console.log('Share fallback needed');
      }
    }
  }
}