'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { ReactNode } from 'react';

interface QuickReferenceProps {
  children: ReactNode;
  title?: string;
}

export function QuickReference({ children, title = "Quick Reference" }: QuickReferenceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
    >
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      <div className="p-4 [&>pre]:my-0 [&>pre]:rounded-none [&>pre]:border-0">
        {children}
      </div>
    </motion.div>
  );
}
