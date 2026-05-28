'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Photo } from '@/models/Images';
import { INFINITE_SCROLL_ROOT_MARGIN_PX } from '@/app/constants/infiniteScroll';
import ImgContainer from './ImgContainer';

type GalleryApiResponse = {
  photos: Photo[];
  nextPage: string | null;
};

type Props = {
  initialPhotos: Photo[];
  topic: string;
  initialNextPage: string | null;
};

export default function GalleryInfiniteScroll({
  initialPhotos,
  topic,
  initialNextPage,
}: Props) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [nextPage, setNextPage] = useState(initialNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!nextPage || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ topic, page: nextPage });
      const res = await fetch(`/api/gallery?${params}`);

      if (!res.ok) {
        throw new Error('Failed to load more photos');
      }

      const data: GalleryApiResponse = await res.json();

      setPhotos((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPhotos = data.photos.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newPhotos];
      });
      setNextPage(data.nextPage);
    } catch {
      setError('Could not load more photos.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [nextPage, topic]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !nextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: `${INFINITE_SCROLL_ROOT_MARGIN_PX}px` }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, nextPage]);

  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photos.map((photo) => (
          <ImgContainer key={photo.id} photo={photo} />
        ))}
      </section>

      <div ref={sentinelRef} className="h-1" aria-hidden />

      {isLoading && (
        <p className="text-center py-4 text-gray-600">Loading more photos…</p>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            type="button"
            onClick={loadMore}
            className="underline font-bold"
          >
            Try again
          </button>
        </div>
      )}

      {!nextPage && !isLoading && photos.length > 0 && (
        <p className="text-center py-4 text-gray-500">No more photos</p>
      )}
    </>
  );
}
