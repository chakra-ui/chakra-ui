---
"@chakra-ui/react": minor
---

Add support new entrypoint for `/theme` which allows for incremental loading of
component recipes to avoid bloating the theme with unused components.

> This is mostly for bundle size optimization.

For example, if you want just the `button` recipe to be included in your bundle,
you can cherry-pick the recipe you need like this:

```tsx
import { createSystem, defaultBaseConfig } from "@chakra-ui/react"
import { buttonRecipe } from "@chakra-ui/react/theme"

export const system = createSystem(defaultBaseConfig, {
  theme: {
    recipes: {
      button: buttonRecipe,
    },
  },
})
```
