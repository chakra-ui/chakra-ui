---
"@chakra-ui/react": patch
---

Fix `useBreakpoint` and `useBreakpointValue` ignoring the `getWindow` option, so
media queries were always evaluated against the ambient `window` instead of the
provided one (iframes, Shadow DOM, tests).
