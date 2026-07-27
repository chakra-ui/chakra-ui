---
"@chakra-ui/cli": patch
---

fix(cli): replace prettier with formatly for generated file formatting

`@chakra-ui/cli` no longer hard-depends on Prettier. Generated type files are
now formatted by whatever formatter the consuming project already has configured
(Biome, dprint, deno fmt, or Prettier). If no formatter is detected, formatly
exits silently and the raw generated output is written as-is.

- Removed `prettier` from runtime dependencies
- Added `formatly` as runtime dependency
- `pretty()` now dynamically imports prettier only when it is available in the
  project, falling back to the raw string otherwise
- `io.write()` calls `formatly` on each written file so the project's own
  formatter runs the final on-disk pass
