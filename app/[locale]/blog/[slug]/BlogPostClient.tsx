'use client';

import { BlogPost } from '@/lib/models/blog';
import { BlogHeader } from '@/components/blog';
import { useViewCount } from '@/hooks/useViewCounts';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { viewCount } = useViewCount(post.slug);

  return <BlogHeader post={post} viewCount={viewCount} />;
}
