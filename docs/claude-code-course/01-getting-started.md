# Chapter 1: Getting Started

Get Claude Code installed and running your first commands in under 15 minutes.

## What is Claude Code?

Claude Code is an agentic coding tool that lives in your terminal. It:

- Understands your entire codebase
- Executes tasks using natural language
- Handles git workflows, code reviews, refactoring
- Works in terminal, IDE, or via @claude on GitHub

Think of it as a senior developer sitting next to you who can read, write, and execute code.

## Prerequisites

Before installing, ensure you have:

- **Node.js 18.17.0+** - Check with `node --version`
- **Anthropic account** - With billing enabled at [console.anthropic.com](https://console.anthropic.com)

## Installation

```bash
npm install -g @anthropic-ai/claude-code
```

The `-g` flag installs globally, making `claude` available anywhere in your terminal.

## First Launch

```bash
claude
```

On first run:
1. Browser opens for authentication
2. Log into your Anthropic account
3. Authorize Claude Code
4. A workspace called "Claude Code" is created automatically

## Essential First Step

Run this immediately after installation:

```bash
/terminal-setup
```

This enables `SHIFT + ENTER` for multi-line input. Without it, you can only type single-line prompts.

## Two Operating Modes

### Interactive Mode

```bash
claude
```

Opens a REPL session. You have a conversation with Claude, it maintains context, and you can do complex multi-step tasks.

**When to use:** Most of the time. Building features, debugging, exploring code.

### One-Shot Mode

```bash
claude -p "your query here"
```

Runs a single command and exits. No interactive session.

**When to use:** Quick questions, scripting, CI/CD pipelines.

```bash
# Examples
claude -p "what does the auth middleware do?"
claude -p "list all TODO comments in the codebase"
claude -p "explain the error in package.json"
```

## Essential Commands

| Command | What it does |
|---------|--------------|
| `/help` | Show all available commands |
| `/clear` | Clear conversation context (saves tokens!) |
| `/resume` | Continue your last session |
| `/model` | Switch between opus/sonnet/haiku |
| `/config` | Open settings |

## Session Management

### Continue Last Session

```bash
claude -c
```

Picks up exactly where you left off.

### Resume with Selection

```bash
claude -r
```

Shows recent sessions to choose from.

### Fresh Start

In an active session:
```
/clear
```

Wipes context. Do this often between unrelated tasks to save tokens.

## Your First Task

Try this after installation:

```bash
claude
```

Then type:
```
Explain the structure of this project
```

Claude will analyze your codebase and give you an overview. This is a great way to onboard to any new project.

## Permission System

Claude asks before making changes. You'll see prompts like:

```
Claude wants to edit src/auth.ts
[y]es / [n]o / [a]lways allow
```

- `y` - Allow this one time
- `n` - Deny
- `a` - Always allow this type of action

Start with `y` until you're comfortable, then use `a` for trusted operations.

## IDE Integration

Claude Code works with:
- VS Code (via extension)
- Cursor
- Windsurf

Install the extension from your IDE's marketplace. The extension acts as a launcher - the actual Claude Code still runs in terminal.

## Common Beginner Mistakes

1. **Not running `/terminal-setup`** - Limits you to single-line prompts
2. **Never using `/clear`** - Burns tokens on stale context
3. **Being too vague** - "Fix the bug" vs "Fix the null pointer in auth.ts line 42"
4. **Not letting Claude read first** - Always let it analyze before asking for changes
5. **Massive tasks in one prompt** - Break large work into smaller steps

## Quick Reference

```bash
# Install
npm install -g @anthropic-ai/claude-code

# Start interactive
claude

# One-shot query
claude -p "query"

# Continue last session
claude -c

# Resume with picker
claude -r

# First thing after install
/terminal-setup
```

## Next Steps

You now have Claude Code running. In Chapter 2, we'll dive into how Claude Code "thinks" - understanding the mental model will dramatically improve your results.

---

[Next: Chapter 2 - The Mental Model →](./02-mental-model.md)
