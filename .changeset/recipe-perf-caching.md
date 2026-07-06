---
"@chakra-ui/react": patch
---

Improve render performance of recipe components (`Button`, `Badge`, `Skeleton`,
etc.) in large lists and tables.

- Cache compiled recipes per system instead of per component instance.
- Memoize variant style resolution so results are referentially stable.
- Drop the per-instance `structuredClone` of recipe configs.

In benchmarks, repeated variant resolution is ~70-90x faster and compile+resolve
~30x faster. No public API changes.
