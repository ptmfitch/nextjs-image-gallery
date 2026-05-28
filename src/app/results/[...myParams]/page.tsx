import Gallery from '@/app/components/Gallery';

type Props = {
  params: Promise<{
    myParams: (string | undefined)[];
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { myParams } = await params;

  const topic = myParams?.[0] ?? 'curated';
  const page = myParams?.[1] ?? '1';

  return {
    title: `${topic} you want - Page ${page}`,
  };
}

export default async function SearchResults({ params }: Props) {
  const { myParams } = await params;

  const topic = myParams?.[0] ?? 'curated';
  const page = myParams?.[1] ?? '1';

  return <Gallery topic={topic} page={page} />;
}
