'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, MessageCircle, Send, Loader2, CheckCircle, Briefcase, ArrowRight } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/jestersimpps',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jovinkenroye',
  },
  {
    icon: XIcon,
    label: 'X',
    href: 'https://x.com/jestersimpps',
  },
  {
    icon: Send,
    label: 'Telegram',
    href: 'https://t.me/jestersimpps',
  },
  {
    icon: Globe,
    label: 'Website',
    href: 'https://bicraw.ai',
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'jov2all@gmail.com',
      href: 'mailto:jov2all@gmail.com',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+32 468 207 619',
      href: 'tel:+32468207619',
    },
    {
      icon: MapPin,
      label: t('location'),
      value: t('locationValue'),
      href: null,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.indiehack.io/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'jovinkenroye-portfolio',
          name,
          email,
          subject: `Portfolio Contact from ${name}`,
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send message');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : t('form.error'));
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-neutral-900 relative overflow-hidden">
      <GradientOrbs variant="purple" />
      <GridLines />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-sm text-neutral-400">{t('badge')}</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">{t('infoTitle')}</h3>
            {contactInfo.map((contact) => (
              <div key={contact.label} className="flex items-center gap-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <contact.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">{contact.label}</p>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className="text-white hover:text-neutral-300 transition-colors"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white">{contact.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6">
              <h4 className="text-sm text-neutral-500 mb-4">{t('connect')}</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Recruiters link */}
            <div className="pt-6">
              <Link
                href="/recruiters"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors text-sm group"
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('recruiters')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 border border-white/10 rounded-2xl"
          >
            <h3 className="text-xl font-semibold text-white mb-6">{t('form.title')}</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">{t('form.success')}</h4>
                <p className="text-neutral-400">{t('form.successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder={t('form.namePlaceholder')}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder={t('form.emailPlaceholder')}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-neutral-400 mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder={t('form.messagePlaceholder')}
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    t('form.send')
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
