'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import LinkPreviewSidebar from './LinkPreviewSidebar';

interface PreviewData {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
}

interface ActivePreview {
  href: string;
  data: PreviewData;
  position: { x: number; y: number };
}

interface LinkPreviewContextType {
  previews: Record<string, PreviewData>;
  loadingUrls: Set<string>;
  fetchPreview: (url: string) => void;
}

interface ActivePreviewContextType {
  activePreview: ActivePreview | null;
  setActivePreview: (preview: ActivePreview | null) => void;
}

const LinkPreviewContext = createContext<LinkPreviewContextType>({
  previews: {},
  loadingUrls: new Set(),
  fetchPreview: () => {},
});

const ActivePreviewContext = createContext<ActivePreviewContextType>({
  activePreview: null,
  setActivePreview: () => {},
});

export const useLinkPreviews = () => useContext(LinkPreviewContext);
export const useSetActivePreview = () => useContext(ActivePreviewContext).setActivePreview;
export const useActivePreview = () => useContext(ActivePreviewContext).activePreview;

interface LinkPreviewProviderProps {
  children: ReactNode;
  content: string;
}

export default function LinkPreviewProvider({ children }: LinkPreviewProviderProps) {
  const [previews, setPreviews] = useState<Record<string, PreviewData>>({});
  const [activePreview, setActivePreview] = useState<ActivePreview | null>(null);
  const loadingUrlsRef = useRef<Set<string>>(new Set());
  const [, forceUpdate] = useState({});

  const fetchPreview = useCallback(async (url: string) => {
    if (previews[url] || loadingUrlsRef.current.has(url)) {
      return;
    }

    loadingUrlsRef.current.add(url);
    forceUpdate({});

    try {
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        setPreviews(prev => ({ ...prev, [url]: data }));
      }
    } catch {
      // Silently fail - preview is optional
    } finally {
      loadingUrlsRef.current.delete(url);
      forceUpdate({});
    }
  }, [previews]);

  return (
    <LinkPreviewContext.Provider value={{ previews, loadingUrls: loadingUrlsRef.current, fetchPreview }}>
      <ActivePreviewContext.Provider value={{ activePreview, setActivePreview }}>
        {children}
        <LinkPreviewSidebar />
      </ActivePreviewContext.Provider>
    </LinkPreviewContext.Provider>
  );
}
