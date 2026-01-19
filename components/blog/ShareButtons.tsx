'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Facebook, Share2, Link2, Check } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import {
  generateTwitterShareUrl,
  generateLinkedInShareUrl,
  generateFacebookShareUrl,
  copyToClipboard,
} from '@/lib/utils/share';

interface ShareButtonsProps {
  post: {
    title: string;
    description: string;
    slug: string;
  };
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
}

export default function ShareButtons({
  post,
  variant = 'horizontal',
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canUseWebShare, setCanUseWebShare] = useState(false);
  const posthog = usePostHog();

  const shareUrl = `https://jovweb.dev/blog/${post.slug}`;
  const shareData = {
    url: shareUrl,
    title: post.title,
    description: post.description,
  };

  useEffect(() => {
    setCanUseWebShare(typeof navigator !== 'undefined' && navigator.share !== undefined);
  }, []);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook' | 'native' | 'copy') => {
    posthog.capture('blog_post_share_click', {
      platform,
      slug: post.slug,
      title: post.title,
    });

    if (platform === 'twitter') {
      window.open(generateTwitterShareUrl(shareData), '_blank', 'noopener,noreferrer');
    } else if (platform === 'linkedin') {
      window.open(generateLinkedInShareUrl(shareData), '_blank', 'noopener,noreferrer');
    } else if (platform === 'facebook') {
      window.open(generateFacebookShareUrl(shareData), '_blank', 'noopener,noreferrer');
    }
  };

  const handleNativeShare = async () => {
    if (!canUseWebShare) {
      // Fallback to copy link
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: shareUrl,
      });

      posthog.capture('blog_post_shared', {
        platform: 'native',
        slug: post.slug,
      });
    } catch (error) {
      // User cancelled or share failed
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      posthog.capture('blog_post_share_click', {
        platform: 'copy',
        slug: post.slug,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerClasses = {
    horizontal: 'flex items-center gap-2 flex-wrap',
    vertical: 'flex flex-col gap-2',
    compact: 'flex items-center gap-2',
  };

  const baseButtonClasses = `
    p-2.5
    bg-white/5
    hover:bg-white/10
    border border-white/10
    hover:border-white/20
    rounded-xl
    transition-all
    duration-200
    text-neutral-400
    hover:text-white
    focus:outline-none
    focus:ring-2
    focus:ring-white/20
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${containerClasses[variant]} ${className}`}
    >
      {/* Native Share (show on mobile or if Web Share API supported) */}
      {(variant === 'compact' || canUseWebShare) && (
        <button
          onClick={handleNativeShare}
          className={baseButtonClasses}
          aria-label="Share"
          title="Share"
        >
          <Share2 className="w-4.5 h-4.5" />
        </button>
      )}

      {/* Twitter */}
      {variant !== 'compact' && (
        <button
          onClick={() => handleShare('twitter')}
          className={`${baseButtonClasses} hover:text-[#1DA1F2]`}
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter className="w-4.5 h-4.5" />
        </button>
      )}

      {/* LinkedIn */}
      {variant !== 'compact' && (
        <button
          onClick={() => handleShare('linkedin')}
          className={`${baseButtonClasses} hover:text-[#0A66C2]`}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4.5 h-4.5" />
        </button>
      )}

      {/* Facebook */}
      {variant !== 'compact' && (
        <button
          onClick={() => handleShare('facebook')}
          className={`${baseButtonClasses} hover:text-[#1877F2]`}
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="w-4.5 h-4.5" />
        </button>
      )}

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={baseButtonClasses}
        aria-label={copied ? 'Link copied!' : 'Copy link'}
        title={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? (
          <Check className="w-4.5 h-4.5 text-green-400" />
        ) : (
          <Link2 className="w-4.5 h-4.5" />
        )}
      </button>
    </motion.div>
  );
}
