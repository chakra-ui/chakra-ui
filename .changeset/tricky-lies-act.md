---
"@chakra-ui/styled-system": minor
---

Add `defineStyle` and `defineStyleConfig` to improve the TypeScript authoring
experience of style objects and single part component themes.

```jsx live=false
import { defineStyleConfig, defineStyle } from "@chakra-ui/styled-system"

// authoring style objects
const style = defineStyle({
  marginTop: "20px",
})

// authoring style configs for single part component
const button = defineStyleConfig({
  baseStyle: {},
  variants: {},
  defaultProps: {},
})
```

Add `createMultiStyleConfigHelpers` factory that provides functions that help
improve the TypeScript authoring experience of multipart component themes.

```jsx live=false
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-sytem"

// create scoped helpers for that defined parts
const helpers = createMultiStyleConfigHelpers(["button", "label"])
const { definePartsStyle, defineMultiStyleConfig } = helpers

// authoring styles for each part
const outlineVariant = definePartsStyle({
  button: {},
  label: {},
})

// authoring styles for multipart component
const accordion = defineMultiStyleConfig({
  baseStyle: {
    button: {},
    label: {},
  },
  variants: {
    outline: outlineVariant,
  },
})
```
