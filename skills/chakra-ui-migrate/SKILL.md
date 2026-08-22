---
name: chakra-ui-migrate
description: >
  Migrate Chakra UI projects from v2 to v3, covering package changes, codemods,
  provider setup, color mode, prop renaming, compound components, theming,
  recipes, and Next.js updates. Use this skill whenever a user is upgrading
  Chakra UI versions, encountering breaking changes after an upgrade, converting
  old v2 patterns (ColorModeScript, useColorModeValue, styleConfig, extendTheme,
  isDisabled, colorScheme, @chakra-ui/icons, framer-motion dependency), fixing
  compound component patterns, or asking about differences between Chakra UI v2
  and v3 — even if they don't say "migrate" or "upgrade" explicitly.
---

# Chakra UI Migration: v2 → v3

You are guiding a developer through migrating their project from Chakra UI v2 to
v3. Work through the steps below in order. Inspect the project first — never
guess the package versions or framework.

> **Node requirement:** Chakra UI v3 requires Node >= 20.x. Confirm before
> proceeding if the environment is uncertain.

---

## Step 1 — Inspect the project

Read these files to understand the current state:

```
package.json
```

Look for:

- Current `@chakra-ui/react` version (v2.x vs v3.x)
- Related packages: `@chakra-ui/icons`, `@chakra-ui/hooks`,
  `@chakra-ui/next-js`, `@emotion/styled`, `framer-motion`
- Framework: Next.js (App Router or Pages Router), Vite, plain React
- Package manager (from lockfiles: `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`,
  `package-lock.json`)

Also spot-check key files when helpful:

- Provider / theme setup (`_app.tsx`, `layout.tsx`, `theme.ts`)
- Color mode usage (`ColorModeScript`, `useColorMode`, `useColorModeValue`)
- Any component files showing heavy v2 patterns

---

## Step 2 — Update packages

### Remove v2-only dependencies

```bash
# npm
npm uninstall @chakra-ui/icons @chakra-ui/hooks @chakra-ui/next-js @emotion/styled framer-motion

# pnpm
pnpm remove @chakra-ui/icons @chakra-ui/hooks @chakra-ui/next-js @emotion/styled framer-motion

# yarn
yarn remove @chakra-ui/icons @chakra-ui/hooks @chakra-ui/next-js @emotion/styled framer-motion
```

`@emotion/styled` and `framer-motion` are no longer required in v3.

### Install v3 core packages

```bash
# npm
npm install @chakra-ui/react @emotion/react

# pnpm
pnpm add @chakra-ui/react @emotion/react

# yarn
yarn add @chakra-ui/react @emotion/react
```

### Replacements for removed packages

| Removed              | Replacement                                  |
| -------------------- | -------------------------------------------- |
| `@chakra-ui/icons`   | `lucide-react` or `react-icons`              |
| `@chakra-ui/hooks`   | `react-use` or `usehooks-ts`                 |
| `@chakra-ui/next-js` | `asChild` prop pattern (see Next.js section) |

---

## Step 3 — Run the codemod

The official codemod handles most mechanical changes: component renames, prop
updates, import rewrites, and compound component restructuring. It does not
replace manual review — plan to audit the output.

**Dry run first (no files changed):**

```bash
npx @chakra-ui/codemod upgrade --dry
```

Review what it proposes. When satisfied:

```bash
npx @chakra-ui/codemod upgrade
```

After the codemod, commit the changes before making manual edits so you have a
clean diff to work from.

---

## Step 4 — Update the Provider

### Old v2 pattern

```tsx
// v2
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"

;<ChakraProvider theme={theme}>{children}</ChakraProvider>
```

### New v3 pattern (using Chakra CLI snippets)

Generate the provider and component snippets:

```bash
npx @chakra-ui/cli snippet add
```

This creates `components/ui/provider.tsx` (plus `toaster` and `tooltip`
snippets) and automatically installs required npm dependencies — including
`next-themes`. Import and use it:

```tsx
// v3 — app/layout.tsx (Next.js App Router)
import { Provider } from "@/components/ui/provider"

;<html lang="en" suppressHydrationWarning>
  <body>
    <Provider>{children}</Provider>
  </body>
</html>
```

The `Provider` file includes `"use client"` — do not add it to `layout.tsx`. See
the Next.js section for Pages Router placement.

### Custom theme in v3

Replace `extendTheme` with `createSystem`:

```ts
// v2
import { extendTheme } from "@chakra-ui/react"
// v3
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

export const theme = extendTheme({ colors: { brand: { 500: "#2196f3" } } })

const config = defineConfig({
  theme: { tokens: { colors: { brand: { 500: { value: "#2196f3" } } } } },
})
export const system = createSystem(defaultConfig, config)
```

