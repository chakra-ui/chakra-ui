---
"@chakra-ui/styled-system": minor
"@chakra-ui/cli": minor
---

Add support for nested semantic tokens in theme. It is now possible to declare
semantic tokens by nesting objects.

BEFORE:

```js
const theme = {
  semanticTokens: {
    colors: {
      "background.pressed.base": { default: "blue.800", _dark: "blue.300" },
      "background.pressed.subtle": { default: "blue.300", _dark: "blue.700" },
    },
  },
}
```

AFTER:

```js
const theme = {
  semanticTokens: {
    colors: {
      background: {
        pressed: {
          base: { default: "blue.800", _dark: "blue.300" },
          subtle: { default: "blue.300", _dark: "blue.700" },
        },
      },
    },
  },
}
```

This allows for cleaner grouping and organization of tokens.
