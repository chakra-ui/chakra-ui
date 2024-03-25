---
"@chakra-ui/react": minor
---

Add support for custom theme conditions or pseudo props via `theme.conditions`

```ts
// theme.ts

const theme = extendTheme({
  conditions: {
    _closed: "[data-state='closed']", // pseudo prop
  },
})
```

This allows you to use the pseudo prop in your components

```jsx
<Box data-state="closed" _closed={{ bg: "red.200" }}>
  This box is closed
</Box>
```

**For TypeScript users**, you need to use the Chakra CLI to generate the types
for your custom conditions.

```sh
pnpm chakra-cli tokens src/theme/index.ts
```
