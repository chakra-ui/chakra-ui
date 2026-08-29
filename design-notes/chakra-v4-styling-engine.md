# Chakra v4 · Styling Engine (Panda, zero Emotion)

## Decision

Chakra v4 uses **Panda v2 as its only styling engine**. There is no Emotion in
the core and no runtime styling-engine adapter. CSS is produced at build time by
Panda's extractor; Chakra components emit deterministic class names, never
runtime style insertion.

Emotion is not removed from users — it becomes an **opt-in package**
(`@chakra-ui/emotion`), following Mantine's model. If a consumer never installs
it, it is never in the bundle.

Packaging mirrors the Panda-side design
([chakra-ui-design-system-migration.md](https://github.com/chakra-ui/panda/blob/v2/design-notes/chakra-ui-design-system-migration.md)):

```txt
@chakra-ui/react            # user-facing React components
@chakra-ui/styled-system    # Chakra's default generated Panda runtime, preset, build info
```

`@chakra-ui/react` depends on `@chakra-ui/styled-system` (not a peer dep —
Chakra owns the default styled-system; users do not install or version it).
Components import styling helpers from the package root:

```ts
import { css, cx } from "@chakra-ui/styled-system/css"
import { stack } from "@chakra-ui/styled-system/patterns"
import { button } from "@chakra-ui/styled-system/recipes"
```

In a Panda-aware app, Panda composes one final `styled-system` from the Chakra
preset + any upstream design-system presets + app config, and the app maps
`@chakra-ui/styled-system/*` → `./styled-system/*` so app-added tokens/variants
win.

## Motivation

This is runtime elimination, not engine shopping. Emotion's runtime insertion
has been a long-standing cost — perf, SSR/RSC friction, and a mandatory provider
— and v4 is the breaking window to end it. Prior art exists: projects have
migrated from Emotion to Panda for exactly these reasons, and Chakra wants the
same outcome. This framing is what settles the adapter question: a runtime
styling-engine adapter keeps Emotion a first-class runtime engine and therefore
preserves the very cost v4 exists to remove. The only path that actually ends
the runtime is a single build-time engine with Emotion as an additive opt-in
(see [emotion-opt-in.md](./emotion-opt-in.md)).

This is also co-design, not adaptation. Much of Panda v2 — the `designSystem`
key, the manifest, build-info — was built with Chakra v4 as the driving use
case. The fit between Chakra-as-design-system and Panda v2 is intentional on
both sides, so the packaging shape below is a contract the two projects shaped
together, not a constraint Chakra is bending to.

## Canonical Scope

This note is the Chakra-specific engine design. The generic packaging/resolution
contracts it builds on are owned Panda-side:

- Design-system manifest, `designSystem`, parent-chain resolution → the Panda
  migration note (linked above).
- Build-info hydration and module/export tree-shaking → Panda `build-info`.
- Dual `importMap`, app-composed `styled-system`, overlay codegen → Panda
  `virtual-styled-system`.

Keep this note focused on: the engine choice and why not an adapter, the
component refactor (patterns / recipes / the extraction boundary), the Emotion
removal path, the runtime direction, and the current POC status.

## Why This Shape

Panda is the engine, not one engine behind a seam. Everything else follows from
that:

- **No adapter, no runtime branch.** Nothing resolves the engine from React
  context, so no styled call carries a runtime check and the bundler never ships
  two engines. An adapter-based alternative (explored in the fork PR
  [isBatak/chakra-ui#12](https://github.com/isBatak/chakra-ui/pull/12)) lets
  Emotion and Panda coexist, but that seam forces both engines into the bundle
  and a runtime check on every styled call. The tree-shaking wall there is
  structural, not a bug — and a `'use panda'`-style directive would only mask a
  problem the seam creates. Removing the seam removes the problem.
- **Static per-recipe imports, not a name registry.** `button` imports its own
  recipe module, so unused recipes tree-shake out. A `recipe("button")` string
  registry defeats this because the bundler must retain every registered recipe.
- **Emotion opt-in package.** With no engine to switch, there is nothing to
  tree-shake and no directive to write. `@chakra-ui/emotion` exists only for
  users who opt back in.
- **CSS must be derivable from a definition.** Style props, recipes, and
  patterns each give a static definition to extract from. Anything computed
  inside a component at render is invisible to the extractor — the rule that
  drives the entire component refactor.

## Package Setup

`@chakra-ui/react` component source imports **only package-root** styled-system
specifiers (`@chakra-ui/styled-system/{css,recipes,patterns,jsx}`) — never
relative paths — so a Panda app can remap them to its composed output. Chakra's
own repo, tests, and Storybook resolve the same specifiers to the shipped
default styled-system.

The default styled-system is generated from:

```txt
@chakra-ui/panda-preset      # Chakra's theme: tokens, recipes, slot recipes, patterns
+ defaultBaseConfig          # Chakra's base: utilities (bg/gapX/logical radii) + conditions
```

Neither `@pandacss/preset-base` nor `@pandacss/preset-panda` is used — Panda v2
does not auto-include them, and Chakra already provides a _wider_ base (see
"What We Tried").

## Consumer App DX

```bash
npm i @chakra-ui/react            # styling engine included; no styled-system to manage
npm i @chakra-ui/emotion          # only if you want Emotion back
```

```ts
// one plugin bundles the Panda config: Chakra base, jsxFactory, importMap, source scoping
import { chakra } from "@chakra-ui/react/vite"

export default { plugins: [chakra(), react()] }
```

- **No provider required for styling.** Base primitives render correctly
  server-side with zero client JS for CSS. A client provider is needed only for
  genuinely dynamic concerns (color mode, direction, Ark environment).
- **Unchanged authoring.** `<Box mt="4">`, `<Button variant="solid">`,
  `<Stack gap="4">` work exactly as today; the difference is the CSS is
  extracted at build time.

## The Styling Model

Three sources, all statically extractable, plus a runtime remainder that emits
no CSS:

| Source       | Example                                                     | Extracted from               |
| ------------ | ----------------------------------------------------------- | ---------------------------- |
| Style props  | `<chakra.div bg="red.500" mt="4">`                          | app JSX                      |
| Recipes      | `<Button variant="solid">`                                  | recipe definition + app JSX  |
| Patterns     | `<Stack gap="4">`                                           | pattern definition + app JSX |
| Runtime only | color mode, `asChild`, Ark state, `Stack` separator cloning | — (no CSS)                   |

## The Extraction Boundary

Build-time extraction reads the **app's** source. Raw style props and recipes
are literal there, so they extract. Composite components that style themselves
**at runtime** are invisible: `Stack` renders `<chakra.div display="flex" …>`,
`Flex` builds a `css` object, `Center` uses an inline cva — so `<Stack gap="4">`
emits only `gap_4`, never the `display:flex` the component applies, and layout
silently breaks.

Resolution, by component kind:

- **Layout primitives → Panda patterns.** The pattern owns styling and extracts
  statically (via the preset pattern + `importMap.patterns`); the component
  keeps only genuine runtime logic. Once `<Stack>` is pattern-recognized, the
  component implementation is decoupled from extraction — which is why most
  layout components collapse to re-exports or thin wrappers.
- **Recipe / slot-recipe components → generated recipes.** Full CSS is generated
  from the recipe definition regardless of which variants an app uses.
- **Genuinely dynamic** stays runtime and emits no CSS.

### Component Refactor Map

- **Delete → re-export the generated pattern** (no extra API/logic): `Box`,
  `Spacer`, `Square`, `Circle`, `AspectRatio`, `Bleed`, `Float`,
  `VisuallyHidden`, `LinkOverlay`, `Wrap`, `Grid`/`GridItem`, `Container`.
- **Slim to a thin wrapper**: `Flex`/`Center` (done), `Stack`/`HStack`/`VStack`
  (pattern + separator), `Group`.
- **Recipe track**: `Button` (done); slot-recipe components (`Alert`, `Dialog`,
  `Menu`, …) move to generated slot recipes + `createSlotRecipeContext`.

## Resolution Plan

Three resolution layers, following the Panda migration note.

### Extraction

Panda `importMap` lists every styled-system package root so the extractor
recognizes imports from Chakra source, upstream design-system source, and app
source:

```ts
importMap: ["@chakra-ui/styled-system", "styled-system"]
```

### Runtime

The `@chakra-ui/react/vite` plugin maps the package root to the app's generated
output (`@chakra-ui/styled-system/* -> ./styled-system/*`); Next
webpack/Turbopack use the equivalent alias config.

### Types

TypeScript `paths` must match the runtime alias, or app-added variants/tokens
will resolve to the default declarations and fail to type-check:

```jsonc
{
  "compilerOptions": {
    "paths": { "@chakra-ui/styled-system/*": ["./styled-system/*"] },
  },
}
```

## Component Metadata

Build info alone is not enough: Chakra source does not contain consumer-selected
props (`<Button size="sm" variant="outline" mt="4" />`). Chakra publishes
`panda.components.json` mapping exports to recipes, patterns, slot recipes, and
style-prop support, so Panda can extract Chakra JSX usage from app source:

```jsonc
{
  "Button": {
    "kind": "recipe",
    "recipe": "button",
    "element": "button",
    "styleProps": true,
  },
  "Stack": { "kind": "pattern", "pattern": "stack", "styleProps": true },
  "Accordion": {
    "kind": "namespace",
    "members": {
      "Root": {
        "kind": "slotRecipe",
        "recipe": "accordion",
        "slot": "root",
        "styleProps": true,
      },
    },
  },
}
```

## Runtime Direction

The goal is **not zero runtime** — Chakra still needs React components, Ark
integration, contexts, polymorphism, `asChild`, prop splitting, and class
composition. The goal is **no runtime style insertion**:

```txt
render component
  -> split props
  -> generated recipe/pattern runtime returns class names
  -> generated css runtime returns deterministic atomic class names
  -> compose className
  -> no Emotion insertion
```

CSS comes from: Chakra build-info hydration, app extraction of Chakra JSX usage,
app extraction of direct styled-system usage, and static CSS / safelists for
intentionally dynamic cases.

## Build Responsibilities

Chakra CI produces:

1. `@chakra-ui/styled-system` generated runtime files.
2. `@chakra-ui/styled-system/panda.preset` + `panda.buildinfo.json`.
3. `@chakra-ui/react/panda.manifest.json` + `panda.components.json`.

And on top of Panda's generic app build responsibilities:

- Component source imports only package-root styled-system specifiers.
- Component metadata maps Chakra exports → recipes / patterns / slot recipes /
  style-props.
- Runtime aliases + TypeScript paths documented/automated for Vite, Next
  webpack, Turbopack.

## Emotion Removal / Opt-in

- Core `@chakra-ui/react` ships no Emotion; the static factory composes class
  names only.
- `@chakra-ui/emotion` is the opt-in package for users who want runtime Emotion
  styling back (Mantine model). It is additive and never in the default bundle.

## POC Status

Proven in a Vite sandbox (`sandbox/vite-ts`) with **0 `@emotion`/`insertStyles`
in the built output** and no provider:

- Style props, `Button` (recipe + static per-recipe import), and
  `Stack`/`HStack`/`VStack`/ `Flex`/`Center` (patterns) all extract and render
  at build time.
- Tree-shaking confirmed: unused recipes (badge/alert/accordion) absent when the
  app only uses Button.
- `packages/react` typechecks at 0 errors, no `as any`, no `@ts-ignore` in
  styling code.

## What We Tried and Rejected

- **Runtime StyledEngine adapter** — runtime check + both engines bundled;
  tree-shaking wall is structural. Dropped the seam entirely.
- **`@pandacss/preset-base` as the base** — narrower than Chakra's base (missing
  `gapX`/ `gapY`, logical radii, `_notLast`, color-mix transforms). Use
  `defaultBaseConfig`.
- **`staticCss` for layout** — worked but doesn't scale; replaced by patterns.
- **Full re-point of `UtilityConfig` to Panda's type** — Panda's
  mapped-over-`LiteralUnion` type kills inline-transform inference (~40
  implicit-anys). Kept Chakra's plain-index `UtilityConfig` built on Panda's
  leaf types.
- **Deleting the token-dictionary/utility/conditions cluster** — collapsed the
  type layer; reverted. Only `css`/`cva`/`sva` were swapped for the generated
  runtime.

## Open Questions

1. Should Chakra publish the generic `panda.lib.json`, or a Chakra wrapper
   manifest pointing at `@chakra-ui/styled-system`?
2. How much of `panda.components.json` can be generated from Chakra source
   conventions?
3. Contract for **dynamic style props** (`<Flex direction={expr}>`) — runtime
   pattern fn fallback + static CSS/safelist coverage.
4. **ClassName single source** — the 72 recipe classNames were hand-prefixed
   `chakra-` to match the runtime; a single generated source removes the drift
   risk.
5. Panda-side friction (v2 base/preset not auto-included, array-condition
   removal, pattern `jsxName` capitalization, inline-transform inference) —
   tracked in the Panda v2 gaps note.
6. Preset build landmine: `pnpm build` on `@chakra-ui/panda-preset` runs
   `clean && theme`; `theme` fails on an undici env bug _after_ `clean` deletes
   ejected src. Build directly with `tsx scripts/build/main.ts --dts` until
   fixed.

## Definition of Done

- `@chakra-ui/react` depends on `@chakra-ui/styled-system`; components import
  style helpers from the package root.
- `designSystem: "@chakra-ui/react"` resolves Chakra preset, build info,
  component metadata, and styled-system package root.
- Layout primitives are patterns; recipe/slot-recipe components use generated
  recipes.
- Zero Emotion in the core bundle; `@chakra-ui/emotion` opt-in restores runtime
  Emotion.
- Base primitives render RSC-friendly with no client provider for styling.

## Related

- [Panda: Chakra UI as a Panda v2 Design System](https://github.com/chakra-ui/panda/blob/v2/design-notes/chakra-ui-design-system-migration.md)
  — target packaging, `designSystem`, manifest, resolution contracts.
- Panda v2 gaps found wiring this up — local note for the Panda team
  (`../panda/design-notes/chakra-v4-panda-v2-gaps.md`).
