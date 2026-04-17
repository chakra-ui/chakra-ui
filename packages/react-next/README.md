# @chakra-ui/react-next

Chakra UI components built on [Panda CSS](https://panda-css.com/) -- zero
Emotion runtime.

> **Experimental.** API may change.

## Packages

| Package                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `@chakra-ui/react-next`    | React components (Accordion, Badge, Carousel, Dialog) |
| `@chakra-ui/styled-system` | Panda CSS runtime (css, jsx, recipes, tokens, types)  |
| `@chakra-ui/panda-preset`  | Design system tokens, recipes, slot-recipes           |
| `@chakra-ui/cli`           | CLI with `chakra init` and `chakra codegen` commands  |

## Setup (Vite)

### 1. Create project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
pnpm install
```

### 2. Install packages

```bash
pnpm add @chakra-ui/react-next @chakra-ui/styled-system @chakra-ui/panda-preset @chakra-ui/cli @pandacss/dev
```

### 3. Initialize

```bash
npx chakra init
```

This creates:

- `panda.config.ts` with Chakra preset
- `postcss.config.cjs` with Panda PostCSS plugin
- Adds `@chakra-ui/styled-system/*` tsconfig paths (for local codegen override)
- Prepends `@layer` declaration to CSS entry
- Adds `styled-system` to `.gitignore`
- Runs `panda codegen`

### 4. Use components

```tsx
import { Accordion, Badge, chakra } from "@chakra-ui/react-next"

export function App() {
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

## Setup (Next.js)

> **Note:** Next.js 16 uses Turbopack by default which has known compatibility
> issues with Panda CSS's PostCSS plugin. We recommend using the codegen-only
> approach for Next.js until Turbopack support improves.

### 1. Create project

```bash
npx create-next-app@latest my-app --typescript --no-tailwind --app --src-dir
cd my-app
```

### 2. Install packages

```bash
pnpm add @chakra-ui/react-next @chakra-ui/styled-system @chakra-ui/panda-preset @pandacss/dev
```

### 3. Create `panda.config.ts`

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

### 4. Add codegen to scripts

```json
{
  "scripts": {
    "prepare": "panda codegen",
    "dev": "panda codegen && panda cssgen --outfile styled-system/styles.css && next dev"
  }
}
```

### 5. Add tsconfig paths

```json
{
  "compilerOptions": {
    "paths": {
      "@chakra-ui/styled-system/*": ["./styled-system/*"]
    }
  }
}
```

### 6. Import CSS in layout

Add the layer declaration to `src/app/globals.css`:

```css
@layer reset, base, tokens, recipes, utilities;
```

### 7. Use components

```tsx
"use client"
import { Accordion, Badge, chakra } from "@chakra-ui/react-next"
```

## Customization

Extend tokens, recipes, and conditions via `theme.extend` in `panda.config.ts`:

```ts
export default defineConfig({
  presets: [chakraPreset],
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            500: { value: "#6366f1" },
          },
        },
      },
    },
  },
})
```

Run `npx chakra codegen` (or `npx panda codegen`) after changes.

> **Important:** Use `theme.extend` (not `theme`) to merge with Chakra defaults.
> Using `theme` directly replaces the entire theme.

## How It Works

Components in `@chakra-ui/react-next` import from `@chakra-ui/styled-system`. By
default, this resolves to the npm package (default theme). When you run codegen,
Panda generates a local `styled-system/` directory. The tsconfig paths alias
makes `@chakra-ui/styled-system/*` resolve to your local `./styled-system/*`
instead, so your customizations take effect.

## Known Issues

### Next.js 16 + Turbopack

Turbopack cannot bundle the Panda PostCSS plugin's Node.js dependencies
(`@pandacss/node`, esbuild binaries, `@vue/compiler-sfc`). Use the codegen-only
approach (no PostCSS plugin) for Next.js 16.

### pnpm link not supported with Turbopack

Turbopack cannot resolve packages installed via `pnpm link`. This only affects
local development. Real npm installs work fine. For local testing, use
`pnpm pack` + install from tarball.

## Available Components

- `Accordion` -- collapsible content sections
- `Badge` -- small label / tag
- `Carousel` -- image / content slider
- `Dialog` -- modal dialog

## JSX Factory

```tsx
import { chakra } from "@chakra-ui/react-next"

;<chakra.div p="4" bg="blue.500" color="white">
  Styled div
</chakra.div>
```

## Preview Builds

Install from any PR without waiting for npm:

```bash
npm i https://pkg.pr.new/chakra-ui/chakra-ui/@chakra-ui/react-next@<commit-or-pr>
npm i https://pkg.pr.new/chakra-ui/chakra-ui/@chakra-ui/styled-system@<commit-or-pr>
npm i https://pkg.pr.new/chakra-ui/chakra-ui/@chakra-ui/panda-preset@<commit-or-pr>
```
