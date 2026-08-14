---
"@chakra-ui/codemod": minor
---

Make `upgrade` faster and its dry run actually useful.

- Transforms now run in-process instead of spawning a Node process each. A full
  run drops from ~30s to a few seconds on a small project.
- `upgrade --dry` lists the files that would change and, per file, the
  components and props it would touch (e.g. `Button, color palette`).
- Projects with many changed files get a `chakra-codemod-report.md` with the
  full breakdown; smaller ones print inline.
- The `color-mode` transform no longer installs a snippet during a dry run, and
  uses the current CLI flag instead of the removed `--yes`.
- The `steps` transform no longer injects a stray `Steps` import into files that
  don't use a stepper.
