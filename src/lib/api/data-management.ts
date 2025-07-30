// Advanced Data Management API using React 19 features
import type { FormState, OptimisticUpdate, ApiResponse, ApiError } from '../types';

/**
 * React 19 Server Actions Integration
 * Handles form submissions with optimistic updates
 */
export class DataManagementAPI {
  private static baseUrl = '/api';

  /**
   * Generic server action for form handling
   */
  static async submitForm<T>(
    formData: FormData,
    endpoint: string,
    options?: {
      optimistic?: boolean;
      onOptimisticUpdate?: (data: T) => void;
    }
  ): Promise<ApiResponse<T>> {
    try {
      // Optimistic update if enabled
      if (options?.optimistic && options.onOptimisticUpdate) {
        const optimisticData = this.createOptimisticData<T>(formData);
        options.onOptimisticUpdate(optimisticData);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        data,
        success: true,
        timestamp: Date.now(),
      };
    } catch (error) {
      const apiError: ApiError = {
        code: 'FORM_SUBMISSION_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
      };

      return {
        data: null,
        success: false,
        message: apiError.message,
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Create optimistic data from form data
   */
  private static createOptimisticData<T>(formData: FormData): T {
    const data: any = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return { ...data, id: crypto.randomUUID(), pending: true } as T;
  }

  /**
   * Advanced data fetching with caching
   */
  static async fetchData<T>(
    endpoint: string,
    options?: {
      cache?: boolean;
      revalidate?: number;
    }
  ): Promise<ApiResponse<T>> {
    const cacheKey = `data_${endpoint}`;
    
    // Check cache first
    if (options?.cache) {
      const cached = this.getFromCache<T>(cacheKey);
      if (cached && !this.isCacheExpired(cached, options.revalidate)) {
        return cached;
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const result: ApiResponse<T> = {
        data,
        success: true,
        timestamp: Date.now(),
      };

      // Cache the result
      if (options?.cache) {
        this.setCache(cacheKey, result);
      }

      return result;
    } catch (error) {
      return {
        data: null as T,
        success: false,
        message: error instanceof Error ? error.message : 'Fetch failed',
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Optimistic mutations with rollback
   */
  static async optimisticMutation<T>(
    data: T,
    endpoint: string,
    options: {
      onOptimisticUpdate: (update: OptimisticUpdate<T>) => void;
      onRollback: (id: string) => void;
      onSuccess: (data: T) => void;
    }
  ): Promise<void> {
    const optimisticId = crypto.randomUUID();
    
    // Apply optimistic update
    const optimisticUpdate: OptimisticUpdate<T> = {
      id: optimisticId,
      data,
      pending: true,
    };
    
    options.onOptimisticUpdate(optimisticUpdate);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      options.onSuccess(result);
    } catch (error) {
      // Rollback optimistic update
      options.onRollback(optimisticId);
      
      const errorUpdate: OptimisticUpdate<T> = {
        id: optimisticId,
        data,
        pending: false,
        error: {
          code: 'MUTATION_ERROR',
          message: error instanceof Error ? error.message : 'Mutation failed',
        },
      };
      
      options.onOptimisticUpdate(errorUpdate);
    }
  }

  /**
   * Cache management utilities
   */
  private static getFromCache<T>(key: string): ApiResponse<T> | null {
    try {
      const cached = localStorage.getItem(key);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  private static setCache<T>(key: string, data: ApiResponse<T>): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore cache errors
    }
  }

  private static isCacheExpired<T>(
    cached: ApiResponse<T>,
    revalidateMs?: number
  ): boolean {
    if (!revalidateMs) return false;
    return Date.now() - cached.timestamp > revalidateMs;
  }
}

/**
 * React 19 Action State Hook Integration
 */
export function createFormAction<T>(
  endpoint: string,
  options?: {
    optimistic?: boolean;
    revalidate?: string[];
  }
) {
  return async (prevState: FormState<T>, formData: FormData) => {
    const result = await DataManagementAPI.submitForm<T>(
      formData,
      endpoint,
      options
    );

    if (result.success) {
      return {
        data: result.data,
        pending: false,
        success: true,
        error: undefined,
      };
    } else {
      return {
        data: prevState.data,
        pending: false,
        success: false,
        error: {
          code: 'FORM_ERROR',
          message: result.message || 'Form submission failed',
        },
      };
    }
  };
}