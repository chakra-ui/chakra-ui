# @chakra-ui/react-next

Chakra UI components built on [Panda CSS](https://panda-css.com/) -- zero
Emotion runtime.

> **Experimental.** API may change.

## Setup

### 1. Install

```bash
npm install @chakra-ui/react-next @pandacss/dev
```

### 2. Create `panda.config.ts`

```ts
import chakraPreset from "@chakra-ui/panda-preset"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@chakra-ui/react-next/src/**/*.{ts,tsx}",
  ],
  presets: [chakraPreset],
  jsxFramework: "react",
  jsxFactory: "chakra",
  outdir: "styled-system",
})
```

### 3. Add PostCSS plugin

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    "@pandacss/postcss": {},
  },
}
```

### 4. Create CSS entry point

```css
/* src/index.css */
@layer reset, base, tokens, recipes, utilities;
```

Import it in your app entry:

```tsx
import "./index.css"
```

### 5. Run codegen

```bash
npx panda codegen
```

### 6. Use components

```tsx
import { Accordion, chakra } from "@chakra-ui/react-next"

export function App() {
  return (
    <Accordion.Root>
      <Accordion.Item value="intro">
        <Accordion.ItemTrigger>What is this?</Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <chakra.p>Chakra UI on Panda CSS.</chakra.p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

## Customization

Extend tokens, recipes, and conditions in your `panda.config.ts` using
`theme.extend`:

```ts
import chakraPreset from "@chakra-ui/panda-preset"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: [chakraPreset],
  include: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@chakra-ui/react-next/src/**/*.{ts,tsx}",
  ],
  jsxFramework: "react",
  jsxFactory: "chakra",
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            500: { value: "#6366f1" },
            600: { value: "#4f46e5" },
          },
        },
      },
      semanticTokens: {
        colors: {
          "brand.solid": {
            value: {
              _light: "{colors.brand.500}",
              _dark: "{colors.brand.600}",
            },
          },
        },
      },
    },
  },
})
```

Run `npx panda codegen` after changes.

> **Important:** Use `theme.extend` (not `theme`) to merge with Chakra defaults.
> Using `theme` directly replaces the entire theme.

### Static CSS

For styles that use runtime values, pre-generate them with `staticCss`:

```ts
export default defineConfig({
  // ...
  staticCss: {
    css: [
      {
        properties: {
          color: ["red.500", "blue.500"],
          backgroundColor: ["gray.50", "white"],
        },
      },
    ],
    // Generate all recipe variants (useful for Storybook)
    recipes: "*",
  },
})
```

### Dynamic values

Use `token()` for runtime values:

```tsx
import { css } from "../styled-system/css"
import { token } from "../styled-system/tokens"

function Component({ color }) {
  return (
    <div
      className={css({ color: "var(--color)" })}
      style={{ "--color": token(`colors.${color}`) }}
    >
      Dynamic color
    </div>
  )
}
```

## Preview builds

Install from any PR without waiting for npm:

```bash
npm i https://pkg.pr.new/chakra-ui/chakra-ui/@chakra-ui/react-next@<commit-or-pr>
npm i https://pkg.pr.new/chakra-ui/chakra-ui/@chakra-ui/panda-preset@<commit-or-pr>
```

## Available components

- `Accordion` -- collapsible content sections
- `Badge` -- small label / tag
- `Carousel` -- image / content slider
- `Dialog` -- modal dialog

## JSX Factory

The `chakra` factory creates styled elements with Panda CSS style props:

```tsx
import { chakra } from "@chakra-ui/react-next"

;<chakra.div p="4" bg="blue.500" color="white">
  Styled div
</chakra.div>
```
