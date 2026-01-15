'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import DotGrid from '@/components/ui/DotGrid';
import GradientOrbs from '@/components/ui/GradientOrbs';

interface Education {
  degree: string;
  institution: string;
  period: string;
  achievements: string[];
  link?: string;
}

const education: Education[] = [
  {
    degree: 'Blockchain Developer - Foundry Full Course',
    institution: 'Cyfrin Updraft',
    period: '2025',
    achievements: [
      'Comprehensive blockchain development course',
      'Solidity, Foundry, smart contract security, and DeFi protocols',
    ],
    link: 'https://www.cyfrin.io/',
  },
  {
    degree: 'Web3 Solidity Bootcamp',
    institution: 'Metana',
    period: '2024',
    achievements: [
      '4-month program for transition from Web2 to Web3',
      'Ethereum Blockchain, DeFi, and smart contracts',
    ],
    link: 'https://metana.io/web3-solidity-bootcamp-ethereum-blockchain/',
  },
  {
    degree: 'Self-Taught Web Developer',
    institution: 'TheNewBoston',
    period: '2011',
    achievements: [
      'Self-taught Angular, HTML, CSS fundamentals',
      'Foundation for 13+ years of web development career',
    ],
    link: 'https://www.youtube.com/@thenewboston/playlists',
  },
  {
    degree: 'Master of Science in Business Engineering',
    institution: 'Hogeschool-Universiteit Brussel',
    period: '2008 - 2013',
    achievements: [
      'Two year Master\'s programme taught in English',
      '120 ECTS spread over two years',
    ],
  },
];

const certifications = [
  { name: 'ITIL v3 Foundation', issuer: 'AXELOS' },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
      <DotGrid dotColor="rgba(255, 255, 255, 0.07)" spacing={28} />
      <GradientOrbs variant="cyan" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-white" />
            <span className="text-sm text-neutral-400">Academic Background</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Education & Certifications</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                {edu.link && (
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-neutral-400" />
                  </a>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
              <p className="text-neutral-400 mb-1">{edu.institution}</p>
              <p className="text-sm text-neutral-500 mb-4">{edu.period}</p>
              <ul className="space-y-2">
                {edu.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-300 text-sm">
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-6 bg-white/5 border border-white/10 rounded-2xl max-w-md mx-auto text-center"
        >
          <div className="p-3 bg-white/10 rounded-xl w-fit mx-auto mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-neutral-300">
                {cert.name}
                <span className="text-neutral-500 text-sm block">{cert.issuer}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
