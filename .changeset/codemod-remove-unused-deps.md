---
"@chakra-ui/codemod": patch
---

- Remove the unused `is-git-clean` dependency and move `@types/node` to
  `devDependencies`, so installing the codemod no longer pulls them in.
