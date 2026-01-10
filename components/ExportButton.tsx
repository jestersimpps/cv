"use client";

import { Download } from "lucide-react";
import { exportToMarkdown } from "@/lib/cvData";

export default function ExportButton() {
  const handleExport = () => {
    const markdown = exportToMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jo-vinkenroye-cv.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="fixed bottom-6 left-6 z-50 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full shadow-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
      title="Download CV as Markdown"
    >
      <Download className="w-5 h-5 text-white" />
      <span className="text-sm font-medium text-white">
        Download CV
      </span>
    </button>
  );
}