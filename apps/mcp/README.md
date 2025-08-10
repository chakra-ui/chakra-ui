# Chakra UI MCP Server

An MCP server providing AI assistants with access to Chakra UI components,
examples, migration patterns, and premium templates.

## Features

- **Component Library**: Get components, props, and usage examples
- **Migration Support**: v2 to v3 upgrade guidance with before/after code
  snippets
- **Design Tokens**: Access semantic tokens and text styles for consistent
  theming
- **Premium Templates**: Chakra UI Pro blocks and component templates (requires
  API key)

## Available Tools

- [`customize_theme`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/customize-theme.ts) -
  Used to setup a custom theme for your Chakra UI. You can define new tokens or
  modify existing ones.
- [`get_component_example`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-component-example.ts) -
  Retrieve comprehensive example code and usage patterns for a specific Chakra
  UI component
- [`get_component_props`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-component-props.ts) -
  Get detailed properties of a specific Chakra UI component
- [`get_component_templates`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-component-templates.ts) -
  Retrieve well designed, fully responsive, and accessible component templates
  (Pro)
- [`get_theme`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/get-theme.ts) -
  Retrieve the theme specification (colors, fonts, textStyles, etc.) to design
  any page, component or section
- [`installation`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/installation.ts) -
  Get lightweight installation steps for Chakra UI when using Vite, Next.js App
  Router, Next.js Pages Router, or general setup
- [`list_component_templates`](https://github.com/chakra-ui/chakra-ui/tree/main/apps/mcp/src/tools/list-component-templates.ts) -
  List available component templates or blocks in the Chakra UI pro (Pro)
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
        "CHAKRA_PRO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Docker

**Pull or build images**:

```bash
# Pin to specific version for production, matching @chakra-ui/react-mcp npm tags
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
| `CHAKRA_PRO_API_KEY` | `""`    | API key for Pro templates      |
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
        "CHAKRA_PRO_API_KEY=your-api-key-here",
        "ghcr.io/chakra-ui/react-mcp"
      ]
    }
  }
}
```

#### HTTP Server

**For**: Web deployments, shared servers, team environments, remote MCP access

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
        "x-api-key": "your-api-key-here"
      }
    }
  }
}
```

**API Key Usage**:

- **NPX/Docker stdio**: Pass via environment variable
- **Docker HTTP**: Pass via `"x-api-key"` header in MCP configuration

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
