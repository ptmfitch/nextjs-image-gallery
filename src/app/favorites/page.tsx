import type { Metadata } from 'next';
import FavoritesGallery from '@/app/components/FavoritesGallery';

export const metadata: Metadata = {
  title: 'Favorites — Photo Gallery',
  description: 'Photos you saved for later.',
};

export default function FavoritesPage() {
  return (
    <>
      <h1 className="m-4 text-2xl font-bold text-gray-900">Favorites</h1>
      <FavoritesGallery />
    </>
  );
}
