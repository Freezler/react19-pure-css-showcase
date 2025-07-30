// Error Handling and Validation for Advanced APIs
import { Component, type ErrorInfo, type ReactNode, isValidElement } from 'react';

/**
 * Type definitions for error handling
 */
export type ErrorDetails = Record<string, unknown> | string | number | boolean | null;
export type ValidationValue = string | number | boolean | null | undefined;
export type UnknownObject = Record<string, unknown>;

/**
 * API Error Classes
 */
export class APIError extends Error {
  public code: string;
  public details?: ErrorDetails;

  constructor(message: string, code: string = 'API_ERROR', details?: ErrorDetails) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends APIError {
  constructor(message: string = 'Network request failed', details?: ErrorDetails) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string = 'Validation failed', details?: ErrorDetails) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class PermissionError extends APIError {
  constructor(message: string = 'Permission denied', details?: ErrorDetails) {
    super(message, 'PERMISSION_ERROR', details);
    this.name = 'PermissionError';
  }
}

export class UnsupportedFeatureError extends APIError {
  constructor(feature: string, details?: ErrorDetails) {
    super(`Feature not supported: ${feature}`, 'FEATURE_NOT_SUPPORTED', details);
    this.name = 'UnsupportedFeatureError';
  }
}

/**
 * Error Handler Utility
 */
export class ErrorHandler {
  private static listeners: Set<(error: APIError) => void> = new Set();

  static addListener(listener: (error: APIError) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  static handle(error: unknown): APIError {
    let apiError: APIError;

    if (error instanceof APIError) {
      apiError = error;
    } else if (error instanceof Error) {
      // Convert standard errors to API errors
      const errorDetails: ErrorDetails = { originalError: error };
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        apiError = new NetworkError(error.message, errorDetails);
      } else if (error.name === 'AbortError') {
        apiError = new APIError('Request was aborted', 'REQUEST_ABORTED', errorDetails);
      } else {
        apiError = new APIError(error.message, 'UNKNOWN_ERROR', errorDetails);
      }
    } else {
      const errorDetails: ErrorDetails = { originalError: error };
      apiError = new APIError('An unknown error occurred', 'UNKNOWN_ERROR', errorDetails);
    }

    // Notify listeners
    this.listeners.forEach((listener: (error: APIError) => void) => {
      try {
        listener(apiError);
      } catch (listenerError: unknown) {
        console.error('Error in error handler listener:', listenerError);
      }
    });

    // Log to console in development
    if (typeof window !== 'undefined') {
      console.error('API Error:', apiError);
    }

    return apiError;
  }

  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    fallback?: T
  ): Promise<T | undefined> {
    try {
      return await operation();
    } catch (error) {
      const apiError = this.handle(error);
      
      if (fallback !== undefined) {
        return fallback;
      }
      
      throw apiError;
    }
  }

  static wrapSync<T>(
    operation: () => T,
    fallback?: T
  ): T | undefined {
    try {
      return operation();
    } catch (error) {
      const apiError = this.handle(error);
      
      if (fallback !== undefined) {
        return fallback;
      }
      
      throw apiError;
    }
  }
}

/**
 * Validation Utilities
 */
