# Day 7: Mastering Claude Code Skills

## Blog Post Goal
Comprehensive guide to Claude Skills - specialized folders that teach Claude specific tasks for repeatable, high-quality results.

---

## Primary Resources

### Awesome Skills Collections
- **ComposioHQ/awesome-claude-skills**: https://github.com/ComposioHQ/awesome-claude-skills
- **travisvn/awesome-claude-skills**: https://github.com/travisvn/awesome-claude-skills
- **VoltAgent/awesome-claude-skills**: https://github.com/VoltAgent/awesome-claude-skills
- **karanb192/awesome-claude-skills**: https://github.com/karanb192/awesome-claude-skills
- **BehiSecc/awesome-claude-skills**: https://github.com/BehiSecc/awesome-claude-skills
- **JayZeeDesign/awesome-claude-skills**: https://github.com/JayZeeDesign/awesome-claude-skills

### Notable Skills
- **obra/superpowers**: https://github.com/obra/superpowers (16.5k stars!)

### Related
- **GitHub Topics - claude-skills**: https://github.com/topics/claude-skills
- **AwesomeClaude.ai**: https://awesomeclaude.ai/

---

## Key Research Findings

### What Are Claude Skills?

Skills are specialized folders containing:
- Instructions
- Scripts
- Resources

That Claude dynamically discovers and loads when relevant to tasks.

### Key Characteristics

1. **Dynamic Loading**: Skills are loaded only when needed
2. **No Performance Impact**: Can maintain hundreds without slowdown
3. **Executable Code**: Skills can include runnable scripts
4. **Task-Specific**: Teach Claude specific tasks in a repeatable way

### Availability
- **Pro, Max, Team, Enterprise**: Full access to Skills
- **Free tier**: No access to Skills

### How Skills Work

1. Claude encounters a task
2. Scans available skills for relevance
3. Loads matching skill instructions
4. Follows skill-specific patterns
5. Produces consistent, high-quality output

### Use Cases

- Creating documents with company brand guidelines
- Analyzing data using organization workflows
- Automating personal tasks
- Following specific coding patterns
- Generating consistent outputs

---

## Featured Skills

### 1. obra/superpowers (16.5k+ stars)

Core skills library for Claude Code with 20+ battle-tested skills:
- TDD (Test-Driven Development)
- Debugging
- Collaboration patterns

Key commands:
- `/brainstorm`
- `/write-plan`
- `/execute-plan`

### 2. artifacts-builder

Suite of tools for creating elaborate, multi-component artifacts:
- React components
- Tailwind CSS styling
- shadcn/ui integration
- HTML artifacts

### 3. aws-skills

AWS development with:
- CDK best practices
- Cost optimization MCP servers
- Serverless/event-driven architecture patterns

### 4. D3.js Visualization

Teaches Claude to produce:
- D3 charts
- Interactive data visualizations
- SVG graphics

### 5. claude-scientific-skills

125+ scientific skills for:
- Bioinformatics
- Cheminformatics
- Clinical research
- Machine learning

### 6. connect-apps (Composio)

Lets Claude perform real actions:
- Send emails
- Create issues
- Post to Slack
- Handles auth
- Connects to 500+ apps

---

## 50+ Verified Skills (karanb192)

Categories include:
- TDD
- Debugging
- Git workflows
- Document processing
- Code review
- Testing
- API development
- Database operations

---

## Skill Structure

### Basic Skill Folder

```
skills/
└── my-skill/
    ├── SKILL.md          # Instructions
    ├── examples/         # Example outputs
    ├── templates/        # Templates to use
    └── scripts/          # Executable scripts
```

### SKILL.md Template

```markdown
# Skill Name

## Purpose
What this skill helps Claude do

## When to Use
Trigger conditions for this skill

## Instructions

### Step 1
...

### Step 2
...

## Examples

### Input
...

### Expected Output
...

## Templates

Reference templates in ./templates/

## Scripts

Executable scripts in ./scripts/
```

---

## Creating Custom Skills

### Step 1: Identify Repeatable Pattern
What task do you do often that follows a pattern?

### Step 2: Create Skill Folder
```bash
mkdir -p .claude/skills/my-skill
touch .claude/skills/my-skill/SKILL.md
```

### Step 3: Write Instructions
```markdown
# Code Review Skill

## Purpose
Perform thorough code reviews following team standards

## Instructions

1. Check for security vulnerabilities (OWASP Top 10)
2. Verify error handling
3. Check test coverage
4. Review naming conventions
5. Assess performance implications

## Output Format

### Summary
Overall assessment

### Issues Found
- [ ] Issue 1
- [ ] Issue 2

### Recommendations
- Suggestion 1
- Suggestion 2
```

### Step 4: Add Examples
Show Claude what good output looks like

### Step 5: Test and Iterate
Use the skill, refine based on results

---

## Skill Organization

### By Domain

```
skills/
├── development/
│   ├── tdd/
│   ├── debugging/
│   └── refactoring/
├── documentation/
│   ├── api-docs/
│   └── readme/
├── testing/
│   ├── unit/
│   └── integration/
└── devops/
    ├── ci-cd/
    └── deployment/
```

### By Project

```
skills/
├── frontend/
├── backend/
├── mobile/
└── shared/
```

---

## Best Practices

### 1. Keep Skills Focused
One skill = one task type

### 2. Provide Clear Examples
Show expected inputs and outputs

### 3. Include Edge Cases
Document what to do in unusual situations

### 4. Version Control Skills
Check skills into git for team sharing

### 5. Document Trigger Conditions
Be clear about when the skill should activate

### 6. Include Validation
Add checks for output quality

---

## Suggested Blog Post Structure

1. **Introduction**: The power of teachable AI
2. **What Are Skills?**: Concept explanation
3. **How Skills Work**: Technical deep dive
4. **obra/superpowers**: Featured skill collection
5. **Top 10 Must-Have Skills**: Curated recommendations
6. **Skills by Category**: Domain-specific skills
7. **Creating Custom Skills**: Step-by-step guide
8. **Skill Organization**: Best practices
9. **Team Skill Sharing**: Collaboration patterns
10. **Next Steps**: Link to Day 8

---

## Quick Reference: Popular Skills

| Skill | Purpose | Repository |
|-------|---------|------------|
| superpowers | Core skills library | obra/superpowers |
| artifacts-builder | React/HTML artifacts | various |
| aws-skills | AWS development | various |
| d3-viz | Data visualization | various |
| tdd | Test-driven development | multiple |
| code-review | Review automation | multiple |
| connect-apps | App integrations | ComposioHQ |

---

## Notes
- Emphasize the 16.5k stars on superpowers - shows community validation
- Include installation instructions for popular skills
- Show productivity gains from using skills
- Consider creating a "skills marketplace" concept
