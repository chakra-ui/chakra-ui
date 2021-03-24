---
"@chakra-ui/styled-system": minor
---

Add support for css variable tokens. This means you can create a css variable
and reference value in the tokens.

```jsx
// We're convert `colors.red.200` to `var(--chakra-colors-red-200)`
<Box
  sx={{
    "--banner-color": "colors.red.200",
    "& .banner": {
      bg: "var(--banner-color)",
    },
  }}
/>
```

You can also add fallback values in event the token doesn't exist:

```jsx
<Box
  sx={{
    // evaluates to #fff if `colors.red.1000` doesn't exists in theme map
    "--banner-color": "colors.red.1000, #fff",
    "& .banner": {
      bg: "var(--banner-color)",
    },
  }}
/>
```

This opens new possbilities with css variables, for example you can apply
responsive token values like you would with style props.

> TypeScript support for this is still WIP

```jsx
<Box
  sx={{
    "--banner-color": ["colors.red.200", "colors.pink.400"],
    "& .banner": {
      bg: "var(--banner-color)",
    },
  }}
/>
```
