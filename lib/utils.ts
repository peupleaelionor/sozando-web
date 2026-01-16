// Utility functions for soZando

// Format price with proper currency
export const formatPrice = (price: number, currency: 'FC' | 'FCFA' = 'FC'): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M ${currency}`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K ${currency}`;
  }
  return `${price} ${currency}`;
};

// Validate phone number (Congo format)
export const validatePhoneNumber = (phone: string): boolean => {
  const patterns = [
    /^\+243\d{9}$/, // +243 format
    /^0\d{9}$/, // 0 format
    /^\d{9}$/, // 9 digits
  ];
  return patterns.some(pattern => pattern.test(phone.replace(/\s/g, '')));
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get user's location (with fallback)
export const getUserLocation = async (): Promise<{ lat: number; lng: number } | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        resolve(null);
      },
      { timeout: 5000 }
    );
  });
};

// Cache management
export class CacheManager {
  private static readonly PREFIX = 'sozando_cache_';
  private static readonly TTL = 1000 * 60 * 60; // 1 hour

  static set(key: string, value: any, ttl: number = this.TTL): void {
    try {
      const item = {
        value,
        expiry: Date.now() + ttl,
      };
      localStorage.setItem(this.PREFIX + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Cache set failed:', error);
    }
  }

  static get(key: string): any {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (!item) return null;

      const { value, expiry } = JSON.parse(item);
      if (Date.now() > expiry) {
        localStorage.removeItem(this.PREFIX + key);
        return null;
      }

      return value;
    } catch (error) {
      console.warn('Cache get failed:', error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(this.PREFIX + key);
    } catch (error) {
      console.warn('Cache remove failed:', error);
    }
  }

  static clear(): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }
}

// Error logger
export class ErrorLogger {
  static log(error: any, context: string = ''): void {
    const errorData = {
      message: error?.message || String(error),
      stack: error?.stack || '',
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    console.error('Error logged:', errorData);

    // In production, send to error tracking service (e.g., Sentry)
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      // fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorData) });
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static markStart(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
    }
  }

  static markEnd(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`);
      try {
        window.performance.measure(name, `${name}-start`, `${name}-end`);
        const measure = window.performance.getEntriesByName(name)[0];
        console.log(`Performance [${name}]: ${measure.duration.toFixed(2)}ms`);
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
  }
}

// Rate limiter
export class RateLimiter {
  private static requests: Map<string, number[]> = new Map();
  private static readonly WINDOW = 60000; // 1 minute
  private static readonly MAX_REQUESTS = 30;

  static isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    const recentRequests = requests.filter((time) => now - time < this.WINDOW);

    if (recentRequests.length >= this.MAX_REQUESTS) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }
}

// Lingala + French translations
export const translations = {
  ln: {
    // Common
    search: 'Soki',
    filter: 'Filtre',
    sort: 'Rangela',
    loading: 'Kitungisi...',
    error: 'Likambu',
    success: 'Malamu',
    
    // Listings
    listings: 'Matomba',
    noListings: 'Matomba te',
    price: 'Presyo',
    location: 'Esika',
    seller: 'Mombeli',
    verified: 'Eleki',
    mobileMoney: 'Mobile Money',
    
    // Actions
    chat: 'Solola liboso',
    call: 'Pika',
    share: 'Bokangela',
    favorite: 'Bolinga',
    publish: 'Pesa',
    
    // Messages
    welcome: 'Mbote na Sozando!',
    discussFirst: 'Solola liboso, mbongo sima',
  },
  fr: {
    // Common
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Listings
    listings: 'Annonces',
    noListings: 'Aucune annonce',
    price: 'Prix',
    location: 'Localisation',
    seller: 'Vendeur',
    verified: 'Vérifié',
    mobileMoney: 'Mobile Money',
    
    // Actions
    chat: 'Discuter',
    call: 'Appeler',
    share: 'Partager',
    favorite: 'Favori',
    publish: 'Publier',
    
    // Messages
    welcome: 'Bienvenue sur Sozando!',
    discussFirst: 'Discuter d\'abord, paiement après',
  },
};

// Get translation
export const t = (key: string, lang: 'ln' | 'fr' = 'ln'): string => {
  return (translations[lang] as any)?.[key] || key;
};
