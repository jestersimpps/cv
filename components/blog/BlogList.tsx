'use client';

import { useMemo } from 'react';
import { BlogPost } from '@/lib/models/blog';
import BlogCard from './BlogCard';
import SeriesCardStack from './SeriesCardStack';

interface BlogListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
  groupByYear?: boolean;
  bundleSeries?: boolean;
}

interface PostsByYear {
  year: number;
  posts: BlogPost[];
}

interface SeriesGroup {
  id: string;
  title: string;
  posts: BlogPost[];
}

interface DisplayItem {
  type: 'post' | 'series';
  post?: BlogPost;
  series?: SeriesGroup;
  sortDate: Date;
}

function groupPostsWithSeries(posts: BlogPost[]): DisplayItem[] {
  const seriesMap = new Map<string, SeriesGroup>();
  const standalonePosts: BlogPost[] = [];
  const seriesFirstPostDate = new Map<string, Date>();

  posts.forEach((post) => {
    if (post.series) {
      const existing = seriesMap.get(post.series.id);
      if (existing) {
        existing.posts.push(post);
        existing.posts.sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0));
      } else {
        seriesMap.set(post.series.id, {
          id: post.series.id,
          title: post.series.title,
          posts: [post],
        });
        seriesFirstPostDate.set(post.series.id, new Date(post.publishedAt));
      }
      const currentDate = new Date(post.publishedAt);
      const storedDate = seriesFirstPostDate.get(post.series.id);
      if (storedDate && currentDate > storedDate) {
        seriesFirstPostDate.set(post.series.id, currentDate);
      }
    } else {
      standalonePosts.push(post);
    }
  });

  const displayItems: DisplayItem[] = [];

  standalonePosts.forEach((post) => {
    displayItems.push({
      type: 'post',
      post,
      sortDate: new Date(post.publishedAt),
    });
  });

  seriesMap.forEach((series) => {
    const latestDate = seriesFirstPostDate.get(series.id) || new Date(0);
    displayItems.push({
      type: 'series',
      series,
      sortDate: latestDate,
    });
  });

  displayItems.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

  return displayItems;
}

export default function BlogList({
  posts,
  showFeatured = true,
  groupByYear = false,
  bundleSeries = true,
}: BlogListProps) {
  const featuredPost = showFeatured ? posts.find((p) => p.featured) : null;
  const regularPosts =
    showFeatured && featuredPost
      ? posts.filter((p) => p.slug !== featuredPost.slug)
      : posts;

  const displayItems = useMemo(() => {
    if (!bundleSeries) return null;
    return groupPostsWithSeries(regularPosts);
  }, [regularPosts, bundleSeries]);

  const postsByYear = useMemo((): PostsByYear[] => {
    if (!groupByYear || bundleSeries) return [];

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
  }, [regularPosts, groupByYear, bundleSeries]);

  if (bundleSeries && displayItems) {
    return (
      <div className="space-y-8">
        {featuredPost && (
          <div className="grid grid-cols-1">
            <BlogCard post={featuredPost} index={0} featured />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => {
            if (item.type === 'series' && item.series) {
              return (
                <SeriesCardStack
                  key={item.series.id}
                  seriesId={item.series.id}
                  seriesTitle={item.series.title}
                  posts={item.series.posts}
                  index={index}
                />
              );
            }
            if (item.type === 'post' && item.post) {
              return (
                <BlogCard key={item.post.slug} post={item.post} index={index} />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

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
