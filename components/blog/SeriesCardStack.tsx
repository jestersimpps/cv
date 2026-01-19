'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Library, ChevronRight, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';
import { BentoSize } from '@/lib/models/bento';
import { formatViewCount } from '@/lib/utils/formatNumber';

interface SeriesCardStackProps {
  seriesId: string;
  seriesTitle: string;
  posts: BlogPost[];
  index: number;
  totalViewCount?: number;
  size?: BentoSize;
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export default function SeriesCardStack({
  seriesId,
  seriesTitle,
  posts,
  index,
  totalViewCount,
  size,
}: SeriesCardStackProps) {
  const firstPost = posts[0];
  const totalReadingTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readingTime.replace(/\D/g, ''), 10) || 0;
    return acc + minutes;
  }, 0);

  const cardOffsets = useMemo(() => {
    const seed = seriesId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = seededRandom(seed);

    return [
      { rotate: (random() - 0.5) * 8, x: (random() - 0.5) * 12, y: (random() - 0.5) * 6 },
      { rotate: (random() - 0.5) * 10, x: (random() - 0.5) * 16, y: (random() - 0.5) * 8 },
      { rotate: (random() - 0.5) * 6, x: (random() - 0.5) * 10, y: (random() - 0.5) * 4 },
    ];
  }, [seriesId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group pt-2 pb-3 px-2 h-full"
    >
      {posts.length > 2 && (
        <div
          className="absolute top-2 left-2 right-2 bottom-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl transition-transform duration-300 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{
            transform: `rotate(${cardOffsets[1].rotate}deg) translateX(${cardOffsets[1].x}px) translateY(${cardOffsets[1].y}px)`,
          }}
        />
      )}
      {posts.length > 1 && (
        <div
          className="absolute top-2 left-2 right-2 bottom-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl transition-transform duration-300 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{
            transform: `rotate(${cardOffsets[0].rotate}deg) translateX(${cardOffsets[0].x}px) translateY(${cardOffsets[0].y}px)`,
          }}
        />
      )}

      <Link
        href={`/blog/${firstPost.slug}`}
        className="relative flex flex-col h-full bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:from-white/[0.1] hover:to-white/[0.05] transition-all duration-300 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0"
        style={{
          transform: `rotate(${cardOffsets[2].rotate}deg) translateX(${cardOffsets[2].x}px) translateY(${cardOffsets[2].y}px)`,
        }}
      >
        {firstPost.coverImage && (
          <div className="relative aspect-[2/1] overflow-hidden flex-shrink-0">
            <Image
              src={firstPost.coverImage}
              alt={seriesTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-[10px] text-cyan-400 font-medium">
              <Library className="w-2.5 h-2.5" />
              {posts.length}-Part Series
            </span>
          </div>
          <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{seriesTitle}</h3>
          <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
            {firstPost.description}
          </p>

          <div className="space-y-2 mb-4">
            {posts.slice(0, 3).map((post, i) => (
              <div
                key={post.slug}
                className="flex items-center gap-3 text-sm text-neutral-400"
              >
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-white/10 rounded-full text-[10px] font-medium text-neutral-300">
                  {i + 1}
                </span>
                <span className="truncate">{post.title.replace(/^.*?:\s*/, '')}</span>
              </div>
            ))}
            {posts.length > 3 && (
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-white/5 rounded-full text-[10px]">
                  +{posts.length - 3}
                </span>
                <span>more chapters</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
            <div className="flex items-center gap-3 text-neutral-500 text-[10px]">
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                ~{totalReadingTime} min
              </div>
              {totalViewCount !== undefined && totalViewCount > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5" />
                  {formatViewCount(totalViewCount)}
                </div>
              )}
            </div>
            <span className="flex items-center gap-1 text-[10px] text-cyan-400 group-hover:text-cyan-300 transition-colors">
              Start series
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
