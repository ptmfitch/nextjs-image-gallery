import fetchImages from '@/lib/fetchImages';
import buildPexelsUrl from '@/lib/buildPexelsUrl';
import getNextPage from '@/lib/getNextPage';
import addBlurredDataUrls from '@/lib/getBase64';
import GalleryInfiniteScroll from './GalleryInfiniteScroll';

type Props = {
  topic?: string | undefined;
};

export default async function Gallery({ topic = 'curated' }: Props) {
  const url = buildPexelsUrl(topic);
  const images = await fetchImages(url);

  if (!images || images.per_page === 0)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  const photosWithBlur = await addBlurredDataUrls(images);
  const nextPage = getNextPage(images);

  return (
    <GalleryInfiniteScroll
      initialPhotos={photosWithBlur}
      topic={topic}
      initialNextPage={nextPage}
    />
  );
}
