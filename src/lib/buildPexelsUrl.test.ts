import { describe, expect, it } from 'vitest';
import buildPexelsUrl from './buildPexelsUrl';

describe('buildPexelsUrl', () => {
  it('returns curated URL without page', () => {
    expect(buildPexelsUrl('curated')).toBe(
      'https://api.pexels.com/v1/curated'
    );
  });

  it('returns curated URL with page', () => {
    expect(buildPexelsUrl('curated', '2')).toBe(
      'https://api.pexels.com/v1/curated?page=2'
    );
  });

  it('returns search URL without page', () => {
    expect(buildPexelsUrl('cat')).toBe(
      'https://api.pexels.com/v1/search?query=cat'
    );
  });

  it('returns search URL with page', () => {
    expect(buildPexelsUrl('cat', '3')).toBe(
      'https://api.pexels.com/v1/search?query=cat&page=3'
    );
  });

  it('encodes multi-word search queries', () => {
    expect(buildPexelsUrl('golden retriever')).toBe(
      'https://api.pexels.com/v1/search?query=golden%20retriever'
    );
  });
});
