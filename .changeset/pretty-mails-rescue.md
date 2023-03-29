---
"@chakra-ui/toast": patch
---

Fix issue where zIndex was hardcoded in toast component by providing a css
variable `--toast-z-index` for better override experience.

You can set the toast's `zIndex` globally by setting a value for the
`--toast-z-index`. The default value for this variable is `5500`

```jsx live=false
const theme = extendTheme({
  styles: {
    global: {
      "--toast-z-index": 10,
    },
  },
})
```
