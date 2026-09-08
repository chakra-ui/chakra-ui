---
"@chakra-ui/react": patch
---

- **System / CVA**: Fix recipe variants whose names collide with CSS shorthands
  (`rounded`, `bg`, `p`, etc.) being silently dropped. Variant selections were
  run through style `normalize`, which rewrote those keys (`rounded` →
  `borderRadius`) before lookup. Selections now only convert array → breakpoint
  values and leave variant keys intact. Slot recipes (`sva`) are fixed too.
