---
"@chakra-ui/react": major
---

Prepares the ground for the next version Chakra that leverages Ark UI.

**User Facing**

- Consolidate all component packages into a single package
- Remove all deprecated components and APIs
- Simplify the Changelogs for all v2 releases

**Infrastructure**

- Simplify the repo infrastructure and release process
- Migrate from `jest` to `vitest`
- Migrate from `tsup` to custom `rollup` setup for better bundling strategy
