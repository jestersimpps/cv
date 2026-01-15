# Chapter 5: Skills

Skills are specialized knowledge modules that Claude dynamically loads when relevant. They're more powerful than commands - they include examples, templates, and even executable scripts.

## Commands vs Skills

| Feature | Commands | Skills |
|---------|----------|--------|
| Location | `.claude/commands/` | `.claude/skills/` |
| Invocation | Explicit (`/name`) | Automatic or explicit |
| Contents | Instructions only | Instructions + examples + scripts |
| Loading | Always available | Loaded when relevant |
| Performance impact | Minimal | None (dynamic loading) |

## How Skills Work

1. You start a task
2. Claude scans available skills for relevance
3. Matching skills are loaded into context
4. Claude follows skill-specific patterns
5. Output follows skill templates

The magic: You can have hundreds of skills without performance penalty. They're only loaded when needed.

## Skill Availability

- **Pro, Max, Team, Enterprise**: Full access
- **Free tier**: No skills support

## Skill Structure

```
.claude/skills/
└── code-review/
    ├── SKILL.md           # Instructions
    ├── examples/          # Example outputs
    │   ├── good-review.md
    │   └── bad-review.md
    ├── templates/         # Output templates
    │   └── review-template.md
    └── scripts/           # Executable helpers
        └── lint-check.sh
```

### SKILL.md Template

```markdown
# Skill Name

## Purpose
What this skill helps Claude accomplish.

## When to Use
Trigger conditions - when should Claude use this skill?

## Instructions

### Step 1: [Action]
Details...

### Step 2: [Action]
Details...

## Examples

### Good Example
Reference: ./examples/good-review.md

### Bad Example (Avoid)
Reference: ./examples/bad-review.md

## Output Template
Use the template in ./templates/

## Scripts
Available helper scripts in ./scripts/
```

## Featured Skill: obra/superpowers

The most popular skills library with 16.5k+ stars.

### Installation

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

### Key Commands

- `/brainstorm` - Structured ideation
- `/write-plan` - Create implementation plans
- `/execute-plan` - Execute step-by-step
- `/tdd` - Test-driven development workflow

### What Makes It Great

- Battle-tested patterns
- Clear examples
- Covers common workflows
- Active community

## Creating Custom Skills

### Example: Test-Driven Development Skill

```
.claude/skills/tdd/
├── SKILL.md
├── examples/
│   └── tdd-session.md
└── templates/
    └── test-template.md
```

#### SKILL.md

```markdown
# Test-Driven Development

## Purpose
Guide Claude through proper TDD workflow: Red → Green → Refactor.

## When to Use
- When user asks to "add a feature with tests"
- When user mentions "TDD" or "test-driven"
- When creating new functionality that needs tests

## Instructions

### Phase 1: Red (Write Failing Test)
1. Understand the requirement
2. Write the simplest test that fails
3. Verify the test fails for the right reason
4. DO NOT write implementation yet

### Phase 2: Green (Make It Pass)
1. Write minimal code to pass the test
2. No extra features or edge cases yet
3. Ugly code is fine - just make it green

### Phase 3: Refactor (Clean Up)
1. Improve code quality
2. Remove duplication
3. Better naming
4. Tests must stay green

### Cycle
Repeat for each new behavior.

## Examples
See ./examples/tdd-session.md for a complete TDD session.

## Output Format
After each phase, report:
- Current phase (Red/Green/Refactor)
- What was done
- Test status
- Next step
```

#### examples/tdd-session.md

```markdown
# TDD Session: Add User Validation

## Requirement
Users must have valid email addresses.

## Cycle 1: Email Format

### Red
```typescript
// user.test.ts
test('rejects invalid email format', () => {
  expect(() => new User('not-an-email')).toThrow('Invalid email');
});
```
Run: FAIL ✗ (User doesn't validate yet)

### Green
```typescript
// user.ts
class User {
  constructor(email: string) {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }
    this.email = email;
  }
}
```
Run: PASS ✓

### Refactor
```typescript
// user.ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class User {
  constructor(email: string) {
    if (!EMAIL_REGEX.test(email)) {
      throw new Error('Invalid email');
    }
    this.email = email;
  }
}
```
Run: PASS ✓ (Better validation pattern)
```

## Skill Categories

### Development Skills
- TDD
- Code review
- Refactoring
- Debugging
- Performance optimization

### Documentation Skills
- API documentation
- README generation
- Changelog writing
- Tutorial creation

### Testing Skills
- Unit test generation
- Integration test design
- E2E test writing
- Test coverage analysis

### DevOps Skills
- CI/CD pipeline setup
- Docker configuration
- Deployment automation
- Monitoring setup

## Skill Organization

### By Domain

```
.claude/skills/
├── development/
│   ├── tdd/
│   ├── debugging/
│   └── refactoring/
├── testing/
│   ├── unit/
│   └── integration/
├── documentation/
│   ├── api-docs/
│   └── readme/
└── devops/
    ├── ci-cd/
    └── deployment/
```

### By Project Type

```
.claude/skills/
├── frontend/
│   ├── react-patterns/
│   └── css-architecture/
├── backend/
│   ├── api-design/
│   └── database/
└── shared/
    ├── git-workflow/
    └── code-review/
```

## Best Practices

### 1. Keep Skills Focused
One skill = one specialized task. Don't create "do everything" skills.

### 2. Provide Clear Examples
Claude learns from examples. Show what good output looks like.

### 3. Include Edge Cases
Document what to do in unusual situations.

### 4. Version Control Skills
```bash
git add .claude/skills/
git commit -m "Add TDD skill"
```

### 5. Document Trigger Conditions
Be explicit about when the skill should activate.

### 6. Test Your Skills
Use the skill several times. Refine based on results.

## Popular Skill Collections

| Collection | Skills | Focus |
|------------|--------|-------|
| obra/superpowers | 20+ | Core development |
| ComposioHQ/awesome-claude-skills | Various | App integrations |
| claude-scientific-skills | 125+ | Science/research |

## Discovering Skills

```bash
# GitHub search
https://github.com/topics/claude-skills

# Awesome list
https://github.com/ComposioHQ/awesome-claude-skills
```

## Quick Reference

```bash
# Skill location
.claude/skills/skill-name/

# Required file
SKILL.md

# Optional directories
examples/    # Example outputs
templates/   # Output templates
scripts/     # Helper scripts

# Install superpowers
git clone https://github.com/obra/superpowers.git ~/.claude/skills/superpowers
```

---

[← Previous: Custom Commands](./04-custom-commands.md) | [Next: Subagents →](./06-subagents.md)
