import { Sparkles } from "lucide-react";

export default function Interests() {
  const interests = [
    "Process Automation",
    "AI/ML Implementation", 
    "Startup Architecture & Migration",
    "Web3 & NFT Development",
    "Lean Startups",
    "DevOps",
    "Blockchain Development & DApps",
    "React, Redux, Reflux",
    "MEAN Stack, Meteor",
    "GoLang",
    "Ionic 2",
    "Electron",
    "GraphQL",
    "AI Integrations"
  ];

  return (
    <section className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-white/20 dark:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl"></div>
      <div className="relative">
      <div className="flex items-center mb-4">
        <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Interests & Specializations
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-orange-200 via-amber-200 to-yellow-200 dark:from-orange-900/30 dark:via-amber-900/30 dark:to-yellow-900/30 text-orange-800 dark:text-orange-200 rounded-lg text-sm font-semibold border-2 border-orange-300 dark:border-orange-600 hover:shadow-lg hover:scale-105 transition-all"
          >
            {interest}
          </span>
        ))}
      </div>
      </div>
    </section>
  );
}