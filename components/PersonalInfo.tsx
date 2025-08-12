import { Mail, Phone, MapPin, Globe, Github } from "lucide-react";

export default function PersonalInfo() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <a href="mailto:jov2all@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            jov2all@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <a href="tel:+32468207619" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            +32 468 207 619
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Remote</span>
        </div>
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <a href="https://bicraw.ai" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            bicraw.ai
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Github className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <a href="https://github.com/jestersimpps" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            github.com/jestersimpps
          </a>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Summary
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Over 10 years of experience building ERP, SAAS applications and web platforms. Highly familiar with a wide
          variety of web development technologies, frameworks and build tools. Preference towards full typescript stacks.
          Currently specializing in TypeScript-first architectures with Angular/Next.js/NestJS and exploring
          Web3/blockchain technologies and AI integrations.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Personal Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Team player", "Customer friendly", "Analytical mindset", "Can work autonomously", 
            "Flexible", "No false promises", "Pro-active", "Stubborn problem solver"].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Languages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {[
            { language: "🇳🇱 Dutch", level: "Native", percentage: 100 },
            { language: "🇬🇧 English", level: "Native/Very good", percentage: 95 },
            { language: "🇫🇷 French", level: "Good", percentage: 75 },
            { language: "🇪🇸 Spanish", level: "Daily conversations", percentage: 60 },
            { language: "🇩🇪 German", level: "Daily conversations", percentage: 40 },
            { language: "🇨🇳 Chinese", level: "Basic", percentage: 20 }
          ].map((lang) => (
            <div key={lang.language} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {lang.language}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {lang.level}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < Math.ceil(lang.percentage / 20)
                        ? "bg-blue-500 dark:bg-blue-400"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}