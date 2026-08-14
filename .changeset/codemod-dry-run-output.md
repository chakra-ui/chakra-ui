---
"@chakra-ui/codemod": patch
---

Fix three bugs in the `upgrade` command:

- `--dry` now prints a summary of which transforms would change files. Before,
  it silenced jscodeshift and showed nothing.
- `.ts` files now use the `ts` parser instead of `tsx`, so type assertions and
  generic arrows no longer throw and get skipped.
- The unused-package check no longer scans `node_modules`, so it stops flagging
  `framer-motion` and `@emotion/styled` as used when only a dependency imports
  them (and runs much faster).
