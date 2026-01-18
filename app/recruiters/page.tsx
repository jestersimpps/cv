'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight, Briefcase, Home, Download, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import posthog from 'posthog-js';
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';
import { exportToMarkdown } from '@/lib/cvData';
import AIChatBubble from '@/components/AIChatBubble';

interface AssessmentResult {
  isGoodFit: boolean;
  score: number;
  strengths: string[];
  concerns: string[];
  reasoning: string;
  connectionTitle?: string;
}

export default function RecruitersPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', companyWebsite: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const handleDownload = () => {
    posthog.capture('cv_downloaded', {
      source: 'recruiters_page',
    });

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

    posthog.capture('job_analysis_started', {
      job_description_length: jobDescription.length,
    });

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
        connectionTitle: data.connectionTitle ?? "Let's Connect!",
      };

      setAssessment(assessment);

      posthog.capture('job_analysis_completed', {
        is_good_fit: assessment.isGoodFit,
        score: assessment.score,
        strengths_count: assessment.strengths.length,
        concerns_count: assessment.concerns.length,
      });

      if (assessment.isGoodFit) {
        setTimeout(() => setShowContactForm(true), 1500);
      }
    } catch (error) {
      console.error('Error analyzing job:', error);
      posthog.capture('job_analysis_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
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

    posthog.capture('recruiter_contact_submitted', {
      company_website: contactData.companyWebsite,
      has_job_description: jobDescription.length > 0,
    });

    try {
      await fetch('https://api.indiehack.io/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'jovinkenroye-recruiters',
          name: contactData.name,
          email: contactData.email,
          message: `Company Website: ${contactData.companyWebsite}\n\nJob Description:\n${jobDescription}`,
          subject: `Recruiter Contact from ${contactData.companyWebsite}`,
        }),
      });

      setSubmitSuccess(true);
      posthog.capture('recruiter_contact_success', {
        company_website: contactData.companyWebsite,
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      posthog.capture('recruiter_contact_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
      <GradientOrbs variant="purple" />
      <GridLines />

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
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-4">
            Paste your job description below and receive an instant AI-powered assessment of how well the role aligns with my profile and experience
          </p>
          <p className="text-base text-white font-medium max-w-2xl mx-auto mb-6">
            AI transformational hire: I go across your org, ship stuff, and kill stupid manual processes.
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </motion.div>

        {/* Quick Stats + Languages Combined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Quick Stats */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '13+', label: 'Years' },
                  { value: '45+', label: 'Projects' },
                  { value: '6', label: 'Languages' },
                  { value: '10+', label: 'Tech' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-neutral-500 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
              <div className="space-y-2">
                {[
                  { language: 'Dutch', flag: '🇳🇱', bars: 5 },
                  { language: 'English', flag: '🇬🇧', bars: 5 },
                  { language: 'French', flag: '🇫🇷', bars: 4 },
                  { language: 'Spanish', flag: '🇪🇸', bars: 3 },
                  { language: 'German', flag: '🇩🇪', bars: 2 },
                  { language: 'Chinese', flag: '🇨🇳', bars: 1 },
                ].map((lang) => (
                  <div key={lang.language} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-neutral-300 text-xs">{lang.language}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full ${
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
        </motion.div>

        {/* Personal Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">What I Bring to the Table</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Strengths */}
              <div>
                <h4 className="text-sm font-semibold text-emerald-400 mb-3">Strengths</h4>
                <div className="space-y-2">
                  {['Customer friendly', 'Fast learner', 'Ship fast', 'Can work autonomously', 'Pro-active', 'Love to automate my work', 'Thinks out of the box'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-neutral-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Style */}
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-3">Working Style</h4>
                <div className="space-y-2">
                  {['Move Fast and Break Things', 'Refactor when things work', 'Iterative', 'Fast shipper'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                      <span className="text-neutral-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest Weaknesses */}
              <div>
                <h4 className="text-sm font-semibold text-orange-400 mb-3">Honest Weaknesses</h4>
                <div className="space-y-2">
                  {['Loses interest fast', 'Not a good planner', 'Hates repetitive work'].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <XCircle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                      <span className="text-neutral-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                  <span>Fast-paced, high-ownership environments</span>
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

            {/* Not a Good Fit */}
            <div>
              <h3 className="text-sm font-semibold text-orange-400 mb-3">Not a Good Fit</h3>
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

        {/* Section Separator */}
        <div className="my-12 border-t border-white/10"></div>

        {/* Job Description Input */}
        {!assessment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Assess Job Fit?</h2>
            <p className="text-neutral-400 mb-6">
              Paste your job description below and get an instant AI-powered assessment of how well it aligns with my profile.
            </p>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
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
            </div>
          </motion.div>
        )}

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

              {/* Reset Button */}
              <button
                onClick={() => {
                  setAssessment(null);
                  setJobDescription('');
                  setShowContactForm(false);
                }}
                className="mt-6 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4" />
                Try Another Job
              </button>
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
              className="mb-8 p-8 bg-white/5 border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-white" />
                <h2 className="text-2xl font-bold text-white">{assessment?.connectionTitle || "Let's Connect!"}</h2>
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
                    Company Website
                  </label>
                  <input
                    type="url"
                    required
                    value={contactData.companyWebsite}
                    onChange={(e) => setContactData({ ...contactData, companyWebsite: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="https://company.com"
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
              className="mb-8 p-8 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl text-center"
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

        {/* Skills & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <h2 className="text-xl font-bold text-white">Skills & Technologies</h2>
            <ChevronDown className={`w-5 h-5 text-white transition-transform ${showSkills ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showSkills && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-8 bg-white/5 border border-white/10 rounded-2xl">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowEducation(!showEducation)}
            className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-between"
          >
            <h2 className="text-xl font-bold text-white">Education & Certifications</h2>
            <ChevronDown className={`w-5 h-5 text-white transition-transform ${showEducation ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showEducation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-8 bg-white/5 border border-white/10 rounded-2xl">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <AIChatBubble />
    </div>
  );
}
