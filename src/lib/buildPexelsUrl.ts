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
  const encodedTopic = encodeURIComponent(topic);
  if (!page) {
    return `https://api.pexels.com/v1/search?query=${encodedTopic}`;
  }
  return `https://api.pexels.com/v1/search?query=${encodedTopic}&page=${page}`;
}
