import Link from 'next/link';
import GalleryLogoIcon from './GalleryLogoIcon';
import Search from './Search';

export default function Navbar() {
  return (
    <header className="bg-adobe-red sticky top-0 z-10">
      <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center p-4 font-bold max-w-6xl mx-auto text-white">
        <h1 className="text-2xl sm:text-3xl text-center whitespace-nowrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:opacity-90"
            aria-label="Photo Gallery home"
          >
            <GalleryLogoIcon className="shrink-0" />
            Photo Gallery
          </Link>
        </h1>
        <Search />
      </nav>
    </header>
  );
}
