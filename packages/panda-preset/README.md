# @chakra-ui/panda-preset

Panda CSS preset that mirrors the **Chakra UI** default theme (tokens, semantic
colors, recipes, slot recipes, and global styles) so you can build with
**Panda** while keeping Chakra-aligned design tokens.

## Installation

```bash
pnpm add @chakra-ui/panda-preset
# or
npm install @chakra-ui/panda-preset
```

Peer expectations: **`@pandacss/dev`** (and your app’s React/Vite/Next setup as
usual for Panda).

## Configure Panda

**`panda.config.ts`** (or `.js`):

```ts
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  presets: ["@chakra-ui/panda-preset"],
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  outdir: "styled-system", // default; change if you prefer another folder
})
```

Then generate the runtime:

```bash
pnpm exec panda codegen
```

In your app, import the CSS layers Panda emits (for example the generated
`styled-system/styles.css` or your own entry that matches Panda’s layer setup)
and use `css()`, **recipes**, and **patterns** from your `outdir` like any other
Panda project.

## Color mode (light / dark)

Semantic tokens in this preset use **`_light`** and **`_dark`** (e.g. colors,
shadows). For those values to apply correctly, the document root should carry a
**class** that selects the active color mode:

- Set **`class="light"`** or **`class="dark"`** on **`<html>`** (or another
  wrapping element your setup uses).

Example:

```html
<html class="light">
  <!-- ... -->
</html>
```

Without one of these classes, light/dark–dependent tokens may not resolve the
way you expect.

### Next.js and `next-themes`

With [**next-themes**](https://github.com/pacocoursey/next-themes), use
**`attribute="class"`** so the active theme is reflected as `light` / `dark` on
**`<html>`**, matching Panda’s **`_light`** / **`_dark`** semantic tokens.
`defaultTheme` / `enableSystem` are up to your product defaults.

```tsx
// e.g. app/providers.tsx — mark as a Client Component in the App Router
"use client"

import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
```

```tsx
// e.g. app/layout.tsx — wrap the app; suppressHydrationWarning avoids a class mismatch warning on <html>
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Install: `pnpm add next-themes`.

## Related

- [Chakra UI documentation](https://www.chakra-ui.com)
- [Panda CSS documentation](https://panda-css.com)
