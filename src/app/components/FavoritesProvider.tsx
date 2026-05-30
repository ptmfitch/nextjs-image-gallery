'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Photo } from '@/models/Images';
import {
  FavoritesContext,
  type FavoritesContextValue,
} from '@/hooks/useFavorites';
import { FAVORITES_STORAGE_KEY } from '@/app/constants/favorites';
import {
  readFavorites,
  toggleFavorite as toggleFavoriteStorage,
  writeFavorites,
} from '@/lib/favoritesStorage';

type Props = {
  children: React.ReactNode;
};

export default function FavoritesProvider({ children }: Props) {
  const [favorites, setFavorites] = useState<Photo[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === FAVORITES_STORAGE_KEY) {
        setFavorites(readFavorites());
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [hydrated]);

  const toggleFavorite = useCallback((photo: Photo) => {
    setFavorites((prev) => {
      const next = toggleFavoriteStorage(prev, photo);
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((p) => p.id === id),
    [favorites]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
