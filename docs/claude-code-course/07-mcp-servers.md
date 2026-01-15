# Chapter 7: MCP Servers

Model Context Protocol (MCP) servers extend Claude Code's reach beyond your local filesystem. Connect to databases, cloud services, APIs, and more.

## What is MCP?

MCP is an open protocol that lets Claude securely interact with external resources through standardized server implementations.

With MCP, Claude can:
- Query your PostgreSQL database
- Read documents from Google Drive
- Update tickets in Jira
- Post to Slack
- Manage GitHub repos
- Access any API you connect

## How MCP Works

```
Claude Code ←→ MCP Server ←→ External Service
                  │
          (Handles auth,
           protocols,
           data formatting)
```

The MCP server acts as a bridge, handling authentication and protocols so Claude can interact naturally.

## Security Warning

**MCP servers can execute arbitrary code on your system.**

Before using any MCP server:
1. Review the source code
2. Understand what permissions it needs
3. Use read-only access when possible
4. Monitor server activity
5. Only use trusted sources

## Configuration

### Location

```json
// ~/.claude/settings.json (global)
// or
// .claude/settings.json (project)

{
  "mcpServers": {
    "server-name": {
      "command": "...",
      "args": [...],
      "env": {...}
    }
  }
}
```

### Basic Example

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "/path/to/allow"]
    }
  }
}
```

### With Environment Variables

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Essential MCP Servers

### Filesystem

Local file access beyond the current project.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "/Users/me/documents"]
    }
  }
}
```

**Use cases:**
- Access files outside project directory
- Read configuration from home directory
- Work with multiple projects

### GitHub

Full GitHub integration.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**Use cases:**
- Create and manage PRs
- Work with issues
- Review code across repos
- Manage releases

### PostgreSQL

Database connectivity with schema awareness.

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@mcp/postgres-server"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "READ_ONLY": "true"
      }
    }
  }
}
```

**Use cases:**
- Query database directly
- Analyze schema
- Generate migrations
- Debug data issues

### Puppeteer

Browser automation.

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@mcp/puppeteer-server"]
    }
  }
}
```

**Use cases:**
- Web scraping
- Screenshot capture
- E2E test automation
- Form filling

### Context7

Get up-to-date documentation for any library directly in Claude's context.

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
```

**Use cases:**
- Get latest API docs for any npm package
- Avoid hallucinated APIs
- Stay current with library updates
- Framework-specific guidance

### Supabase

Full Supabase integration for database, auth, and storage.

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_KEY": "${SUPABASE_KEY}"
      }
    }
  }
}
```

**Use cases:**
- Query Supabase tables
- Manage auth users
- Work with storage buckets
- Generate migrations

## Server Categories

### Databases

| Server | Description |
|--------|-------------|
| PostgreSQL | Schema inspection, queries |
| MongoDB | Document database access |
| MySQL | Full MySQL integration |
| SQLite | Local database access |
| Redis | Key-value store |

### Version Control

| Server | Description |
|--------|-------------|
| GitHub | Repos, PRs, issues |
| GitLab | Projects, CI/CD |
| Bitbucket | Repository management |

### Cloud Services

| Server | Description |
|--------|-------------|
| Cloudflare | Workers, KV, R2, D1 |
| AWS S3 | Object storage |
| Google Cloud | GCP services |

### Productivity

| Server | Description |
|--------|-------------|
| Google Drive | Document access |
| Notion | Workspace integration |
| Slack | Messaging |
| Jira | Issue tracking |
| Linear | Project management |

### Web Automation

| Server | Description |
|--------|-------------|
| Puppeteer | Chrome automation |
| Playwright | Cross-browser automation |

### AI & Context

| Server | Description |
|--------|-------------|
| Context7 | Up-to-date documentation for any library |
| Supabase | Full Supabase database and auth integration |

## Multiple Servers

Configure several servers together:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "/home/user"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@mcp/postgres-server"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@mcp/slack-server"],
      "env": {
        "SLACK_TOKEN": "${SLACK_TOKEN}"
      }
    }
  }
}
```

## Practical Workflows

### Database-Driven Development

```
You: Show me the users table schema

Claude: [Queries via postgres MCP]
The users table has:
- id (uuid, primary key)
- email (varchar, unique)
- created_at (timestamp)
...

You: Find users who signed up last week but never made a purchase

Claude: [Runs query, returns results]
Found 47 users matching criteria...
```

### Cross-Service Automation

```
You: Create a GitHub issue from this Jira ticket PROJ-123

Claude: [Reads from Jira MCP, creates via GitHub MCP]
Created GitHub issue #456 with:
- Title from Jira
- Description converted to markdown
- Labels mapped from Jira components
```

### Documentation Pipeline

```
You: Read the API implementation and update the docs in Google Drive

Claude: [Reads code, accesses Google Drive MCP]
Updated "API Documentation" with:
- New endpoints added
- Parameter changes reflected
- Examples updated
```

## Installing MCP Servers

### Via npm (most common)

```bash
# Most servers auto-install via npx
# Just add to config and Claude will download on first use
```

### Via Claude Code

```
/mcp install filesystem
/mcp install github
```

### Manual Installation

```bash
git clone https://github.com/mcp/server-name
cd server-name
npm install
npm run build
```

## Creating Custom MCP Servers

### Basic Server Template

```javascript
// my-server/index.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-custom-server",
  version: "1.0.0",
});

// Register a tool
server.tool("my-tool", {
  description: "Does something useful",
  inputSchema: {
    type: "object",
    properties: {
      input: { type: "string", description: "The input value" }
    },
    required: ["input"]
  }
}, async (args) => {
  const result = await doSomething(args.input);
  return { result };
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Package.json

```json
{
  "name": "@my-org/mcp-server-custom",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "bin": {
    "mcp-server-custom": "./index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  }
}
```

## Best Practices

### 1. Principle of Least Privilege

```json
{
  "env": {
    "READ_ONLY": "true"  // When you only need to read
  }
}
```

### 2. Environment Variables for Secrets

Never hardcode tokens:
```json
{
  "env": {
    "API_KEY": "${MY_API_KEY}"  // Reads from environment
  }
}
```

### 3. Scope Access Appropriately

```json
{
  "args": ["-y", "@anthropic/mcp-server-filesystem", "/specific/path"]
  // Not "/"!
}
```

### 4. Review Server Code

Before using any third-party MCP server, review its source code.

### 5. Monitor Activity

Watch what MCP servers are doing, especially in production environments.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Check node version, review error logs |
| Auth failing | Verify environment variables are set |
| Permission denied | Check file/resource permissions |
| Timeout | Network issues or slow external service |

## MCP Server Resources

- [Official MCP Examples](https://modelcontextprotocol.io/examples)
- [mcpservers.org](https://mcpservers.org/) - Directory
- [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) - Curated list

## Quick Reference

```json
// Configuration location
~/.claude/settings.json     // Global
.claude/settings.json       // Project

// Basic structure
{
  "mcpServers": {
    "name": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "VAR": "${ENV_VAR}"
      }
    }
  }
}

// Manage in Claude Code
/mcp                        // List servers
/mcp install <name>         // Install server
```

---

[← Previous: Subagents](./06-subagents.md) | [Next: Production Workflows →](./08-production-workflows.md)
