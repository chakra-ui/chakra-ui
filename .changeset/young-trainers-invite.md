---
"@chakra-ui/react": patch
---

Fixed an issue where `extendTheme` did not allow string properties besides
ColorHue in the `colors` attribute of the theme override.

```jsx
extendTheme({
  colors: {
    myColor: {
      text: "#ff0000",
    },
  },
})
```
