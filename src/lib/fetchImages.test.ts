import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeImages } from './testFixtures';

vi.mock('./env', () => ({
  default: { NEXT_PUBLIC_PEXELS_API_KEY: 'test-api-key' },
}));

import fetchImages from './fetchImages';

describe('fetchImages', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns parsed data for a successful response', async () => {
    const payload = makeImages();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(payload),
      })
    );

    const result = await fetchImages('https://api.pexels.com/v1/curated');

    expect(result).toEqual(payload);
    expect(fetch).toHaveBeenCalledWith('https://api.pexels.com/v1/curated', {
      headers: { Authorization: 'test-api-key' },
    });
  });

  it('returns undefined when total_results is zero', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(makeImages({ total_results: 0, photos: [] })),
      })
    );

    const result = await fetchImages('https://api.pexels.com/v1/search?query=empty');
    expect(result).toBeUndefined();
  });

  it('returns undefined when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false })
    );

    const result = await fetchImages('https://api.pexels.com/v1/curated');
    expect(result).toBeUndefined();
  });

  it('returns undefined when response fails schema validation', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ invalid: true }),
      })
    );

    const result = await fetchImages('https://api.pexels.com/v1/curated');
    expect(result).toBeUndefined();
  });
});
