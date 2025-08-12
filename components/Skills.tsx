import { Code2 } from "lucide-react";

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["TypeScript", "JavaScript (ES2015/ES6)", "Python", "Swift", "PHP", "C#", "VB.NET", "VBA", "SAP ABAP", "Solidity", "Go"]
  },
  {
    category: "Frontend",
    skills: ["Angular (2-16)", "React.js", "Next.js", "Vue.js", "Ionic", "StencilJS", "D3.js", "jQuery", "HTML5", "CSS/SASS", "Bootstrap", "Foundation", "Material UI", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "NestJS", "Express", "Laravel (4-5.1)", "Django", ".NET", "Mongoose", "GraphQL", "Apollo", "Socket.io", "Temporal"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Microsoft Access", "Firebase", "Supabase", "BAAS"]
  },
  {
    category: "Testing & Quality",
    skills: ["Cypress", "Jest", "Jasmine", "Karma", "Mocha", "Spectator", "Wiremock", "TDD"]
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "AWS", "DigitalOcean", "Heroku", "Fly.io", "Vercel", "Jenkins", "TeamCity", "CircleCI", "Wercker", "PM2", "Nginx", "Cloudflare"]
  },
  {
    category: "Build Tools & Package Managers",
    skills: ["Webpack", "Grunt", "Gulp", "NPM", "Bower", "Composer", "Yeoman", "Artisan"]
  },
  {
    category: "Version Control & Collaboration",
    skills: ["Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Postman", "Fiddler"]
  },
  {
    category: "Blockchain & Web3",
    skills: ["Hyperledger Fabric", "Ethereum", "Solidity", "IPFS", "OpenSea", "EtherJS", "Ganache", "Truffle", "Smart Contracts", "NFTs"]
  },
  {
    category: "AI & ML",
    skills: ["OpenAI", "Anthropic", "Groq", "DeepL", "AI Integrations", "Process Automation", "Multi-Agent Architecture"]
  },
  {
    category: "Specialized",
    skills: ["OpenLayers", "ag-grid", "Formly", "Nrwl.io (Nx)", "fp-ts", "RxJS", "NgRx", "Redux", "Elasticsearch/Lucene", "Shopify"]
  },
  {
    category: "Operating Systems",
    skills: ["macOS", "Linux", "Unix Shell", "Vim", "Zsh"]
  },
  {
    category: "Methodology",
    skills: ["ERP", "Project Management", "Agile", "Lean", "Scrum", "Monorepo Architecture", "Microservices", "TDD"]
  }
];

export default function Skills() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Code2 className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Technical Experience
        </h2>
      </div>
      <div className="space-y-4">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}