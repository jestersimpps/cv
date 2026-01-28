'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-neutral-500 text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
