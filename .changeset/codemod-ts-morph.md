---
"@chakra-ui/codemod": minor
---

Migrate the codemod engine from jscodeshift to ts-morph. This enables cross-file
token migration — token files imported into a theme (e.g. `colors.ts`,
`spacing.ts`) are now rewritten to the v3 `{ value }` shape instead of being
left flat. Also adds transforms for `StackItem`, `Input`/`Textarea` border-color
props, and custom SVG icons, plus inline `// TODO(chakra-v3)` annotations for
migrations that require manual review.
