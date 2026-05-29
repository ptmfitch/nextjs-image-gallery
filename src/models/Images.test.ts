import { describe, expect, it } from 'vitest';
import { ImagesSchemaWithPhotos } from './Images';
import { makeImages } from '@/lib/testFixtures';

describe('ImagesSchemaWithPhotos', () => {
  it('parses a valid Pexels-style payload', () => {
    const payload = makeImages();
    const parsed = ImagesSchemaWithPhotos.parse(payload);
    expect(parsed.photos).toHaveLength(1);
    expect(parsed.photos[0].id).toBe(1);
  });

  it('rejects payload missing required photo fields', () => {
    expect(() =>
      ImagesSchemaWithPhotos.parse({
        page: 1,
        per_page: 15,
        total_results: 1,
        photos: [{ id: 1 }],
      })
    ).toThrow();
  });

  it('accepts optional next_page and prev_page', () => {
    const parsed = ImagesSchemaWithPhotos.parse(
      makeImages({
        next_page: 'https://api.pexels.com/v1/curated?page=2',
        prev_page: 'https://api.pexels.com/v1/curated?page=1',
      })
    );
    expect(parsed.next_page).toContain('page=2');
  });
});
