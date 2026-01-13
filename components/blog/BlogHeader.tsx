'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';
import { formatDate } from '@/lib/utils/date';

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="mb-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-neutral-300 font-medium">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-neutral-500 text-sm">
            <Clock className="w-4 h-4" />
            {post.readingTime}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {post.title}
        </h1>

        <p className="text-xl text-neutral-400 mb-6">{post.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt)}
          </div>
          {post.updatedAt && (
            <span className="text-neutral-600">
              (Updated: {formatDate(post.updatedAt)})
            </span>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </motion.div>

      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-[2/1] mt-8 rounded-2xl overflow-hidden"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}
    </header>
  );
}
