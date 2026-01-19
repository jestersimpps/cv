'use client';

import { motion } from 'framer-motion';

export default function Footer() {
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
            &copy; {new Date().getFullYear()} Jo Vinkenroye. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
