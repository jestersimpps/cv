import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog | Jo V',
    default: 'Blog | Jo V',
  },
  description:
    'Thoughts on web development, AI integration, blockchain technology, and software architecture.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
