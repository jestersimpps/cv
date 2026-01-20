'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  isLoading: boolean;
}

interface ActivePreviewContextType {
  activePreview: ActivePreview | null;
  setActivePreview: (preview: ActivePreview | null) => void;
}

const LinkPreviewContext = createContext<LinkPreviewContextType>({
  previews: {},
  isLoading: true,
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

function extractExternalLinks(mdxContent: string): string[] {
  const links: string[] = [];

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let match;

  while ((match = markdownLinkRegex.exec(mdxContent)) !== null) {
    const url = match[2];
    if (!links.includes(url)) {
      links.push(url);
    }
  }

  return links;
}

export default function LinkPreviewProvider({ children, content }: LinkPreviewProviderProps) {
  const [previews, setPreviews] = useState<Record<string, PreviewData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activePreview, setActivePreview] = useState<ActivePreview | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const loadPreviews = async () => {
      const externalLinks = extractExternalLinks(content);

      if (externalLinks.length === 0) {
        setIsLoading(false);
        return;
      }

      const previewPromises = externalLinks.map(async (url) => {
        try {
          const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`, {
            signal: abortController.signal,
          });
          if (response.ok) {
            const data = await response.json();
            return { url, data };
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            return { url, data: null };
          }
        }
        return { url, data: null };
      });

      const results = await Promise.all(previewPromises);

      if (abortController.signal.aborted) return;

      const previewMap: Record<string, PreviewData> = {};
      results.forEach(({ url, data }) => {
        if (data) {
          previewMap[url] = data;
        }
      });

      setPreviews(previewMap);
      setIsLoading(false);
    };

    loadPreviews();

    return () => {
      abortController.abort();
    };
  }, [content]);

  return (
    <LinkPreviewContext.Provider value={{ previews, isLoading }}>
      <ActivePreviewContext.Provider value={{ activePreview, setActivePreview }}>
        {children}
        <LinkPreviewSidebar />
      </ActivePreviewContext.Provider>
    </LinkPreviewContext.Provider>
  );
}
