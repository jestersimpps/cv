'use client';

import Image from 'next/image';
import { Github, Linkedin, Globe, Mail, MapPin, Send } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { motion } from 'framer-motion';
import DotGrid from '@/components/ui/DotGrid';
import GitHubContributionGraph from '@/components/GitHubContributionGraph';

const stats = [
  { value: '13+', label: 'Years Experience' },
  { value: '45+', label: 'Projects Completed' },
  { value: '6', label: 'Languages Spoken' },
  { value: '10+', label: 'Technologies' },
];

const personalSkills = {
  strengths: {
    label: 'Strengths',
    skills: ['Customer friendly', 'Fast learner', 'Ship fast', 'Can work autonomously', 'Pro-active', 'Love to automate my work', 'Thinks out of the box'],
  },
  workingStyle: {
    label: 'Working Style',
    skills: ['Break things', 'Continuously improves code', 'Iterative', 'Fast shipper'],
  },
  weaknesses: {
    label: 'Honest Weaknesses',
    skills: ['Loses interest fast', 'Not a good planner', 'Hates repetitive work'],
  },
};

const languages = [
  { language: 'Dutch', flag: '🇳🇱', level: 'Native', bars: 5 },
  { language: 'English', flag: '🇬🇧', level: 'Fluent', bars: 5 },
  { language: 'French', flag: '🇫🇷', level: 'Good', bars: 4 },
  { language: 'Spanish', flag: '🇪🇸', level: 'Conversational', bars: 3 },
  { language: 'German', flag: '🇩🇪', level: 'Basic', bars: 2 },
  { language: 'Chinese', flag: '🇨🇳', level: 'Basic', bars: 1 },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/jestersimpps', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jo-vinkenroye-459a7963/', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/jestersimpps', label: 'X' },
  { icon: Send, href: 'https://t.me/jestersimpps', label: 'Telegram' },
  { icon: Globe, href: 'https://bicraw.ai', label: 'Website' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black relative overflow-hidden">
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
            <span className="text-sm text-neutral-400">About Me</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Full Stack Developer</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Web3 & AI Enthusiast with 13+ years of professional experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10 flex-shrink-0">
                  <Image
                    src="/assets/avatar.png"
                    alt="Jo Vinkenroye"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-neutral-300 text-lg leading-relaxed flex-1">
                Over 13 years of experience building ERP, SaaS applications and web platforms.
                Highly familiar with a wide variety of web development technologies, frameworks and build tools.
                Currently specializing in TypeScript-first architectures with Angular/Next.js/NestJS/Convex and exploring
                Web3/blockchain technologies and AI integrations.
                <br /><br />
                <strong className="text-white">AI transformational hire:</strong> I go across your org, ship stuff, and kill stupid manual processes.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-neutral-500 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <GitHubContributionGraph username="jestersimpps" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
