'use client';

import { useMemo } from 'react';
import { BlogPost } from '@/lib/models/blog';
import { BentoSize } from '@/lib/models/bento';
import BlogCard from './BlogCard';
import SeriesCardStack from './SeriesCardStack';

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

interface BentoGridProps {
  items: DisplayItem[];
  viewCounts: Record<string, number>;
}

function calculateBentoSize(
  item: DisplayItem,
  index: number,
  totalItems: number
): BentoSize {
  if (item.type === 'post' && item.post?.featured) {
    return 'large';
  }

  if (item.type === 'series') {
    return 'medium';
  }

  if (item.type === 'post' && item.post?.coverImage) {
    return 'medium';
  }

  return 'small';
}

function getSizeClasses(): string {
  return 'col-span-1';
}

export default function BentoGrid({ items, viewCounts }: BentoGridProps) {
  const bentoItems = useMemo(() => {
    return items.map((item, index) => ({
      item,
      size: calculateBentoSize(item, index, items.length),
    }));
  }, [items]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bentoItems.map(({ item, size }, index) => {
        const className = getSizeClasses();

        if (item.type === 'series' && item.series) {
          const totalViewCount = item.series.posts.reduce((sum, post) => {
            return sum + (viewCounts[post.slug] || 0);
          }, 0);

          return (
            <div key={item.series.id} className={className}>
              <SeriesCardStack
                seriesId={item.series.id}
                seriesTitle={item.series.title}
                posts={item.series.posts}
                index={index}
                totalViewCount={totalViewCount}
                size={size}
              />
            </div>
          );
        }

        if (item.type === 'post' && item.post) {
          return (
            <div key={item.post.slug} className={className}>
              <BlogCard
                post={item.post}
                index={index}
                size={size}
                viewCount={viewCounts[item.post.slug]}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
