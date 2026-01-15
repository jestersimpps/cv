# Chapter 3: Project Configuration

The definitive guide to CLAUDE.md and project settings. This is where you teach Claude about your specific project.

## The CLAUDE.md File

CLAUDE.md is automatically read when Claude Code starts. It's your project's instruction manual for Claude.

### Location Options

```
# Project-specific (recommended)
your-project/CLAUDE.md

# Global (applies to all projects)
~/.claude/CLAUDE.md
```

Project-specific takes precedence over global.

### What to Include

A good CLAUDE.md answers:
- What is this project?
- What tech stack does it use?
- What conventions should Claude follow?
- What commands are available?
- What gotchas should Claude know about?

## CLAUDE.md Template

```markdown
# Project Name

Brief one-liner about what this project does.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Jest for testing

## Directory Structure

```
src/
├── app/           # Next.js routes
├── components/    # Reusable UI components
├── lib/           # Utilities and helpers
├── services/      # Business logic
└── types/         # TypeScript interfaces
```

## Coding Conventions

- Use path aliases (@/components, @/lib, @/services)
- Prefer server components, use 'use client' sparingly
- All functions must have typed parameters and return types
- Keep methods small with single responsibility
- No comments unless logic is non-obvious

## Common Commands

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Production build
- `npm run test` - Run Jest tests
- `npm run lint` - ESLint check
- `npx prisma studio` - Database GUI

## Environment Variables

Required in `.env.local`:
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## Important Notes

- Never commit .env files
- Run `npx prisma generate` after schema changes
- API routes are in app/api/
- Use Zod for runtime validation
```

## Framework-Specific Templates

### Next.js App Router

```markdown
# Next.js Project

## Stack
- Next.js 14 (App Router)
- TypeScript strict mode
- Tailwind CSS
- Prisma ORM

## Conventions
- Server Components by default
- Use 'use client' only when needed (useState, useEffect, event handlers)
- Path aliases: @/components, @/lib, @/app
- Colocate tests with components (Component.test.tsx)

## File Naming
- Components: PascalCase (Button.tsx)
- Utilities: camelCase (formatDate.ts)
- Routes: lowercase folders (app/dashboard/page.tsx)

## Data Fetching
- Server Components: Direct database/API calls
- Client Components: SWR or React Query
- API Routes: app/api/[route]/route.ts
```

### Python FastAPI

```markdown
# FastAPI Project

## Stack
- Python 3.11+
- FastAPI
- SQLAlchemy 2.0
- Alembic migrations
- Pydantic v2

## Conventions
- Type hints on all functions
- Async/await for I/O operations
- Pydantic models for request/response validation
- Dependency injection for services

## Commands
- `uvicorn main:app --reload` - Dev server
- `pytest` - Run tests
- `alembic upgrade head` - Apply migrations
- `alembic revision --autogenerate -m "message"` - Create migration

## Structure
```
app/
├── api/           # Route handlers
├── models/        # SQLAlchemy models
├── schemas/       # Pydantic schemas
├── services/      # Business logic
└── core/          # Config, dependencies
```
```

### React Native / Expo

```markdown
# React Native Project

## Stack
- React Native 0.73
- Expo SDK 50
- TypeScript
- React Navigation
- Zustand for state

## Conventions
- Functional components only
- Custom hooks for logic extraction
- StyleSheet for all styles (no inline)
- Separate screens from components

## Commands
- `npx expo start` - Development
- `npx expo build:ios` - iOS build
- `npx expo build:android` - Android build

## Navigation
- Stack navigator for main flow
- Tab navigator for bottom tabs
- Drawer for side menu
```

## Settings Directory Structure

```
~/.claude/                    # Global settings
├── settings.json             # Global config
├── commands/                 # Personal commands (all projects)
└── CLAUDE.md                 # Global instructions

your-project/
├── .claude/                  # Project settings
│   ├── settings.json         # Project config
│   ├── commands/             # Project-specific commands
│   └── settings.local.json   # Local overrides (gitignore this)
└── CLAUDE.md                 # Project instructions
```

## Settings.json Configuration

### Basic Settings

```json
{
  "model": "sonnet",
  "permissions": {
    "allow_read": true,
    "allow_write": true,
    "allow_execute": ["npm", "git", "npx"]
  }
}
```

### With Hooks

```json
{
  "hooks": {
    "pre-commit": "npm run lint",
    "post-edit": "npm run format"
  }
}
```

### Full Example

```json
{
  "model": "sonnet",
  "permissions": {
    "allow_read": true,
    "allow_write": true,
    "allow_execute": ["npm", "git", "npx", "python", "pytest"]
  },
  "hooks": {
    "pre-commit": "npm run lint && npm run test",
    "post-edit": "npx prettier --write"
  },
  "context": {
    "include": ["src/**/*", "tests/**/*"],
    "exclude": ["node_modules", "dist", ".next"]
  }
}
```

## Settings Precedence

When settings conflict, this order applies:

1. Command-line flags (highest priority)
2. `.claude/settings.local.json` (gitignored)
3. `.claude/settings.json` (project)
4. `~/.claude/settings.json` (global)
5. Default settings (lowest priority)

## Team Configuration

For teams, commit these files:
- `CLAUDE.md` - Project instructions
- `.claude/settings.json` - Shared settings
- `.claude/commands/` - Team commands

Gitignore these:
- `.claude/settings.local.json` - Personal overrides

### Example .gitignore Addition

```gitignore
# Claude Code personal settings
.claude/settings.local.json
```

## CLAUDE.md Best Practices

### Do

- Keep it focused (under 500 lines)
- Update when conventions change
- Include actual commands that work
- Document non-obvious patterns
- Mention common gotchas

### Don't

- Dump entire documentation
- Include sensitive information
- Repeat obvious language features
- Add outdated instructions
- Over-constrain Claude's approach

## Testing Your Configuration

After setting up CLAUDE.md:

```bash
claude
```

Then ask:
```
Summarize the project configuration you understand
```

Claude will tell you what it knows. If something's missing, update CLAUDE.md.

## Quick Reference

```
# File locations
CLAUDE.md              → Project root
~/.claude/CLAUDE.md    → Global (all projects)
.claude/settings.json  → Project settings
~/.claude/settings.json → Global settings

# Essential CLAUDE.md sections
- Tech Stack
- Directory Structure
- Coding Conventions
- Common Commands
- Important Notes/Gotchas
```

---

[← Previous: The Mental Model](./02-mental-model.md) | [Next: Custom Commands →](./04-custom-commands.md)
