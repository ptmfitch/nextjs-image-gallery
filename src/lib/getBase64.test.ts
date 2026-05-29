import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeImages, makePhoto } from './testFixtures';

const mockGetPlaiceholder = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ base64: 'data:image/jpeg;base64,abc' })
);

vi.mock('plaiceholder', () => ({
  getPlaiceholder: mockGetPlaiceholder,
}));

import addBlurredDataUrls from './getBase64';

describe('addBlurredDataUrls', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    mockGetPlaiceholder.mockResolvedValue({
      base64: 'data:image/jpeg;base64,abc',
    });
  });

  it('attaches blurredDataUrl to each photo', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
      })
    );

    const images = makeImages({
      photos: [
        makePhoto({ id: 1 }),
        makePhoto({ id: 2, src: { large: 'https://images.pexels.com/2.jpg' } }),
      ],
    });

    const result = await addBlurredDataUrls(images);

    expect(result).toHaveLength(2);
    expect(result[0].blurredDataUrl).toBe('data:image/jpeg;base64,abc');
    expect(result[1].blurredDataUrl).toBe('data:image/jpeg;base64,abc');
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('leaves blurredDataUrl undefined when image fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' })
    );

    const images = makeImages({ photos: [makePhoto()] });
    const result = await addBlurredDataUrls(images);

    expect(result[0].blurredDataUrl).toBeUndefined();
  });
});
