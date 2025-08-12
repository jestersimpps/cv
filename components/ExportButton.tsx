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
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      title="Export CV to Markdown"
    >
      <Download className="w-6 h-6" />
    </button>
  );
}