// Progressive Web App APIs
import { NotificationOptions, CacheOptions } from '../types';

/**
 * Service Worker Management API
 */
export class ServiceWorkerAPI {
  static isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  static async register(
    scriptURL: string,
    options?: RegistrationOptions
  ): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported()) {
      console.warn('Service Workers not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register(scriptURL, options);
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              this.notifyUpdate();
            }
          });
        }
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  static async update(): Promise<void> {
    if (!this.isSupported()) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
    }
  }

  static async unregister(): Promise<boolean> {
    if (!this.isSupported()) return false;

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      return await registration.unregister();
    }
    return false;
  }

  private static notifyUpdate(): void {
    // Dispatch custom event for update notification
    window.dispatchEvent(new CustomEvent('sw-update-available'));
  }

  static postMessage(message: unknown): void {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  }
}

/**
 * Push Notifications API
 */
export class NotificationAPI {
  static isSupported(): boolean {
    return 'Notification' in window;
  }

  static async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      return 'denied';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  static async show(
    title: string,
    options?: NotificationOptions
  ): Promise<boolean> {
    const permission = await this.requestPermission();
    
    if (permission !== 'granted') {
      return false;
    }

    try {
      const notification = new Notification(title, {
        body: options?.body,
        icon: options?.icon || '/icon-192x192.png',
        badge: options?.badge || '/badge-72x72.png',
        tag: options?.tag,
        data: options?.data,
        requireInteraction: options?.requireInteraction,
      });

      // Auto-close after 5 seconds if not requiring interaction
      if (!options?.requireInteraction) {
        setTimeout(() => notification.close(), 5000);
      }

      return true;
    } catch (error) {
      console.error('Notification failed:', error);
      return false;
    }
  }

  static async subscribeToPush(
    registration: ServiceWorkerRegistration,
    vapidPublicKey: string
  ): Promise<PushSubscription | null> {
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
      });

      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  private static urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

/**
 * Cache API for offline functionality
 */
export class CacheAPI {
  static isSupported(): boolean {
    return 'caches' in window;
  }

  static async open(cacheName: string): Promise<Cache | null> {
    if (!this.isSupported()) return null;
    
    try {
      return await caches.open(cacheName);
    } catch (error) {
      console.error('Cache open failed:', error);
      return null;
    }
  }

  static async put(
    cacheName: string,
    request: RequestInfo | URL,
    response: Response
  ): Promise<void> {
    const cache = await this.open(cacheName);
    if (cache) {
      await cache.put(request, response);
    }
  }

  static async match(
    request: RequestInfo | URL,
    cacheName?: string
  ): Promise<Response | undefined> {
    if (!this.isSupported()) return undefined;

    if (cacheName) {
      const cache = await this.open(cacheName);
      return cache?.match(request);
    }

    return await caches.match(request);
  }

  static async addAll(
    cacheName: string,
    requests: RequestInfo[]
  ): Promise<void> {
    const cache = await this.open(cacheName);
    if (cache) {
      await cache.addAll(requests);
    }
  }

  static async delete(
    cacheName: string,
    request?: RequestInfo | URL
  ): Promise<boolean> {
    if (!this.isSupported()) return false;

    if (request) {
      const cache = await this.open(cacheName);
      return cache ? await cache.delete(request) : false;
    }

    return await caches.delete(cacheName);
  }

  static async keys(): Promise<string[]> {
    if (!this.isSupported()) return [];
    
    return await caches.keys();
  }

  /**
   * Advanced caching strategies
   */
  static async cacheFirst(
    request: Request,
    options: CacheOptions
  ): Promise<Response> {
    const cachedResponse = await this.match(request, options.cacheName);
    
    if (cachedResponse) {
      // Check if cache is expired
      if (options.maxAge) {
        const cacheDate = new Date(cachedResponse.headers.get('date') || '');
        const isExpired = Date.now() - cacheDate.getTime() > options.maxAge;
        
        if (!isExpired) {
          return cachedResponse;
        }
      } else {
        return cachedResponse;
      }
    }

    // Fetch from network and cache
    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    
    await this.put(options.cacheName, request, responseClone);
    return networkResponse;
  }

  static async networkFirst(
    request: Request,
    options: CacheOptions & { timeout?: number }
  ): Promise<Response> {
    try {
      // Try network with timeout
      const networkPromise = fetch(request);
      const timeoutPromise = options.timeout 
        ? new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Network timeout')), options.timeout)
          )
        : null;

      const networkResponse = timeoutPromise 
        ? await Promise.race([networkPromise, timeoutPromise])
        : await networkPromise;

      // Cache successful response
      const responseClone = networkResponse.clone();
      await this.put(options.cacheName, request, responseClone);
      
      return networkResponse;
    } catch (error) {
      // Fallback to cache
      const cachedResponse = await this.match(request, options.cacheName);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }

  static async staleWhileRevalidate(
    request: Request,
    options: CacheOptions
  ): Promise<Response> {
    const cachedResponse = await this.match(request, options.cacheName);
    
    // Always fetch in background to update cache
    const networkPromise = fetch(request).then(response => {
      const responseClone = response.clone();
      this.put(options.cacheName, request, responseClone);
      return response;
    });

    // Return cached response immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }

    // Otherwise wait for network
    return await networkPromise;
  }
}

/**
 * Background Sync API
 */
export class BackgroundSyncAPI {
  static isSupported(): boolean {
    return 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype;
  }

  static async register(
    tag: string,
    data?: unknown
  ): Promise<void> {
    if (!this.isSupported()) {
      console.warn('Background Sync not supported');
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    
    // Store data for sync
    if (data) {
      const syncData = JSON.parse(localStorage.getItem('sync-data') || '{}');
      syncData[tag] = data;
      localStorage.setItem('sync-data', JSON.stringify(syncData));
    }

    await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register(tag);
  }

  static getSyncData(tag: string): unknown {
    const syncData = JSON.parse(localStorage.getItem('sync-data') || '{}');
    return syncData[tag];
  }

  static clearSyncData(tag: string): void {
    const syncData = JSON.parse(localStorage.getItem('sync-data') || '{}');
    delete syncData[tag];
    localStorage.setItem('sync-data', JSON.stringify(syncData));
  }
}