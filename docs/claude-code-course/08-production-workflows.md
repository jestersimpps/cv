# Chapter 8: Production Workflows

Move from experimentation to production. This chapter covers GitHub integration, automated pipelines, and team workflows.

## GitHub Actions Integration

Claude Code integrates directly with GitHub. Mention @claude in any PR or issue to trigger AI assistance.

### Installation

```bash
claude
/install-github-app
```

Follow the prompts to authorize the GitHub app.

### What @claude Can Do

- **Analyze code** - Review PRs, explain changes
- **Create PRs** - Implement features from issues
- **Fix bugs** - Investigate and patch issues
- **Answer questions** - Explain codebase patterns
- **Follow standards** - Uses your CLAUDE.md conventions

### Basic Usage

In any GitHub issue:
```
@claude implement this feature following our auth patterns
```

In a PR:
```
@claude review this PR for security issues
```

In PR comments:
```
@claude explain why this approach was chosen
```

## GitHub Actions Workflow

### Setup

Create `.github/workflows/claude.yml`:

```yaml
name: Claude Code Assistant

on:
  issues:
    types: [opened, labeled]
  pull_request:
    types: [opened, synchronize]
  issue_comment:
    types: [created]

jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Add Your API Key

1. Go to repository Settings → Secrets
2. Add `ANTHROPIC_API_KEY`
3. Paste your Anthropic API key

### Trigger Modes

**Issue-triggered:**
```yaml
on:
  issues:
    types: [opened, labeled]
```
Claude responds to new issues or when labeled.

**PR-triggered:**
```yaml
on:
  pull_request:
    types: [opened, synchronize]
```
Claude reviews new PRs and updates.

**Comment-triggered:**
```yaml
on:
  issue_comment:
    types: [created]
```
Claude responds to @claude mentions.

## Production Workflow Patterns

### Pattern 1: Spec-Driven Development

```
Requirements → Design → Tasks → Implementation

1. Requirements Phase
   └── Define user stories
   └── Identify acceptance criteria
   └── Document constraints

2. Design Phase
   └── Architecture decisions
   └── Component breakdown
   └── API contracts

3. Task Phase
   └── Break into implementable units
   └── Estimate complexity
   └── Prioritize

4. Implementation Phase
   └── Code with Claude
   └── Review with agents
   └── Test and iterate
```

**Workflow:**
1. Create detailed issue with requirements
2. @claude to create implementation plan
3. Review and refine plan
4. @claude implements per approved plan
5. Review PR, iterate
6. Merge

### Pattern 2: Dual-Loop Review

```
Loop 1: Automated Checks
├── Linting
├── Type checking
├── Unit tests
└── Security scan

Loop 2: AI Review
├── Logic analysis
├── Architecture fit
├── Performance implications
└── Improvement suggestions
```

Configure in your workflow:

```yaml
jobs:
  automated-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test

  ai-review:
    needs: automated-checks
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review this PR for logic errors, architecture fit, and performance"
```

### Pattern 3: Bug Fix Pipeline

```
1. Bug reported → Issue created
2. @claude analyzes codebase
3. @claude identifies root cause
4. @claude proposes fix
5. @claude creates PR
6. Automated tests run
7. Human review
8. Merge
```

Example issue:
```markdown
## Bug Report

**Describe the bug**
Users can't log in after password reset.

**To reproduce**
1. Reset password via email
2. Click reset link
3. Set new password
4. Try to log in → fails

**Expected behavior**
Login should work with new password.

@claude investigate and fix this bug
```

### Pattern 4: Feature Implementation

```
Issue: Add dark mode toggle

@claude implement this feature:
1. Add toggle in settings
2. Store preference in localStorage
3. Apply theme via CSS variables
4. Follow existing component patterns
```

Claude will:
1. Analyze existing code patterns
2. Create implementation plan
3. Implement the feature
4. Create PR with description
5. Respond to review comments

## Team Configuration

### Shared CLAUDE.md for Teams

```markdown
# Team Project Standards

## Code Review Requirements
- All PRs require Claude review
- Security scan mandatory for auth changes
- Test coverage minimum: 80%

## @claude Triggers
- `@claude analyze` - Full codebase analysis
- `@claude implement` - Feature implementation
- `@claude fix` - Bug fixing
- `@claude review` - Code review

## Conventions
- Conventional commits required
- PR template must be filled
- Changelog updated for user-facing changes

## Restricted Areas
- Do not modify: config/production.json
- Require approval: database migrations
- Security review: auth/, payments/
```

### Branch Protection

Combine Claude reviews with branch protection:

1. Require Claude review to pass
2. Require automated tests to pass
3. Require human approval
4. Then allow merge

## CI/CD Integration

### Pre-Merge Validation

```yaml
name: Pre-Merge

on:
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run tests
        run: npm test

      - name: Claude review
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this PR:
            - Check for security issues
            - Verify test coverage
            - Ensure conventions followed
            Output: APPROVED or CHANGES_REQUESTED with details
```

### Automated Changelog

```yaml
name: Release

on:
  push:
    tags: ['v*']

jobs:
  changelog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate changelog
        uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Generate a changelog for this release.
            Compare: ${{ github.event.before }}...${{ github.sha }}
            Format: Keep a Changelog style
            Group by: Added, Changed, Fixed, Removed
```

## Workflow Automation Examples

### Auto-Triage Issues

```yaml
name: Issue Triage

on:
  issues:
    types: [opened]

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Analyze this issue and:
            1. Suggest appropriate labels
            2. Estimate complexity (S/M/L)
            3. Identify related code areas
            4. Suggest assignee based on code ownership
```

### PR Description Generator

```yaml
name: PR Helper

on:
  pull_request:
    types: [opened]

jobs:
  describe:
    runs-on: ubuntu-latest
    if: github.event.pull_request.body == ''
    steps:
      - uses: actions/checkout@v4

      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Generate a PR description:
            - Summary of changes
            - Why these changes were made
            - Testing done
            - Screenshots if UI changes
```

## Best Practices

### 1. Clear Trigger Words
Document what @claude commands your team uses.

### 2. Scope Appropriately
Don't let Claude auto-merge. Always require human approval.

### 3. Protect Sensitive Areas
Configure Claude to flag (not modify) security-critical code.

### 4. Monitor Costs
GitHub Actions usage + API costs can add up. Set budgets.

### 5. Iterate on CLAUDE.md
Refine project instructions based on Claude's performance.

## Quick Reference

```yaml
# Install GitHub integration
/install-github-app

# Basic workflow file
.github/workflows/claude.yml

# Trigger Claude
@claude [command]

# Common commands
@claude review
@claude implement
@claude fix
@claude explain
```

---

[← Previous: MCP Servers](./07-mcp-servers.md) | [Next: Power User Secrets →](./09-power-user-secrets.md)
