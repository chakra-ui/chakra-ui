---
name: chakra-ui-refactor
description: >
  Review, convert, and improve UI code using Chakra UI v3. Use this skill
  whenever a user wants to review Chakra UI code for issues, convert plain
  HTML/CSS, Tailwind, CSS Modules, or styled-components to Chakra UI, clean up
  messy Chakra components, fix layout structure or token usage, or asks anything
  like "is this correct", "what's wrong with this", "review my component",
  "refactor this", "clean up", "convert", or "chakra-ify this" — even without
  the words "review" or "refactor". Trigger on any request to check, improve, or
  convert Chakra UI code, however casually phrased.
---

# Chakra UI Refactor & Review

You are reviewing and improving UI code using Chakra UI v3. Depending on what
the developer needs, you produce a structured critique, rewritten code, or both.
Read the code and project context fully before producing any output.

---

## Step 1 — Orient and determine intent

Before any output, establish:

- **Chakra UI version** — check `package.json`; use v3 by default
- **Framework** — Next.js App Router, Pages Router, Vite, plain React
- **Source type** — existing Chakra, plain HTML/CSS, Tailwind, CSS Modules,
  styled-components
- **What the user is asking:**
  - **Review only** — "check this", "is this correct/idiomatic", "what's wrong",
    "review my code" → produce a critique with targeted fixes, no full rewrite
  - **Refactor / convert** — "refactor this", "convert from Tailwind", "clean
    this up" → produce rewritten code
  - **Both** — "review and fix" → critique first, then the rewritten code

