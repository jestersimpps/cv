# Chapter 2: The Mental Model

Understanding how Claude Code thinks will transform your results. This chapter covers the architecture and philosophy behind effective AI pair programming.

## The Junior Developer Analogy

Think of Claude Code as a highly skilled junior developer who:

- **Needs clear instructions** - Vague requests produce vague results
- **Benefits from context** - The more relevant info, the better the output
- **Works best with specific tasks** - "Add error handling to the login function" beats "improve the code"
- **Learns from your project's patterns** - Follows conventions it observes
- **Asks before making big changes** - Permission system keeps you in control

## How Claude Code Works

```
Your Prompt
    ↓
Context Gathering (reads files, understands codebase)
    ↓
Claude Model (opus/sonnet/haiku)
    ↓
Action Planning
    ↓
Execution (edit files, run commands, etc.)
    ↓
Results to You
```

### Context Gathering

This is the expensive step. Claude Code:
- Scans your project structure
- Reads relevant files
- Understands dependencies
- Checks git status

**This consumes time and tokens.** The optimization tips in Chapter 9 help minimize this cost.

## The Context Window

Claude has a "context window" - a limited amount of information it can hold at once. Think of it as working memory.

When the context fills up:
- Older information gets pushed out
- Claude may "forget" earlier parts of your conversation
- Responses may become less accurate

### Managing Context

```
/clear
```

This is your most important command. Use it:
- Between unrelated tasks
- When Claude seems confused
- When you notice repetitive or off-track responses
- After completing a feature

**Rule of thumb:** `/clear` more often than you think you need to.

## Plan Mode

Press `Shift+Tab` to enter plan mode.

In plan mode, Claude:
- Researches without making changes
- Analyzes the codebase
- Proposes approaches
- Waits for your approval

**When to use:**
- Exploring unfamiliar code
- Planning refactors
- Understanding architecture
- When you want to think before acting

```
[Shift+Tab]
"How would you approach adding authentication to this app?"

Claude analyzes and proposes a plan without touching any files.
```

## The Unix Philosophy

Claude Code follows Unix principles:

- **Composable** - Chain commands together
- **Scriptable** - Works in pipelines
- **Text-based** - Everything through the terminal

Example of composition:
```bash
tail -f app.log | claude -p "Alert me if you see any errors"
```

Claude watches your logs and notifies you of issues. This is powerful for monitoring.

## Context Sources

Claude pulls context from multiple places:

1. **Your prompt** - What you type
2. **CLAUDE.md** - Project instructions (Chapter 3)
3. **Open files** - In IDE integration
4. **Git status** - Uncommitted changes
5. **Previous conversation** - Session history
6. **Codebase analysis** - Files it reads

Understanding these sources helps you provide better context.

## Effective Prompting Patterns

### Be Specific

```
❌ "Fix the bug"
✅ "Fix the null pointer exception in src/auth.ts when user.email is undefined"
```

### Provide Context

```
❌ "Add a login page"
✅ "Add a login page using the same styling as the signup page in src/pages/signup.tsx, using our existing auth service"
```

### Break Down Large Tasks

```
❌ "Build a complete user dashboard with settings, notifications, and profile management"

✅ Step 1: "Create the dashboard layout component"
✅ Step 2: "Add the settings panel"
✅ Step 3: "Implement notifications"
✅ Step 4: "Build profile management"
```

### Reference Files

```
❌ "Use the same pattern as the other components"
✅ "Follow the pattern in src/components/Button.tsx"
```

## When Claude Gets Stuck

Signs Claude is struggling:
- Repetitive responses
- Circular logic
- Asking the same questions
- Producing incorrect code repeatedly

Solutions:
1. `/clear` and start fresh
2. Provide more specific context
3. Break the task into smaller pieces
4. Try a different approach/framing
5. Switch to `opus` model for complex problems

## The Feedback Loop

Effective Claude Code usage is iterative:

```
You: Request
Claude: Response
You: Feedback/Refinement
Claude: Improved Response
You: Accept or Refine Again
```

Don't expect perfection on the first try. Guide Claude like you would a colleague.

## Trust Calibration

Start with low trust, increase over time:

**Week 1:** Review every change carefully
**Week 2:** Allow auto-approval for safe operations
**Month 1:** Trust routine tasks, verify complex ones
**Ongoing:** Always verify security-critical and data-changing operations

## Anti-Patterns

### Don't Do This

1. **Dump entire files** - Reference by path instead
2. **Ignore Claude's questions** - They're usually important
3. **Rush permission prompts** - Read what you're approving
4. **Keep stale context** - `/clear` is free
5. **Use Claude for simple tasks** - Sometimes typing is faster

### Do This Instead

1. **Let Claude read files itself** - "Read src/auth.ts and explain it"
2. **Answer questions fully** - Saves back-and-forth
3. **Review permissions** - Especially for write/execute
4. **Clear often** - Fresh context = better results
5. **Use Claude for leverage** - Complex analysis, multi-file changes, tedious tasks

## Key Takeaways

1. Claude Code is a powerful junior dev that needs clear direction
2. Context management is crucial - `/clear` often
3. Plan mode (`Shift+Tab`) for research without changes
4. Be specific in prompts, reference files by path
5. Iterate and refine - don't expect perfection immediately
6. Trust calibration - verify early, automate later

---

[← Previous: Getting Started](./01-getting-started.md) | [Next: Project Configuration →](./03-project-configuration.md)
