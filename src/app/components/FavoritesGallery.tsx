'use client';

import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import ImgContainer from './ImgContainer';

export default function FavoritesGallery() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="m-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">No favorites yet</h2>
        <p className="mt-4 text-gray-600">
          Browse photos on the home page or search, then hover a photo and click
          the heart to save it here.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-bold text-gray-900 underline hover:opacity-75"
        >
          Browse photos
        </Link>
      </div>
    );
  }

  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-gallery">
      {favorites.map((photo) => (
        <ImgContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
}
