---
"@chakra-ui/cli": patch
---

Add `--tsconfig` flag to `chakra typegen` and automatic tsconfig resolution
using `tsconfck`.

This fixes an issue where `typegen` failed in projects with solution-style
tsconfig setups (e.g. Vite's default `tsconfig.json` with `references`), because
path aliases like `@/*` couldn't be resolved.

```bash
# Auto-resolves (works with Vite's default setup)
chakra typegen lib/theme/theme.ts

# Explicit tsconfig
chakra typegen lib/theme/theme.ts --tsconfig tsconfig.app.json
```
