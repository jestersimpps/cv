import { Mail, Phone, Github, Globe, Linkedin, MessageCircle } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border border-white/20 dark:border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-2xl"></div>
      <div className="relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Let&apos;s Work Together
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Available for freelance projects, consulting, and full-time opportunities.
            Let&apos;s build something amazing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="mailto:jov2all@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-700 dark:text-primary-300 rounded-xl font-semibold transition-all hover:scale-105 border border-primary-500/30"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a
            href="tel:+32468207619"
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-700 dark:text-neutral-200 rounded-xl font-semibold transition-all hover:scale-105 border border-white/30"
          >
            <Phone className="w-5 h-5" />
            Call Me
          </a>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/jestersimpps"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
            title="GitHub"
          >
            <Github className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </a>
          <a
            href="https://linkedin.com/in/jovinkenroye"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </a>
          <a
            href="https://bicraw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
            title="Website"
          >
            <Globe className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </a>
          <a
            href="https://t.me/jestersimpps"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
            title="Telegram"
          >
            <MessageCircle className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Jo Vinkenroye. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
