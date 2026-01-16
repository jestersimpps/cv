import { Mail, Phone, MapPin, Globe, Github } from "lucide-react";

export default function PersonalInfo() {
  return (
    <section className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-white/20 dark:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl"></div>
      <div className="relative">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <a href="mailto:jov2all@gmail.com" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            jov2all@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <a href="tel:+32468207619" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            +32 468 207 619
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <span className="text-neutral-700 dark:text-neutral-300">Remote</span>
        </div>
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <a href="https://bicraw.ai" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            bicraw.ai
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Github className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <a href="https://github.com/jestersimpps" className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            github.com/jestersimpps
          </a>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
          Summary
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Over 10 years of experience building ERP, SAAS applications and web platforms. Highly familiar with a wide
          variety of web development technologies, frameworks and build tools. Preference towards full typescript stacks.
          Currently specializing in TypeScript-first architectures with Angular/Next.js/NestJS and exploring
          Web3/blockchain technologies and AI integrations.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
          Personal Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Strengths */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {["Customer friendly", "Fast learner", "Fast shipper", "Can work autonomously", "Pro-active"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-emerald-500/20 dark:bg-emerald-500/10 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 rounded-full text-sm font-semibold border border-emerald-500/30 dark:border-emerald-500/20 hover:bg-emerald-500/30 dark:hover:bg-emerald-500/15 hover:shadow-lg hover:scale-105 transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Working Style */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Working Style</h4>
            <div className="flex flex-wrap gap-2">
              {["Ship fast", "Break things", "Refactor often", "Iterative development"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-blue-500/20 dark:bg-blue-500/10 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 rounded-full text-sm font-semibold border border-blue-500/30 dark:border-blue-500/20 hover:bg-blue-500/30 dark:hover:bg-blue-500/15 hover:shadow-lg hover:scale-105 transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Honest Weaknesses */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Honest Weaknesses</h4>
            <div className="flex flex-wrap gap-2">
              {["Loses interest fast", "Not a good planner", "Hates repetitive work"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-orange-500/20 dark:bg-orange-500/10 backdrop-blur-sm text-neutral-700 dark:text-neutral-200 rounded-full text-sm font-semibold border border-orange-500/30 dark:border-orange-500/20 hover:bg-orange-500/30 dark:hover:bg-orange-500/15 hover:shadow-lg hover:scale-105 transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Languages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
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
                    className={`h-4 flex-1 rounded-full relative overflow-hidden ${
                      i < Math.ceil(lang.percentage / 20)
                        ? "bg-white/40 dark:bg-white/20 backdrop-blur-sm shadow-lg border border-white/50 dark:border-white/30"
                        : "bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10"
                    }`}
                  >
                    {i < Math.ceil(lang.percentage / 20) && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}