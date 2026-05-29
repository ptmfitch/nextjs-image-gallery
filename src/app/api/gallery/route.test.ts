import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { makeImages, makePhoto } from '@/lib/testFixtures';

const mockFetchImages = vi.fn();
const mockAddBlurredDataUrls = vi.fn();

vi.mock('@/lib/fetchImages', () => ({
  default: (...args: unknown[]) => mockFetchImages(...args),
}));

vi.mock('@/lib/getBase64', () => ({
  default: (...args: unknown[]) => mockAddBlurredDataUrls(...args),
}));

import { GET } from './route';

function galleryRequest(query: string) {
  return new NextRequest(`http://localhost/api/gallery?${query}`);
}

describe('GET /api/gallery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when page is missing', async () => {
    const res = await GET(galleryRequest('topic=cat'));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/page/i);
  });

  it('returns empty photos when fetch returns no images', async () => {
    mockFetchImages.mockResolvedValue(undefined);

    const res = await GET(galleryRequest('topic=cat&page=2'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ photos: [], nextPage: null });
    expect(mockFetchImages).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/search?query=cat&page=2'
    );
  });

  it('returns photos and nextPage on success', async () => {
    const images = makeImages({
      next_page: 'https://api.pexels.com/v1/search?query=cat&page=3',
    });
    const blurred = [makePhoto({ blurredDataUrl: 'blur-data' })];
    mockFetchImages.mockResolvedValue(images);
    mockAddBlurredDataUrls.mockResolvedValue(blurred);

    const res = await GET(galleryRequest('topic=cat&page=2'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.photos).toEqual(blurred);
    expect(body.nextPage).toBe('3');
  });

  it('defaults topic to curated', async () => {
    mockFetchImages.mockResolvedValue(undefined);

    await GET(galleryRequest('page=2'));

    expect(mockFetchImages).toHaveBeenCalledWith(
      'https://api.pexels.com/v1/curated?page=2'
    );
  });
});
