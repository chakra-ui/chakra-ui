---
"@chakra-ui/react": patch
---

- Fix performance regression from `v3.5.x` by reverting memoization logic
- Add `useMemo` to provider components and styling hooks to avoid unnecessary
  recomputations
