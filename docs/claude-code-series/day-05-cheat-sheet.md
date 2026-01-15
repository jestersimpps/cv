# Day 5: The Ultimate Claude Code Cheat Sheet

## Blog Post Goal
Create a comprehensive quick reference guide covering all essential commands, shortcuts, configuration, and workflows.

---

## Primary Resources

### Cheat Sheet Repositories
- **Njengah/claude-code-cheat-sheet**: https://github.com/Njengah/claude-code-cheat-sheet
- **bhancockio/claude-code-cheat-sheet**: https://github.com/bhancockio/claude-code-cheat-sheet
- **zebbern/claude-code-guide**: https://github.com/zebbern/claude-code-guide
- **hesreallyhim/awesome-claude-code**: https://github.com/hesreallyhim/awesome-claude-code

### Online Cheat Sheets
- **AwesomeClaude.ai Cheatsheet**: https://awesomeclaude.ai/code-cheatsheet
- **Devhints Claude Code**: https://devhints.io/claude-code
- **Devoriales Reference Guide**: https://devoriales.com/post/400/claude-code-cheat-sheet-the-reference-guide
- **GitHub Gist by cifren**: https://gist.github.com/cifren/19e5fcccde1397d4a6b6c56a737a466a

---

## Key Research Findings

### What Makes a Great Cheat Sheet
- Comprehensive but scannable
- Organized by category
- Includes examples
- Ready-to-use templates
- Covers basics to advanced

### Categories to Cover

1. **CLI Commands**
2. **Keyboard Shortcuts**
3. **Configuration Options**
4. **Slash Commands**
5. **Hooks**
6. **MCP Servers**
7. **Agent Skills**
8. **Checkpointing**
9. **Headless Mode**
10. **Git Worktrees**
11. **Subagents**
12. **Permissions**

### Important First Step
Run `/terminal-setup` to enable SHIFT + ENTER for multi-line input

---

## Complete Cheat Sheet Content

### CLI Commands

```bash
# Start interactive mode
claude

# One-shot mode (non-interactive)
claude -p "your query"

# Continue last conversation
claude -c

# Resume specific session
claude -r

# Print mode (output only)
claude -p "query" --print

# Specify model
claude --model opus

# Help
claude --help
```

### Keyboard Shortcuts (Interactive Mode)

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line (after /terminal-setup) |
| `Shift+Tab` | Enter plan mode |
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code |
| `↑` / `↓` | Navigate history |
| `Tab` | Autocomplete |

### Essential Slash Commands

```
/help          - Show all commands
/clear         - Clear conversation (save tokens!)
/resume        - Resume previous session
/terminal-setup - Enable multi-line input
/config        - Open configuration
/model         - Switch model
/permissions   - Manage permissions
/mcp           - MCP server management
```

### Configuration Files

```
~/.claude/
├── settings.json      # Global settings
├── commands/          # Personal commands
└── CLAUDE.md          # Global instructions

project/
├── .claude/
│   ├── commands/      # Project commands
│   └── settings.json  # Project settings
└── CLAUDE.md          # Project instructions
```

### CLAUDE.md Template

```markdown
# Project Name

## Overview
Brief project description

## Tech Stack
- Framework
- Language
- Database

## Conventions
- Coding style
- Naming conventions
- File structure

## Commands
- npm run dev
- npm run test
- npm run build

## Important Notes
- Special considerations
- Gotchas
```

### Hooks Configuration

```json
// .claude/settings.json
{
  "hooks": {
    "pre-commit": "npm run lint",
    "post-commit": "npm run test"
  }
}
```

### MCP Server Setup

```json
// MCP configuration
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem"]
    }
  }
}
```

### Permissions Quick Reference

| Permission | Description |
|------------|-------------|
| `read` | Read files |
| `write` | Write/edit files |
| `execute` | Run commands |
| `git` | Git operations |
| `network` | Network requests |

### Headless Mode

```bash
# Run without interactive prompts
claude -p "task" --headless

# With output format
claude -p "task" --headless --json

# Pipe output
claude -p "analyze" --headless | jq .
```

### Git Integration

```bash
# Stage and commit
claude -p "commit these changes with a good message"

# Create PR
claude -p "create a PR for this branch"

# Review changes
claude -p "review the diff and summarize"
```

### Subagent Spawning

```bash
# In conversation
"Spawn a subagent to handle the tests while I work on the UI"

# Parallel tasks
"Run these tasks in parallel: lint, test, build"
```

### Checkpointing

```bash
# Create checkpoint
/checkpoint create "before refactor"

# List checkpoints
/checkpoint list

# Restore checkpoint
/checkpoint restore <id>
```

### Token Optimization Tips

1. Use `/clear` frequently
2. Keep CLAUDE.md focused
3. Reference files instead of pasting
4. Use one-shot mode for simple queries
5. Break large tasks into smaller ones

### Common Patterns

```bash
# Code review
claude -p "review this PR for issues"

# Bug fix
claude -p "find and fix the bug in auth.ts"

# Refactor
claude -p "refactor this function to be more readable"

# Documentation
claude -p "document this module"

# Testing
claude -p "write tests for this component"
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Slow response | Clear context with `/clear` |
| Auth issues | Re-run `claude` and authenticate |
| Command not found | Check PATH, reinstall with `-g` |
| Permission denied | Check file permissions |
| High token usage | Optimize CLAUDE.md, use `/clear` |

---

## Suggested Blog Post Structure

1. **Introduction**: Why you need a cheat sheet
2. **Quick Start Commands**: Essential 5 commands
3. **Keyboard Shortcuts**: Speed up interaction
4. **Configuration Deep Dive**: All config options
5. **Slash Commands Reference**: Complete list
6. **Git Workflow Patterns**: Common git tasks
7. **Token Optimization**: Save money and time
8. **Troubleshooting Guide**: Common issues
9. **Printable Quick Reference**: Condensed version
10. **Next Steps**: Link to Day 6

---

## Printable Quick Reference Card

```
╔════════════════════════════════════════════════════════════╗
║                  CLAUDE CODE CHEAT SHEET                   ║
╠════════════════════════════════════════════════════════════╣
║  START                                                      ║
║  claude           Interactive mode                          ║
║  claude -p        One-shot mode                             ║
║  claude -c        Continue last                             ║
╠════════════════════════════════════════════════════════════╣
║  SHORTCUTS                                                  ║
║  Shift+Tab        Plan mode                                 ║
║  Shift+Enter      New line                                  ║
║  Ctrl+C           Cancel                                    ║
║  Ctrl+D           Exit                                      ║
╠════════════════════════════════════════════════════════════╣
║  COMMANDS                                                   ║
║  /help            Show help                                 ║
║  /clear           Clear context                             ║
║  /resume          Resume session                            ║
╠════════════════════════════════════════════════════════════╣
║  FILES                                                      ║
║  CLAUDE.md        Project instructions                      ║
║  .claude/         Config directory                          ║
║  commands/        Custom commands                           ║
╚════════════════════════════════════════════════════════════╝
```

---

## Notes
- Make blog post highly scannable with tables
- Include downloadable PDF version
- Consider interactive web version
- Add search functionality if possible
