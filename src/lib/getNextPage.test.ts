import { describe, expect, it } from 'vitest';
import type { ImagesResults } from '@/models/Images';
import getNextPage from './getNextPage';

function makeImages(overrides: Partial<ImagesResults> = {}): ImagesResults {
  return {
    page: 1,
    per_page: 15,
    total_results: 100,
    photos: [],
    ...overrides,
  };
}

describe('getNextPage', () => {
  it('returns page number from next_page URL', () => {
    const images = makeImages({
      next_page: 'https://api.pexels.com/v1/curated?page=2',
    });
    expect(getNextPage(images)).toBe('2');
  });

  it('returns null when next_page is absent', () => {
    const images = makeImages();
    expect(getNextPage(images)).toBeNull();
  });

  it('returns null when next_page has no page query param', () => {
    const images = makeImages({
      next_page: 'https://api.pexels.com/v1/curated',
    });
    expect(getNextPage(images)).toBeNull();
  });
});
