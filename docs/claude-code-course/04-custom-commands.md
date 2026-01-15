# Chapter 4: Custom Commands

Build your personal command library. Custom slash commands turn complex workflows into single keystrokes.

## What Are Custom Commands?

Markdown files in `.claude/commands/` that Claude automatically recognizes. Type `/` and your commands appear in the menu.

```
.claude/
└── commands/
    ├── review.md        → /review
    ├── test.md          → /test
    └── git/
        ├── commit.md    → /git:commit
        └── pr.md        → /git:pr
```

## Creating Your First Command

### Step 1: Create the Directory

```bash
mkdir -p .claude/commands
```

### Step 2: Create a Command File

```bash
touch .claude/commands/review.md
```

### Step 3: Write the Command

```markdown
# Code Review

Review the current changes for:
- Security vulnerabilities
- Performance issues
- Code style violations
- Potential bugs
- Missing error handling

Provide a summary with:
1. Critical issues (must fix)
2. Warnings (should fix)
3. Suggestions (nice to have)
```

### Step 4: Use It

```
/review
```

Claude executes your command instructions.

## Command Structure

### Basic Template

```markdown
# Command Name

Brief description of what this command does.

## Instructions

1. First step
2. Second step
3. Third step

## Output Format

How results should be presented.
```

### With Parameters

Commands can reference the current context:

```markdown
# Explain Code

Explain the currently selected code or file.

Focus on:
- What it does
- How it works
- Why it's implemented this way
- Potential improvements

Keep explanations clear for a mid-level developer.
```

## Namespacing with Directories

Organize related commands in subdirectories:

```
.claude/commands/
├── git/
│   ├── commit.md      → /git:commit
│   ├── pr.md          → /git:pr
│   └── branch.md      → /git:branch
├── test/
│   ├── unit.md        → /test:unit
│   ├── e2e.md         → /test:e2e
│   └── coverage.md    → /test:coverage
└── docs/
    ├── readme.md      → /docs:readme
    └── api.md         → /docs:api
```

## Top 10 Essential Commands

### 1. /review - Code Review

```markdown
# Code Review

Perform a comprehensive code review of the staged changes or specified file.

## Check For
- Security vulnerabilities (OWASP Top 10)
- Performance issues and bottlenecks
- Error handling completeness
- Type safety issues
- Code duplication
- Naming clarity

## Output
### Critical
[Must fix before merge]

### Warnings
[Should address]

### Suggestions
[Optional improvements]
```

### 2. /git:commit - Smart Commits

```markdown
# Git Commit

Analyze staged changes and create a commit.

## Requirements
- Use conventional commit format (feat/fix/refactor/docs/test/chore)
- Summary under 72 characters
- Body explains WHY, not WHAT
- Reference issue numbers if mentioned in code

## Format
```
type(scope): brief summary

Detailed explanation of why this change was made.

Refs: #123
```
```

### 3. /refactor - Code Improvement

```markdown
# Refactor

Refactor the specified code while maintaining functionality.

## Goals
- Improve readability
- Reduce complexity
- Apply DRY principles
- Better naming
- Smaller functions with single responsibility

## Constraints
- No behavior changes
- Maintain public API
- Keep existing tests passing
```

### 4. /test:generate - Test Creation

```markdown
# Generate Tests

Create comprehensive tests for the specified code.

## Include
- Happy path tests
- Edge cases
- Error scenarios
- Boundary conditions

## Style
- Use the testing framework already in the project
- Follow existing test patterns
- Mock external dependencies
- Clear test names describing the scenario
```

### 5. /debug - Systematic Debugging

```markdown
# Debug

Help debug the described issue systematically.

## Process
1. Understand the expected vs actual behavior
2. Identify relevant code paths
3. Trace the data flow
4. Find the root cause
5. Propose a fix

## Output
- Root cause analysis
- Affected files
- Proposed solution
- Prevention suggestions
```

### 6. /security - Security Audit

```markdown
# Security Audit

Audit the specified code for security vulnerabilities.

## Check For
- SQL injection
- XSS vulnerabilities
- CSRF issues
- Authentication flaws
- Authorization bypasses
- Sensitive data exposure
- Insecure dependencies
- Hardcoded secrets

## Output
Severity-ranked list with remediation steps.
```

### 7. /explain - Code Explanation

```markdown
# Explain Code

Explain the specified code clearly and thoroughly.

## Cover
- Purpose and functionality
- How it works step-by-step
- Design decisions and trade-offs
- Dependencies and side effects
- Potential issues or limitations

## Audience
Assume a developer familiar with the language but new to this codebase.
```

### 8. /optimize - Performance Review

```markdown
# Optimize

Analyze the specified code for performance.

## Analyze
- Time complexity
- Space complexity
- I/O operations
- Memory allocations
- Potential bottlenecks

## Suggest
- Specific optimizations
- Expected improvement
- Trade-offs involved
```

### 9. /todo - Task Extraction

```markdown
# Extract TODOs

Scan the codebase for TODO, FIXME, HACK, and XXX comments.

## Output
Organized list by:
1. Priority (FIXME > TODO > HACK > XXX)
2. File location
3. Brief description

Include count summary at the end.
```

### 10. /ship - Pre-Deploy Checklist

```markdown
# Ship Checklist

Pre-deployment verification.

## Verify
- [ ] All tests pass
- [ ] No lint errors
- [ ] Build succeeds
- [ ] No console.log/debug statements
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] No hardcoded secrets
- [ ] Error handling complete

## Output
Ready/Not Ready status with blocking issues.
```

## Global vs Project Commands

### Project Commands
```
your-project/.claude/commands/
```
Specific to this project. Commit to git for team sharing.

### Global Commands
```
~/.claude/commands/
```
Available in all projects. Personal productivity boosters.

### Recommended Split

**Global (personal)**
- `/explain` - Universal
- `/debug` - Universal
- `/review` - Universal

**Project (team)**
- `/deploy` - Project-specific steps
- `/test:e2e` - Project test setup
- `/git:commit` - Team commit conventions

## Command Design Principles

### 1. Single Responsibility
One command = one clear purpose

### 2. Clear Instructions
Don't assume Claude knows your intent

### 3. Specify Output Format
Tell Claude exactly how to present results

### 4. Include Constraints
What should Claude NOT do?

### 5. Context Awareness
Reference project patterns when relevant

## Sharing Commands

### Via Git

```bash
# Add to version control
git add .claude/commands/
git commit -m "Add team slash commands"
```

### Via Copy

Share the `.claude/commands/` folder directly.

### Via Template

Include in project templates (Chapter 6) for new projects.

## Debugging Commands

If a command doesn't work:

1. Check file location (`.claude/commands/`)
2. Verify `.md` extension
3. Restart Claude Code session
4. Check for syntax errors in markdown

## Quick Reference

```bash
# Create command directory
mkdir -p .claude/commands

# Command file naming
.claude/commands/name.md        → /name
.claude/commands/group/name.md  → /group:name

# Use a command
/name
/group:name
```

---

[← Previous: Project Configuration](./03-project-configuration.md) | [Next: Skills →](./05-skills.md)