export class Validator {
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  }

  static isValidNumber(value: unknown, min?: number, max?: number): value is number {
    if (typeof value !== 'number' || isNaN(value)) {
      return false;
    }
    
    if (min !== undefined && value < min) {
      return false;
    }
    
    if (max !== undefined && value > max) {
      return false;
    }
    
    return true;
  }

  static validateFormData(formData: FormData, rules: ValidationRules): ValidationResult {
    const errors: Record<string, string> = {};
    
    for (const [field, rule] of Object.entries(rules)) {
      const value: FormDataEntryValue | null = formData.get(field);
      
      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field] = rule.requiredMessage || `${field} is required`;
        continue;
      }
      
      if (value && typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = rule.minLengthMessage || `${field} must be at least ${rule.minLength} characters`;
          continue;
        }
        
        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = rule.maxLengthMessage || `${field} must be no more than ${rule.maxLength} characters`;
          continue;
        }
        
        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.patternMessage || `${field} format is invalid`;
          continue;
        }
        
        if (rule.type === 'email' && !this.isValidEmail(value)) {
          errors[field] = rule.typeMessage || `${field} must be a valid email`;
          continue;
        }
        
        if (rule.type === 'url' && !this.isValidUrl(value)) {
          errors[field] = rule.typeMessage || `${field} must be a valid URL`;
          continue;
        }
      }
      
      if (rule.custom && value !== null) {
        const validationValue: ValidationValue = typeof value === 'string' ? value : String(value);
        const customError = rule.custom(validationValue);
        if (customError) {
          errors[field] = customError;
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static validateObject(obj: UnknownObject, schema: ObjectSchema): ValidationResult {
    const errors: Record<string, string> = {};
    
    for (const [key, rule] of Object.entries(schema)) {
      const value = obj[key];
      
      if (rule.required && (value === undefined || value === null)) {
        errors[key] = rule.requiredMessage || `${key} is required`;
        continue;
      }
      
      if (value !== undefined && value !== null) {
        if (rule.type && typeof value !== rule.type) {
          errors[key] = rule.typeMessage || `${key} must be of type ${rule.type}`;
          continue;
        }
        
        if (rule.validator) {
          const validationValue: ValidationValue = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined 
            ? value as ValidationValue 
            : String(value);
          const validationError = rule.validator(validationValue);
          if (validationError) {
            errors[key] = validationError;
          }
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

/**
 * Type definitions for validation
 */
export interface ValidationRule {
  required?: boolean;
  requiredMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  pattern?: RegExp;
  patternMessage?: string;
  type?: 'email' | 'url' | 'number';
  typeMessage?: string;
  custom?: (value: ValidationValue) => string | null;
}

export interface ValidationRules {
  [field: string]: ValidationRule;
}

export interface ObjectSchemaRule {
  required?: boolean;
  requiredMessage?: string;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  typeMessage?: string;
  validator?: (value: ValidationValue) => string | null;
}

export interface ObjectSchema {
  [key: string]: ObjectSchemaRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * React Error Boundary for API errors
 */
interface APIErrorBoundaryState {
  hasError: boolean;
  error: APIError | null;
}

interface APIErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: APIError) => ReactNode;
  onError?: (error: APIError, errorInfo: ErrorInfo) => void;
}

export class APIErrorBoundary extends Component<APIErrorBoundaryProps, APIErrorBoundaryState> {
  constructor(props: APIErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): APIErrorBoundaryState {
    const apiError = error instanceof APIError 
      ? error 
      : new APIError(error.message, 'REACT_ERROR', { originalError: error });
      
    return { hasError: true, error: apiError };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const apiError: APIError = this.state.error || ErrorHandler.handle(error);
    
    this.props.onError?.(apiError, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error);
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2>Something went wrong</h2>
            <details>
              <summary>Error Details</summary>
              <p><strong>Code:</strong> {this.state.error.code}</p>
              <p><strong>Message:</strong> {this.state.error.message}</p>
              {this.state.error.details && (
                <div className="color-code-display">
                  <pre>{String(JSON.stringify(this.state.error.details, null, 2))}</pre>
                </div>
              )}
            </details>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="error-boundary__retry"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * React hook for error handling
 */
export function useErrorHandler(): {
  handleError: (error: unknown) => APIError;
  withErrorHandling: <T>(operation: () => Promise<T>, fallback?: T) => Promise<T | undefined>;
} {
  const handleError = (error: unknown): APIError => {
    return ErrorHandler.handle(error);
  };

  const withErrorHandling = async <T,>(
    operation: () => Promise<T>,
    fallback?: T
  ): Promise<T | undefined> => {
    return ErrorHandler.withErrorHandling(operation, fallback);
  };

  return {
    handleError,
    withErrorHandling
  };
}

/**
 * Feature detection utilities
 */
export class FeatureDetection {
  static checkWebAPI(feature: string): boolean {
    const features: Record<string, () => boolean> = {
      'service-worker': () => 'serviceWorker' in navigator,
      'view-transitions': () => 'startViewTransition' in document,
      'web-share': () => 'share' in navigator,
      'notifications': () => 'Notification' in window,
      'web-workers': () => 'Worker' in window,
      'intersection-observer': () => 'IntersectionObserver' in window,
      'resize-observer': () => 'ResizeObserver' in window,
      'speculation-rules': () => 'speculationRules' in HTMLScriptElement.prototype,
      'navigation-api': () => 'navigation' in window,
      'cache-api': () => 'caches' in window,
      'background-sync': () => 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
      'push-api': () => 'PushManager' in window,
    };

    const detector = features[feature];
    if (!detector) {
      throw new UnsupportedFeatureError(`Unknown feature: ${feature}`);
    }

    return detector();
  }

  static requireFeature(feature: string): void {
    if (!this.checkWebAPI(feature)) {
      throw new UnsupportedFeatureError(feature);
    }
  }

  static withFeatureCheck<T>(
    feature: string,
    operation: () => T,
    fallback?: T
  ): T | undefined {
    try {
      this.requireFeature(feature);
      return operation();
    } catch (error: unknown) {
      if (error instanceof UnsupportedFeatureError) {
        if (fallback !== undefined) {
          return fallback;
        }
        console.warn(`Feature ${feature} not supported, skipping operation`);
        return undefined;
      }
      throw error;
    }
  }
}