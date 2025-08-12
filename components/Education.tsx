import { GraduationCap } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  gpa?: string;
  achievements?: string[];
}

const education: EducationItem[] = [
  {
    degree: "Web3 Solidity Bootcamp",
    institution: "Metana",
    period: "May 2024 - October 2024",
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
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <GraduationCap className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Education & Certifications
        </h2>
      </div>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {edu.degree}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {edu.institution} {edu.location && `• ${edu.location}`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
              {edu.period} {edu.gpa && `• GPA: ${edu.gpa}`}
            </p>
            {edu.achievements && (
              <ul className="list-disc list-inside space-y-1">
                {edu.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Certifications
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li className="text-gray-700 dark:text-gray-300">
              ITIL v3 Foundation
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}