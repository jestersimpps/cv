"use client";

import { useEffect, useState } from "react";

const terminalLines = [
  { text: "$ npm run build", color: "text-green-400", bold: true, delay: 500 },
  { text: "> jocv@1.0.0 build", color: "text-gray-400", delay: 200 },
  { text: "> next build", color: "text-gray-400", delay: 150 },
  { text: "", color: "", delay: 300 },
  { text: "info  - Loaded env from .env.local", color: "text-gray-300", delay: 400 },
  { text: "info  - Checking validity of types...", color: "text-cyan-400", delay: 800 },
  { text: "  ▸ src/app/page.tsx", color: "text-gray-500", delay: 120 },
  { text: "  ▸ src/app/layout.tsx", color: "text-gray-500", delay: 130 },
  { text: "  ▸ src/components/Header.tsx", color: "text-gray-500", delay: 110 },
  { text: "  ▸ src/components/Experience.tsx", color: "text-gray-500", delay: 140 },
  { text: "  ▸ src/components/Skills.tsx", color: "text-gray-500", delay: 125 },
  { text: "  ▸ src/components/PersonalInfo.tsx", color: "text-gray-500", delay: 135 },
  { text: "  ▸ src/components/Education.tsx", color: "text-gray-500", delay: 115 },
  { text: "  ▸ src/components/Interests.tsx", color: "text-gray-500", delay: 120 },
  { text: "  ▸ src/lib/cvData.ts", color: "text-gray-500", delay: 100 },
  { text: "✓ Type checking passed", color: "text-green-400", bold: true, delay: 600 },
  { text: "", color: "", delay: 200 },
  { text: "info  - Creating optimized production build...", color: "text-cyan-400", delay: 500 },
  { text: "  ▸ Bundling 15 modules...", color: "text-gray-400", delay: 1200 },
  { text: "  ▸ Minifying JavaScript...", color: "text-gray-400", delay: 800 },
  { text: "  ▸ Optimizing images...", color: "text-gray-400", delay: 600 },
  { text: "  ▸ Tree shaking unused modules...", color: "text-gray-400", delay: 400 },
  { text: "  ▸ Generating static pages...", color: "text-gray-400", delay: 900 },
  { text: "", color: "", delay: 100 },
  { text: "warn  - Compiled with warnings:", color: "text-yellow-400", delay: 300 },
  { text: "  Module Warning: React Hook useEffect missing dependency", color: "text-yellow-300", delay: 200 },
  { text: "  Line 42:6 in src/app/page.tsx", color: "text-gray-500", delay: 150 },
  { text: "", color: "", delay: 200 },
  { text: "✓ Compiled successfully", color: "text-green-400", bold: true, delay: 400 },
  { text: "✓ Collecting page data", color: "text-green-400", delay: 300 },
  { text: "✓ Generating static pages (7/7)", color: "text-green-400", delay: 500 },
  { text: "✓ Finalizing page optimization", color: "text-green-400", delay: 600 },
  { text: "", color: "", delay: 200 },
  { text: "Route (app)                              Size     First Load JS", color: "text-gray-500", delay: 100 },
  { text: "─────────────────────────────────────────────────────────────", color: "text-gray-600", delay: 50 },
  { text: "┌ ○ /                                    5.72 kB        89.3 kB", color: "text-gray-400", delay: 80 },
  { text: "├ ○ /experience                          3.21 kB        86.8 kB", color: "text-gray-400", delay: 80 },
  { text: "├ ○ /skills                              2.14 kB        85.7 kB", color: "text-gray-400", delay: 80 },
  { text: "└ λ /api/export                          1.05 kB        84.6 kB", color: "text-gray-400", delay: 80 },
  { text: "", color: "", delay: 300 },
  { text: "○  (Static)  prerendered as static content", color: "text-gray-500", delay: 100 },
  { text: "λ  (Dynamic) server-rendered on demand", color: "text-gray-500", delay: 100 },
  { text: "", color: "", delay: 400 },
  { text: "✨ Build completed in 13.72s", color: "text-green-400", bold: true, delay: 200 },
  { text: "", color: "", delay: 500 },
  { text: "$ npm test", color: "text-green-400", bold: true, delay: 600 },
  { text: "> jest --coverage --watchAll=false", color: "text-gray-400", delay: 200 },
  { text: "", color: "", delay: 400 },
  { text: "PASS  __tests__/Header.test.tsx", color: "text-green-400", delay: 800 },
  { text: "  ✓ renders correctly (24ms)", color: "text-gray-400", delay: 100 },
  { text: "  ✓ displays name and title (8ms)", color: "text-gray-400", delay: 100 },
  { text: "", color: "", delay: 200 },
  { text: "PASS  __tests__/Experience.test.tsx", color: "text-green-400", delay: 900 },
  { text: "  ✓ renders all experiences (31ms)", color: "text-gray-400", delay: 100 },
  { text: "  ✓ handles image modal correctly (12ms)", color: "text-gray-400", delay: 100 },
  { text: "  ✓ shows correct dates (7ms)", color: "text-gray-400", delay: 100 },
  { text: "", color: "", delay: 200 },
  { text: "PASS  __tests__/Skills.test.tsx", color: "text-green-400", delay: 700 },
  { text: "  ✓ renders all skill categories (19ms)", color: "text-gray-400", delay: 100 },
  { text: "  ✓ displays skills correctly (9ms)", color: "text-gray-400", delay: 100 },
  { text: "", color: "", delay: 300 },
  { text: "Test Suites: 3 passed, 3 total", color: "text-gray-400", delay: 100 },
  { text: "Tests:       8 passed, 8 total", color: "text-gray-400", delay: 100 },
  { text: "Snapshots:   0 total", color: "text-gray-400", delay: 100 },
  { text: "Time:        3.456s", color: "text-gray-400", delay: 100 },
  { text: "Coverage:    94.2%", color: "text-green-400", delay: 200 },
  { text: "", color: "", delay: 400 },
  { text: "$ git add -A", color: "text-green-400", bold: true, delay: 500 },
  { text: "$ git commit -m \"feat: update CV with new experience\"", color: "text-green-400", bold: true, delay: 300 },
  { text: "[main 7a3f2d1] feat: update CV with new experience", color: "text-gray-400", delay: 400 },
  { text: " 5 files changed, 247 insertions(+), 18 deletions(-)", color: "text-gray-400", delay: 100 },
  { text: "", color: "", delay: 300 },
  { text: "$ git push origin main", color: "text-green-400", bold: true, delay: 500 },
  { text: "Enumerating objects: 15, done.", color: "text-gray-400", delay: 200 },
  { text: "Counting objects: 100% (15/15), done.", color: "text-gray-400", delay: 300 },
  { text: "Delta compression using up to 8 threads", color: "text-gray-400", delay: 200 },
  { text: "Compressing objects: 100% (8/8), done.", color: "text-gray-400", delay: 400 },
  { text: "Writing objects: 100% (8/8), 2.47 KiB | 842.00 KiB/s, done.", color: "text-gray-400", delay: 300 },
  { text: "Total 8 (delta 6), reused 0 (delta 0)", color: "text-gray-400", delay: 200 },
  { text: "To github.com:user/jocv.git", color: "text-gray-400", delay: 100 },
  { text: "   3f4d5e6..7a3f2d1  main -> main", color: "text-gray-400", delay: 200 },
  { text: "", color: "", delay: 400 },
  { text: "✅ Successfully deployed!", color: "text-green-400", bold: true, delay: 600 },
];

export default function TerminalBackground() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= terminalLines.length) {
      // Reset and start over
      setTimeout(() => {
        setVisibleLines(0);
        setCurrentIndex(0);
      }, 3000);
      return;
    }

    const line = terminalLines[currentIndex];
    const randomDelay = line.delay + Math.random() * 200; // Add random delay

    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-black">
      <div className="fixed inset-0 p-4 font-mono text-sm leading-relaxed overflow-hidden">
        <div className="space-y-0.5 opacity-10 dark:opacity-100" style={{ textShadow: '0 0 8px currentColor' }}>
          {terminalLines.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              className={`${line.color} ${line.bold ? 'font-bold' : ''} animate-fadeIn`}
              style={{
                animation: 'fadeIn 0.3s ease-out',
                opacity: index < visibleLines - 10 ? 0.6 : 1
              }}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
          {visibleLines > 0 && visibleLines < terminalLines.length && (
            <span className="text-green-400 animate-pulse">▊</span>
          )}
        </div>
      </div>
      
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-30"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.01) 2px, rgba(0, 0, 0, 0.01) 4px)',
           }}>
      </div>
    </div>
  );
}