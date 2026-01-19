'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';
import { formatDate } from '@/lib/utils/date';
import { formatViewCount } from '@/lib/utils/formatNumber';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
  viewCount?: number;
}

export default function BlogCard({ post, index, featured = false, viewCount }: BlogCardProps) {
  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="md:col-span-2"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
        >
          {post.coverImage && (
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-[4/3] overflow-hidden flex-shrink-0">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            </div>
          )}
          <div className="flex flex-col justify-center p-6 md:py-8 md:pr-8 md:pl-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">
                Featured
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-neutral-300 font-medium">
                {post.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white/90">
              {post.title}
            </h2>
            <p className="text-neutral-400 text-sm line-clamp-2 mb-4">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </div>
              {viewCount !== undefined && viewCount > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatViewCount(viewCount)}
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all h-full"
      >
        {post.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[11px] text-neutral-300 font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </div>
            {viewCount !== undefined && viewCount > 0 && (
              <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
                <Eye className="w-3 h-3" />
                {formatViewCount(viewCount)}
              </div>
            )}
          </div>
          <h2 className="text-base font-semibold text-white mb-1.5 group-hover:text-white/90 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-neutral-400 text-sm line-clamp-2 mb-3">
            {post.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </div>
            <span className="flex items-center gap-1 text-xs text-white/70 group-hover:text-white transition-colors">
              Read
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
