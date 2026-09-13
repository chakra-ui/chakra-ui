---
"@chakra-ui/react": patch
---

- **CVA, SVA**: Fix variants whose names collide with a CSS shorthand, such as
  `rounded`, `bg` or `p`, being silently dropped.
