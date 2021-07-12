---
"@chakra-ui/form-control": minor
"@chakra-ui/theme": minor
---

Added a `container` part to the `FormControl` component theme, allowing the root
`FormControl` element to be themed.

```jsx
import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        // create a variant named "custom"
        custom: {
          // style the root `FormControl` element
          container: {
            color: "white",
            bg: "blue.900",
          },
        },
      },
    },
  },
})
```
