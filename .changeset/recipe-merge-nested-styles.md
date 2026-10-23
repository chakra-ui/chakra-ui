---
"@chakra-ui/react": patch
---

- **System**: Fix recipe merging mutating the source recipe when both recipes
  define the same nested style, such as `_hover`, a responsive value or a
  variant option. Composing a recipe component through the `chakra` factory,
  e.g. `chakra(Base, { base: { _hover: { bg: "green" } } })`, leaked the
  composed styles into `Base` itself.
