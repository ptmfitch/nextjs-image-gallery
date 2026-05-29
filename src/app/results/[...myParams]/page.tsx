import { redirect } from 'next/navigation';
import Gallery from '@/app/components/Gallery';

type Props = {
  params: Promise<{
    myParams: (string | undefined)[];
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { myParams } = await params;
  const rawTopic = myParams?.[0] ?? 'curated';
  const topic = decodeURIComponent(rawTopic);
  const displayTopic =
    topic === 'curated' ? 'Curated' : topic;

  return {
    title: `${displayTopic} — Photo Gallery`,
    description: `Photos for "${displayTopic}" from Pexels.`,
  };
}

export default async function SearchResults({ params }: Props) {
  const { myParams } = await params;
  const rawTopic = myParams?.[0] ?? 'curated';
  const topic = decodeURIComponent(rawTopic);
  const page = myParams?.[1];

  if (page) {
    redirect(`/results/${encodeURIComponent(topic)}`);
  }

  return <Gallery topic={topic} />;
}
