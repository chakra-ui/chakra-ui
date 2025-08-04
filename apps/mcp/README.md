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

- `get_components` - List all Chakra UI components
- `get_component_props` - Get component properties and configuration
- `get_component_example` - Retrieve usage examples and code patterns
- `get_theme` - Get theme tokens, semantic tokens, text styles and layer styles
- `list_blocks` - List Chakra UI Pro blocks
- `get_component_templates` - Get premium component templates (Pro)
- `v2_to_v3_code_review` - Migration guidance with code snippets

## Setup

### NPM (Recommended)

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

> See [Docker.md](./Docker.md) for HTTP mode, building, and deployment details.

### Environment Variables

- `CHAKRA_PRO_API_KEY` (optional) - For accessing premium templates and blocks

## Development

```bash
pnpm install
pnpm build
pnpm dev
```

## License

MIT @ Chakra Systems
