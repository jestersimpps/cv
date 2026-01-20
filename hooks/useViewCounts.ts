'use client';

import { useState, useEffect } from 'react';

interface ViewCounts {
  [slug: string]: number;
}

interface UseViewCountsReturn {
  viewCounts: ViewCounts;
  loading: boolean;
  error: Error | null;
}

export function useViewCounts(): UseViewCountsReturn {
  const [viewCounts, setViewCounts] = useState<ViewCounts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchViewCounts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/blog-views');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setViewCounts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchViewCounts();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  return { viewCounts, loading, error };
}

export function useViewCount(slug: string): {
  viewCount: number;
  loading: boolean;
  error: Error | null;
} {
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchViewCount() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/blog-views?slug=${encodeURIComponent(slug)}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setViewCount(data.views || 0);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      fetchViewCount();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { viewCount, loading, error };
}
