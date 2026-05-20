# Chakra UI Theming Reference

Use v3 patterns (`defineConfig`, `createSystem`, `defineRecipe`,
`defineSlotRecipe`) by default. Only use v2 patterns (`extendTheme`,
`styleConfig`) if the project is explicitly on v2.

Before starting, check `package.json` for the Chakra UI version and look for an
existing theme file (`theme.ts`, `system.ts`) to understand what's already
defined.

Clarify scope when needed:

- **Full design system** — tokens, semantic tokens, and component recipes from
  scratch
- **Partial update** — adding or changing specific tokens or recipes
- **Single recipe** — one component's styles with variants
- **Typegen only** — running `@chakra-ui/cli typegen` after custom additions

If the user says "add my brand colors" without specifying the colors, ask first.
A partial answer is worse than pausing to clarify.

---

## System setup: `defineConfig` and `createSystem`

All theming in v3 starts with `createSystem`. Use `defineConfig` to author
customizations, then merge with `defaultConfig`:

```ts
// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      /* ... */
    },
    semanticTokens: {
      /* ... */
    },
    recipes: {
      /* ... */
    },
    slotRecipes: {
      /* ... */
    },
  },
})

export const system = createSystem(defaultConfig, config)
```

Pass `system` to `ChakraProvider`:

```tsx
// components/ui/provider.tsx
"use client"
import { system } from "@/theme"
import { ChakraProvider } from "@chakra-ui/react"

export function Provider({ children }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
```

---

## Tokens

Tokens are the raw, concrete values in your design system — the foundation
everything else references.

```ts
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#1d4ed8" },
          900: { value: "#1e3a8a" },
        },
      },
      fonts: {
        heading: { value: "var(--font-geist-sans), sans-serif" },
        body: { value: "var(--font-geist-sans), sans-serif" },
        mono: { value: "var(--font-geist-mono), monospace" },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
      },
      radii: {
        sm: { value: "0.25rem" },
        md: { value: "0.375rem" },
        lg: { value: "0.5rem" },
        xl: { value: "0.75rem" },
        full: { value: "9999px" },
      },
    },
  },
})
```

Use scale-based keys for palettes (`50`, `100`, …, `900`) and semantic keys for
single values (`sm`, `md`, `lg`).

---

## Semantic tokens

Semantic tokens reference base tokens and assign _meaning_ to them. Their key
feature: different values per color mode, making dark mode automatic.

```ts
const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        "brand.solid": {
          value: { base: "{colors.brand.600}", _dark: "{colors.brand.400}" },
        },
        "brand.muted": {
          value: { base: "{colors.brand.100}", _dark: "{colors.brand.900}" },
        },
        "brand.subtle": {
          value: { base: "{colors.brand.50}", _dark: "{colors.brand.950}" },
        },

        "bg.default": { value: { base: "white", _dark: "{colors.gray.900}" } },
        "bg.subtle": {
          value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
        },
        "bg.muted": {
          value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" },
        },

        "fg.default": { value: { base: "{colors.gray.900}", _dark: "white" } },
        "fg.muted": {
          value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
        },
        "fg.subtle": {
          value: { base: "{colors.gray.400}", _dark: "{colors.gray.600}" },
        },

        "border.default": {
          value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
        },
        "border.muted": {
          value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" },
        },
      },
    },
  },
})
```

Components that use `bg="bg.subtle"` instead of `bg="gray.50"` automatically get
the correct dark mode value — no conditional logic needed. Build on semantic
tokens wherever possible.

---

## Recipes (single-component styles)

Recipes replace `styleConfig` from v2. Use them when a single component has
meaningful style variants that developers will reuse across the project.

```ts
import { defineRecipe } from "@chakra-ui/react"

export const badgeRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    px: 2,
    py: 0.5,
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "medium",
  },
  variants: {
    variant: {
      solid: { bg: "colorPalette.500", color: "white" },
      subtle: { bg: "colorPalette.100", color: "colorPalette.800" },
      outline: {
        borderWidth: 1,
        borderColor: "colorPalette.500",
        color: "colorPalette.600",
      },
    },
    size: {
      sm: { px: 1.5, py: 0.5, fontSize: "2xs" },
      md: { px: 2, py: 0.5, fontSize: "xs" },
      lg: { px: 3, py: 1, fontSize: "sm" },
    },
  },
  defaultVariants: { variant: "subtle", size: "md" },
})
```

