import { Metadata } from 'next';
import { getAllPosts, getAllTags, getAllSeries } from '@/lib/blog';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { setRequestLocale } from 'next-intl/server';

const siteUrl = 'https://www.jovweb.dev';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and tutorials on web development, AI integration, blockchain technology, and software architecture by Jo V.',
  keywords: [
    'Blog',
    'Web Development',
    'AI',
    'Machine Learning',
    'Blockchain',
    'Web3',
    'Software Architecture',
    'TypeScript',
    'React',
    'Next.js',
  ],
  openGraph: {
    title: 'Blog | Jo V',
    description:
      'Articles and tutorials on web development, AI integration, blockchain technology, and software architecture.',
    type: 'website',
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Jo V',
    description:
      'Articles and tutorials on web development, AI integration, blockchain technology, and software architecture.',
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();
  const tags = getAllTags();
  const series = getAllSeries();

  return <BlogPageClient posts={posts} tags={tags} series={series} />;
}
