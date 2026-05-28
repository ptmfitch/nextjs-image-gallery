import { NextRequest, NextResponse } from 'next/server';
import buildPexelsUrl from '@/lib/buildPexelsUrl';
import fetchImages from '@/lib/fetchImages';
import addBlurredDataUrls from '@/lib/getBase64';
import getNextPage from '@/lib/getNextPage';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const topic = searchParams.get('topic') ?? 'curated';
  const page = searchParams.get('page');

  if (!page) {
    return NextResponse.json(
      { error: 'page query parameter is required' },
      { status: 400 }
    );
  }

  const url = buildPexelsUrl(topic, page);
  const images = await fetchImages(url);

  if (!images || images.per_page === 0) {
    return NextResponse.json({ photos: [], nextPage: null });
  }

  const photos = await addBlurredDataUrls(images);
  const nextPage = getNextPage(images);

  return NextResponse.json({ photos, nextPage });
}
