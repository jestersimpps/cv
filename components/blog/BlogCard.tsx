'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';
import { BentoSize } from '@/lib/models/bento';
import { formatDate } from '@/lib/utils/date';
import { formatViewCount } from '@/lib/utils/formatNumber';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
  size?: BentoSize;
  viewCount?: number;
}

export default function BlogCard({ post, index, featured = false, size, viewCount }: BlogCardProps) {
  const hasImage = !!post.coverImage;

  if (featured && hasImage) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage!}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full text-[10px] font-medium">
                Featured
              </span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-neutral-300 font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-neutral-400 text-[10px]">
                <Clock className="w-2.5 h-2.5" />
                {post.readingTime}
              </div>
              {viewCount !== undefined && viewCount > 0 && (
                <div className="flex items-center gap-1 text-neutral-400 text-[10px]">
                  <Eye className="w-2.5 h-2.5" />
                  {formatViewCount(viewCount)}
                </div>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white/90">
              {post.title}
            </h2>
            <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
              {post.description}
            </p>
            <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
              <Calendar className="w-2.5 h-2.5" />
              {formatDate(post.publishedAt)}
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (hasImage) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <div className="relative aspect-[2/1] overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage!}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {post.featured && (
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full text-[10px] font-medium">
                  Featured
                </span>
              )}
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-neutral-300 font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-neutral-400 text-[10px]">
                <Clock className="w-2.5 h-2.5" />
                {post.readingTime}
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-neutral-400 text-sm line-clamp-2 flex-1">
              {post.description}
            </p>
            <div className="flex items-center gap-3 text-neutral-500 text-[10px] mt-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                {formatDate(post.publishedAt)}
              </div>
              {viewCount !== undefined && viewCount > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5" />
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
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all p-4"
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-neutral-300 font-medium">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
            <Clock className="w-2.5 h-2.5" />
            {post.readingTime}
          </div>
          {viewCount !== undefined && viewCount > 0 && (
            <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
              <Eye className="w-2.5 h-2.5" />
              {formatViewCount(viewCount)}
            </div>
          )}
        </div>
        <h2 className="text-base font-semibold text-white mb-2 group-hover:text-white/90 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-neutral-400 text-sm line-clamp-2 mb-3 flex-1">
          {post.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-1 text-neutral-500 text-[10px]">
            <Calendar className="w-2.5 h-2.5" />
            {formatDate(post.publishedAt)}
          </div>
          <span className="flex items-center gap-1 text-xs text-white/70 group-hover:text-white transition-colors">
            Read
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
