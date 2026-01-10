'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GridLines from '@/components/ui/GridLines';
import { exportToMarkdown } from '@/lib/cvData';

interface Experience {
  title: string;
  company: string;
  period: string;
  image?: string;
}

const highlights: Experience[] = [
  {
    title: 'Owner',
    company: 'Bicraw.ai',
    period: '2024 - Present',
    image: '/assets/projects/bicraw.png',
  },
  {
    title: 'Co-founder',
    company: 'Kaimeleon.ai',
    period: '2025 - Present',
    image: '/assets/projects/kaimeleon.png',
  },
  {
    title: 'Senior Frontend Developer',
    company: 'AWV',
    period: '2022 - 2025',
    image: '/assets/projects/awv.png',
  },
  {
    title: 'Frontend Architect',
    company: 'Fednot',
    period: '2018 - 2021',
    image: '/assets/projects/fednot.png',
  },
];

export default function ExperienceSection() {
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
    <section id="experience" className="py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black relative overflow-hidden">
      <GridLines />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <Briefcase className="w-4 h-4 text-white" />
            <span className="text-sm text-neutral-400">Career Highlights</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Work Experience</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            13+ years of professional experience across diverse industries
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {highlights.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
            >
              {exp.image && (
                <div className="relative w-full h-32 overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.company}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                <p className="text-sm text-neutral-400">{exp.title}</p>
                <p className="text-xs text-neutral-500 mt-1">{exp.period}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
          >
            View Full Experience
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
