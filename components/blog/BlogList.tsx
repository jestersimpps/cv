'use client';

import { BlogPost } from '@/lib/models/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

export default function BlogList({ posts, showFeatured = true }: BlogListProps) {
  const featuredPost = showFeatured ? posts.find((p) => p.featured) : null;
  const regularPosts =
    showFeatured && featuredPost
      ? posts.filter((p) => p.slug !== featuredPost.slug)
      : posts;

  return (
    <div className="space-y-8">
      {featuredPost && (
        <div className="grid grid-cols-1">
          <BlogCard post={featuredPost} index={0} featured />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
