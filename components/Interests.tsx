import { Sparkles } from "lucide-react";

export default function Interests() {
  const interests = [
    { label: "Building Side Projects", description: "Weekend hacking on new ideas" },
    { label: "AI Automation", description: "Making repetitive tasks disappear" },
    { label: "Indie Hacking", description: "Bootstrapping profitable products" },
    { label: "Open Source", description: "Contributing back to the community" },
    { label: "Trading Bots", description: "Algorithmic trading experiments" },
    { label: "Language Learning", description: "Currently studying Chinese" },
    { label: "Fitness Tech", description: "Garmin apps and health tracking" },
    { label: "Traveling", description: "Remote work from anywhere" },
  ];

  return (
    <section id="interests" className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-white/20 dark:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl"></div>
      <div className="relative">
      <div className="flex items-center mb-4">
        <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Interests & Specializations
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {interests.map((interest, index) => (
          <div
            key={index}
            className="p-4 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/15 hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <h3 className="font-bold text-neutral-900 dark:text-white mb-1">
              {interest.label}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {interest.description}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}