'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';

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

      const data = await response.json();
      setAssessment(data);

      if (data.isGoodFit) {
        setTimeout(() => setShowContactForm(true), 1500);
      }
    } catch (error) {
      console.error('Error analyzing job:', error);
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
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">For Recruiters</h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Paste your job description below and our AI will provide an honest assessment of the role fit
          </p>
        </motion.div>

        {/* Job Description Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-neutral-300 mb-3">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here, including responsibilities, requirements, and any other relevant details..."
            className="w-full h-64 px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            disabled={isAnalyzing}
          />
          <button
            onClick={analyzeJob}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                Analyze Job Fit
                <ArrowRight className="w-5 h-5" />
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
              <div className={`p-6 rounded-lg border-2 mb-6 ${
                assessment.isGoodFit
                  ? 'bg-green-950/20 border-green-500/50'
                  : 'bg-red-950/20 border-red-500/50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  {assessment.isGoodFit ? (
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {assessment.isGoodFit ? 'Great Fit!' : 'Not a Great Fit'}
                    </h2>
                    <p className="text-sm text-neutral-400">
                      Match Score: {assessment.score}%
                    </p>
                  </div>
                </div>
                <p className="text-neutral-300">{assessment.reasoning}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Strong Alignment
                  </h3>
                  <ul className="space-y-3">
                    {assessment.strengths.map((strength, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-neutral-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Concerns */}
                {assessment.concerns.length > 0 && (
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-400 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Potential Concerns
                    </h3>
                    <ul className="space-y-3">
                      {assessment.concerns.map((concern, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-neutral-300"
                        >
                          <XCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{concern}</span>
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
              className="bg-gradient-to-br from-purple-950/20 to-blue-950/20 border border-purple-500/30 rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Let's Connect!</h2>
              <p className="text-neutral-400 mb-6">
                This looks like a great opportunity. Fill in your details and I'll get back to you soon.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.company}
                    onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                    className="w-full px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
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
              className="bg-green-950/20 border border-green-500/50 rounded-lg p-8 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
              <p className="text-neutral-300">
                Thanks for reaching out. I'll review the opportunity and get back to you within 24-48 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
