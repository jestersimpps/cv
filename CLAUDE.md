# Project Instructions for Claude Code

## Blog Post Creation Guide

When asked to write a blog post, create an MDX file in `content/blog/` with the following structure:

### File Naming
- Use kebab-case: `my-blog-post-title.mdx`
- Keep it short but descriptive
- The filename becomes the URL slug: `/blog/my-blog-post-title`

### Required Frontmatter

```mdx
---
title: "Your Post Title Here"
description: "A compelling 1-2 sentence description for SEO and previews (max 160 chars)"
publishedAt: "YYYY-MM-DD"
author: "Jo Vinkenroye"
category: "Development"
tags: ["Tag1", "Tag2", "Tag3"]
---
```

### Optional Frontmatter Fields

```mdx
updatedAt: "YYYY-MM-DD"      # If post was updated after publishing
coverImage: "/assets/blog/image.png"  # 1200x630px recommended for social sharing
featured: true               # Shows as larger card on blog list
draft: true                  # Hides post from listing (for work in progress)
```

### Available Categories
- `Development` - General web dev, frameworks, best practices
- `AI & Machine Learning` - AI integration, LLMs, ML topics
- `Web3 & Blockchain` - Crypto, smart contracts, decentralized apps
- `Architecture` - System design, scalability, patterns
- `Career` - Career advice, lessons learned, industry insights
- `Tutorials` - Step-by-step guides and how-tos

### SEO Best Practices
1. **Title**: 50-60 characters, include primary keyword
2. **Description**: 150-160 characters, compelling and keyword-rich
3. **Tags**: 3-6 relevant tags that users might search for
4. **Headings**: Use H2 (##) for main sections, H3 (###) for subsections
5. **Cover Image**: If provided, use 1200x630px for optimal social sharing

### Content Structure
- Start with a brief introduction (no heading needed)
- Use `## Heading` for main sections (these appear in Table of Contents)
- Use `### Subheading` for subsections
- Keep paragraphs concise
- Use code blocks with language specification: ```typescript
- Use bullet points and numbered lists for scannability

### Example Post

```mdx
---
title: "Building Type-Safe APIs with Next.js and tRPC"
description: "Learn how to create end-to-end type-safe APIs using Next.js App Router and tRPC for better developer experience."
publishedAt: "2026-01-15"
author: "Jo Vinkenroye"
category: "Tutorials"
tags: ["Next.js", "tRPC", "TypeScript", "API"]
coverImage: "/assets/blog/trpc-nextjs.png"
featured: false
---

Building type-safe APIs has never been easier. In this tutorial, we'll explore how tRPC integrates with Next.js to provide end-to-end type safety.

## Why Type Safety Matters

Type safety catches errors at compile time rather than runtime...

## Setting Up tRPC

First, install the required packages:

\`\`\`bash
npm install @trpc/server @trpc/client @trpc/react-query
\`\`\`

### Creating the Router

\`\`\`typescript
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router({
  hello: t.procedure.query(() => 'Hello World'),
});
\`\`\`

## Conclusion

tRPC provides excellent DX for building type-safe APIs...
```

### Cover Images
Place cover images in `/public/assets/blog/`
- Recommended size: 1200x630px (2:1 aspect ratio)
- Formats: PNG, JPG, WebP
- Reference in frontmatter as: `/assets/blog/filename.png`
