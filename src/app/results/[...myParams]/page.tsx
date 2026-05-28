import { redirect } from 'next/navigation';
import Gallery from '@/app/components/Gallery';

type Props = {
  params: Promise<{
    myParams: (string | undefined)[];
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { myParams } = await params;
  const topic = myParams?.[0] ?? 'curated';

  return {
    title: `${topic} — Photo Gallery`,
  };
}

export default async function SearchResults({ params }: Props) {
  const { myParams } = await params;
  const topic = myParams?.[0] ?? 'curated';
  const page = myParams?.[1];

  if (page) {
    redirect(`/results/${topic}`);
  }

  return <Gallery topic={topic} />;
}
