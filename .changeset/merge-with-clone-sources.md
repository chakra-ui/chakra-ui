---
"@chakra-ui/react": patch
---

- **System**: Fix `mergeWith` sharing nested objects with its sources by
  reference, so merging no longer writes into the first source. Composing a
  recipe through the `chakra` factory, e.g.
  `chakra(Base, { base: { _hover: { bg: "green" } } })`, leaked the composed
  styles into `Base` itself.
