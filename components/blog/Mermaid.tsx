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
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
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

  return <div ref={ref} className="my-8 flex justify-center" />;
}
