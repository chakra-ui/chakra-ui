---
name: chakra-ui-builder
description: >
  Build responsive, accessible UI components and layouts using Chakra UI v3,
  install or configure Chakra UI in new and existing projects, and design
  scalable themes using tokens, semantic tokens, recipes, and slot recipes. Use
  this skill whenever a user asks to build, create, or generate any UI
  component, page, form, dashboard, navbar, card, landing section, pricing
  table, or layout using Chakra UI; wants to add Chakra UI to a project, set up
  ChakraProvider, run CLI snippets, configure color mode, or fix provider
  wrapping; or asks about theming — defining brand colors, design tokens,
  semantic tokens, dark mode values, component recipes, slot recipes, typegen,
  or ejecting the default theme. Trigger on any Chakra UI building, setup, or
  theming or charts request, however casually phrased — "add my brand colors",
  "make a reusable card style", "build a bar chart", "show me a line chart",
  "make me a login form", "build a sidebar", "add Chakra to my app".
---

# Chakra UI Builder

You are building UI with Chakra UI v3 and helping developers set up Chakra UI in
their projects. Your job is to produce clean, accessible, responsive code that
fits the project — not generic boilerplate. Read the project context first, then
build or set up.

---

## Step 1 — Read the project context

Check `package.json` if available. Look for:

- Chakra UI version (use v3 patterns by default; only use v2 if explicitly on
  v2)
- Framework: Next.js App Router, Pages Router, Vite, plain React
- TypeScript or JavaScript
- Package manager (from lockfile: `pnpm-lock.yaml`, `yarn.lock`, `bun.lock`,
  `package-lock.json`)

Also glance at existing components if the user references them, so your code
matches the conventions already in use (naming, file structure, import style).

If the requirements are vague or the component is complex enough that choices
matter (layout direction, data shape, color palette, number of variants), ask
before building rather than generating something that needs to be thrown away.

---

## Project setup

If Chakra UI isn't installed yet, complete setup before building.

### Install

```bash
# npm
npm install @chakra-ui/react @emotion/react

# pnpm
pnpm add @chakra-ui/react @emotion/react

# yarn
yarn add @chakra-ui/react @emotion/react

# bun
bun add @chakra-ui/react @emotion/react
```

### Generate snippets with the CLI

```bash
npx @chakra-ui/cli snippet add
```

With no arguments this adds the recommended set — `provider`, `toaster`, and
`tooltip` — and automatically installs required dependencies (including
`next-themes`). Use `--all` to add every snippet, or `snippet list` to browse
first.

The CLI detects your framework and writes files to the right place:

| Framework             | Output path          |
| --------------------- | -------------------- |
| Next.js (with `src/`) | `src/components/ui/` |
| Next.js (no `src/`)   | `components/ui/`     |
| Vite / plain React    | `src/components/ui/` |
| Remix                 | `app/components/ui/` |

### Wire up the Provider

**Next.js App Router** (`app/layout.tsx`):

```tsx
import { Provider } from "@/components/ui/provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
```

`suppressHydrationWarning` prevents a mismatch caused by `next-themes` injecting
the color-mode class. Do **not** add `"use client"` to `layout.tsx` — the
generated provider file already has it.

**Next.js Pages Router** (`pages/_app.tsx`):

```tsx
import { Provider } from "@/components/ui/provider"

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
```

**Vite** (`src/main.tsx`):

```tsx
import { Provider } from "./components/ui/provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
```

### Manual Provider (if CLI is unavailable)

If the CLI fails, create `components/ui/provider.tsx` manually and install
`next-themes` separately:

```tsx
"use client"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
```

### Common setup issues

- **Unstyled components** — app is not wrapped in `<Provider>`. Check the import
  path and that `Provider` wraps the component tree.
- **Hydration mismatch** — add `suppressHydrationWarning` to `<html>` in App
  Router.
- **`next-themes` not found** — install it: `npm install next-themes` (only
  needed for the manual fallback; the CLI handles it automatically).
- **`extendTheme` not exported** — this is a v2 pattern. Use `createSystem` in
  v3.

---

## Step 2 — Choose the right layout primitives

Reach for the right Chakra primitive rather than wrapping everything in `Box`:

| Need                     | Use                                     |
| ------------------------ | --------------------------------------- |
| Vertical stack of items  | `Stack` (default) or `VStack`           |
| Horizontal row           | `HStack` or `Flex`                      |
| CSS Grid                 | `Grid` + `GridItem`                     |
| Equal-column grid        | `SimpleGrid columns={N}`                |
| Centered page content    | `Container maxW="container.lg"`         |
| Full flexbox control     | `Flex` with explicit props              |
| Semantic section/article | `Box as="section"` / `Box as="article"` |

Avoid deep nesting. If you're three `Box` levels deep with no semantic reason,
flatten it. Prefer `gap` over margin between siblings.

---

## Step 3 — Use tokens, not raw values

Chakra v3 ships semantic tokens that automatically adapt to light/dark mode.
Prefer them over hard-coded palette values — they make the component theme-aware
without any extra work.

```tsx
// Prefer semantic tokens
<Box bg="bg.subtle" color="fg.default" borderColor="border.subtle" />
<Text color="fg.muted" />
<Box shadow="md" rounded="lg" />

// Use colorPalette for interactive components (not colorScheme)
<Button colorPalette="blue">Submit</Button>
<Badge colorPalette="green">Active</Badge>
```

