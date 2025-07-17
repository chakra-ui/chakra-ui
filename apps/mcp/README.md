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
- `get_semantic_tokens` - Get semantic color tokens for light/dark mode
- `get_text_styles` - Retrieve predefined typography styles
- `list_blocks` - List Chakra UI Pro blocks
- `get_component_templates` - Get premium component templates (Pro)
- `v2_to_v3_code_review` - Migration guidance with code snippets

## Setup

### Claude Desktop / Cursor

```json
{
  "mcpServers": {
    "chakra-ui": {
      "command": "npx",
      "args": ["-y", "@chakra-ui/mcp"],
      "env": {
        "CHAKRA_PRO_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Environment Variables

- `CHAKRA_PRO_API_KEY` (optional) - For accessing premium templates and blocks

## Development

```bash
npm install
npm run build
npm run dev
```

## License

MIT
