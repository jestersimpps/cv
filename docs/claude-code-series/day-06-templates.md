# Day 6: Claude Code Templates - Start Every Project Right

## Blog Post Goal
Showcase project templates and starter kits that provide pre-configured Claude Code environments for rapid development.

---

## Primary Resources

### Template Repositories
- **davila7/claude-code-templates**: https://github.com/davila7/claude-code-templates
- **scotthavird/claude-code-template**: https://github.com/scotthavird/claude-code-template
- **centminmod/my-claude-code-setup**: https://github.com/centminmod/my-claude-code-setup
- **ivan-magda/claude-code-plugin-template**: https://github.com/ivan-magda/claude-code-plugin-template

### Collections & Platforms
- **hesreallyhim/awesome-claude-code**: https://github.com/hesreallyhim/awesome-claude-code
- **aitmpl.com**: https://www.aitmpl.com/ - Professional templates portal

---

## Key Research Findings

### davila7/claude-code-templates (CLI Tool)

A CLI tool for configuring and monitoring Claude Code with features:
- Install complete development stacks
- Browse and install interactively
- Install specific components:
  - Agents
  - Commands
  - Settings
  - Hooks
  - MCPs

### scotthavird/claude-code-template

A customizable starter template optimized for:
- Rapid prototyping
- AI-assisted software development
- Designed to be forked and customized

### centminmod/my-claude-code-setup

Features a CLAUDE.md memory bank system:
- Set of memory bank files
- Better context retention over many chat sessions
- Shared starter template configuration

### ivan-magda/claude-code-plugin-template

GitHub template for creating Claude Code plugin marketplaces:
- Plugin scaffolding
- Validation commands
- Hooks
- Skills
- Agents
- CI/CD workflows
- Ready-to-use toolkit for teams distributing plugins

### aitmpl.com

Professional templates portal:
- 100+ agents, commands, settings & hooks
- Transform AI-powered development workflow
- Curated and polished resources

### awesome-claude-code Mentions

- **claude-starter-kit by serpro69**: Complete development environment with pre-configured MCP servers and tools
- **Claude Code Templates by Daniel Avila**: Collection with usage dashboard, analytics, and everything from slash commands to hooks to agents

---

## Template Categories

### 1. Starter Templates
Basic project setup with CLAUDE.md and minimal configuration

### 2. Full Stack Templates
Complete development stacks with:
- MCP servers
- Custom commands
- Hooks
- Agents

### 3. Plugin Templates
For creating distributable Claude Code extensions

### 4. Memory Bank Templates
Optimized for context retention across sessions

### 5. Team Templates
Shared configurations for team collaboration

---

## Essential Template Components

### 1. CLAUDE.md Structure

```markdown
# Project Name

## Overview
What this project does

## Architecture
High-level system design

## Tech Stack
- Languages
- Frameworks
- Tools

## Directory Structure
```
src/
├── components/
├── services/
└── utils/
```

## Coding Standards
- Style guide
- Naming conventions
- Best practices

## Common Tasks
- How to run
- How to test
- How to deploy

## Gotchas
- Known issues
- Workarounds
```

### 2. Commands Directory

```
.claude/
└── commands/
    ├── review.md
    ├── test.md
    ├── deploy.md
    └── git/
        ├── commit.md
        └── pr.md
```

### 3. Settings Configuration

```json
// .claude/settings.json
{
  "model": "opus",
  "permissions": {
    "read": true,
    "write": true,
    "execute": ["npm", "git"]
  },
  "hooks": {
    "pre-commit": "npm run lint"
  }
}
```

### 4. MCP Configuration

```json
{
  "mcpServers": {
    "filesystem": {...},
    "github": {...},
    "database": {...}
  }
}
```

---

## Template by Project Type

### Next.js Template

```markdown
# Next.js Project

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npx prisma studio` - Database GUI

## Conventions
- Server components by default
- Use 'use client' sparingly
- Path aliases (@/components)
- Colocate tests with components

## File Structure
app/           # Routes and pages
components/    # Reusable UI
lib/           # Utilities
prisma/        # Database schema
```

### Python/FastAPI Template

```markdown
# FastAPI Project

## Stack
- Python 3.11+
- FastAPI
- SQLAlchemy
- Alembic

## Commands
- `uvicorn main:app --reload` - Dev server
- `pytest` - Run tests
- `alembic upgrade head` - Migrations

## Conventions
- Type hints everywhere
- Pydantic models for validation
- Async/await for I/O
- Dependency injection
```

### React Native Template

```markdown
# React Native Project

## Stack
- React Native
- Expo
- TypeScript
- React Navigation

## Commands
- `npx expo start` - Development
- `npx expo build` - Production
- `npx expo eject` - Eject from Expo

## Conventions
- Functional components
- Custom hooks for logic
- StyleSheet for styles
- Separate screens from components
```

---

## Creating Your Own Template

### Step 1: Base Structure
```bash
mkdir my-claude-template
cd my-claude-template
mkdir -p .claude/commands
touch CLAUDE.md
touch .claude/settings.json
```

### Step 2: Configure CLAUDE.md
Document your project patterns and conventions

### Step 3: Add Custom Commands
Create markdown files for common workflows

### Step 4: Set Up Hooks
Configure pre/post action hooks

### Step 5: Add MCP Servers
Connect external services as needed

### Step 6: Test & Iterate
Use the template, refine based on experience

---

## Suggested Blog Post Structure

1. **Introduction**: Why templates matter
2. **Template Ecosystem Overview**: Available options
3. **davila7/claude-code-templates**: CLI tool deep dive
4. **Template Components**: What makes a good template
5. **Templates by Project Type**: Specific examples
6. **Memory Bank Pattern**: Context retention technique
7. **Plugin Templates**: Creating distributable plugins
8. **Creating Your Own**: Step-by-step guide
9. **Template Best Practices**: Tips and patterns
10. **Next Steps**: Link to Day 7

---

## Template Starter Commands

```bash
# Using davila7/claude-code-templates CLI
npx claude-code-templates install

# Interactive browser
npx claude-code-templates browse

# Install specific component
npx claude-code-templates install --agents
npx claude-code-templates install --commands
npx claude-code-templates install --hooks
```

---

## Notes
- Include downloadable template files
- Show before/after project setup comparison
- Emphasize time savings from proper templates
- Consider creating a "template of templates" meta-template
