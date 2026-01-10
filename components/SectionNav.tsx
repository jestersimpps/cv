"use client";

import { useState, useEffect } from "react";
import { User, Briefcase, GraduationCap, Code2, Sparkles, Mail } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "header", label: "About", icon: <User className="w-4 h-4" /> },
  { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
  { id: "interests", label: "Interests", icon: <Sparkles className="w-4 h-4" /> },
  { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("header");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`group flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
            activeSection === item.id
              ? "bg-white/40 dark:bg-white/20 shadow-lg backdrop-blur-md"
              : "hover:bg-white/20 dark:hover:bg-white/10"
          }`}
          title={item.label}
        >
          <span
            className={`transition-colors ${
              activeSection === item.id
                ? "text-primary-600 dark:text-primary-400"
                : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
              activeSection === item.id
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
