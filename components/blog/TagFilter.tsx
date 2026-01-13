'use client';

import { X } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClear: () => void;
}

export default function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClear,
}: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagToggle(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTags.includes(tag)
              ? 'bg-white text-black'
              : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'
          }`}
        >
          #{tag}
        </button>
      ))}
      {selectedTags.length > 0 && (
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}
