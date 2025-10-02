---
"@chakra-ui/react": patch
---

- **Styled System**:
  - Fix issue where bracket syntax for responsive styles didn't work in recipe
    variants

  ```jsx
  // This now works correctly
  const recipe = defineRecipe({
    variants: {
      variant: {
        primary: {
          color: ["red", "green"], // ✅ Now converts to breakpoints
        },
      },
    },
  })
  ```

  - Improve style resolution performance
