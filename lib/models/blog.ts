export interface BlogSeries {
  id: string;
  title: string;
  part: number;
  total: number;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
  series?: BlogSeries;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  readingTime: string;
  content: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export type BlogCategory =
  | 'Development'
  | 'AI & Machine Learning'
  | 'Web3 & Blockchain'
  | 'Architecture'
  | 'Career'
  | 'Tutorials';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Development',
  'AI & Machine Learning',
  'Web3 & Blockchain',
  'Architecture',
  'Career',
  'Tutorials',
];
