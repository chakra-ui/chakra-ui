---
"@chakra-ui/cli": minor
---

Add new `blocks` command to add chakra pro blocks to your project.

This command requires valid Chakra Pro license and API key in the
`CHAKRA_UI_PRO_API_KEY` environment variable.

```sh
# Interactive block selection
npx @chakra-ui/cli blocks add

# Add all variants of a specific block
npx @chakra-ui/cli blocks add hero

# Add a specific variant of a block
npx @chakra-ui/cli blocks add hero --variant "simple"

# List available blocks
npx @chakra-ui/cli blocks list

# List blocks in a specific category
npx @chakra-ui/cli blocks list --category "marketing"
```
