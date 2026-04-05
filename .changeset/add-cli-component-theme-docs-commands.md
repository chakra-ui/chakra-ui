---
"@chakra-ui/cli": minor
---

Add new CLI commands mirroring the MCP server tools:

- `chakra component list` — List all available Chakra UI components
- `chakra component props <name>` — Show props for a component
- `chakra component example <name>` — Show usage examples for a component
- `chakra theme` — Summary table of theme categories (item counts); use `--json`
  for full data or `--filter <category>` for one section
- `chakra docs <query>` — Search the Chakra UI documentation

Docs and examples are fetched from `CHAKRA_DOCS_URL` (default
`https://chakra-ui.com`), consistent with `REGISTRY_URL` for snippets.
