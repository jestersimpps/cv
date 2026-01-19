# Blog Writing Guide

Use this spec when writing or improving blog posts for jocv.

## Reference Material

Study these posts for tone, structure, and engagement patterns:

- `content/blog/claude-code-mastery-01-getting-started.mdx`
- `content/blog/claude-code-mastery-02-mental-model.mdx`

## Voice & Style

**Opening Hooks (First 3 Paragraphs)**

- Start with a relatable scenario ("Picture this: you're staring at...")
- Or a surprising stat / bold claim backed by evidence
- Create urgency — why the reader needs this NOW
- Clear value proposition — what they'll learn/gain
- NO generic intros like "If you've been following..." or "In today's world..."

**Voice**

- Personal and opinionated ("Here's what nobody wants to say...")
- Direct address to the reader ("You'll wonder why...")
- Strong positions backed by reasoning
- Not corporate, not neutral — have a point of view

**Bad Example:**
```
If you've been following the AI development space in early 2026,
you've probably heard about this topic more times than you'd expect.
```

**Good Example:**
```
Picture this: you push a complex feature request at 11 PM, go to sleep,
and wake up to a fully implemented solution. No babysitting. Just results.

That's not a fantasy—it's happening right now. And if you're still doing
things the old way, you're leaving massive gains on the table.
```

## Structure Rules

**Paragraphs**
- 2-4 sentences max
- One idea per paragraph
- White space is your friend

**Headings**
- Clear H2/H3 hierarchy
- Scannable — reader should get the gist from headings alone
- Use parentheticals for context: "## Getting Started (5 Minutes)"

**Lists**
- Use bullet points, not tables
- Bold the key term, then explain: "**Option A:** Do this thing"
- Keep list items parallel in structure

**Code Blocks**
- Always include surrounding context
- Show the "before" and "after" when relevant
- Use language hints (```bash, ```typescript, etc.)

**Endings**
- "Key Takeaways" section with bullet points
- Quick reference card for technical posts
- Clear next steps or call to action
- Navigation links for series (Previous / Next)

## What to Avoid

- Tables (use lists instead)
- Repeating the same stats/phrases across posts in a series
- Generic introductions
- Long paragraphs (more than 4 sentences)
- Corporate/neutral voice
- Emojis in headings or body text (unless specifically requested)
- HTML comments (use MDX: `{/* comment */}`)

## Quality Checklist

### Opening
- [ ] Hook: Relatable scenario, surprising stat, or bold claim
- [ ] Urgency: Why reader needs this NOW
- [ ] Promise: Clear value proposition
- [ ] NO generic intros

### Structure
- [ ] Short paragraphs (2-4 sentences)
- [ ] Clear H2/H3 hierarchy
- [ ] Scannable bullet points (no tables)
- [ ] Code examples with context
- [ ] Key Takeaways section at end

### Engagement
- [ ] Personal voice with opinions
- [ ] Anticipates reader objections
- [ ] Smooth transitions between sections
- [ ] Image suggestions where helpful: `{/* IMAGE: description */}`

### Technical Quality
- [ ] All external links valid
- [ ] Code examples accurate and tested
- [ ] SEO title (50-60 chars) and description (150-160 chars)
- [ ] Proper frontmatter

### For Series
- [ ] Consistent voice across all parts
- [ ] No repetitive content between posts
- [ ] Cross-links between parts
- [ ] Navigation at end (Previous / Next)

## Before Publishing

1. **Web Search**: Check for latest developments on the topic
2. **Link Verification**: Test all external URLs
3. **Build Check**: Run `npm run build` to catch MDX errors
4. **Read Aloud**: Does it sound like a person talking, not a manual?

## Frontmatter Template

```yaml
---
title: "Title Here (50-60 chars)"
description: "Compelling description that makes people click (150-160 chars)"
publishedAt: "YYYY-MM-DD"
author: "Jo Vinkenroye"
category: "Development"
tags: ["Tag1", "Tag2", "Tag3"]
coverImage: "/assets/blog/image.webp"
featured: false
# For series:
series:
  id: "series-slug"
  title: "Series Title"
  part: 1
  total: 6
---
```

## Completion Criteria

A post is ready when:

1. Opening hooks the reader (no generic intro)
2. All checklist items satisfied
3. Voice matches the reference posts
4. All links verified working
5. Build passes without errors
6. No tables, no repetition, no corporate speak
