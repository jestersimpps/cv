import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900">
          <Image
            src="/assets/avatar.png"
            alt="Jo Vinkenroye"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Jo Vinkenroye
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Web Application Developer
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            13+ years building ERP systems, SaaS platforms, and modern web applications
          </p>
        </div>
      </div>
    </header>
  );
}