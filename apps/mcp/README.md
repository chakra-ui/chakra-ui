# Chakra UI MCP Server

An MCP server that gives AI assistants direct access to Chakra UI's complete
component ecosystem, migration tools, and design system.

## Features

- **Components**: Browse library, get props, examples, and installation guides
- **Design System**: Access themes, tokens, and customization tools
- **Migration**: v2→v3 upgrade guidance with code review and migration patterns
- **Pro Templates**: Premium component blocks and templates (API key required)

## Available Tools

- [`customize_theme`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/customize-theme.ts) -
  Used to set up a custom theme for your Chakra UI. You can define new tokens or
  modify existing ones.
- [`get_component_example`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-component-example.ts) -
  Retrieve comprehensive example code and usage patterns for a specific Chakra
  UI component
- [`get_component_props`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-component-props.ts) -
  Get detailed properties of a specific Chakra UI component
- [`get_component_templates`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-component-templates.ts) -
  Retrieve well designed, fully responsive, and accessible component templates
  in Chakra UI Pro
- [`get_theme`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-theme.ts) -
  Retrieve the theme specification (colors, fonts, textStyles, etc.) to design
  any page, component or section
- [`installation`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/installation.ts) -
  Get lightweight installation steps for Chakra UI when using Vite, Next.js App
  Router, Next.js Pages Router, or general setup
- [`list_component_templates`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/list-component-templates.ts) -
  List available component templates or blocks in Chakra UI Pro
- [`list_components`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/list-components.ts) -
  List all available components in Chakra UI
- [`v2_to_v3_code_review`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/v2-to-v3-migration.ts) -
  ALWAYS use this tool to review any generated code. This tool helps you get
  familiar with the new Chakra UI v3 API before/after code snippets for common
  migration scenarios

## Setup

Choose from **NPX** (stdio only) or **Docker** (stdio/HTTP modes).

### NPX (Recommended)

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/react-mcp"],
      "env": {
        "CHAKRA_PRO_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Docker

**Pull or build images**:

```bash
# Pin to a specific version for production
docker pull ghcr.io/chakra-ui/react-mcp:X.X.X

# Or use latest for development
docker pull ghcr.io/chakra-ui/react-mcp:latest

# Build locally for development
docker build -f apps/mcp/Dockerfile -t chakra-ui/react-mcp:development .
```

**Environment Variables**:

| Variable             | Default | Description                    |
| :------------------- | :------ | :----------------------------- |
| `MCP_MODE`           | `stdio` | Server mode: `stdio` or `http` |
| `CHAKRA_PRO_API_KEY` | (none)  | API key for Pro templates      |
| `PORT`               | `3000`  | HTTP server port               |

#### Stdio

**MCP configuration**:

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "CHAKRA_PRO_API_KEY=your-api-key",
        "ghcr.io/chakra-ui/react-mcp"
      ]
    }
  }
}
```

#### HTTP Server

**Use cases**: Web deployments, shared servers, team environments, remote MCP
access

**Start server**:

```bash
# Run official release
docker run -p 3000:3000 -e MCP_MODE=http ghcr.io/chakra-ui/react-mcp

# Run local development build
docker run -p 3000:3000 -e MCP_MODE=http chakra-ui/react-mcp:development
```

**MCP configuration**:

```json
{
  "mcpServers": {
    "chakra-ui": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "x-api-key": "your-api-key"
      }
    }
  }
}
```

> [!IMPORTANT] API Key Security
>
> - **NEVER hardcode API keys in Dockerfiles or configuration files**
> - **Runtime configuration**:
>   - **NPX/Docker stdio**: Pass via `-e CHAKRA_PRO_API_KEY=key` environment
>     variable
>   - **Docker HTTP**: Pass via `"x-api-key"` header in MCP client configuration
> - **Optional**: Server works without API key (core features only)

## Available Images

- **Production**: `ghcr.io/chakra-ui/react-mcp:X.X.X` (pinned version,
  recommended)
- **Latest**: `ghcr.io/chakra-ui/react-mcp:latest` (development use)
- **Local**: `chakra-ui/react-mcp:development` (local builds)

## Development

```bash
pnpm install
pnpm build
pnpm dev
```

## License

MIT @ Chakra Systems
