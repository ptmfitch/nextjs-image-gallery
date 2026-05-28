export default function buildPexelsUrl(
  topic: string,
  page?: string
): string {
  if (topic === 'curated' && page) {
    return `https://api.pexels.com/v1/curated?page=${page}`;
  }
  if (topic === 'curated') {
    return 'https://api.pexels.com/v1/curated';
  }
  if (!page) {
    return `https://api.pexels.com/v1/search?query=${topic}`;
  }
  return `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;
}
