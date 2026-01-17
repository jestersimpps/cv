'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import DotGrid from '@/components/ui/DotGrid';
import { BlogPost } from '@/lib/models/blog';
import { formatDate } from '@/lib/utils/date';

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
      <DotGrid dotColor="rgba(255, 255, 255, 0.08)" spacing={24} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-white" />
            <span className="text-sm text-neutral-400">Latest Articles</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Blog</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Thoughts on development, AI, Web3, and building products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.slug}
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
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[11px] text-neutral-300 font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-neutral-500 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-white/90 line-clamp-2">
                    {post.title}
                  </h3>
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
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
