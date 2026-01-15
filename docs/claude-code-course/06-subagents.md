# Chapter 6: Subagents

Subagents are specialized AI assistants that work alongside Claude. Think of them as team members with specific expertise who can work in parallel.

## What Are Subagents?

Subagents are:
- **Specialized helpers** with domain expertise
- **Independent** with their own context windows
- **Parallelizable** for faster execution
- **Reusable** across projects

When Claude encounters a specialized task, it can spawn a subagent with the right expertise.

## Key Characteristics

### Independent Context Windows
Each subagent has its own context. Cross-contamination between tasks is prevented.

### Domain-Specific Intelligence
Subagents come with tailored instructions for their specialty.

### Granular Permissions
Configure each subagent with specific tool access.

### Parallel Execution
Multiple subagents can work simultaneously.

## Commands vs Skills vs Subagents

| Feature | Commands | Skills | Subagents |
|---------|----------|--------|-----------|
| What it is | Prompt template | Knowledge module | Specialized agent |
| Context | Shared with main | Loaded into main | Independent |
| Execution | Sequential | Sequential | Parallel possible |
| Best for | Repeated prompts | Specialized patterns | Complex parallel tasks |

## Subagent Categories

### Development Agents
- **Code Writer** - Implements features
- **Refactoring Specialist** - Improves code quality
- **Bug Hunter** - Finds and fixes issues
- **Performance Optimizer** - Identifies bottlenecks

### Testing Agents
- **Unit Test Writer** - Creates unit tests
- **Integration Test Designer** - Designs integration tests
- **E2E Specialist** - End-to-end test scenarios
- **Coverage Analyzer** - Identifies coverage gaps

### Review Agents
- **Security Auditor** - Finds vulnerabilities
- **Code Reviewer** - Quality analysis
- **Architecture Analyst** - Design review
- **Performance Reviewer** - Performance implications

### Documentation Agents
- **API Documenter** - API documentation
- **README Generator** - Project documentation
- **Changelog Writer** - Version history
- **Tutorial Creator** - How-to guides

## Subagent Structure

```
.claude/agents/
└── security-auditor/
    ├── AGENT.md        # Agent instructions
    ├── prompts/        # Specialized prompts
    ├── config.json     # Configuration
    └── tools/          # Agent-specific tools
```

### AGENT.md Template

```markdown
# Security Auditor

## Role
Identify security vulnerabilities in code.

## Capabilities
- OWASP Top 10 detection
- Dependency vulnerability scanning
- Authentication/Authorization review
- Data exposure analysis
- Injection vulnerability detection

## When to Invoke
- Security review requests
- Pre-deployment audits
- Code review with security focus
- New authentication code

## Instructions

### Analysis Process
1. Scan for hardcoded secrets
2. Check input validation
3. Review authentication flows
4. Analyze data handling
5. Check for injection points
6. Review error messages for info leaks

### Focus Areas
- SQL/NoSQL injection
- XSS vulnerabilities
- CSRF protection
- Authentication bypasses
- Authorization flaws
- Sensitive data exposure

## Output Format

### Critical (Severity: High)
- Issue description
- Location (file:line)
- Risk explanation
- Remediation

### Warning (Severity: Medium)
...

### Info (Severity: Low)
...

## Constraints
- Read-only access (no code modifications)
- Report findings, don't fix
- Flag uncertainty for human review
```

### config.json

```json
{
  "name": "security-auditor",
  "description": "Specialized security vulnerability detection",
  "tools": ["read", "grep", "analyze"],
  "permissions": {
    "read": true,
    "write": false,
    "execute": false
  },
  "context": "independent",
  "model": "opus"
}
```

## Parallel Execution Patterns

### Fan-Out Pattern

Multiple agents analyze the same code from different angles:

```
              ┌─→ Security Agent ─→ Security Report
              │
Your Code ────┼─→ Performance Agent ─→ Perf Report
              │
              └─→ Style Agent ─→ Style Report

                      ↓
              Combined Analysis
```

**Use case:** Comprehensive code review

### Pipeline Pattern

Agents work sequentially, each building on the previous:

```
Code → Analyzer Agent → Analysis → Refactor Agent → Improved Code → Test Agent → Tests
```

**Use case:** Automated improvement workflow

### Specialist Pattern

Route to the right specialist based on task:

```
Task → Router → Frontend Agent (if UI)
             → Backend Agent (if API)
             → Database Agent (if SQL)
```

**Use case:** Full-stack feature development

## Creating Custom Subagents

### Step 1: Identify the Specialty

What domain expertise does this agent need? Be specific.

### Step 2: Create Agent Structure

```bash
mkdir -p .claude/agents/my-agent
touch .claude/agents/my-agent/AGENT.md
touch .claude/agents/my-agent/config.json
```

### Step 3: Write Instructions

```markdown
# My Agent

## Role
[Specific specialty]

## Capabilities
- Capability 1
- Capability 2

## Instructions
[Detailed process]

## Output Format
[Expected output structure]

## Constraints
[What the agent should NOT do]
```

### Step 4: Configure Permissions

```json
{
  "permissions": {
    "read": true,
    "write": false,
    "execute": ["npm test"]
  }
}
```

### Step 5: Test in Isolation

Invoke the agent directly and verify it works correctly alone.

### Step 6: Integrate into Workflow

Connect to your main Claude session or other agents.

## Invoking Subagents

### Automatic Invocation
Claude recognizes relevant tasks and spawns appropriate agents.

### Manual Invocation
```
Use the security-auditor agent to review auth.ts
```

### Batch Invocation
```
Run security, performance, and style agents on the src/ directory
```

### Parallel Invocation
```
In parallel, have the test agent write tests while the docs agent writes documentation
```

## Example: Multi-Agent Code Review

### Setup

```
.claude/agents/
├── security-auditor/
├── performance-analyzer/
├── style-checker/
└── test-coverage/
```

### Invocation

```
Review this PR with all review agents in parallel
```

### Result

```
## Security Auditor Report
- 1 Critical: SQL injection in user query
- 2 Warnings: Missing input validation

## Performance Analyzer Report
- 1 Warning: N+1 query in getUsers()
- 1 Info: Consider caching for config lookup

## Style Checker Report
- 3 Issues: Naming convention violations
- 2 Suggestions: Extract repeated logic

## Test Coverage Report
- Coverage: 72% (target: 80%)
- Missing: Error handling paths in auth.ts
```

## Popular Subagent Collections

| Collection | Count | Focus |
|------------|-------|-------|
| VoltAgent/awesome-claude-code-subagents | 100+ | General development |
| wshobson/agents | 99 agents, 15 orchestrators | Production workflows |
| rshah515/claude-code-subagents | 133+ | Full SDLC |

## Best Practices

### 1. Single Responsibility
Each agent should do one thing well.

### 2. Clear Boundaries
Define what the agent should and shouldn't do.

### 3. Appropriate Permissions
Principle of least privilege. Read-only for analyzers.

### 4. Output Standards
Consistent output format across agents.

### 5. Handoff Protocol
Clear process for returning results to main session.

## Quick Reference

```bash
# Agent location
.claude/agents/agent-name/

# Required file
AGENT.md

# Configuration
config.json

# Invoke manually
"Use the [agent-name] agent to [task]"

# Invoke in parallel
"Run [agent1] and [agent2] in parallel on [target]"
```

---

[← Previous: Skills](./05-skills.md) | [Next: MCP Servers →](./07-mcp-servers.md)
