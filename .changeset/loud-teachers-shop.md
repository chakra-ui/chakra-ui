---
"@chakra-ui/styled-system": minor
---

Move `srOnly` prop to styled system props. This will deprecate the need for the
visually hidden package. Less is more!

```jsx
// If `true`, hide an element visually without hiding it from screen readers.
<Box srOnly>Visually hidden</Box>

// If `focusable`, the sr-only styles will be undone, making the element visible to sighted users as well as screen readers.
<Box srOnly _active={{ srOnly: "focusable" }}>Visually hidden but shown on focus</Box>
```
