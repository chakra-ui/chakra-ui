# Setting up Vite + Chakra UI v4 (Panda CSS)

## 1. Create the Vite project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
pnpm install
```

## 2. Install dependencies

```bash
pnpm add @chakra-ui/react-next @chakra-ui/styled-system @chakra-ui/panda-preset @chakra-ui/cli @pandacss/dev @pandacss/postcss
```

## 3. Initialize (automatic)

```bash
npx chakra init
```

This handles steps 4-9 automatically. If you prefer manual setup, follow each
step below instead.

## 4. Create `panda.config.ts`

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
  importMap: "@chakra-ui/styled-system",
  outdir: "styled-system",
})
```

## 5. Create `postcss.config.cjs`

```js
module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {},
  },
}
```

## 6. Add tsconfig paths

In `tsconfig.json`, add:

```json
{
  "compilerOptions": {
    "paths": {
      "@chakra-ui/styled-system/*": ["./styled-system/*"]
    }
  }
}
```

This makes `@chakra-ui/styled-system` resolve to your local codegen output
instead of the npm package, so your theme customizations take effect.

## 7. Add `@layer` to CSS entry

Prepend this line to `src/index.css`:

```css
@layer reset, base, tokens, recipes, utilities;
```

## 8. Add `styled-system` to `.gitignore`

```
styled-system
```

## 9. Run codegen

```bash
npx panda codegen
```

## 10. Use components

```tsx
import { Accordion, Badge, chakra } from "@chakra-ui/react-next"

function App() {
  return (
    <chakra.div p="8" maxW="600px" mx="auto">
      <chakra.h1 fontSize="2xl" fontWeight="bold" mb="4">
        Chakra UI v4
      </chakra.h1>

      <Badge variant="solid" mb="4">
        Experimental
      </Badge>

      <Accordion.Root>
        <Accordion.Item value="one">
          <Accordion.ItemTrigger>Section One</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <chakra.p p="4">Content</chakra.p>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </chakra.div>
  )
}
```

## Customizing the theme

Extend in `panda.config.ts` via `theme.extend` (not `theme` -- that replaces the
whole theme):

```ts
export default defineConfig({
  presets: [chakraPreset],
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: { 500: { value: "#6366f1" } },
        },
      },
    },
  },
})
```

Then re-run `npx panda codegen` after changes.
