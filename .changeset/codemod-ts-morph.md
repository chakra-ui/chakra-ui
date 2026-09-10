---
"@chakra-ui/codemod": minor
---

Migrate the codemod engine from jscodeshift to ts-morph. This enables cross-file
token migration — token files imported into a theme (e.g. `colors.ts`,
`spacing.ts`) are now rewritten to the v3 `{ value }` shape instead of being
left flat. Also adds transforms for `StackItem`, `Input`/`Textarea` border-color
props, and custom SVG icons, plus inline `// TODO(chakra-v3)` annotations for
migrations that require manual review. Resolves components imported through
local barrel/re-export files so prop migrations reach them. Adds CLI DX: `list`,
`--dry-run`, non-interactive `--transform`, `--fail-on-warn`, and a post-run
"Manual follow-ups" report that surfaces migrations needing manual attention.
