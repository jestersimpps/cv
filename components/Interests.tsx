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
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Sparkles className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Interests & Specializations
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-200 rounded-lg text-sm font-medium"
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
}