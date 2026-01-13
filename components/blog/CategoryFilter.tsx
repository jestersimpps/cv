'use client';

import { BLOG_CATEGORIES, BlogCategory } from '@/lib/models/blog';

interface CategoryFilterProps {
  selectedCategory: BlogCategory | null;
  onCategorySelect: (category: BlogCategory | null) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 overflow-x-auto">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
          selectedCategory === null
            ? 'bg-white text-black'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        All
      </button>
      {BLOG_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-white text-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
