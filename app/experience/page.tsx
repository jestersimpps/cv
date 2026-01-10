'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, LayoutGrid, AlignJustify, X, ExternalLink, ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { experiences, filterCategories, getProjectTags } from '@/lib/experiences';
import { exportToMarkdown } from '@/lib/cvData';
import ImageModal from '@/components/ImageModal';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';
import DotGrid from '@/components/ui/DotGrid';
import SectionDivider from '@/components/ui/SectionDivider';

type ViewMode = 'timeline' | 'grid';

export default function ExperiencePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return experiences;
    return experiences.filter((exp) => {
      const tags = getProjectTags(exp);
      return activeFilters.some((filter) => tags.includes(filter));
    });
  }, [activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const handleDownload = () => {
    const markdown = exportToMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jo-vinkenroye-cv.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden">
        <GradientOrbs variant="blue" />
        <GridLines />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
              <Briefcase className="w-4 h-4 text-white" />
              <span className="text-sm text-neutral-400">Full Career Timeline</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Work Experience
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl">
              13+ years of professional experience building ERP systems, SaaS platforms,
              and modern web applications across diverse industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <AlignJustify className="w-4 h-4" />
                Timeline
              </button>
            </div>

            <div className="text-sm text-neutral-500">
              {filteredProjects.length} of {experiences.length} projects
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      <section className="py-12 bg-gradient-to-b from-black via-neutral-950 to-black relative overflow-hidden">
        <DotGrid dotColor="rgba(255, 255, 255, 0.03)" spacing={28} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {Object.keys(filterCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => toggleFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilters.includes(category)
                      ? 'bg-white text-black'
                      : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </motion.div>
          )}

          {viewMode === 'timeline' && (
            <div className="relative">
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-white/10" />

              <div className="space-y-8">
                {experiences.map((exp, index) => {
                  const year = exp.period.match(/\d{4}/)?.[0] || '';
                  const prevYear = index > 0 ? experiences[index - 1].period.match(/\d{4}/)?.[0] : '';
                  const showYear = year !== prevYear;

                  return (
                    <motion.div
                      key={`${exp.company}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className={`relative ${showYear ? 'pt-12' : ''}`}
                    >
                      {showYear && (
                        <div className="absolute left-4 md:left-8 -translate-x-1/2 -top-2 bg-white text-black px-3 py-1 rounded-full text-sm font-bold z-10">
                          {year}
                        </div>
                      )}

                      <div className="absolute left-4 md:left-8 w-3 h-3 -translate-x-1/2 bg-white rounded-full border-4 border-black z-10" />

                      <div className="ml-12 md:ml-20">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                          <div className="flex flex-col md:flex-row gap-6">
                            {exp.projectImages && exp.projectImages[0] && (
                              <div
                                className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
                                onClick={() => setSelectedImage({ image: exp.projectImages![0], title: `${exp.company} - ${exp.title}` })}
                              >
                                <Image
                                  src={exp.projectImages[0]}
                                  alt={exp.company}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                  <p className="text-neutral-400">{exp.company}</p>
                                </div>
                                {exp.websiteUrl && (
                                  <a
                                    href={exp.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4 text-neutral-400" />
                                  </a>
                                )}
                              </div>
                              <p className="text-sm text-neutral-500 mb-3">{exp.period}</p>
                              <ul className="space-y-1">
                                {exp.description.map((item, i) => (
                                  <li key={i} className="text-neutral-300 text-sm">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center py-12 text-neutral-500">
                  No projects match the selected filters
                </div>
              ) : (
                filteredProjects.map((exp, index) => {
                  const tags = getProjectTags(exp);
                  const CardWrapper = exp.websiteUrl ? 'a' : 'div';
                  const cardProps = exp.websiteUrl
                    ? { href: exp.websiteUrl, target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                  return (
                    <motion.div
                      key={`${exp.company}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <CardWrapper
                        {...cardProps}
                        className="group block relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                      >
                        {exp.projectImages && exp.projectImages[0] ? (
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={exp.projectImages[0]}
                              alt={exp.company}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                          </div>
                        ) : (
                          <div className={`aspect-video flex items-center justify-center ${[
                            'bg-gradient-to-br from-violet-600/30 to-indigo-600/30',
                            'bg-gradient-to-br from-rose-500/30 to-orange-500/30',
                            'bg-gradient-to-br from-emerald-500/30 to-teal-500/30',
                            'bg-gradient-to-br from-blue-500/30 to-cyan-500/30',
                            'bg-gradient-to-br from-amber-500/30 to-yellow-500/30',
                            'bg-gradient-to-br from-pink-500/30 to-purple-500/30',
                          ][index % 6]}`}>
                            <span className="text-5xl font-bold text-white/20">{exp.company.charAt(0)}</span>
                          </div>
                        )}
                        <div className="p-5 bg-neutral-900 -mt-1 relative z-10">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white group-hover:text-white/90">
                                {exp.company}
                              </h3>
                              <p className="text-sm text-neutral-400">{exp.title}</p>
                            </div>
                            {exp.websiteUrl && (
                              <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 mb-3">{exp.period}</p>
                          <p className="text-sm text-neutral-300 line-clamp-2 mb-3">
                            {exp.description[0]}
                          </p>
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-neutral-400 font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardWrapper>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          image={selectedImage.image}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title={selectedImage.title}
        />
      )}
    </div>
  );
}
