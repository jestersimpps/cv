'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineNavProps {
  years: number[];
  selectedYear: number | null;
  onYearSelect: (year: number | null) => void;
  postCountByYear: Record<number, number>;
}

export default function TimelineNav({
  years,
  selectedYear,
  onYearSelect,
  postCountByYear,
}: TimelineNavProps) {
  const currentIndex = selectedYear ? years.indexOf(selectedYear) : -1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < years.length - 1 && currentIndex !== -1;

  const handlePrev = () => {
    if (canGoPrev) {
      onYearSelect(years[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onYearSelect(years[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous year"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next year"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onYearSelect(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            selectedYear === null
              ? 'bg-white text-black'
              : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
        >
          All
        </motion.button>

        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onYearSelect(year)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedYear === year
                ? 'bg-white text-black'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {year}
            <span className="ml-1.5 text-xs opacity-60">
              ({postCountByYear[year]})
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
