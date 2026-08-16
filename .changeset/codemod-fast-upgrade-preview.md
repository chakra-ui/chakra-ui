---
"@chakra-ui/codemod": minor
---

Speed up the `upgrade` command and add a readable dry-run preview.

- Run transforms in-process instead of spawning a Node process per transform,
  taking a full run from ~30s to a few seconds.
- `upgrade --dry` now lists the files that would change and, per file, the
  components and props it touches (e.g. `Button, color palette`).
- Large projects write the full breakdown to `chakra-codemod-report.md`; smaller
  ones print it inline.
- Stop the `color-mode` transform from installing a snippet during a dry run,
  and use the current CLI flag instead of the removed `--yes`.
- Stop the `steps` transform from adding a stray `Steps` import to files that
  don't use a stepper.