Pass `system` to `ChakraProvider` via `value={system}`.

---

## Step 5 — Color mode migration

### Remove all v2 color mode patterns

```tsx
// REMOVE these v2 imports and usages:
import { ColorModeScript } from "@chakra-ui/react"
// ❌
import { useColorMode } from "@chakra-ui/react"
// ❌ (use next-themes)
import { useColorModeValue } from "@chakra-ui/react"
// ❌ (use CSS tokens)
import { DarkMode, LightMode } from "@chakra-ui/react"

// ❌

// Also remove from _document.tsx:
;<ColorModeScript initialColorMode={theme.config.initialColorMode} /> // ❌
```

### v3 color mode approach

Color mode is handled by `next-themes` via the generated `Provider`. Use
semantic tokens that automatically respond to the active color mode:

```tsx
// Use Chakra semantic tokens — they flip automatically in dark mode
<Box color="fg.default" bg="bg.subtle">
  ...
</Box>
```

For a color mode toggle, use the generated `components/ui/color-mode.tsx`
snippet or `useColorMode` from `next-themes` directly.

---

## Step 6 — Prop renames

These boolean and style props were renamed in v3 for consistency with HTML and
modern React conventions. The codemod catches most of these, but verify manually
afterward.

### Boolean props

| v2                | v3              |
| ----------------- | --------------- |
| `isOpen`          | `open`          |
| `defaultIsOpen`   | `defaultOpen`   |
| `isDisabled`      | `disabled`      |
| `isInvalid`       | `invalid`       |
| `isRequired`      | `required`      |
| `isReadOnly`      | `readOnly`      |
| `isChecked`       | `checked`       |
| `isLoaded`        | `loaded`        |
| `isIndeterminate` | `indeterminate` |

### Style and layout props

| v2                | v3                          |
| ----------------- | --------------------------- |
| `colorScheme`     | `colorPalette`              |
| `noOfLines`       | `lineClamp`                 |
| `truncated`       | `truncate`                  |
| `spacing` (Stack) | `gap`                       |
| `apply`           | `textStyle` or `layerStyle` |

### Nested style props

```tsx
// v2 — sx with nested pseudo-selectors
<Box sx={{ "&:hover": { color: "blue.500" } }} />

// v3 — css prop with "&" selectors
<Box css={{ "&:hover": { color: "blue.500" } }} />
```

---

## Step 7 — Component migrations

### Renamed components

| v2            | v3                                  |
| ------------- | ----------------------------------- |
| `Modal`       | `Dialog`                            |
| `FormControl` | `Field`                             |
| `Select`      | `NativeSelect`                      |
| `AlertDialog` | `AlertDialog` (compound, see below) |

`Modal` is the most common rename — every `<Modal>`, `<ModalOverlay>`,
`<ModalContent>`, `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>`, and
`<ModalCloseButton>` becomes a `Dialog.*` compound part:

```tsx
// v2
<Modal isOpen={open} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalBody>Body</ModalBody>
    <ModalFooter><Button onClick={onClose}>Close</Button></ModalFooter>
  </ModalContent>
</Modal>

// v3
<Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header><Dialog.Title>Title</Dialog.Title></Dialog.Header>
      <Dialog.Body>Body</Dialog.Body>
      <Dialog.Footer><Button onClick={() => setOpen(false)}>Close</Button></Dialog.Footer>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

### Compound component rewrites

v3 adopts a consistent compound component API. The codemod handles many of
these, but complex custom usage needs manual review.

**Checkbox**

```tsx
// v2
<Checkbox isChecked={val} onChange={fn}>Label</Checkbox>

// v3
<Checkbox.Root checked={val} onCheckedChange={fn}>
  <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
  <Checkbox.Label>Label</Checkbox.Label>
</Checkbox.Root>
```

**Progress**

```tsx
// v2
<Progress value={60} colorScheme="blue" />

// v3
<Progress.Root value={60} colorPalette="blue">
  <Progress.Track><Progress.Range /></Progress.Track>
</Progress.Root>
```

**Accordion**

```tsx
// v2
<Accordion><AccordionItem><AccordionButton /><AccordionPanel /></AccordionItem></Accordion>

// v3
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger />
    <Accordion.ItemContent />
  </Accordion.Item>
</Accordion.Root>
```

**FormControl → Field**

```tsx
// v2
<FormControl isInvalid={!!error} isRequired>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormErrorMessage>{error}</FormErrorMessage>
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>

