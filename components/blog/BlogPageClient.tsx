'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, X, Library } from 'lucide-react';
import { BlogPost, BlogCategory, BLOG_CATEGORIES } from '@/lib/models/blog';
import { SeriesInfo } from '@/lib/blog';
import { BlogList } from '@/components/blog';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';
import SectionDivider from '@/components/ui/SectionDivider';

interface BlogPageClientProps {
  posts: BlogPost[];
  tags: string[];
  series: SeriesInfo[];
}

export default function BlogPageClient({ posts, tags, series }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  const { years, postCountByYear } = useMemo(() => {
    const countByYear: Record<number, number> = {};
    posts.forEach((post) => {
      const year = new Date(post.publishedAt).getFullYear();
      countByYear[year] = (countByYear[year] || 0) + 1;
    });
    const sortedYears = Object.keys(countByYear)
      .map(Number)
      .sort((a, b) => b - a);
    return { years: sortedYears, postCountByYear: countByYear };
  }, [posts]);

  const sortedTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return tags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
  }, [posts, tags]);

  const visibleTags = useMemo(() => {
    const maxInitialTags = 12;
    if (showAllTags) return sortedTags;

    const initialTags = sortedTags.slice(0, maxInitialTags);
    const hiddenSelectedTags = selectedTags.filter(tag => !initialTags.includes(tag));

    return [...initialTags, ...hiddenSelectedTags];
  }, [sortedTags, showAllTags, selectedTags]);

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const categoryMatch =
        !selectedCategory || post.category === selectedCategory;
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));
      const yearMatch =
        !selectedYear ||
        new Date(post.publishedAt).getFullYear() === selectedYear;
      const seriesMatch =
        !selectedSeries || post.series?.id === selectedSeries;
      return categoryMatch && tagsMatch && yearMatch && seriesMatch;
    });

    if (selectedSeries) {
      filtered = filtered.sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0));
    }

    return filtered;
  }, [posts, selectedCategory, selectedTags, selectedYear, selectedSeries]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedTags.length > 0 ||
    selectedYear !== null ||
    selectedSeries !== null;

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setSelectedYear(null);
    setSelectedSeries(null);
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
            className="mt-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400">
                Showing{' '}
                <span className="text-white font-medium">
                  {filteredPosts.length}
                </span>{' '}
                of {posts.length} articles
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-start">
              <span className="text-xs uppercase tracking-wider text-neutral-500 pt-2.5">
                Category
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  All
                </button>
                {BLOG_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {series.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-start">
                <span className="text-xs uppercase tracking-wider text-neutral-500 pt-2.5">
                  Series
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSeries(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedSeries === null
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    All
                  </button>
                  {series.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSeries(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        selectedSeries === s.id
                          ? 'bg-cyan-500 text-black'
                          : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <Library className="w-3.5 h-3.5" />
                      {s.title}
                      <span className="text-xs opacity-60">({s.postCount})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-start">
              <span className="text-xs uppercase tracking-wider text-neutral-500 pt-2.5">
                Year
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedYear(null)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedYear === null
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  All
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedYear === year
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {year}
                    <span className="ml-1.5 text-xs opacity-60">
                      ({postCountByYear[year]})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-start">
                <span className="text-xs uppercase tracking-wider text-neutral-500 pt-2.5">
                  Tags
                </span>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {visibleTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  {sortedTags.length > 12 && (
                    <button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {showAllTags ? '− Show less tags' : `+ Show ${sortedTags.length - 12} more tags`}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-16 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              No posts match the selected filters
            </div>
          ) : (
            <BlogList posts={filteredPosts} groupByYear={!selectedYear} />
          )}
        </div>
      </section>
    </div>
  );
}
