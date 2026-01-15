'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Library, ChevronRight, Sparkles } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';

interface FeaturedSeriesProps {
  seriesId: string;
  seriesTitle: string;
  posts: BlogPost[];
  description?: string;
}

export default function FeaturedSeries({
  seriesId,
  seriesTitle,
  posts,
  description,
}: FeaturedSeriesProps) {
  const sortedPosts = [...posts].sort(
    (a, b) => (a.series?.part || 0) - (b.series?.part || 0)
  );
  const firstPost = sortedPosts[0];
  const totalReadingTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readingTime.replace(/\D/g, ''), 10) || 0;
    return acc + minutes;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-12 relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50" />

      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />

        <div className="grid md:grid-cols-[1fr_auto] gap-6 p-6 md:p-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Series
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-400">
                <Library className="w-3 h-3" />
                {posts.length} Parts
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {seriesTitle}
            </h2>

            <p className="text-neutral-400 mb-6 max-w-xl">
              {description || firstPost.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
              {sortedPosts.slice(0, 5).map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-lg transition-all"
                >
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-cyan-500/20 rounded text-[10px] font-bold text-cyan-400">
                    {i + 1}
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-white truncate transition-colors">
                    Part {i + 1}
                  </span>
                </Link>
              ))}
            </div>

            {posts.length > 5 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {sortedPosts.slice(5).map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-lg transition-all"
                  >
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-cyan-500/20 rounded text-[10px] font-bold text-cyan-400">
                      {i + 6}
                    </span>
                    <span className="text-xs text-neutral-400 group-hover:text-white truncate transition-colors">
                      Part {i + 6}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6 mt-auto">
              <Link
                href={`/blog/${firstPost.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-medium rounded-lg transition-all group"
              >
                Start Learning
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                <Clock className="w-4 h-4" />
                ~{totalReadingTime} min total
              </div>
            </div>
          </div>

          {firstPost.coverImage && (
            <div className="hidden md:block relative w-64 h-64 rounded-xl overflow-hidden border border-white/10">
              <Image
                src={firstPost.coverImage}
                alt={seriesTitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
              What you'll learn
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sortedPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <p className="text-sm text-neutral-400 group-hover:text-white transition-colors line-clamp-2">
                    {post.title.replace(/^.*?:\s*/, '')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
