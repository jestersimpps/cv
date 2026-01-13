'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Home } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/lib/models/blog';
import { BlogList, CategoryFilter, TagFilter } from '@/components/blog';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';
import DotGrid from '@/components/ui/DotGrid';
import SectionDivider from '@/components/ui/SectionDivider';

interface BlogPageClientProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch =
        !selectedCategory || post.category === selectedCategory;
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));
      return categoryMatch && tagsMatch;
    });
  }, [posts, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden">
        <GradientOrbs variant="purple" />
        <GridLines />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-white" />
              <span className="text-sm text-neutral-400">
                Articles & Tutorials
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl">
              Thoughts on web development, AI integration, blockchain
              technology, and software architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 space-y-4"
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagToggle={toggleTag}
              onClear={() => setSelectedTags([])}
            />
            <p className="text-sm text-neutral-500">
              {filteredPosts.length} of {posts.length} articles
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-16 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
        <DotGrid dotColor="rgba(255, 255, 255, 0.07)" spacing={28} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              No posts match the selected filters
            </div>
          ) : (
            <BlogList posts={filteredPosts} />
          )}
        </div>
      </section>
    </div>
  );
}
