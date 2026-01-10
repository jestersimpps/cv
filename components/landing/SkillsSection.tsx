'use client';

import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import GradientOrbs from '@/components/ui/GradientOrbs';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'NestJS', 'Express', 'Python', 'Django', 'GraphQL'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'Convex'],
  },
  {
    category: 'AI & ML',
    skills: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'Groq', 'DeepL'],
  },
  {
    category: 'Web3 & Blockchain',
    skills: ['Solidity', 'Ethereum', 'Hyperledger', 'IPFS', 'Smart Contracts', 'NFTs'],
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'AWS', 'Vercel', 'DigitalOcean', 'CI/CD', 'Nginx'],
  },
  {
    category: 'Mobile',
    skills: ['Swift', 'SwiftUI', 'Ionic', 'React Native'],
  },
  {
    category: 'AI-Assisted Development',
    skills: ['Claude Code', 'AI Agents', 'MCPs', 'Multi-Agent Architecture'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
      <GradientOrbs variant="blue" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <Code2 className="w-4 h-4 text-white" />
            <span className="text-sm text-neutral-400">Technical Expertise</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A comprehensive toolkit built over 13+ years of professional development experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-white/90">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
