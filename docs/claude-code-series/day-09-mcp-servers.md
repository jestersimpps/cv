# Day 9: MCP Servers - Extending Claude Code's Reach

## Blog Post Goal
Comprehensive guide to Model Context Protocol (MCP) servers - how they extend Claude Code's capabilities through external integrations.

---

## Primary Resources

### Awesome MCP Servers Collections
- **punkpeye/awesome-mcp-servers**: https://github.com/punkpeye/awesome-mcp-servers
- **wong2/awesome-mcp-servers**: https://github.com/wong2/awesome-mcp-servers
- **appcypher/awesome-mcp-servers**: https://github.com/appcypher/awesome-mcp-servers
- **ever-works/awesome-mcp-servers**: https://github.com/ever-works/awesome-mcp-servers
- **habitoai/awesome-mcp-servers**: https://github.com/habitoai/awesome-mcp-servers

### Official Resources
- **MCP Official Examples**: https://modelcontextprotocol.io/examples
- **mcpservers.org**: https://mcpservers.org/ (Web directory)

---

## Key Research Findings

### What is MCP?

Model Context Protocol (MCP) is an open protocol that enables AI models to securely interact with local and remote resources through standardized server implementations.

### What MCP Enables

Claude Code can:
- Read design docs in Google Drive
- Update tickets in Jira
- Use custom developer tooling
- Connect to databases
- Interact with APIs
- Access cloud services

### Server Types

The ecosystem includes both:
- **Production-ready servers**: Stable, tested integrations
- **Experimental servers**: Cutting-edge, community-driven

---

## MCP Server Categories

### Databases

| Server | Description |
|--------|-------------|
| PostgreSQL | Schema inspection, query capabilities |
| MongoDB Lens | Full-featured MongoDB integration |
| MySQL | Configurable access controls, schema inspection |
| SQLite | Local database access |
| Redis | Key-value store integration |

### Version Control

| Server | Description |
|--------|-------------|
| GitHub | Repository management, PRs, issues, and more |
| GitLab | Project management, CI/CD operations |
| Bitbucket | Repository and PR management |

### Cloud Services

| Server | Description |
|--------|-------------|
| Cloudflare | Workers, KV, R2, D1 integration |
| AWS Bedrock KB | Query Amazon Bedrock Knowledge Bases |
| AWS S3 | Object storage access |
| Google Cloud | GCP service integration |
| Azure | Microsoft cloud services |

### Web Automation

| Server | Description |
|--------|-------------|
| Puppeteer | Browser automation, scraping |
| Playwright | Cross-browser automation |
| Selenium | Web testing automation |

### Productivity Tools

| Server | Description |
|--------|-------------|
| Google Drive | Document access and management |
| Notion | Workspace integration |
| Slack | Messaging and notifications |
| Jira | Issue tracking |
| Linear | Project management |

### File Systems

| Server | Description |
|--------|-------------|
| Filesystem | Local file access and manipulation |
| FTP/SFTP | Remote file transfer |

### Aggregators

| Server | Description |
|--------|-------------|
| 1mcp/agent | Unified server aggregating multiple MCPs |

---

## Security Considerations

⚠️ **Important Warning**

When running MCP servers without proper sandboxing:
- They can execute arbitrary code on your system
- Run with same permissions as host process
- Creates significant security risks

### Security Best Practices

1. **Review server code** before installation
2. **Use minimal permissions**
3. **Sandbox when possible**
4. **Monitor server activity**
5. **Keep servers updated**
6. **Use trusted sources only**

---

## MCP Configuration

### Basic Setup

