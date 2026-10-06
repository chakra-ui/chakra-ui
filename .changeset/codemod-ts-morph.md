---
"@chakra-ui/codemod": minor
---

- **Codemod**
  - Rewrite token files imported into a theme (e.g. `colors.ts`) to the v3
    `{ value }` shape.
  - Add transforms for `StackItem`, `Input`/`Textarea` border color props, and
    custom SVG icons.
  - Apply prop migrations to components imported through local barrel files.
  - Add `list`, `--dry-run`, `--transform` and `--fail-on-warn`, plus a "Manual
    follow-ups" report and `// TODO(chakra-v3)` comments for changes that need
    review.
