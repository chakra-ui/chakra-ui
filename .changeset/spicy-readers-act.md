---
"@chakra-ui/utils": minor
---

Add `getCSSVar` function to resolve token values and return the css variable
reference instead of the actual value. It does a lookup against
`theme.__cssMap`.

```jsx
const value = getCSSVar(theme, "colors", "blue.500")
// => "var(--chakra-colors-blue.500)"

const value = getCSSVar(theme, "colors", "tomato")
// => "tomato" // since tomato doesn't exist in theme colors
```
