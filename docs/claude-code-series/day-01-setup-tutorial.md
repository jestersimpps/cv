# Day 1: Setting Up Claude Code in Under 15 Minutes

## Blog Post Goal
A comprehensive beginner guide to get Claude Code installed, authenticated, and running your first commands.

---

## Primary Resources

### Official Documentation
- **Quickstart Guide**: https://code.claude.com/docs/en/quickstart
- **GitHub Repository**: https://github.com/anthropics/claude-code

### Community Tutorials
- **Claude Code Beginner's Tutorial: Build a Movie App in 15 Minutes**: https://creatoreconomy.so/p/claude-code-beginners-tutorial-build-a-movie-app-in-15-minutes
- **Claude Code Learning Path by Daniel Avila**: https://medium.com/@dan.avila7/claude-code-learning-path-a-practical-guide-to-getting-started-fcc601550476
- **Complete Beginner's Guide by Kristopher Dunham**: https://medium.com/@creativeaininja/complete-beginners-guide-to-claude-code-from-setup-to-your-first-ai-coding-session-57f43119ec62
- **No-BS Quick Guide**: https://fuszti.com/claude-code-setup-guide-2025/
- **ClaudeLog Tutorial**: https://claudelog.com/claude-code-tutorial/
- **DataCamp Guide**: https://www.datacamp.com/tutorial/claude-code
- **ClaudeCode.io Guides**: https://claudecode.io/guides
- **zebbern/claude-code-guide (GitHub)**: https://github.com/zebbern/claude-code-guide

---

## Key Research Findings

### What is Claude Code?
- Agentic coding tool that lives in your terminal
- Understands your codebase
- Executes routine tasks, explains complex code, handles git workflows
- Uses natural language commands
- Works in terminal, IDE, or via @claude on GitHub

### Prerequisites
- Node.js version 18.17.0 or higher
- Active Anthropic account with billing setup

### Installation Steps
1. Install Node.js (if not present)
2. Run: `npm install -g @anthropic-ai/claude-code` (the `-g` flag installs globally)
3. Run `claude` to start
4. Authenticate via browser redirect to Anthropic account
5. A workspace called "Claude Code" is automatically created

### Two Operating Modes
1. **Interactive mode**: Run `claude` to start a REPL session
2. **One-shot mode**: Use `claude -p "query"` for quick commands without entering interactive session

### First Steps After Install
- Run `/terminal-setup` to enable SHIFT + ENTER for multi-line input
- Type `/help` for available commands
- Use `/resume` to continue previous conversations
- Use `/clear` to start fresh (pro tip: do this often to save tokens)

### CLAUDE.md Setup
- Create `CLAUDE.md` in project root
- Claude automatically reads this file as instructions
- Contains Claude's analysis of your project
- Add custom instructions for project-specific behavior
- Commit to repo for team sharing

### Key Features to Highlight
- Editing and refactoring with AI suggestions
- Bug fixing and error identification
- Code understanding (ask questions about architecture)
- Automated testing and linting
- Git integration (commits, PRs)

### IDE Integration
- Works with VS Code, Cursor, Windsurf
- Extension acts as launcher
- Can run multiple instances in parallel in different panes

### Permission System
- Understanding permissions is critical for beginners
- Claude asks before making changes
- Can configure trust levels

### Pro Tips for Beginners
- Use `/clear` often to manage token usage
- Hit SHIFT+TAB to enter plan mode (research without changing code)
- Start with small tasks to build confidence
- Let Claude analyze the codebase first

---

## Suggested Blog Post Structure

1. **Introduction**: What is Claude Code and why it matters
2. **Prerequisites**: What you need before starting
3. **Installation**: Step-by-step with screenshots
4. **Authentication**: Connecting your account
5. **First Commands**: Basic usage examples
6. **Setting Up CLAUDE.md**: Project configuration
7. **IDE Integration**: VS Code setup
8. **Essential Commands**: Quick reference
9. **Common Beginner Mistakes**: What to avoid
10. **Next Steps**: Link to Day 2

---

## Code Snippets to Include

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Start interactive mode
claude

# One-shot mode for quick queries
claude -p "explain this function"

# Continue last conversation
claude -c

# Resume specific session
claude -r
```

---

## Notes
- The original LinkedIn link (https://lnkd.in/gq8GG9va) likely points to a video tutorial - may need to find the actual video URL
- Consider embedding or linking to video content if available