Use raw palette values (`blue.500`, `gray.100`) only when a specific color is
intentional and should not shift with color mode.

---

## Step 4 — Responsive styles

Chakra uses mobile-first breakpoints. Use array or object syntax consistently:

```tsx
// Array: [base, sm, md, lg, xl]
<Box px={[4, 6, 8]} fontSize={["sm", "md", "lg"]} />

// Object: explicit breakpoints
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} />
<Stack direction={{ base: "column", md: "row" }} gap={4} />
```

Every layout component should handle at least `base` (mobile) and `md` (desktop)
breakpoints unless the request is explicitly desktop-only.

---

## Step 5 — Forms

Use `Field.Root` for all form fields — it wires up label, input, error, and help
text correctly:

```tsx
<Field.Root invalid={!!error} required>
  <Field.Label>Email address</Field.Label>
  <Input type="email" placeholder="you@example.com" />
  <Field.ErrorText>{error}</Field.ErrorText>
  <Field.HelpText>We'll never share your email.</Field.HelpText>
</Field.Root>
```

For form submission state, use `disabled` (not `isDisabled`) on inputs and
buttons. Group related fields in a `Stack gap={4}`.

---

## Step 6 — Accessibility

Chakra's built-in components handle most accessibility automatically — don't
override it. The things you do need to provide:

- **Icon-only buttons**: always add `aria-label`
  ```tsx
  <IconButton aria-label="Close dialog" icon={<CloseIcon />} />
  ```
- **Images**: always pass meaningful `alt` text (or `alt=""` for decorative)
- **Form labels**: use `Field.Label` or ensure `htmlFor` matches the input `id`
- **Interactive custom elements**: if you build something with `onClick` on a
  `Box`, use `as="button"` or an actual `<button>` so keyboard navigation works
- **Semantic headings**: use `h1`–`h6` hierarchy; don't skip levels
- **Color contrast**: don't use light gray text on white backgrounds; rely on
  semantic tokens which are contrast-tested

---

## Step 7 — Next.js: where to add `"use client"`

In Next.js App Router, Server Components are the default. Add `"use client"`
only to files that need it — not to entire layouts or pages.

A component needs `"use client"` when it:

- Uses React hooks (`useState`, `useEffect`, `useContext`, etc.)
- Handles browser events (`onClick` with state, form submission, etc.)
- Uses browser APIs

```tsx
// Server Component — no directive needed
export default function ProductCard({ name, price }: Props) {
  return (
    <Box p={4} borderWidth={1} rounded="md">
      <Text fontWeight="bold">{name}</Text>
      <Text color="fg.muted">{price}</Text>
    </Box>
  )
}

// Client Component — needs the directive
;("use client")
export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false)
  return (
    <Button onClick={() => setAdded(true)} colorPalette="blue">
      {added ? "Added!" : "Add to cart"}
    </Button>
  )
}
```

The goal is to push interactivity to the leaves — keep as much of the tree as
Server Components as possible.

---

## Step 8 — When to extract components, use recipes, and customize the theme

Extract a component when the same structure appears more than twice, or when a
piece is complex enough that naming it makes the parent clearer.

Suggest a **recipe** when a component has meaningful style variants that a
developer would want to customize. Suggest a **slot recipe** for components with
multiple coordinated parts (card with header/body/footer, stat with
label/value/icon, etc.).

For deeper theming work — defining brand color tokens, semantic tokens with dark
mode values, full recipe/slot-recipe authoring, typegen, or ejecting the default
theme — read `references/theming.md` before responding. It covers the complete
`defineConfig` / `createSystem` API with full examples.

For any chart request — bar charts, area charts, line charts, pie/donut charts,
`BarList`, `BarSegment`, or anything involving `@chakra-ui/charts` — read
`references/charts.md` before responding. It covers the `useChart` hook, all
three chart types, Recharts integration, color tokens, and complete runnable
examples.

When you're unsure which component to use, or the user hasn't specified one,
read `references/component-decision-tree.md`. It covers every Chakra component
with guidance on when to choose one over a similar alternative.

---

## Output format

Produce:

1. **Complete, runnable code** — correct imports, no placeholders like `TODO` or
   `...rest of component`
2. **Proper import statements** — group Chakra imports, then local imports
3. **Component separation** — split into multiple components/files if the
   component is complex or contains clearly separable parts
4. **Responsive styles** — at minimum `base` and `md` breakpoints for layout
5. **Brief explanation after the code** — 2–4 sentences on the key decisions
   made (layout approach, accessibility choices, responsive strategy). Skip the
   explanation if the request was trivial.

```tsx
// Good import style
import { Box, Button, Field, Stack, Text } from "@chakra-ui/react"
// Then local
import { SomeLocalComponent } from "./SomeLocalComponent"
```

---

## When to ask first

Build immediately if the request is clear enough to produce something useful.
Ask first when:

- The data shape is unknown and it changes the entire structure (e.g., "build a
  table" — how many columns? what data?)
- There are meaningful design choices the user might care about (layout
  direction, number of columns, color palette)
- The user references files or existing components you haven't seen

When in doubt, state your assumptions at the top of the response and build —
it's faster for the user to redirect from something concrete than from nothing.
