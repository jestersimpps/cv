'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import posthog from 'posthog-js';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    posthog.capture('newsletter_subscribe_attempt', {
      email_domain: email.split('@')[1],
    });

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      setEmail('');
      posthog.capture('newsletter_subscribe_success', {
        email_domain: email.split('@')[1],
      });
    } else {
      setStatus('error');
      setMessage(result.message);
      posthog.capture('newsletter_subscribe_failed', {
        error: result.message,
      });
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="my-12 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/10 rounded-lg">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
      </div>

      <p className="text-neutral-400 mb-6">
        Get notified about new posts on automation, productivity tips, indie hacking, and web3.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-3 py-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className="text-emerald-400">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <p className="text-neutral-500 text-xs mt-4">
        No spam, ever. Unsubscribe anytime.
      </p>
    </motion.div>
  );
}
