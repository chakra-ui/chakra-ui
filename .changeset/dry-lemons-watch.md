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
<Button variant={["sm", "lg"]} fontSize="lg !important">
  Click me
</Button>
```

**Notes**

- Based on how this is designed, there's no support for responsive `colorScheme`
  since it is technically not a variant
- When using responsive sizes and variants, overriding properties via props
  might not work as expected. We use native CSS media queries to enable this
  feature so there's no "magic" under the hood. If you really want to override
  properties, you can consider using the important syntax
