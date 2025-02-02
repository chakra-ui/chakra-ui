---
"@chakra-ui/react": minor
---

- **Styled System:**

  - Boost performance of style resolution by removing `JSON.stringify` in `memo`
    function and avoid memoizing non-primitive arguments.
  - Connect `assets` token to `backgroundImage` and `listStyleImage` css
    properties.

- **Menu, Tooltip:** Set `lazyMount` and `unmountOnExit` to `true` in the `Root`
  component to improve initial rendering performance.

- **AbsoluteCenter:** Fix issue where axis doesn't work in RTL mode.

- **Snippets / QRCode:** Remove snippet in favor of compound component pattern.

- **List:** Fix issue where list items don't wrap correctly.

- **Stat:** Bring back `StatGroup` component from v2.

- **Close Button:** Add `CloseButton` component.
