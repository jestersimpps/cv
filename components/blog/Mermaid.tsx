'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        themeVariables: {
          darkMode: true,
          background: '#0a0a0a',
          primaryColor: '#7c3aed',
          primaryTextColor: '#f5f5f5',
          primaryBorderColor: '#5b21b6',
          secondaryColor: '#0ea5e9',
          secondaryTextColor: '#f5f5f5',
          secondaryBorderColor: '#0284c7',
          tertiaryColor: '#10b981',
          tertiaryTextColor: '#f5f5f5',
          tertiaryBorderColor: '#059669',
          lineColor: '#a78bfa',
          textColor: '#f5f5f5',
          mainBkg: '#1a1a2e',
          nodeBorder: '#5b21b6',
          clusterBkg: '#111827',
          clusterBorder: '#374151',
          titleColor: '#f5f5f5',
          edgeLabelBackground: '#1a1a2e',
        },
      });

      const renderChart = async () => {
        if (ref.current) {
          try {
            const { svg } = await mermaid.render(
              `mermaid-${Math.random().toString(36).substring(7)}`,
              chart
            );
            ref.current.innerHTML = svg;
          } catch {
            ref.current.innerHTML = `<pre>${chart}</pre>`;
          }
        }
      };

      renderChart();
    }
  }, [chart]);

  return <div ref={ref} className="my-8 flex justify-center rounded-lg bg-[#0a0a0a] p-6" />;
}
