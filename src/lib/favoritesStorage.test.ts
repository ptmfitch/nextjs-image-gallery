import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FAVORITES_STORAGE_KEY } from '@/app/constants/favorites';
import { makePhoto } from '@/lib/testFixtures';
import {
  readFavorites,
  toggleFavorite,
  writeFavorites,
} from './favoritesStorage';

describe('favoritesStorage', () => {
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    vi.stubGlobal('window', {});
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => store.clear(),
      key: () => null,
      length: 0,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns empty array when storage is empty', () => {
    expect(readFavorites()).toEqual([]);
  });

  it('writes and reads favorites', () => {
    const photo = makePhoto({ id: 42 });
    writeFavorites([photo]);
    expect(readFavorites()).toEqual([photo]);
    expect(store.get(FAVORITES_STORAGE_KEY)).toContain('"version"');
  });

  it('returns empty array for invalid JSON', () => {
    store.set(FAVORITES_STORAGE_KEY, 'not-json');
    expect(readFavorites()).toEqual([]);
  });

  it('returns empty array for invalid schema', () => {
    store.set(FAVORITES_STORAGE_KEY, JSON.stringify({ version: 1, photos: [{}] }));
    expect(readFavorites()).toEqual([]);
  });

  it('toggleFavorite adds and removes by id', () => {
    const a = makePhoto({ id: 1 });
    const b = makePhoto({ id: 2 });
    const added = toggleFavorite([], a);
    expect(added).toHaveLength(1);
    const withB = toggleFavorite(added, b);
    expect(withB).toHaveLength(2);
    const removed = toggleFavorite(withB, a);
    expect(removed).toEqual([b]);
  });
});
