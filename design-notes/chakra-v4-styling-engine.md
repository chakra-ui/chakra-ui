---
title: Chakra v4 Styling Engine
date: 2026-09-05
status: proposed
scope:
  - packages/react/src/styled-system
  - packages/panda-preset
---

# Chakra v4 Styling Engine

## TL;DR

Chakra v4 makes Panda v2 the styling engine and ships `@chakra-ui/react` as a
Panda **design system**. An app opts in with one config field:

```ts
export default defineConfig({
  designSystem: "@chakra-ui/react",
  include: ["./src/**/*.{ts,tsx}"],
})
```

Three consequences follow, and they are the whole note:

- CSS is produced at build time, so no style insertion happens at render.
- The theme is a Panda preset, so no provider is required to read it.
- Chakra publishes what it extracted, so an app never re-scans our source.

This note owns the **engine boundary only** — what replaces the hand-written
styled-system, and which parts of Chakra move as a result. It does not specify
the manifest format, codegen, or overlay resolution; those are Panda-side
contracts, listed under [Upstream contracts](#upstream-contracts).

## Decision

`packages/react/src/styled-system` is a hand-written CSS-in-JS engine — 46
modules covering `css`, `cva`, `sva`, `serialize`, `normalize`, `preflight`, the
`chakra` factory, a token dictionary, and a runtime system object built per app
and passed through React context.

Panda v2 generates all of it. We delete ours and consume Panda's, rather than
adapting one to the other. Chakra keeps the layers it is actually good at:

| layer                    | owner  |
| ------------------------ | ------ |
| state machines           | zag    |
| headless components      | ark-ui |
| design system, React API | Chakra |
| style engine, CSS output | Panda  |

## Why not keep the runtime

The runtime engine is the source of the problems v4 exists to fix:

- **Render cost.** Every styled element serializes and inserts styles at render.
- **SSR/RSC friction.** Style insertion needs a client boundary, so a styled
  element cannot be a Server Component.
- **A mandatory provider.** `ChakraProvider` exists largely to carry the system
  object. Anything reading the theme must sit under it.

None of these are fixable inside a runtime engine. They are properties of doing
the work at render time.

## Scope of this note

Single-scoped, in the sense the other notes are: this note takes the engine swap
from "what replaces the engine" to "what is done", and stops there.

In scope:

- what replaces `packages/react/src/styled-system`
- how the theme is published and how an app extends it
- every area of Chakra that changes as a consequence, each sized as its own unit
  of work

Out of scope, with an owner:

| topic                                                       | owned by                                                                                                                                  |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `designSystem`, `panda/lib.json`, parent-chain resolution   | Panda · [design-system-manifest](https://github.com/chakra-ui/panda/blob/v2/design-notes/design-system-manifest.md)                       |
| build-info hydration, module tree-shaking                   | Panda · [build-info](https://github.com/chakra-ui/panda/blob/v2/design-notes/build-info.md)                                               |
| dual importMap, app-composed styled-system, overlay codegen | Panda · [virtual-styled-system](https://github.com/chakra-ui/panda/blob/v2/design-notes/virtual-styled-system.md)                         |
| Chakra packaging, component metadata, framework aliases     | Panda · [chakra-ui-design-system-migration](https://github.com/chakra-ui/panda/blob/v2/design-notes/chakra-ui-design-system-migration.md) |
| generated artifact families, emission model                 | Panda · [codegen-design](https://github.com/chakra-ui/panda/blob/v2/design-notes/codegen-design.md)                                       |
| JSX tag matching for config recipes                         | [jsx-tracking.md](./jsx-tracking.md)                                                                                                      |
| the opt-in Emotion package                                  | [emotion-opt-in.md](./emotion-opt-in.md)                                                                                                  |
| upstream gaps blocking this work                            | [panda-v2-gaps.md](./panda-v2-gaps.md)                                                                                                    |

## Upstream contracts

The Panda-side notes above are the authority for anything they cover. Where this
note shows a manifest field or an alias, it is illustrative — if the two
disagree, Panda's note wins.

Two of them are load-bearing here:

- [chakra-ui-design-system-migration](https://github.com/chakra-ui/panda/blob/v2/design-notes/chakra-ui-design-system-migration.md)
  specifies the Chakra package shape, the manifest, component metadata, and the
  runtime/type/extraction resolution layers. This note assumes that design and
  does not restate it.
- [codegen-design](https://github.com/chakra-ui/panda/blob/v2/design-notes/codegen-design.md)
  is the model for how a single feature is specified end-to-end. It is the shape
  each area below should reach before it is built.

## What replaces the engine

Panda codegen produces the runtime Chakra imports:

```txt
css/        css, cva, sva, cx
recipes/    one module per config recipe
patterns/   stack, hstack, flex, center, ...
jsx/        the factory, createRecipeContext, createSlotRecipeContext
tokens/     token + colour-palette access
types/      SystemStyleObject and friends
```

Chakra component source imports only from the styled-system package root, never
a relative path:

```tsx
import { css, cx } from "@chakra-ui/styled-system/css"
import { button } from "@chakra-ui/styled-system/recipes"
```

The same specifier resolves two ways. In our repo and in a default install it is
the published package. In a Panda-aware app it is mapped to the app's generated
output, so app-added tokens and variants are what the component actually gets —
in CSS and in types.

## Areas of Chakra that change

Each row is a unit of work: one concern, shippable and verifiable alone. Order
is dependency order, not priority.

### 1. Theme → preset

`packages/react/src/theme` is the source of truth today;
`@chakra-ui/panda-preset` is generated from it via `theme:eject` / `theme:sync`.
Under the design system the preset is what ships, so the sync direction and the
drift risk both need settling — that generation step is already known to drop
registrations.

**Done when:** one source of truth, and a check that fails if a recipe file
exists without being registered.

### 2. Recipes become config recipes

19 recipes and 57 slot recipes. Panda emits stable class names from a
`className` field rather than hashing at runtime, which makes them a build-time
artifact and introduces tag matching as a real concern.

**Done when:** every recipe emits CSS for the tags Chakra actually exports. See
[jsx-tracking.md](./jsx-tracking.md).

### 3. The factory

`factory.tsx` becomes Panda's generated factory. Behaviour to preserve: `as`,
`asChild`, style props, `unstyled`, `shouldForwardProp`. `asChild` is the one
that does not survive as-is — Ark v6 replaces it with a `render` prop, which is
the moment to drop it from the factory.

**Done when:** `chakra.div` and `chakra("button", recipe)` cover current usage.

### 4. Layout primitives → patterns

`Box`, `Flex`, `Stack`, `HStack`, `VStack`, `Center`, `Grid`, `Container`. Panda
patterns extract statically. Each needs a decision: pattern, or a re-export over
the factory.

**Done when:** each primitive is one or the other, deliberately.

### 5. The key-based recipe registry

`useRecipe({ key })` / `useSlotRecipe({ key })` look recipes up on the system
object at render. Static per-recipe imports replace them, which is also what
makes unused recipes tree-shake. Deletes `use-recipe.ts`, `use-slot-recipe.ts`,
and `generated/recipes.gen.ts` (48KB of it).

**Done when:** no component resolves a recipe by string key.

### 6. Components

119 component directories. Single-recipe components are mechanical. Slot
components are blocked upstream — Panda's generated `createSlotRecipeContext`
exposes `withProvider` / `withContext` / `withRootProvider`, but not `useStyles`
or `wrapElement`, which our slot components rely on.

**Done when:** the upstream gap closes, then in batches by component family.

### 7. The client boundary

145 files carry `"use client"`. The generated factory needs no directive; the
recipe-context helpers do, because they use React context. So a component is a
Server Component unless it genuinely needs context — and the barrel currently
prevents that from mattering, since one import pulls the whole client graph.

**Done when:** a page importing Chakra ships only the client code it uses.

### 8. The provider

`ChakraProvider` + `createSystem` exist to build and carry the system object.
With the theme in config there is nothing to carry. Colour mode stays: the
`.dark` class still needs setting, semantic tokens do the rest.

**Done when:** a styled component renders correctly with no provider above it.

### 9. Distribution

Chakra CI publishes the generated styled-system, the preset, and the build info.
Apps need runtime aliases and TypeScript paths for the styled-system root —
Vite, Next webpack, and Next Turbopack each differ. Shape and generation are
specified in the Panda migration note.

**Done when:** one documented line of app setup per framework.

### 10. Everything downstream

`@chakra-ui/charts` (recharts today), `@chakra-ui/cli` (theme typegen, which
Panda codegen replaces), `@chakra-ui/codemod` (needs a v3 → v4 path), the docs
site, and the sandboxes.

**Done when:** each has migrated or has an issue saying why it hasn't.

## Consumer DX

Extending the theme is config, not a provider:

```ts
export default defineConfig({
  designSystem: "@chakra-ui/react",
  theme: {
    extend: {
      tokens: {
        colors: { brand: { 500: { value: "#3b82f6" } } },
      },
      recipes: {
        button: {
          variants: {
            variant: { marketing: { bg: "brand.500", color: "white" } },
          },
        },
      },
    },
  },
})
```

App code is unchanged Chakra, and both the CSS and the types reflect the merged
config:

```tsx
<Button colorPalette="brand" variant="marketing" />
```

## Non-goals

- **Zero runtime.** Chakra still ships React components, Ark integration,
  contexts, prop splitting, and class composition. The goal is no style
  _insertion_ at render, not no JavaScript.
- **Emotion removed from the world.** It leaves the core; it comes back as an
  opt-in package for anyone who wants it. See
  [emotion-opt-in.md](./emotion-opt-in.md).

## Open questions

1. Does `@chakra-ui/panda-preset` become `@chakra-ui/theme`, with
   `@chakra-ui/react` as the design system? Panda's docs draw exactly that line
   between shipping a preset and shipping a design system.
2. Does the styled-system package keep its own codegen, or does the app generate
   everything?
3. What replaces `*PropsProvider`? It is a `React.Provider` taking
   `value={{ … }}`, which build-time extraction cannot see. Panda's own provider
   takes variant props directly.
4. How much component metadata can be derived from our source conventions rather
   than hand-maintained?

## Definition of done

- `packages/react/src/styled-system` is deleted; nothing hand-written generates
  CSS.
- `designSystem: "@chakra-ui/react"` resolves the preset, build info, and
  styled-system root, with no hand-written `importMap`.
- An app adds `colors.brand` and `<Button colorPalette="brand" />` is correct in
  CSS and in types.
- An app adds `button.variant.marketing` and `<Button variant="marketing" />` is
  correct in CSS and in types.
- A styled component renders in a Server Component with no provider.
- No `@emotion/*` in the dependency tree of `@chakra-ui/react`.
- Vite, Next webpack, and Next Turbopack each have documented setup.
