---
"@chakra-ui/react": minor
---

BREAKING: Change signature of `useRecipe`, `useSlotRecipe`,
`createSlotRecipeContext`

### createSlotRecipeContext

Before:

```tsx
const { withProvider, withContext } = createSlotRecipeContext("accordion")
```

After:

```tsx
const { withProvider, withContext } = createSlotRecipeContext({
  key: "accordion",
})
```

### useSlotRecipe

Before:

```tsx
const recipe = useSlotRecipe("accordion")
```

After:

```tsx
const recipe = useSlotRecipe({ key: "accordion" })
```
