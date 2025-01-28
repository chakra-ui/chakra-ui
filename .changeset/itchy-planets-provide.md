---
"@chakra-ui/react": patch
---

- **Styled System:** Boost performance of style resolution by removing
  `JSON.stringify` in `memo` function and avoid memoizing non-primitive
  arguments.

- **Menu, Tooltip:** Set `lazyMount` and `unmountOnExit` to `true` in the `Root`
  component to improve initial rendering performance.
