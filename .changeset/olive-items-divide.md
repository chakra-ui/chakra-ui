---
"@chakra-ui/styled-system": minor
---

Add new `defineCssVars` helper to improve the experience of authoring a set of
css variables for a component theme.

```jsx live=false
import { defineCssVars } from "@chakra-ui/react"

// defines the `--badge-bg`, `--badge-border`, and `--badge-size` (with a 1rem fallback)
const vars = defineCssVars("badge", ["bg", "border", ["size", "1rem"]])

const style = {
  bg: vars.bg.reference,
  [vars.bg.variable]: "colors.red.500",
  [vars.border.variable]: "colors.red.300",
}
```
