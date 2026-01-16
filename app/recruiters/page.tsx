'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight, Briefcase, Home } from 'lucide-react';
import Link from 'next/link';
import GradientOrbs from '@/components/ui/GradientOrbs';
import DotGrid from '@/components/ui/DotGrid';

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
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Paste your job description below and my pet AI will provide an honest assessment of the role fit with my profile
          </p>
        </motion.div>

        {/* Job Description Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
    </div>
  );
}
