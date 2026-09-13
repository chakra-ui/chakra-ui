---
"@chakra-ui/react": patch
---

Fix `useBreakpoint` returning `"base"` on every viewport when the `breakpoints`
option is omitted. The filter that narrows the evaluated breakpoints read an
absent option as "match nothing" rather than "match all", so no media query was
registered and the `fallback` was always returned.
