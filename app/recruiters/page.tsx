'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight, Briefcase, Home, Download } from 'lucide-react';
import Link from 'next/link';
import GradientOrbs from '@/components/ui/GradientOrbs';
import DotGrid from '@/components/ui/DotGrid';
import { exportToMarkdown } from '@/lib/cvData';
import AIChatBubble from '@/components/AIChatBubble';

interface AssessmentResult {
  isGoodFit: boolean;
  score: number;
  strengths: string[];
  concerns: string[];
  reasoning: string;
}

export default function RecruitersPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setAssessment(null);
    setShowContactForm(false);

    try {
      const response = await fetch('/api/assess-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job');
      }

      const data = await response.json();

      // Ensure data has the required structure
      const assessment: AssessmentResult = {
        isGoodFit: data.isGoodFit ?? false,
        score: data.score ?? 0,
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        concerns: Array.isArray(data.concerns) ? data.concerns : [],
        reasoning: data.reasoning ?? 'Unable to assess the job fit.',
      };

      setAssessment(assessment);

      if (assessment.isGoodFit) {
        setTimeout(() => setShowContactForm(true), 1500);
      }
    } catch (error) {
      console.error('Error analyzing job:', error);
      setAssessment({
        isGoodFit: false,
        score: 0,
        strengths: [],
        concerns: ['Unable to analyze the job description. Please try again.'],
        reasoning: 'An error occurred while analyzing the job description.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://api.indiehack.io/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          message: `Company: ${contactData.company}\n\nJob Description:\n${jobDescription}`,
          subject: `Recruiter Contact from ${contactData.company}`,
        }),
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
      <GradientOrbs variant="purple" />
      <DotGrid dotColor="rgba(255, 255, 255, 0.07)" spacing={32} />

      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Briefcase className="w-4 h-4 text-white" />
            <span className="text-sm text-neutral-400">AI-Powered Job Assessment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">For Recruiters</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-6">
            Paste your job description below and my pet AI will provide an honest assessment of the role fit with my profile
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </motion.div>

        {/* About Me - Personal Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
          <p className="text-neutral-300 mb-6">
            Over 13 years of experience building ERP, SaaS applications and web platforms.
            Specializing in TypeScript-first architectures with Angular/Next.js/NestJS and exploring Web3/blockchain technologies and AI integrations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {['Customer friendly', 'Fast learner', 'Ship fast', 'Can work autonomously', 'Pro-active', 'Love to automate my work', 'Thinks out of the box'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Working Style */}
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-3">Working Style</h3>
              <div className="flex flex-wrap gap-2">
                {['Break things', 'Continuously improves code', 'Iterative', 'Fast shipper'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Honest Weaknesses */}
            <div>
              <h3 className="text-sm font-semibold text-orange-400 mb-3">Honest Weaknesses</h3>
              <div className="flex flex-wrap gap-2">
                {['Loses interest fast', 'Not a good planner', 'Hates repetitive work'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '13+', label: 'Years Experience' },
              { value: '45+', label: 'Projects Completed' },
              { value: '6', label: 'Languages Spoken' },
              { value: '10+', label: 'Technologies' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl text-center hover:bg-white/[0.07] transition-colors"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-neutral-500 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { language: 'Dutch', flag: '🇳🇱', level: 'Native', bars: 5 },
              { language: 'English', flag: '🇬🇧', level: 'Fluent', bars: 5 },
              { language: 'French', flag: '🇫🇷', level: 'Good', bars: 4 },
              { language: 'Spanish', flag: '🇪🇸', level: 'Conversational', bars: 3 },
              { language: 'German', flag: '🇩🇪', level: 'Basic', bars: 2 },
              { language: 'Chinese', flag: '🇨🇳', level: 'Basic', bars: 1 },
            ].map((lang) => (
              <div key={lang.language} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <span className="text-neutral-300 text-sm block">{lang.language}</span>
                    <span className="text-neutral-500 text-xs">{lang.level}</span>
                  </div>
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
        </motion.div>

        {/* Availability & Work Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-white">Currently Open to Interesting Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Preferences */}
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Looking For</h3>
              <div className="space-y-2 text-neutral-300 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Contract work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Startup & Scale-up environments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Fintech, AI, Web3 projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Remote-first companies</span>
                </div>
              </div>
            </div>

            {/* Deal Breakers */}
            <div>
              <h3 className="text-sm font-semibold text-orange-400 mb-3">Deal Breakers</h3>
              <div className="space-y-2 text-neutral-300 text-sm">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-orange-500" />
                  <span>On-site only positions</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-orange-500" />
                  <span>Outdated tech (.NET, ABAP, Java, PHP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-orange-500" />
                  <span>No clear modernization path</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-orange-500" />
                  <span>Junior/entry-level roles</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Frontend', skills: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
              { category: 'Backend', skills: ['Node.js', 'NestJS', 'Express', 'Python', 'Django', 'GraphQL'] },
              { category: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'Convex'] },
              { category: 'AI & ML', skills: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'Groq', 'DeepL'] },
              { category: 'Web3 & Blockchain', skills: ['Solidity', 'Ethereum', 'Hyperledger', 'IPFS', 'Smart Contracts', 'NFTs'] },
              { category: 'DevOps', skills: ['Docker', 'AWS', 'Vercel', 'DigitalOcean', 'CI/CD', 'Nginx'] },
              { category: 'Mobile', skills: ['Swift', 'SwiftUI', 'Ionic', 'React Native'] },
              { category: 'AI-Assisted Development', skills: ['Claude Code', 'AI Agents', 'MCPs', 'Multi-Agent Architecture'] },
            ].map((category) => (
              <div key={category.category} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-sm font-semibold text-white mb-3">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 p-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Education & Certifications</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                degree: 'Blockchain Developer - Foundry Full Course',
                institution: 'Cyfrin Updraft',
                period: '2025',
                achievements: ['Comprehensive blockchain development course', 'Solidity, Foundry, smart contract security, and DeFi protocols'],
                link: 'https://www.cyfrin.io/',
              },
              {
                degree: 'Web3 Solidity Bootcamp',
                institution: 'Metana',
                period: '2024',
                achievements: ['4-month program for transition from Web2 to Web3', 'Ethereum Blockchain, DeFi, and smart contracts'],
                link: 'https://metana.io/web3-solidity-bootcamp-ethereum-blockchain/',
              },
              {
                degree: 'Self-Taught Web Developer',
                institution: 'TheNewBoston',
                period: '2011',
                achievements: ['Self-taught Angular, HTML, CSS fundamentals', 'Foundation for 13+ years of web development career'],
                link: 'https://www.youtube.com/@thenewboston/playlists',
              },
              {
                degree: 'Master of Science in Business Engineering',
                institution: 'Hogeschool-Universiteit Brussel',
                period: '2008 - 2013',
                achievements: ["Two year Master's programme taught in English", '120 ECTS spread over two years'],
              },
            ].map((edu) => (
              <div key={edu.degree} className="p-5 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-white pr-2">{edu.degree}</h3>
                  {edu.link && (
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <ArrowRight className="w-4 h-4 text-neutral-400 rotate-[-45deg]" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-neutral-400 mb-1">{edu.institution}</p>
                <p className="text-xs text-neutral-500 mb-3">{edu.period}</p>
                <ul className="space-y-1">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-300 text-xs">
                      <span className="w-1 h-1 bg-white/50 rounded-full mt-1.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl text-center">
            <h3 className="text-sm font-semibold text-white mb-3">Certifications</h3>
            <div className="text-neutral-300 text-sm">
              ITIL v3 Foundation
              <span className="text-neutral-500 text-xs block">AXELOS</span>
            </div>
          </div>
        </motion.div>

        {/* Job Description Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8 p-8 bg-white/5 border border-white/10 rounded-2xl"
        >
          <label className="block text-sm font-medium text-neutral-400 mb-3">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here, including responsibilities, requirements, and any other relevant details..."
            className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
            disabled={isAnalyzing}
          />
          <button
            onClick={analyzeJob}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="mt-4 w-full px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Job Fit
              </>
            )}
          </button>
        </motion.div>

        {/* Assessment Results */}
        <AnimatePresence>
          {assessment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              {/* Overall Score */}
              <div className={`p-8 rounded-2xl border-2 mb-6 ${
                assessment.isGoodFit
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-orange-950/20 border-orange-500/30'
              }`}>
                <div className="flex items-start gap-4 mb-4">
                  {assessment.isGoodFit ? (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                      <XCircle className="w-6 h-6 text-orange-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {assessment.isGoodFit ? 'Great Fit!' : 'Not a Great Fit'}
                    </h2>
                    <p className="text-sm text-neutral-400 mb-3">
                      Match Score: {assessment.score}%
                    </p>
                    <p className="text-neutral-300 leading-relaxed">{assessment.reasoning}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                {assessment.strengths && assessment.strengths.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-lg font-semibold text-white">Strong Alignment</h3>
                    </div>
                    <ul className="space-y-3">
                      {assessment.strengths.map((strength, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-neutral-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Concerns */}
                {assessment.concerns && assessment.concerns.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-orange-400" />
                      <h3 className="text-lg font-semibold text-white">Potential Concerns</h3>
                    </div>
                    <ul className="space-y-3">
                      {assessment.concerns.map((concern, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-neutral-300"
                        >
                          <XCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{concern}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form (shown only for good fits) */}
        <AnimatePresence>
          {showContactForm && assessment?.isGoodFit && !submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-white" />
                <h2 className="text-2xl font-bold text-white">Let&apos;s Connect!</h2>
              </div>
              <p className="text-neutral-400 mb-6">
                This looks like a great opportunity. Fill in your details and I&apos;ll get back to you soon.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.company}
                    onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl text-center"
            >
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl w-fit mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
              <p className="text-neutral-300">
                Thanks for reaching out. I&apos;ll review the opportunity and get back to you within 24-48 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AIChatBubble />
    </div>
  );
}
