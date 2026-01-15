'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Library, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';

interface SeriesCardStackProps {
  seriesId: string;
  seriesTitle: string;
  posts: BlogPost[];
  index: number;
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
      className="relative group pt-2 pb-3 px-2"
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
        className="relative block bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:from-white/[0.1] hover:to-white/[0.05] transition-all duration-300 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0"
        style={{
          transform: `rotate(${cardOffsets[2].rotate}deg) translateX(${cardOffsets[2].x}px) translateY(${cardOffsets[2].y}px)`,
        }}
      >
        {firstPost.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={firstPost.coverImage}
              alt={seriesTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-medium">
                  <Library className="w-3 h-3" />
                  {posts.length}-Part Series
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{seriesTitle}</h3>
            </div>
          </div>
        )}

        {!firstPost.coverImage && (
          <div className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-medium">
                <Library className="w-3 h-3" />
                {posts.length}-Part Series
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{seriesTitle}</h3>
          </div>
        )}

        <div className="p-5 pt-3 flex flex-col">
          <p className="text-neutral-400 text-sm line-clamp-2 mb-4 h-10">
            {firstPost.description}
          </p>

          <div className="space-y-2 mb-4 h-[104px]">
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
            <div className="flex items-center gap-1 text-neutral-500 text-xs">
              <Clock className="w-3 h-3" />
              ~{totalReadingTime} min total
            </div>
            <span className="flex items-center gap-1 text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors">
              Start series
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
