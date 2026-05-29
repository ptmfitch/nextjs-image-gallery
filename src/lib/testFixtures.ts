import type { ImagesResults, Photo } from '@/models/Images';

export function makePhoto(overrides: Partial<Photo> = {}): Photo {
  return {
    id: 1,
    width: 800,
    height: 600,
    url: 'https://www.pexels.com/photo/1/',
    src: { large: 'https://images.pexels.com/photos/1/large.jpg' },
    alt: 'Test photo',
    ...overrides,
  };
}

export function makeImages(overrides: Partial<ImagesResults> = {}): ImagesResults {
  return {
    page: 1,
    per_page: 15,
    total_results: 100,
    photos: [makePhoto()],
    ...overrides,
  };
}
