'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import posthog from 'posthog-js';

const CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      initializePostHog();
    }
  }, []);

  const initializePostHog = () => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: '2025-11-30',
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
    initializePostHog();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-neutral-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg flex-shrink-0">
                  <Cookie className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-2">Cookies (the boring digital kind)</h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    I use analytics to see if anyone actually reads my blog posts or if they just bounce after seeing my face.
                    No selling data to sketchy third parties, promise. You can decline and I&apos;ll cry quietly.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAccept}
                      className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-sm"
                    >
                      Decline
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleDecline}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