Register in the theme config:

```ts
const config = defineConfig({ theme: { recipes: { badge: badgeRecipe } } })
```

`colorPalette` inside a recipe is a placeholder — it resolves to whatever
`colorPalette` prop the consumer passes (`colorPalette="blue"` → `blue.500`).

---

## Slot recipes (multi-part components)

Slot recipes replace `multiStyleConfig` from v2. Use them when a component has
multiple coordinated parts that all respond to the same variants.

```ts
import { defineSlotRecipe } from "@chakra-ui/react"

export const cardSlotRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer", "title"],
  base: {
    root: { bg: "bg.surface", rounded: "xl", overflow: "hidden", shadow: "sm" },
    header: { px: 6, py: 4, borderBottomWidth: 1, borderColor: "border.muted" },
    body: { px: 6, py: 4 },
    footer: { px: 6, py: 4, borderTopWidth: 1, borderColor: "border.muted" },
    title: { fontSize: "lg", fontWeight: "semibold", color: "fg.default" },
  },
  variants: {
    variant: {
      elevated: { root: { shadow: "md" } },
      outline: {
        root: { shadow: "none", borderWidth: 1, borderColor: "border.default" },
      },
      filled: { root: { bg: "bg.subtle", shadow: "none" } },
    },
    size: {
      sm: {
        root: { rounded: "lg" },
        body: { px: 4, py: 3 },
        header: { px: 4, py: 3 },
      },
      md: {},
      lg: { body: { px: 8, py: 6 }, header: { px: 8, py: 6 } },
    },
  },
  defaultVariants: { variant: "elevated", size: "md" },
})
```

Register:
`const config = defineConfig({ theme: { slotRecipes: { card: cardSlotRecipe } } })`

Consume with `useSlotRecipe`:

```tsx
import { useSlotRecipe } from "@chakra-ui/react"

function Card({ variant = "elevated", size = "md", children }) {
  const recipe = useSlotRecipe({ key: "card" })
  const styles = recipe({ variant, size })
  return <Box css={styles.root}>{children}</Box>
}
```

---

## Typegen

Run typegen after adding custom tokens, semantic tokens, recipes, or slot
recipes. Without it, TypeScript won't know your custom values exist.

```bash
npx @chakra-ui/cli typegen ./theme.ts
```

| Flag                | Effect                                                        |
| ------------------- | ------------------------------------------------------------- |
| `--strict`          | Strict literal types for variant and size props (recommended) |
| `--watch`           | Re-runs automatically whenever the theme file changes         |
| `--outdir <dir>`    | Custom output directory for generated types                   |
| `--tsconfig <path>` | Path to tsconfig when using path aliases                      |

For active development: `npx @chakra-ui/cli typegen ./theme.ts --watch`

Typegen is required when you've added custom color tokens, semantic tokens,
spacing/font/radius tokens, or new recipes or slot recipes.

---

## Ejecting the default theme

For full control over Chakra's built-in tokens, recipes, and styles:

```bash
npx @chakra-ui/cli eject
```

Writes the complete default theme into a `theme/` directory (`--outdir <dir>` to
override), including separate files for tokens, semantic tokens, recipes, slot
recipes, text styles, layer styles, and animation styles — all as editable
`defineConfig` exports.

Use `eject` when modifying built-in component recipes or replacing large parts
of the default token scale. For smaller customizations (adding brand colors,
overriding a few tokens), extending with `defineConfig` is simpler.

---

## Output format

Produce:

1. **Complete theme config** — `defineConfig` with all relevant sections
2. **Proper imports** — `defineConfig`, `createSystem`, `defineRecipe`, etc.
   from `@chakra-ui/react`
3. **Provider wiring** — how to pass `system` to `ChakraProvider` if needed
4. **Usage examples** — show tokens/recipes consumed in a component
5. **Typegen reminder** — note when to run typegen

Brief explanation after the code (2–4 sentences) on key decisions. Skip for
trivial requests.
