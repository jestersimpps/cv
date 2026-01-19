'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivePreview } from './LinkPreviewProvider';

export default function LinkPreviewSidebar() {
  const activePreview = useActivePreview();
  const [isMobile, setIsMobile] = useState(false);
  const [showAbove, setShowAbove] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (activePreview) {
      // Check if there's enough space below
      const viewportHeight = window.innerHeight;
      const linkY = activePreview.position.y - window.scrollY;
      const spaceBelow = viewportHeight - linkY;
      const previewHeight = 300; // Approximate height of preview card

      setShowAbove(spaceBelow < previewHeight);
    }
  }, [activePreview]);

  if (isMobile || !activePreview || !activePreview.position) return null;

  const { data, position } = activePreview;

  // Extra safety check
  if (!position) return null;

  const previewX = position.x + 10;
  const previewY = showAbove ? position.y - window.scrollY - 280 : position.y - window.scrollY + 10;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${previewX}px`,
        top: `${previewY}px`,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activePreview.href}
          initial={{ opacity: 0, scale: 0.95, y: showAbove ? 10 : -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: showAbove ? 10 : -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-80"
        >
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden shadow-2xl">
            {!data ? (
              <div className="p-4 flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-neutral-600 border-t-neutral-400 rounded-full animate-spin" />
                <span className="text-sm text-neutral-400">Loading preview...</span>
              </div>
            ) : (
              <div className="flex flex-col">
                {data.image && (
                  <div className="w-full h-40 bg-neutral-800 overflow-hidden">
                    <img
                      src={data.image}
                      alt={data.title || 'Preview'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {data.favicon && (
                      <img
                        src={data.favicon}
                        alt=""
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                    )}
                    <h4 className="text-sm font-semibold text-white line-clamp-2">
                      {data.title || new URL(activePreview.href).hostname}
                    </h4>
                  </div>
                  {data.description && (
                    <p className="text-xs text-neutral-400 line-clamp-3">
                      {data.description}
                    </p>
                  )}
                  <p className="text-xs text-neutral-600 mt-2 truncate">
                    {new URL(activePreview.href).hostname}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
