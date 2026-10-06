---
"@chakra-ui/react": patch
---

- **Flex, Square, Circle**: Fix the array form of the `css` prop being ignored.
- **createOverlay**: Fix `remove` and `removeAll` leaving promises from `open`,
  `close` and `waitForExit` pending forever. They now resolve with `undefined`.
- **useBreakpoint**
  - Fix always returning `"base"` when the `breakpoints` option is omitted.
  - Fix the `getWindow` option being ignored, which broke media queries in
    iframes and Shadow DOM. This also applies to `useBreakpointValue`.
