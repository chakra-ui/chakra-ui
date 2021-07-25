---
"@chakra-ui/styled-system": patch
---

Corrected parseGradient function so that it checks for CSS functions.

Previously, using the CSS `calc` function would result in invalid CSS being
generated.

The expectation is that

```jsx
<Heading bgGradient="linear(to-r, green.200, pink.500 calc(20px + 20px))">
  Chakra-UI: Create accessible React apps with speed
</Heading>
```

functions similar to `linear-gradient` which handles using a CSS function

```jsx
<Heading
  bgImage="linear-gradient(
    to right, 
    var(--chakra-colors-green-200)), 
    var(--chakra-colors-pink-500 calc(20px + 20px))"
>
  Chakra-UI: Create accessible React apps with speed
</Heading>
```
