'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubContributionGraphProps {
  username: string;
  className?: string;
}

const LEVELS = [
  'bg-neutral-800',
  'bg-emerald-900/60',
  'bg-emerald-700/70',
  'bg-emerald-500/80',
  'bg-emerald-400',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function getWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  const firstDay = new Date(days[0].date).getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: '', count: 0, level: 0 });
  }

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

function getMonthLabels(weeks: ContributionDay[][]): { month: string; weekIndex: number }[] {
  const labels: { month: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const validDay = week.find((d) => d.date);
    if (validDay) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], weekIndex: index });
        lastMonth = month;
      }
    }
  });

  return labels;
}

export default function GitHubContributionGraph({ username, className = '' }: GitHubContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();

        const days: ContributionDay[] = data.contributions.map(
          (item: { date: string; count: number }) => ({
            date: item.date,
            count: item.count,
            level: getLevel(item.count),
          })
        );

        setContributions(days);
        setTotalContributions(data.total?.lastYear || days.reduce((sum, day) => sum + day.count, 0));
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError('Failed to load contributions');
        setIsLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-white/5 rounded-xl h-40 ${className}`} />
    );
  }

  if (error || contributions.length === 0) {
    return (
      <div className={`p-6 bg-white/5 border border-white/10 rounded-2xl text-center text-neutral-400 ${className}`}>
        Unable to load GitHub contributions
      </div>
    );
  }

  const weeks = getWeeks(contributions);
  const monthLabels = getMonthLabels(weeks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`p-6 bg-white/5 border border-white/10 rounded-2xl ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">GitHub Activity</h3>
          <p className="text-sm text-neutral-400">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-400 hover:text-white transition-colors"
        >
          @{username}
        </a>
      </div>

      <div className="w-full">
        <div className="grid text-xs text-neutral-500 mb-2" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((_, weekIndex) => {
            const label = monthLabels.find(l => l.weekIndex === weekIndex);
            return (
              <div key={weekIndex} className="text-center">
                {label ? label.month : ''}
              </div>
            );
          })}
        </div>

        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`aspect-square rounded-sm ${day.date ? LEVELS[day.level] : 'bg-transparent'} hover:ring-1 hover:ring-white/30 transition-all cursor-default`}
                  title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-neutral-500">
        <div className="flex items-center gap-1">
          <span className="hidden sm:inline">Mon</span>
          <span className="hidden sm:inline mx-2">Wed</span>
          <span className="hidden sm:inline">Fri</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Less</span>
          {LEVELS.map((level, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
