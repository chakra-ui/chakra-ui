# Panda v2 · Gaps & Friction (from wiring Chakra v4)

## Summary

The sharp edges hit while making `@chakra-ui/react` use Panda v2's generated
`css`/`cva`/`sva` + factory as its engine (zero Emotion), with Panda's generated
types as the single source of truth. Each item is either something Panda v2
should fix/ease, or a migration edge worth a codemod or doc. This is the
companion to the v4 engine design
([chakra-v4-styling-engine.md](./chakra-v4-styling-engine.md)); items here are
the dependencies and friction that design assumes.

## 1. No auto base/preset in v2

v2 no longer auto-includes the base + default theme; configs must list
`presets: ['@pandacss/preset-base', '@pandacss/preset-panda']` explicitly.

Chakra ships its **own** base (`defaultBaseConfig`) and theme
(`@chakra-ui/panda-preset`), so it needs neither Panda preset. But this means a
Chakra consumer's `panda.config` must know to pull in Chakra's base rather than
Panda's. Chakra's preset should bundle/expose its base so a consumer lists
exactly one preset (`@chakra-ui/react` designSystem) and gets everything.

## 2. Array-form conditions removed

v2 rejects v1 array conditions (`config_condition_array_unsupported`):

```ts
// v1 (nested media + selector)
hover: ["@media (hover: hover)", "&:is(:hover, [data-hover])..."]
// v2 — block form with @slot
hover: { "@media (hover: hover)": { "&:is(:hover, [data-hover])...": "@slot" } }
```

Chakra's base had exactly one (`hover`). The error is clear, but the common
"media + selector" nesting is verbose to hand-convert. A codemod, or continued
acceptance of the 2-element `[atRule, selector]` array as sugar for the block
form, would smooth v1→v2.

## 3. Utility type kills inline-transform inference

`UtilityConfig = { [k in LiteralUnion<CssProperty>]?: PropertyConfig }` (mapped
type over a `LiteralUnion`) does **not** propagate contextual typing to inline
`transform(value, args)` params — preset authors writing transforms inline get
`TS7006 implicitly-any` on every `value`/`args`. A plain string index signature
(`{ [k: string]: PropertyConfig }`) preserves inference.

Worked around by keeping Chakra's plain-index `UtilityConfig` but building it on
Panda's leaf types (`PropertyTransform`, `TransformArgs`, `PropertyValues`).
Panda could expose an authoring type that keeps inline-transform inference, or
document that inline transforms need explicit param annotations.

## 4. `@pandacss/types` not re-exported from `@pandacss/dev`

`@pandacss/dev` re-exports only `Config`, `Preset`, `UserConfig`. The leaf
authoring types (`PropertyConfig`, `PropertyTransform`, `TransformArgs`,
`PropertyValues`, `TransformUtils`, `ColorMixResult`) require a direct
dependency on `@pandacss/types`. Consider re-exporting the common authoring
types from `@pandacss/dev` so presets don't need the extra dep.

## 5. `container` recipe vs pattern name conflict

Including `@pandacss/preset-base` raised `config_artifact_name_conflict` because
its `container` **pattern** collides with Chakra's `container` **recipe**.
Avoided by not using preset-base. If Chakra keeps any Panda patterns, patterns
and recipes need a shared namespace check (or per-kind prefixes).

## 6. Missing-token warnings surface late

`@chakra-ui/panda-preset` references `black` in `semanticTokens.shadows.*` with
no `black` token defined → `config_token_missing_reference` warnings at codegen.
(Chakra-side fix, noted for completeness — the warning is easy to miss in
codegen output.)

## 7. Composite components are invisible to static extraction

Build-time extraction reads the **app's** source. Raw style props
(`<chakra.div bg="red.500">`) and recipes (`<Button variant="solid">`) extract
perfectly — they're literal in the user's JSX. But composite components that
style themselves **at runtime** are not: `Stack` renders
`<chakra.div display="flex" flexDirection={direction} gap={gap}>` internally, so
scanning `<Stack gap="4">` emits only `gap_4` — never the
`display:flex`/`flex-direction` the component applies. Result: `gap` has no flex
container and no-ops; layout silently breaks.

Inherent to build-time extraction, not a Panda bug — but it decides the v4
architecture for layout/composite primitives. Options:

- **Make them Panda patterns.** Panda ships
  `box`/`flex`/`stack`/`hstack`/`vstack` patterns that extract statically by
  design. Chakra's layout primitives map to (or re-export) these.
- **Ship pre-extracted library CSS.** Run Panda over `@chakra-ui/react`'s own
  source at library build time; the app then only extracts its own usage.
- **`staticCss` (app-side stopgap).** Force-emit the structural styles; doesn't
  scale.

Recipes sidestep this because their full CSS is generated from the recipe
definition regardless of which variants the app uses — the same guarantee
patterns give layout.

**Chosen path (implemented):** define `stack`/`hstack`/`vstack` patterns in
`@chakra-ui/panda-preset` + `importMap.patterns: "@chakra-ui/react"`, so
`<Stack>` / `<HStack>` extract statically; the pattern owns styling, the
component keeps runtime separator/children logic.

## 8. Generated `createSlotRecipeContext` is narrower than Chakra's slot components need

Panda's generated `createSlotRecipeContext(recipe)` returns only
`{ withRootProvider, withProvider, withContext }`. Standard slot components port
cleanly on that — `Card` (root/header/body/footer/title/description, all plain
`withProvider`/`withContext`) works end to end with a static per-recipe import
(`import { card } from "@chakra-ui/styled-system/recipes/card"`), extracts its
slot CSS, and tree-shakes (unused slot recipes stay out). But Chakra's richer
slot components rely on API the generated context doesn't expose:

- **`useStyles()`** — a hook to read the resolved slot styles inside a custom
  sub-component. `Alert`'s `AlertIndicator` reads `styles.indicator` to style a
  status icon it renders itself. The generated context stores slots in an
  internal React context but exposes no hook to read them.
- **`wrapElement(element, props)`** — wrap the provider root in extra context.
  `Alert` wraps its root in `AlertStatusProvider` so the indicator can read
  `status`.
- **`PropsProvider`** — a subtree default-props provider
  (`<CardPropsProvider>`), re-exported per slot component today.
- **`forwardAsChild`** — asChild forwarding on the provider root.

Options: Panda exposes
`useStyles`/`wrapElement`/`PropsProvider`/`forwardAsChild` on the generated
context, or Chakra keeps a thin `createSlotRecipeContext` binding that adds them
over the generated recipe object (still a static import, so still
tree-shakeable). The latter is consistent with the seam elsewhere — engine
(recipe definition + `sva`) from Panda, React binding from Chakra.

## Unresolved Questions

- **Pattern JSX naming.** Panda derives a pattern's JSX name by capitalizing
  only the first letter (`hstack` → `Hstack`), so `<HStack>`/`<VStack>` need an
  explicit `jsxName`. Worth making the derivation camelCase-aware, or at least
  documenting.
- Which of items 1–4 land as Panda fixes vs. Chakra-side accommodations before
  v4 ships.

## Related

- [chakra-v4-styling-engine.md](./chakra-v4-styling-engine.md) — the v4 engine
  design these gaps feed into.
- [Panda: Chakra UI as a Panda v2 Design System](https://github.com/chakra-ui/panda/blob/v2/design-notes/chakra-ui-design-system-migration.md)
  — target packaging and resolution contracts.
