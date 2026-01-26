import { getAllPosts } from '@/lib/blog';
import { cvData } from '@/lib/cvData';

export async function GET() {
  const posts = getAllPosts();

  const blogSection = posts
    .map(
      (post) =>
        `- ${post.title}: /blog/${post.slug} - ${post.description}`
    )
    .join('\n');

  const skillsSection = Object.entries(cvData.skills)
    .map(([category, skills]) => `${category}: ${(skills as string[]).join(', ')}`)
    .join('\n');

  const recentProjects = cvData.experience
    .slice(0, 8)
    .map((exp) => `- ${exp.company}: ${exp.description[0]}`)
    .join('\n');

  const content = `# Jo V - Web Application Developer

> ${cvData.header.tagline}

## About
${cvData.summary}

## Site Structure
- Homepage: / - Overview of skills, experience, and projects
- Experience: /experience - Detailed work history and timeline
- Blog: /blog - Technical articles and project write-ups

## Blog Posts
${blogSection}

## Technical Skills
${skillsSection}

## Recent Projects
${recentProjects}

## Contact
- Email: ${cvData.contact.email}
- GitHub: github.com/${cvData.contact.github}
- Location: ${cvData.contact.location}

## Sitemap
https://www.jovweb.dev/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
