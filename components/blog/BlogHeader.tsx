'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/models/blog';
import { formatDate } from '@/lib/utils/date';
import { formatViewCount } from '@/lib/utils/formatNumber';
import ShareButtons from './ShareButtons';

interface BlogHeaderProps {
  post: BlogPost;
  viewCount?: number;
}

export default function BlogHeader({ post, viewCount }: BlogHeaderProps) {
  return (
    <header className="mb-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Blog
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 text-sm mb-6 flex-wrap">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-neutral-300 font-medium">
            {post.category}
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-500">{post.readingTime}</span>
          {viewCount !== undefined && viewCount > 0 && (
            <>
              <span className="text-neutral-500">·</span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Eye className="w-3.5 h-3.5" />
                {formatViewCount(viewCount)}
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {post.title}
        </h1>

        <p className="text-xl text-neutral-400 mb-6">{post.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            {post.updatedAt && (
              <>
                <span>·</span>
                <span className="text-neutral-600">Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
          </div>

          {/* Share Buttons - Right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ShareButtons
              post={{ title: post.title, description: post.description, slug: post.slug }}
              variant="horizontal"
            />
          </motion.div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
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
