'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLinkPreviews, useSetActivePreview } from './LinkPreviewProvider';

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}

export default function LinkPreview({ href, children, isExternal = false }: LinkPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [linkPosition, setLinkPosition] = useState<{ x: number; y: number } | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { previews } = useLinkPreviews();
  const setActivePreview = useSetActivePreview();

  const previewData = previews[href];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered && linkRef.current && isExternal) {
      const rect = linkRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setLinkPosition({
        x: rect.right,
        y: rect.top + scrollTop + rect.height / 2,
      });
      setActivePreview({ href, data: previewData || null, position: { x: rect.right, y: rect.top + scrollTop + rect.height / 2 } });
    } else {
      setActivePreview(null);
    }
  }, [isHovered, href, previewData, setActivePreview, isExternal]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isAnchor = href.startsWith('#');
  const useNativeLink = isExternal || isAnchor;

  const LinkComponent = useNativeLink ? 'a' : Link;
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href };

  return (
    <span className="relative inline-block">
      <LinkComponent
        {...linkProps}
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="text-neutral-300 hover:text-white border-b border-dotted border-neutral-500 hover:border-neutral-300 transition-colors"
      >
        {children}
      </LinkComponent>
    </span>
  );
}
