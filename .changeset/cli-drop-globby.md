---
"@chakra-ui/cli": patch
---

Remove the `globby` dependency from `@chakra-ui/cli`. Project detection now uses
Node's built-in `fs.globSync`, which drops `fast-glob`, `micromatch` and
`braces` from the CLI's dependency tree (GHSA-vfj7-8cjw-p6xm).
