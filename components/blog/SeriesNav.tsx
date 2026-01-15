'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BlogPost, BlogSeries } from '@/lib/models/blog';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface SeriesNavProps {
  series: BlogSeries;
  posts: BlogPost[];
  currentIndex: number;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function SeriesNav({
  series,
  posts,
  currentIndex,
  prevPost,
  nextPost,
}: SeriesNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
    >
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2 text-cyan-400">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">{series.title}</span>
        </div>
        <p className="text-white/60 text-sm mt-1">
          Part {series.part} of {series.total}
        </p>
      </div>

      <div className="p-2 max-h-48 overflow-y-auto">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              index === currentIndex
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-white/40 mr-2">{index + 1}.</span>
            {post.title}
          </Link>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 flex justify-between gap-2">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="truncate max-w-[140px]">Previous</span>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-1 text-sm text-white/60 hover:text-cyan-400 transition-colors"
          >
            <span className="truncate max-w-[140px]">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div className="px-4 pb-3">
        <div className="flex gap-1">
          {Array.from({ length: series.total }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i < series.part ? 'bg-cyan-500' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
