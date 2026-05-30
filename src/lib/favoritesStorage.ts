import {
  FAVORITES_STORAGE_KEY,
  FAVORITES_STORAGE_VERSION,
} from '@/app/constants/favorites';
import { PhotoSchema, type Photo } from '@/models/Images';
import { z } from 'zod';

const FavoritesPayloadSchema = z.object({
  version: z.number(),
  photos: z.array(PhotoSchema),
});

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function readFavorites(): Photo[] {
  if (!isBrowser()) return [];

  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    const result = FavoritesPayloadSchema.safeParse(parsed);
    if (!result.success) return [];

    return result.data.photos;
  } catch {
    return [];
  }
}

export function writeFavorites(photos: Photo[]): void {
  if (!isBrowser()) return;

  const payload = {
    version: FAVORITES_STORAGE_VERSION,
    photos,
  };
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(payload));
}

export function toggleFavorite(photos: Photo[], photo: Photo): Photo[] {
  const exists = photos.some((p) => p.id === photo.id);
  if (exists) {
    return photos.filter((p) => p.id !== photo.id);
  }
  return [...photos, photo];
}
