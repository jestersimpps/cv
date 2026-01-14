'use client';

import { useMemo } from 'react';
import { BlogPost } from '@/lib/models/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
  groupByYear?: boolean;
}

interface PostsByYear {
  year: number;
  posts: BlogPost[];
}

export default function BlogList({
  posts,
  showFeatured = true,
  groupByYear = false,
}: BlogListProps) {
  const featuredPost = showFeatured ? posts.find((p) => p.featured) : null;
  const regularPosts =
    showFeatured && featuredPost
      ? posts.filter((p) => p.slug !== featuredPost.slug)
      : posts;

  const postsByYear = useMemo((): PostsByYear[] => {
    if (!groupByYear) return [];

    const grouped = regularPosts.reduce<Record<number, BlogPost[]>>(
      (acc, post) => {
        const year = new Date(post.publishedAt).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
      },
      {}
    );

    return Object.entries(grouped)
      .map(([year, yearPosts]) => ({
        year: parseInt(year, 10),
        posts: yearPosts,
      }))
      .sort((a, b) => b.year - a.year);
  }, [regularPosts, groupByYear]);

  if (groupByYear) {
    return (
      <div className="space-y-12">
        {featuredPost && (
          <div className="grid grid-cols-1">
            <BlogCard post={featuredPost} index={0} featured />
          </div>
        )}
        {postsByYear.map(({ year, posts: yearPosts }) => (
          <div key={year} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">{year}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              <span className="text-sm text-neutral-500">
                {yearPosts.length} {yearPosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {yearPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

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
