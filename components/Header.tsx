import Image from "next/image";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Header() {
  return (
    <header id="header" className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 overflow-hidden border border-white/20 dark:border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl"></div>

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/50 dark:ring-primary-500/30 shadow-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 opacity-20"></div>
          <Image
            src="/assets/avatar.png"
            alt="Jo Vinkenroye"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Jo Vinkenroye
          </h1>
          <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            Web Application Developer
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
            13+ years building ERP systems, SaaS platforms, and modern web applications
          </p>
          <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
            <a
              href="https://github.com/jestersimpps"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 rounded-lg transition-all hover:scale-110"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </a>
            <a
              href="https://linkedin.com/in/jovinkenroye"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 rounded-lg transition-all hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </a>
            <a
              href="https://bicraw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 rounded-lg transition-all hover:scale-110"
              title="Website"
            >
              <Globe className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