```json
// .claude/settings.json or claude.config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem"]
    },
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

### Server with Authentication

```json
{
  "mcpServers": {
    "database": {
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

### Multiple Servers

```json
{
  "mcpServers": {
    "filesystem": {...},
    "github": {...},
    "jira": {...},
    "slack": {...},
    "database": {...}
  }
}
```

---

## Installing MCP Servers

### Via npm/npx

```bash
# Most servers are installed on-demand via npx
npx -y @anthropic/mcp-server-filesystem

# Or install globally
npm install -g @anthropic/mcp-server-github
```

### Via Claude Code

```bash
# In Claude Code
/mcp install filesystem
/mcp install github
```

### Manual Installation

```bash
# Clone and build
git clone https://github.com/mcp/server-name
cd server-name
npm install
npm run build
```

---

## Popular MCP Servers Deep Dive

### 1. Filesystem Server

**Purpose**: Local file access and manipulation

**Capabilities**:
- Read files and directories
- Write files
- Create/delete files
- File searching

**Use Cases**:
- Accessing project files
- Managing configuration
- Working with logs

### 2. GitHub Server

**Purpose**: Full GitHub integration

**Capabilities**:
- Repository management
- Pull request operations
- Issue tracking
- Actions management
- Code review

**Use Cases**:
- Automated PR creation
- Issue triage
- Release management

### 3. Database Servers (PostgreSQL/MySQL/MongoDB)

**Purpose**: Database connectivity

**Capabilities**:
- Schema inspection
- Query execution
- Data analysis
- Migration management

**Use Cases**:
- Query optimization
- Schema design
- Data exploration

### 4. Puppeteer Server

**Purpose**: Browser automation

**Capabilities**:
- Web scraping
- Screenshot capture
- Form filling
- Page interaction

**Use Cases**:
- E2E testing
- Data extraction
- UI automation

---

## Creating Custom MCP Servers

### Server Template

```javascript
// my-mcp-server/index.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-custom-server",
  version: "1.0.0",
});

// Register tools
server.tool("my-tool", {
  description: "Does something useful",
  inputSchema: {
    type: "object",
    properties: {
      input: { type: "string" }
    }
  }
}, async (args) => {
  // Implementation
  return { result: "success" };
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Package Configuration

```json
{
  "name": "@my-org/mcp-server-custom",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "bin": {
    "mcp-server-custom": "./index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  }
}
```

---

## Use Case Examples

### Example 1: Database-Driven Development

```
Configuration:
- PostgreSQL MCP server connected
- Read-only access to production DB

Workflow:
1. "Show me the schema for the users table"
2. "Query the last 10 orders with their products"
3. "Suggest indexes for this slow query"
```

### Example 2: GitHub Workflow Automation

```
Configuration:
- GitHub MCP server connected
- Full repo access

Workflow:
1. "Create a branch for feature X"
2. "Generate a PR description based on commits"
3. "Add reviewers based on code ownership"
```

### Example 3: Documentation Pipeline

```
Configuration:
- Filesystem + Google Drive servers

Workflow:
1. "Read the API implementation"
2. "Generate OpenAPI specification"
3. "Update the docs in Google Drive"
```

---

## Suggested Blog Post Structure

1. **Introduction**: Extending AI beyond code
2. **What is MCP?**: Protocol explanation
3. **Server Categories**: Overview of available servers
4. **Security Considerations**: Important warnings
5. **Configuration Guide**: Setup step-by-step
6. **Top 10 MCP Servers**: Deep dive into popular options
7. **Database Integration**: Practical examples
8. **GitHub Automation**: Workflow examples
9. **Creating Custom Servers**: Development guide
10. **Next Steps**: Link to Day 10

---

## Quick Reference: Essential MCP Servers

| Server | Package | Purpose |
|--------|---------|---------|
| Filesystem | @anthropic/mcp-server-filesystem | Local files |
| GitHub | @anthropic/mcp-server-github | Git operations |
| PostgreSQL | @mcp/postgres-server | Database |
| Puppeteer | @mcp/puppeteer-server | Browser |
| Slack | @mcp/slack-server | Messaging |

---

## Notes
- Emphasize security warnings prominently
- Include working configuration examples
- Show real integration scenarios
- Consider video demos of MCP in action
