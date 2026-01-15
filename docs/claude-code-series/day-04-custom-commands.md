# Day 4: 14 Custom Commands That Transform Your Workflow

## Blog Post Goal
Deep dive into custom slash commands, featuring the best community commands and how to create your own.

---

## Primary Resources

### Nimbalyst
- **GitHub**: https://github.com/Nimbalyst/nimbalyst
- **Platform**: https://nimbalyst.com/

### Official Documentation
- **Slash Commands Docs**: https://code.claude.com/docs/en/slash-commands

### Community Command Collections
- **Claude Command Suite (148+ commands)**: https://github.com/qdhenry/Claude-Command-Suite
- **ClaudeKit**: https://github.com/carlrannaberg/claudekit
- **wshobson/commands**: https://github.com/wshobson/commands
- **claude-sessions**: https://github.com/iannuttall/claude-sessions
- **claude-code-settings**: https://github.com/feiskyer/claude-code-settings
- **claude-code-showcase**: https://github.com/ChrisWiles/claude-code-showcase
- **awesome-claude-code**: https://github.com/hesreallyhim/awesome-claude-code
- **Rangizingo's Custom Commands (Gist)**: https://gist.github.com/Rangizingo/e4623d05faab2011e7011b10120b4dce

---

## Key Research Findings

### What Are Custom Slash Commands?
- Markdown files in `.claude/commands/` directory
- Claude automatically recognizes them on startup
- Available immediately through `/` menu
- Can be project-specific or personal
- Support namespacing through directory structures

### Nimbalyst Platform Features
- Free, local, WYSIWYG editor
- Parallel session manager
- Iterate with Claude on full context:
  - Sessions
  - Markdown docs
  - Mockups
  - Diagrams
  - Data models
  - MCP
  - Code
- Agent Manager: Run multiple agent sessions in parallel
- Review AI changes as red/green diffs
- Open storage in markdown and plain files

### Claude Command Suite (148+ commands)
- 148+ slash commands
- 54 AI agents
- Claude Code Skills
- Automated workflows
- Professional development toolkit covering:
  - Code review
  - Feature creation
  - Security auditing
  - Architectural analysis

### ClaudeKit Commands
- `/code-review` - Multi-aspect code reviews with 6 parallel agents
- `/git:commit` - Create commits following project conventions
- `/validate-and-fix` - Run all quality checks and fix issues
- `/spec:create` - Generate comprehensive specifications

### Command Organization
- **Project-specific**: `.claude/commands/` in project root
- **Personal/Global**: `~/.claude/commands/` in home directory
- **Namespacing**: Use subdirectories (e.g., `/git:commit`, `/test:unit`)

---

## Top 14 Commands to Feature

### 1. `/code-review`
Multi-aspect code review with parallel analysis
```markdown
# .claude/commands/code-review.md
Review this code for:
- Security vulnerabilities
- Performance issues
- Code style violations
- Potential bugs
- Test coverage gaps
```

### 2. `/git:commit`
Smart commit message generation
```markdown
# .claude/commands/git/commit.md
Analyze staged changes and create a commit message that:
- Follows conventional commits format
- Summarizes the changes concisely
- Includes any breaking changes
```

### 3. `/refactor`
Intelligent code refactoring
```markdown
# .claude/commands/refactor.md
Refactor the selected code to:
- Improve readability
- Reduce complexity
- Follow DRY principles
- Maintain functionality
```

### 4. `/test:generate`
Automatic test generation
```markdown
# .claude/commands/test/generate.md
Generate comprehensive tests for the selected code:
- Unit tests for all functions
- Edge cases
- Error scenarios
- Mock external dependencies
```

### 5. `/debug`
Systematic debugging helper
```markdown
# .claude/commands/debug.md
Help me debug this issue:
1. Analyze the error message
2. Trace the code path
3. Identify potential causes
4. Suggest fixes
```

### 6. `/explain`
Code explanation and documentation
```markdown
# .claude/commands/explain.md
Explain this code:
- What it does
- How it works
- Why it's implemented this way
- Potential improvements
```

### 7. `/security-audit`
Security vulnerability scanner
```markdown
# .claude/commands/security-audit.md
Audit this code for security issues:
- OWASP Top 10
- Input validation
- Authentication/Authorization
- Data exposure
```

### 8. `/performance`
Performance analysis
```markdown
# .claude/commands/performance.md
Analyze this code for performance:
- Time complexity
- Space complexity
- Bottlenecks
- Optimization suggestions
```

### 9. `/document`
Auto-documentation
```markdown
# .claude/commands/document.md
Generate documentation:
- JSDoc/TSDoc comments
- README updates
- API documentation
- Usage examples
```

### 10. `/pr-review`
Pull request review
```markdown
# .claude/commands/pr-review.md
Review this PR:
- Code quality
- Test coverage
- Breaking changes
- Merge readiness
```

### 11. `/architecture`
Architecture analysis
```markdown
# .claude/commands/architecture.md
Analyze the architecture:
- Component relationships
- Data flow
- Coupling/cohesion
- Improvement suggestions
```

### 12. `/migrate`
Code migration helper
```markdown
# .claude/commands/migrate.md
Help migrate this code:
- Identify deprecated patterns
- Suggest modern alternatives
- Create migration plan
- Handle breaking changes
```

### 13. `/session:start`
Session tracking
```markdown
# .claude/commands/session/start.md
Start a new development session:
- Record current state
- Set objectives
- Track changes
- Create session log
```

### 14. `/ship`
Deployment preparation
```markdown
# .claude/commands/ship.md
Prepare for deployment:
- Run all tests
- Check for issues
- Generate changelog
- Create release notes
```

---

## Suggested Blog Post Structure

1. **Introduction**: Power of custom commands
2. **How Commands Work**: Technical overview
3. **Nimbalyst Platform**: Featured tool deep dive
4. **Command Collections**: Best community resources
5. **Top 14 Commands**: Detailed breakdown with code
6. **Creating Your Own**: Step-by-step guide
7. **Organization Tips**: Namespacing and structure
8. **Team Sharing**: Git integration for commands
9. **Best Practices**: Command design principles
10. **Next Steps**: Link to Day 5

---

## Creating Custom Commands Guide

### Basic Structure
```
.claude/
└── commands/
    ├── review.md
    ├── git/
    │   ├── commit.md
    │   └── pr.md
    └── test/
        ├── unit.md
        └── integration.md
```

### Command File Template
```markdown
# Command Name

Brief description of what this command does.

## Instructions

1. Step one
2. Step two
3. Step three

## Context

Relevant context the AI should consider.

## Output Format

How results should be formatted.
```

---

## Notes
- Fetch more details from Nimbalyst platform
- Include screenshots of command menu
- Show before/after examples of productivity gains
