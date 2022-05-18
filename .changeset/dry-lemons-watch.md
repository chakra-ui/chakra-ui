---
"@chakra-ui/styled-system": minor
"@chakra-ui/system": minor
---

Add support for responsive variants and sizes.

```jsx live=false
<Button variant={["sm", "lg"]}>Click me</Button>
```

Add support for `!important` in token values as an escape hatch for overriding
properties in responsive variants/sizes.

```jsx live=false
<Button variant={["sm", "lg"]} fontSize="lg!">
  Click me
</Button>
```
