'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, MessageCircle, Send, Loader2, CheckCircle, Briefcase, ArrowRight } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import GradientOrbs from '@/components/ui/GradientOrbs';
import GridLines from '@/components/ui/GridLines';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jov2all@gmail.com',
    href: 'mailto:jov2all@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+32 468 207 619',
    href: 'tel:+32468207619',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Remote / Belgium / Barcelona / Lanhelas Portugal',
    href: null,
  },
];

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
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
            <span className="text-sm text-neutral-400">Get in Touch</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your ideas to life.
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
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
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
              <h4 className="text-sm text-neutral-500 mb-4">Connect with me</h4>
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
                <span>Hiring? Try my AI-powered job assessment tool</span>
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
            <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-neutral-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Your name"
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="your@email.com"
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-neutral-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell me about your project..."
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
                      Sending...
                    </>
                  ) : (
                    'Send Message'
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
