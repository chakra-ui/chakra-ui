---
"@chakra-ui/cli": patch
---

Bump `zod` to v4 so `@chakra-ui/cli` no longer installs a version covered by
GHSA-mrhx-c7xc-m3w5. The CLI schemas only used APIs that v4 keeps, so the
migration replaces the deprecated `z.string().url()` and `.passthrough()` forms
and leaves the parsed shapes unchanged.
