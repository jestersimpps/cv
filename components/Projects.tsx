import { FolderOpen, ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Handles 10K+ daily transactions.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://example-store.com"
  },
  {
    title: "Task Management System",
    description: "Collaborative project management tool with real-time updates, drag-and-drop interface, and team analytics.",
    technologies: ["React", "TypeScript", "Socket.io", "MongoDB", "Docker"],
    githubUrl: "https://github.com/yourusername/taskmanager"
  },
  {
    title: "AI Content Generator",
    description: "SaaS application leveraging OpenAI API for automated content creation with custom templates and SEO optimization.",
    technologies: ["Vue.js", "Python", "FastAPI", "OpenAI", "AWS"],
    liveUrl: "https://ai-content.example.com"
  }
];

export default function Projects() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <FolderOpen className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Projects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}