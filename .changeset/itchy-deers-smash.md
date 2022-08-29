---
"@chakra-ui/styled-system": patch
"@chakra-ui/theme": patch
---

Allow user optin to the 100vh polyfill because it's only useful in absolute or
fixed layout modes.

Chakra new polyfills the `100vh` attribute to use either the literal `100vh` or
`-webkit-fill-available` where supported. To use this feature, set the height
values to `$100vh` instead of `100vh`.

```jsx live=false
// Might not work in all cases
<Box minHeight="100vh" position="absolute">
  Test
</Box>

// Polyfilled version ensures 100vh work correctly
<Box minHeight="$100vh" position="absolute">
  Test
</Box>
```
