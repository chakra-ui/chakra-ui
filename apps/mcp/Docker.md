# Docker Usage

> Containerized version of
> [@chakra-ui/react-mcp](https://www.npmjs.com/package/@chakra-ui/react-mcp)

## 🚀 Quick Start for Agentic IDEs

**1. Pull Docker image:**

```bash
# Pin to specific version for production security
docker pull ghcr.io/chakra-ui/chakra-ui/react-mcp:v2.0.5

# Or use latest for development
docker pull ghcr.io/chakra-ui/chakra-ui/react-mcp:latest

# Build locally for development
docker build -f apps/mcp/Dockerfile -t chakra-ui/react-mcp:development .
```

**2. Add to your IDE's mcp.json:**

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "ghcr.io/chakra-ui/chakra-ui/react-mcp"],
      "env": {
        "CHAKRA_PRO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**3. Ask Chakra UI questions** - "How to migrate Button from v2 to v3?" and get
accurate migration patterns with code examples.

## Advanced Configurations

### 🌐 HTTP Mode

**For:** Web deployments, shared servers, team environments

**Setup server:**

```bash
docker run -p 3000:3000 -e MCP_MODE=http ghcr.io/chakra-ui/chakra-ui/react-mcp
```

**MCP Configuration:**

```json
{
  "mcpServers": {
    "chakra-ui": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "CHAKRA_PRO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Environment Variables

| Variable             | Default | Description                    |
| :------------------- | :------ | :----------------------------- |
| `MCP_MODE`           | `stdio` | Server mode: `stdio` or `http` |
| `CHAKRA_PRO_API_KEY` | -       | API key for Pro templates      |
| `PORT`               | `3000`  | HTTP server port               |

## Available Images

- **Production**: `ghcr.io/chakra-ui/chakra-ui/react-mcp:v2.0.5` (pinned version
  recommended)
- **Latest**: `ghcr.io/chakra-ui/chakra-ui/react-mcp:latest` (development use)
- **Local**: `chakra-ui/react-mcp:development` (local builds)
