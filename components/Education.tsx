import { GraduationCap, ExternalLink } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  gpa?: string;
  achievements?: string[];
  link?: string;
}

const education: EducationItem[] = [
  {
    degree: "Web3 Solidity Bootcamp",
    institution: "Metana",
    period: "May 2024 - October 2024",
    link: "https://metana.io/web3-solidity-bootcamp-ethereum-blockchain/",
    achievements: [
      "4-month program for transition from Web2 to Web3",
      "Project-based curriculum covering Ethereum Blockchain, DeFi, and smart contracts"
    ]
  },
  {
    degree: "Master of Science (MSc) in Business Engineering",
    institution: "Hogeschool-Universiteit Brussel",
    period: "2008 - 2013",
    achievements: [
      "Two year Master's programme taught in English",
      "120 ECTS spread over two years"
    ]
  }
];

export default function Education() {
  return (
    <section id="education" className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-white/20 dark:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl"></div>
      <div className="relative">
      <div className="flex items-center mb-4">
        <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Education & Certifications
        </h2>
      </div>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {edu.degree}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                {edu.institution} {edu.location && `• ${edu.location}`}
              </p>
              {edu.link && (
                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2 font-semibold">
              {edu.period} {edu.gpa && `• GPA: ${edu.gpa}`}
            </p>
            {edu.achievements && (
              <ul className="list-disc list-inside space-y-1">
                {edu.achievements.map((achievement, i) => (
                  <li key={i} className="text-neutral-700 dark:text-neutral-300">
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-800/30">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Certifications
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li className="text-neutral-700 dark:text-neutral-300">
              ITIL v3 Foundation
            </li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}