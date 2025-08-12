import Image from "next/image";

export default function Header() {
  return (
    <header className="relative bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 overflow-hidden border border-white/20 dark:border-white/10">
      {/* Glass effect overlay */}
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
        </div>
      </div>
    </header>
  );
}