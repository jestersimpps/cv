'use client';

import Image from 'next/image';
import { Github, Linkedin, Globe, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import DotGrid from '@/components/ui/DotGrid';
import GitHubContributionGraph from '@/components/GitHubContributionGraph';

const stats = [
  { value: '13+', label: 'Years Experience' },
  { value: '45+', label: 'Projects Completed' },
  { value: '6', label: 'Languages Spoken' },
  { value: '10+', label: 'Technologies' },
];

const personalSkills = [
  'Team player',
  'Customer friendly',
  'Analytical mindset',
  'Can work autonomously',
  'Flexible',
  'Pro-active',
  'Stubborn problem solver',
];

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
  { icon: Linkedin, href: 'https://linkedin.com/in/jovinkenroye', label: 'LinkedIn' },
  { icon: Send, href: 'https://t.me/jestersimpps', label: 'Telegram' },
  { icon: Globe, href: 'https://bicraw.ai', label: 'Website' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black relative overflow-hidden">
      <DotGrid dotColor="rgba(255, 255, 255, 0.04)" spacing={24} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/10">
                  <Image
                    src="/assets/avatar.png"
                    alt="Jo Vinkenroye"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">About Me</h2>
                  <p className="text-neutral-400">Full Stack Developer, Web3 & AI Enthusiast</p>
                </div>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed">
                Over 13 years of experience building ERP, SaaS applications and web platforms.
                Highly familiar with a wide variety of web development technologies, frameworks and build tools.
                Currently specializing in TypeScript-first architectures with Angular/Next.js/NestJS and exploring
                Web3/blockchain technologies and AI integrations.
              </p>

              <div className="flex flex-wrap gap-2">
                {personalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="mailto:jov2all@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">jov2all@gmail.com</span>
                </a>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors group"
                    title={link.label}
                  >
                    <link.icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
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

              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  Languages
                </h3>
                <div className="space-y-2.5">
                  {languages.map((lang) => (
                    <div key={lang.language} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-neutral-300 text-sm">{lang.language}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < lang.bars ? 'bg-emerald-500' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
