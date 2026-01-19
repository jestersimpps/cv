'use client';

import { BlogPost } from '@/lib/models/blog';
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

export default function BentoGrid({ items, viewCounts }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {

        if (item.type === 'series' && item.series) {
          const totalViewCount = item.series.posts.reduce((sum, post) => {
            return sum + (viewCounts[post.slug] || 0);
          }, 0);

          return (
            <SeriesCardStack
              key={item.series.id}
              seriesId={item.series.id}
              seriesTitle={item.series.title}
              posts={item.series.posts}
              index={index}
              totalViewCount={totalViewCount}
            />
          );
        }

        if (item.type === 'post' && item.post) {
          return (
            <BlogCard
              key={item.post.slug}
              post={item.post}
              index={index}
              viewCount={viewCounts[item.post.slug]}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
