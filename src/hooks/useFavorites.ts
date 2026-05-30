'use client';

import { createContext, useContext } from 'react';
import type { Photo } from '@/models/Images';

export type FavoritesContextValue = {
  favorites: Photo[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (photo: Photo) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
