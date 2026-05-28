import type { ImagesResults } from '@/models/Images';

function getPageNumber(url: string) {
  const { searchParams } = new URL(url);
  return searchParams.get('page');
}

export default function getNextPage(images: ImagesResults): string | null {
  if (!images.next_page) return null;
  return getPageNumber(images.next_page);
}
