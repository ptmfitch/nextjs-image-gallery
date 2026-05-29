import type { Photo } from '@/models/Images';
import {
  GALLERY_GRID_ROW_UNIT_PX,
  GALLERY_THUMB_WIDTH_PX,
} from '@/app/constants/galleryLayout.js';
import Image from 'next/image';
import Link from 'next/link';

type PhotoProps = {
  photo: Photo;
};

export default function ImgContainer({ photo }: PhotoProps) {
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(GALLERY_THUMB_WIDTH_PX * widthHeightRatio);
  const photoSpans =
    Math.ceil(galleryHeight / GALLERY_GRID_ROW_UNIT_PX) + 1;

  return (
    <div
      className="w-gallery-thumb justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }}
    >
      <Link
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid place-content-center"
      >
        <div className="rounded-xl overflow-hidden group">
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={`${GALLERY_THUMB_WIDTH_PX}px`}
            placeholder="blur"
            blurDataURL={photo.blurredDataUrl}
            className="group-hover:opacity-75"
          />
        </div>
      </Link>
    </div>
  );
}
