import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostFrontmatter, BlogSeries, TableOfContentsItem } from '@/lib/models/blog';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => getPostBySlug(file.replace('.mdx', '')))
    .filter((post): post is BlogPost => post !== null && !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogPostFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: stats.text,
  };
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => categories.add(post.category));
  return Array.from(categories).sort();
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentPost.slug);

  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 3;
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
    score += sharedTags.length * 2;
    return { post, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    toc.push({ id, text, level });
  }

  return toc;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export interface SeriesInfo {
  id: string;
  title: string;
  postCount: number;
}

export function getPostsBySeries(seriesId: string): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.series?.id === seriesId)
    .sort((a, b) => (a.series?.part || 0) - (b.series?.part || 0));
}

export function getAllSeries(): SeriesInfo[] {
  const seriesMap = new Map<string, SeriesInfo>();

  getAllPosts().forEach((post) => {
    if (post.series) {
      const existing = seriesMap.get(post.series.id);
      if (existing) {
        existing.postCount++;
      } else {
        seriesMap.set(post.series.id, {
          id: post.series.id,
          title: post.series.title,
          postCount: 1,
        });
      }
    }
  });

  return Array.from(seriesMap.values()).sort((a, b) => a.title.localeCompare(b.title));
}

export function getSeriesNavigation(currentPost: BlogPost): {
  series: BlogSeries;
  posts: BlogPost[];
  currentIndex: number;
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
} | null {
  if (!currentPost.series) return null;

  const posts = getPostsBySeries(currentPost.series.id);
  const currentIndex = posts.findIndex((p) => p.slug === currentPost.slug);

  return {
    series: currentPost.series,
    posts,
    currentIndex,
    prevPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    nextPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
