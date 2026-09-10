# Codemod Cross-File Resolution — Scope

**Date:** 2026-09-10 **Status:** Scope / pre-design **Package:**
`packages/codemod` **Related:**
[ts-morph port](./2026-09-10-ts-morph-codemod-port.md)

## Problem

Every component/prop transform recognizes a Chakra component only when it's
imported **from `@chakra-ui/react` in the same file** (`collectChakraLocalNames`
scans that file's imports). Real codebases hide Chakra behind indirection, so
those usages are silently missed:

1. **Re-export / barrel files.** `ui/index.ts` does
   `export { Button } from "@chakra-ui/react"`; consumers do
   `import { Button } from "@/ui"`. In the consumer, `Button` looks local, so no
   transform touches it.
2. **Aliased re-exports.** `export { Button as Btn } from "@chakra-ui/react"`.
3. **Wrapper components.** `export const MyButton = (p) => <Button {...p} />`.
   The wrapper file itself migrates fine (Button is a same-file import), but
   `<MyButton colorScheme="blue" />` at call sites never migrates.
4. **Path aliases** (`@/ui`) instead of relative paths.

The ts-morph `Project` graph makes 1–2 and 4 tractable (this is the payoff of
the engine swap). 3 is fundamentally heuristic and stays mostly manual.

## Goals

- Resolve Chakra component identity **across files** for re-exports/barrels
  (transitive), so tag/prop transforms fire at call sites that import from a
  local module which ultimately re-exports from `@chakra-ui/react`.
- Keep it **opt-in-safe**: never rewrite a symbol we can't prove resolves to a
  Chakra component.
- Surface **wrapper components** for manual review rather than rewriting them.

## Non-goals

- Auto-migrating wrapper components' forwarded props (risky; see Phase 3).
- Renaming declarations project-wide via the type-checker's `findReferences`
  (too broad; we scope to import edges only).

## Why ts-morph makes this possible

- `ImportDeclaration.getModuleSpecifierSourceFile()` resolves an import to its
  `SourceFile` (honors `tsconfig` paths when the runner builds the Project from
  tsconfig).
- `SourceFile.getExportDeclarations()` / `getExportedDeclarations()` expose what
  a module re-exports and from where.
- We already rely on this for cross-file token rewriting in `theme-tokens.ts`.

## Design

### Phase 1 — Re-export / barrel resolution (safe, high value)

Extend the tracker to be project-aware:

```ts
collectChakraLocalNames(sourceFile, { project }?)
```

When a `project` is available, for each import from a **non-Chakra** module,
resolve the module to its `SourceFile` and check whether the imported name is
(transitively) re-exported from `@chakra-ui/react`:

- Follow `export { X } from "@chakra-ui/react"` (direct).
- Follow `export { X } from "./deeper"` chains (transitive, with a visited-set
  and a depth cap).
- Honor aliases on both the import and the re-export edges; the **local** name
  in the consumer is what gets added to `chakraLocalNames`; the resolved
  **Chakra** name is what transforms match against for renames.
- Cache per (module, name) within a run.

Transforms need no change — they keep calling `collectChakraLocalNames`; they
just receive a fuller `chakraLocalNames` set. The runner passes its `Project`;
`applyTransform` in tests already builds one, and `applyTransformFiles` gives us
multi-file fixtures.

**Guardrails:** only resolve names that terminate at `@chakra-ui/react`. If a
re-export is ambiguous, computed, `export *` without a clear origin, or hits the
depth cap, treat the name as **not** Chakra (no rewrite) and optionally emit a
diagnostic.

### Phase 2 — Wrapper detection → diagnostics (no rewrite)

Detect a wrapper: a component whose returned JSX root is a tracked Chakra
component receiving a props spread (`<Button {...props} />`). At the wrapper's
**call sites**, emit a `manual-migrations` diagnostic + TODO: "this wraps a
Chakra component; review v3 prop changes at usage." No automatic rewrite — the
wrapper may drop, rename, or reinterpret props.

### Phase 3 — Opt-in wrapper prop migration (future, gated)

Behind an explicit `--unsafe-wrappers` flag: when a wrapper provably forwards
`...props` untouched to a single Chakra component, apply that component's prop
renames to the wrapper's call sites. Off by default; needs its own design.

## Risks & mitigations

- **Correctness of rewriting through indirection** — restrict to import→export
  edges terminating at `@chakra-ui/react`; never use broad `findReferences`.
- **Performance on large repos** — resolve lazily per import, memoize per run,
  cap transitive depth (e.g. 5).
- **Missing/loose `tsconfig`** — path aliases only resolve with tsconfig; when
  absent, relative re-exports still resolve, aliased ones are skipped + flagged.
- **`export *` barrels** — only handle when the origin of a name is unambiguous;
  otherwise skip + flag.
- **Idempotency** — unchanged; transforms remain the same, only the tracked-name
  set widens.

## Rollout

Ship as small, separate PRs (per [[feedback_small_prs_piece_by_piece]]):

1. Project-aware `collectChakraLocalNames` + barrel/re-export resolution +
   multi-file tests (Phase 1). Biggest real-world win (design-system barrels).
2. Wrapper detection diagnostics (Phase 2), folded into `manual-migrations`.
3. (Optional, later) gated wrapper prop migration (Phase 3).

## Success criteria (Phase 1)

- A consumer importing a Chakra component through a relative or path-aliased
  barrel gets the same tag/prop migrations as a direct import.
- Aliased re-exports resolve correctly.
- Non-Chakra local components are never rewritten.
- Multi-file fixtures via `applyTransformFiles` cover barrel, transitive barrel,
  aliased re-export, and the negative (unrelated local `Button`).
