---
"@chakra-ui/styled-system": minor
---

Creates the `gradients` theme key for props `bgGradient`, `bgImage`, `bgImg`,
and `backgroundImage`

This addition allows you to use tokens for the gradient values, semantic tokens
included!

```ts
// gradients.ts

export const gradients = {
  lightBgGradient:
    "linear-gradient(102.7deg, #B9F1B9 0%, #5484EA 51.56%, #3A8E89 100%)",
}

// SomeComponent.tsx

<Box bgGradient='lightBgGradient' />
```

🚨 NOTE: The
[Background Gradient API](https://chakra-ui.com/docs/styled-system/gradient#background-gradient-api)
can not be used in a token as the conversion is done when the api is used
directly on a prop and not when compiling the theme config
