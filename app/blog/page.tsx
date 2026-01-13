import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogPageClient from '@/components/blog/BlogPageClient';

const siteUrl = 'https://cv-nine-bay.vercel.app';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles and tutorials on web development, AI integration, blockchain technology, and software architecture by Jo Vinkenroye.',
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
    title: 'Blog | Jo Vinkenroye',
    description:
      'Articles and tutorials on web development, AI integration, blockchain technology, and software architecture.',
    type: 'website',
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Jo Vinkenroye',
    description:
      'Articles and tutorials on web development, AI integration, blockchain technology, and software architecture.',
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogPageClient posts={posts} tags={tags} />;
}
