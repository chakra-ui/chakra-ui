# Chakra v4 · `@chakra-ui/emotion` Opt-in

## Summary

With Panda as the build-time engine and zero Emotion in the core
([chakra-v4-styling-engine.md](./chakra-v4-styling-engine.md)),
`@chakra-ui/emotion` is the opt-in package that gives back a **runtime** styling
DX — the v3-familiar `css`/`styled`/ `keyframes` API and a runtime escape hatch
for genuinely dynamic styles. The design constraint that shapes everything here:
it must connect **without** re-introducing the runtime styling-engine adapter
the core design rejects. It does that by being **additive and parallel** — a
user-space runtime layer that interops with Chakra components through class-name
composition and shared token CSS variables, never by sitting underneath the
component factory as a swappable engine.

## Why It Exists

Build-time extraction covers style props, recipes, and patterns — everything
statically derivable. It cannot cover genuinely runtime styles: values computed
per render, from props, from fetched data, or from user input. v3 users also
relied on a runtime `css`/ `styled`/`sx` DX. Rather than serve an Emotion base
to everyone for those cases, `@chakra-ui/emotion` serves it only to consumers
who install it.

Not installed → not in the bundle. Core stays zero-Emotion, provider-free,
RSC-friendly.

## What It Is (and Is Not)

**Is:** an additive runtime styling layer. It exports `css`, `styled`,
`keyframes`, `Global`, and a `<ChakraEmotionProvider>` (cache + token bridge).
Users reach for it for their own runtime-dynamic styles and for a v3-style
authoring experience.

**Is not:** an alternative engine for Chakra's own components. Chakra components
are always Panda/build-time. Emotion never renders them, and the core factory
never branches on "which engine" — so there is no per-styled-call runtime check
and no "bundle both engines" cost. This is the line the
[engine design](./chakra-v4-styling-engine.md) draws, preserved here: Emotion
sits **beside** Chakra components, not **under** them.

## How It Connects

Three connection points, all of which avoid a core seam.

### 1. Class-name composition

Emotion's `css()` returns a class name. Chakra components already accept and
compose `className` (their Panda classes go through `cx`). So a runtime Emotion
style lands on the same element next to the extracted Panda classes:

```tsx
import { css } from "@chakra-ui/emotion"

;<Box className={css({ transform: `translateX(${x}px)` })} />
//        ^ Panda base classes + Emotion runtime class, composed via cx
```

No component change is needed — `className` is the seam-free interop surface.

### 2. Shared token CSS variables

Panda already emits Chakra tokens as CSS variables into `:root`
(`--colors-red-500`, `--spacing-4`, …). `@chakra-ui/emotion`'s `css` resolves
Chakra token paths to **those same variables**, so Emotion styles and Panda
styles reference one source of truth and never diverge:

```tsx
css({ color: "red.500", padding: "4" })
// -> { color: "var(--colors-red-500)", padding: "var(--spacing-4)" }
```

The resolver reuses Panda's generated `token`/css-var map — it does not
re-derive a theme.

### 3. Color mode / theming for free

v4 color mode is data-attribute + CSS-variable driven (Panda conditions).
Because Emotion styles reference the same variables, color mode and runtime
theme overrides (setting CSS vars) apply to Emotion styles automatically — no
separate theming channel.

## Provider

`<ChakraEmotionProvider>` supplies:

- the Emotion **cache** (SSR insertion, nonce, key, container),
- the **token bridge** (the css-var map, so `css()` resolves token paths).

It is required only when the app uses the Emotion API, and only wraps the parts
that do. The core styling path still needs no provider. Contrast with v3, where
an Emotion provider was mandatory for everything.

## SSR

Core CSS is a static stylesheet (nothing to insert at request time). Emotion
styles are runtime-inserted, so `@chakra-ui/emotion` carries the usual Emotion
SSR story (extract critical CSS from the cache, flush to the document) — scoped
to the opt-in surface, not the whole app.

## Migration Angle

v3 apps that lean on runtime `css`/`styled`/`sx` install `@chakra-ui/emotion` to
keep that DX while migrating, then move static cases to style props / recipes /
patterns over time and drop the package when only dynamic remainder is left (or
keep it for that remainder).

## Open Questions

1. **The `css` prop on Chakra components.** On `<Box css={…}>`, `css` is Panda
   (build-time). Do we leave it Panda-only (Emotion is via
   `className={ecss(…)}`), or let the Emotion package light up an
   `sx`/`styles`-prop runtime path on components when its provider is present
   (Mantine parity)? The latter is a **narrow, provider-gated** hook for the
   dynamic prop only — not the per-call engine branch the core rejects — but it
   is still a seam and needs an explicit call. Recommend starting seam-free
   (composition + own APIs) and adding the `sx` hook only if demand is real.
2. **Token resolver source.** Reuse Panda's generated `token` map directly, or
   ship a small independent css-var resolver in the Emotion package to avoid a
   hard dep on generated output shape?
3. **`styled` parity.** How close should `@chakra-ui/emotion`'s `styled` be to
   v3's (variants, `shouldForwardProp`, theming) vs. a thin Emotion `styled` +
   token bridge?
4. **Package boundary.** Does `@chakra-ui/emotion` depend on `@chakra-ui/react`
   (for the token map / `cx`) or only on `@chakra-ui/styled-system`? Prefer the
   latter to keep it engine-adjacent, not component-coupled.

## Related

- [chakra-v4-styling-engine.md](./chakra-v4-styling-engine.md) — the Panda
  engine + the "no adapter" decision this package must respect.
- [panda-v2-gaps.md](./panda-v2-gaps.md) — Panda v2 friction underlying the
  engine.
- [Panda: Chakra UI as a Panda v2 Design System](https://github.com/chakra-ui/panda/blob/v2/design-notes/chakra-ui-design-system-migration.md)
  — Emotion removal path on the packaging side.
