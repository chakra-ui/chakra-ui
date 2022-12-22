---
"@chakra-ui/cli": minor
---

- Added support for generating theme typings to use via module augmentation of
  the `@chakra-ui/styled-system` package.

  To use this feature, run the following command:

  ```bash
  chakra-cli tokens --template augmentation --out ./types/chakra-ui__styled-system.d.ts
  ```