// v3
<Field.Root invalid={!!error} required>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
  <Field.ErrorText>{error}</Field.ErrorText>
  <Field.HelpText>We'll never share your email.</Field.HelpText>
</Field.Root>
```

All `FormControl` sub-parts map to `Field.*`:

- `FormLabel` → `Field.Label`
- `FormErrorMessage` → `Field.ErrorText`
- `FormHelperText` → `Field.HelpText`
- `FormControl` props `isInvalid`, `isRequired`, `isDisabled` → `invalid`,
  `required`, `disabled`

**Dialog / Drawer / Menu / Tabs** follow the same compound pattern: use
`ComponentName.Root`, `.Trigger`, `.Content`, `.Item`, etc. Check the Chakra UI
v3 docs for the specific compound API for each.

### Next.js Image and Link (replacing @chakra-ui/next-js)

```tsx
// v2 — @chakra-ui/next-js
import { LinkOverlay } from "@chakra-ui/next-js"

// v3 — asChild pattern
import NextLink from "next/link"
<ChakraLink asChild><NextLink href="/about">About</NextLink></ChakraLink>

import NextImage from "next/image"
<ChakraImage asChild><NextImage src="..." alt="..." /></ChakraImage>
```

---

## Step 8 — Theming migration

### styleConfig and multiStyleConfig → recipes

```ts
// v3 — single component (recipe)
import { defineRecipe } from "@chakra-ui/react"

// v2
const buttonStyle = {
  baseStyle: { fontWeight: "bold" },
  variants: { solid: { bg: "blue.500" } },
  defaultProps: { variant: "solid" },
}

const buttonRecipe = defineRecipe({
  base: { fontWeight: "bold" },
  variants: { variant: { solid: { bg: "blue.500" } } },
  defaultVariants: { variant: "solid" },
})
```

```ts
// v3 — slot recipe
import { defineSlotRecipe } from "@chakra-ui/react"

// v2 — multiStyleConfig (multi-part component)
const cardStyle = multiStyleConfig({
  parts: ["root", "header"],
  baseStyle: { root: { bg: "white" }, header: { fontWeight: "bold" } },
})

const cardSlotRecipe = defineSlotRecipe({
  slots: ["root", "header"],
  base: { root: { bg: "white" }, header: { fontWeight: "bold" } },
})
```

### Typegen for custom tokens

After adding custom tokens, semantic tokens, recipes, or slot recipes, run
typegen to keep TypeScript types in sync:

```bash
npx @chakra-ui/cli typegen ./theme.ts
```

> **Complex theme migrations** — if you're moving a large v2 theme with many
> custom tokens, semantic tokens, or multi-part component styles, use the
> `chakra-ui-theming` skill. It covers the full token/recipe/slot-recipe API in
> depth and is a better guide than this section alone.

---

## Step 9 — Next.js specifics

### App Router

- Place `<Provider>` in `app/layout.tsx` (Server Component — no `"use client"`)
- The generated `components/ui/provider.tsx` already has `"use client"`
- Add `suppressHydrationWarning` to `<html>` to prevent color mode flicker
- Do not wrap the entire app or layout in `"use client"`

### Pages Router

```tsx
// pages/_app.js
import { Provider } from "@/components/ui/provider"

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
```

Remove any `ColorModeScript` from `pages/_document.tsx` — it is not used in v3.

---

## Step 10 — Validation checklist

Work through this after the migration is complete:

- [ ] Reinstall dependencies: `npm install` / `pnpm install`
- [ ] TypeScript: `npx tsc --noEmit` — resolve all type errors
- [ ] Lint: `npm run lint`
- [ ] Build: `npm run build`
- [ ] Visually verify color mode toggle (light ↔ dark)
- [ ] Test interactive components: Dialog, Drawer, Menu, Tabs, Accordion
- [ ] Test form components: Checkbox, Select/NativeSelect, Input, Radio
- [ ] Check for visual regressions across key pages
- [ ] Search codebase for leftover v2 imports:
  ```bash
  grep -r "ColorModeScript\|useColorModeValue\|extendTheme\|styleConfig\|@chakra-ui/icons\|@chakra-ui/next-js" src/
  ```

---

## Clarifying questions (when context is unclear)

If the user's version, framework, or scope is ambiguous, ask:

1. "What version of `@chakra-ui/react` are you on right now?"
2. "Are you using Next.js App Router, Pages Router, Vite, or plain React?"
3. "Are you migrating the full codebase or just specific components?"

State assumptions clearly if you proceed without asking.
