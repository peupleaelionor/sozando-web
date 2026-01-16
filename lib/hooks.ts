'use client';

import { useState, useEffect, useCallback } from 'react';
import { CacheManager } from './utils';

// Hook pour gérer la langue (Lingala + Français)
export const useLanguage = () => {
  const [language, setLanguage] = useState<'ln' | 'fr'>('ln');

  useEffect(() => {
    const saved = localStorage.getItem('sozando_language');
    if (saved === 'ln' || saved === 'fr') {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: 'ln' | 'fr') => {
    setLanguage(lang);
    localStorage.setItem('sozando_language', lang);
  };

  return { language, changeLanguage };
};

// Hook pour gérer les favoris
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('sozando_favorites');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      localStorage.setItem('sozando_favorites', JSON.stringify(Array.from(newFavorites)));
      return newFavorites;
    });
  }, []);

  return { favorites, toggleFavorite };
};

// Hook pour gérer les filtres
export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    city: 'all',
    sortBy: 'recent',
    priceMin: 0,
    priceMax: 1000000000,
  });

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      city: 'all',
      sortBy: 'recent',
      priceMin: 0,
      priceMax: 1000000000,
    });
  }, []);

  return { filters, updateFilter, resetFilters };
};

// Hook pour gérer le cache
export const useCache = (key: string, fetcher: () => Promise<any>, ttl?: number) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = CacheManager.get(key);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    fetcher()
      .then((result) => {
        CacheManager.set(key, result, ttl);
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [key, fetcher, ttl]);

  return { data, loading, error };
};

// Hook pour détecter les erreurs réseau
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Hook pour gérer le throttle (scroll, resize)
export const useThrottle = (callback: () => void, delay: number) => {
  const [throttled, setThrottled] = useState(false);

  useEffect(() => {
    if (!throttled) return;

    const timer = setTimeout(() => setThrottled(false), delay);
    return () => clearTimeout(timer);
  }, [throttled, delay]);

  return () => {
    if (!throttled) {
      callback();
      setThrottled(true);
    }
  };
};

// Hook pour gérer la géolocalisation
export const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocation not supported'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(new Error(err.message));
        setLoading(false);
      },
      { timeout: 5000 }
    );
  }, []);

  return { location, loading, error };
};

// Hook pour gérer les notifications
export const useNotification = () => {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return { notification, showNotification };
};
