import './globals.css';
import type { Metadata } from 'next';
import FavoritesProvider from './components/FavoritesProvider';
import Navbar from './components/Navbar';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse and search high-quality photos from Pexels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className='max-w-6xl mx-auto'>
          <FavoritesProvider>{children}</FavoritesProvider>
        </main>
      </body>
    </html>
  )
}