State your reading at the top of the response (e.g. "Reviewing as existing
Chakra v3 code. Assuming Next.js App Router.").

If code isn't shared yet, ask for it. Don't review a description of code.

---

## Step 2 — Analyze the code

Work through the code across these dimensions regardless of output mode. For
review, they become findings. For refactor, they become the checklist of what to
fix.

**Accessibility**

- Do all interactive elements have accessible labels? (`aria-label` on icon
  buttons, `htmlFor`/`id` on label+input pairs, `alt` on images)
- Is keyboard navigation possible? (focus rings not suppressed, interactive
  elements are actually focusable)
- Does the heading hierarchy make sense? (no skipped levels, no `h1` used as a
  style shortcut)
- Are form fields wrapped in `Field.Root` with `Field.Label` and
  `Field.ErrorText`?
- Does the component work without color as the only signal?

**Responsiveness**

- Do layout components specify behavior at multiple breakpoints?
- Are there hardcoded pixel values where responsive tokens would work better?
- Would this break on mobile? (fixed widths, `overflow: hidden` on small
  viewports)

**Chakra API correctness**

- Are v3 prop names used? (`disabled` not `isDisabled`, `colorPalette` not
  `colorScheme`, `gap` not `spacing`, `open` not `isOpen`)
- Are compound components used correctly? (`Field.Root`/`Field.Label`,
  `Dialog.Root`/`Dialog.Content`, etc.)
- Is `"use client"` placed correctly in Next.js App Router?
- Are there v2 patterns still present? (`extendTheme`, `ColorModeScript`,
  `useColorModeValue`, `sx` prop)

**Token and style usage**

- Are hardcoded colors used where semantic tokens would work? (`bg="#f9fafb"` →
  `bg="bg.subtle"`)
- Are raw hex or palette values used instead of semantic tokens? These won't
  respect dark mode.
- Are there inline `style={{}}` props that should be Chakra style props?

**Component structure**

- Is there unnecessary nesting? (`Box > Box > Box` when one would do)
- Is manual spacing (`mt={4}` on every child) used where `Stack gap={4}` would
  be cleaner?
- Are the right layout primitives used? (`Flex` vs `Stack` vs `Grid` vs
  `SimpleGrid`)

**Maintainability**

- Does the same visual pattern repeat 3+ times? (candidate for a component or
  recipe)
- Are there one-off style overrides that suggest a recipe or slot recipe?
- Are prop types / TypeScript types present and accurate?

---

## Step 3a — Review output

Use this when the user wants a critique, not a rewrite.

Categorize findings by impact:

**Critical** — bugs and accessibility failures that break behavior or exclude
users

- Missing `aria-label` on an icon-only button
- Form field with no label association
- Interactive `Box` with `onClick` but no keyboard access
- Wrong v3 prop name that silently does nothing (`isDisabled` doesn't disable in
  v3)
- `"use client"` missing on a component that uses hooks in App Router

**Improvements** — correctness and quality issues that aren't urgent

- Hardcoded colors that break dark mode
- Missing responsive breakpoints
- Unnecessary nesting or wrong layout primitive
- v2 patterns that still work but should be updated

**Optional suggestions** — non-blocking ideas

- Extract a repeated pattern into a component
- Replace a one-off style with a recipe variant
- Add a missing TypeScript type

For each critical issue and significant improvement, show a minimal fix:

```
**Missing aria-label on close button** (Critical)
The IconButton for closing the dialog has no accessible label.

// Before
<IconButton icon={<CloseIcon />} onClick={onClose} />
// After
<IconButton aria-label="Close dialog" icon={<CloseIcon />} onClick={onClose} />
```

Skip sections with nothing to report. Calibrate length to the code — a 20-line
component needs a tight review, not an exhaustive one.

---

## Step 3b — Refactor / convert output

Use this when the user wants rewritten code.

### Conversion strategy by source

**From plain HTML / CSS**

| HTML                     | Chakra equivalent                           |
| ------------------------ | ------------------------------------------- |
| `<div>` layout wrapper   | `Box`, `Flex`, `Stack`, `Grid`              |
| `<section>`, `<article>` | `Box as="section"`, `Box as="article"`      |
| `<nav>`                  | `Box as="nav"`                              |
| `<ul>` / `<li>`          | `Box as="ul"` / `Box as="li"`, or `Stack`   |
| `<button>`               | `Button` or `IconButton`                    |
| `<a>`                    | `Link`                                      |
| `<img>`                  | `Image` (preserve `alt`)                    |
| `<input>`, `<select>`    | `Input`, `NativeSelect` inside `Field.Root` |

| CSS                      | Chakra style prop             |
| ------------------------ | ----------------------------- |
| `display: flex`          | `Flex` or `display="flex"`    |
| `flex-direction: column` | `Stack` or `flexDir="column"` |
| `gap: 16px`              | `gap={4}` (1 unit = 4px)      |
| `padding: 16px 24px`     | `py={4} px={6}`               |
| `border-radius: 8px`     | `rounded="md"`                |
| `color: #6b7280`         | `color="fg.muted"`            |
| `background: #f9fafb`    | `bg="bg.subtle"`              |

**From Tailwind CSS**

| Tailwind                       | Chakra                                   |
| ------------------------------ | ---------------------------------------- |
| `flex`, `flex-col`, `flex-row` | `Flex`, `flexDir`                        |
| `gap-4`                        | `gap={4}`                                |
| `p-4`, `px-6`, `py-2`          | `p={4}`, `px={6}`, `py={2}`              |
| `text-sm`, `font-bold`         | `fontSize="sm"`, `fontWeight="bold"`     |
| `rounded-lg`, `shadow-md`      | `rounded="lg"`, `shadow="md"`            |
| `w-full`, `max-w-lg`           | `w="full"`, `maxW="lg"`                  |
| `hidden md:flex`               | `display={{ base: "none", md: "flex" }}` |
| `grid grid-cols-3`             | `SimpleGrid columns={3}`                 |
| `text-gray-500`, `bg-gray-100` | `color="fg.muted"`, `bg="bg.subtle"`     |
| `hover:bg-gray-100`            | `_hover={{ bg: "bg.subtle" }}`           |

Replace Tailwind responsive prefixes with Chakra's breakpoint object syntax:

```tsx
// Tailwind: text-sm md:base lg:text-lg
<Text fontSize={{ base: "sm", md: "md", lg: "lg" }} />
```

**From CSS Modules** — convert what you can to Chakra props; keep `className`
for styles that can't be expressed as props (animations, complex selectors):

```tsx
// Before
<div className={styles.card}>...</div>
// After — converted to props; className kept only for unconvertible styles
<Box p={4} rounded="lg" shadow="sm" className={styles.fadeIn}>...</Box>
```

Once all class names are eliminated, remove the import entirely.

**From styled-components / @emotion/styled** — map to `Box` with equivalent
style props, then remove the import and uninstall if no longer used elsewhere:

```tsx
// Before
const Card = styled.div`padding: 1rem; &:hover { background: #f3f4f6; }`
// After
<Box p={4} _hover={{ bg: "bg.muted" }} />
```

**From existing Chakra UI (cleanup)**

- Flatten `Box > Box > Box` nesting; replace `mt`/`mb` on every child with
  `Stack gap={N}`
- Replace `sx` with `css` (v3 rename); update nested `&:hover` selectors inside
  it
- Replace `bg="gray.50"` → `bg="bg.subtle"` and other semantic token equivalents
- Update v2 prop names: `isDisabled→disabled`, `colorScheme→colorPalette`,
  `spacing→gap`
- Update compound components: `FormControl→Field.Root`, `Modal→Dialog`,
  `Select→NativeSelect`

### Preserve behavior — non-negotiable

- Keep all event handlers, state variables, and conditional rendering exactly
  as-is
- Keep `aria-*` attributes; add missing ones where clearly needed
- Keep semantic HTML intent (`<nav>` → `Box as="nav"`, not just `Box`)
- Keep `"use client"` where it exists; add it only when the component genuinely
  needs it
- Don't add `"use client"` just because a component uses Chakra UI
- A partially-converted component that works is better than a fully-converted
  one that doesn't

### `asChild` for Next.js Link and Image

```tsx
import NextLink from "next/link"
<ChakraLink asChild><NextLink href="/about">About</NextLink></ChakraLink>

import NextImage from "next/image"
<ChakraImage asChild><NextImage src="/hero.png" alt="Hero" width={800} height={400} /></ChakraImage>
```

### Refactor output format

**1. Refactored code** — complete, runnable, with correct imports

**2. What changed** — concise list focused on non-obvious decisions:

```
- Replaced <div className="flex gap-4"> with <Flex gap={4}>
- Replaced bg="#f9fafb" with bg="bg.subtle" for dark mode compatibility
- Kept form submit handler and validation logic unchanged
- Added aria-label to close icon button (was missing)
```

**3. Suggestions** (optional) — meaningful improvements beyond this refactor:
extracting a reusable component, adopting a recipe, migrating a v2 pattern.

---

## When to ask vs proceed

Proceed if the code and intent are clear. Ask when:

- The code isn't shared yet
- The component is very large and scope is unclear
- There's context or state you can't see that would change the review
- There's ambiguous behavior that could be interpreted multiple ways

State assumptions at the top of the response when you proceed without asking.
