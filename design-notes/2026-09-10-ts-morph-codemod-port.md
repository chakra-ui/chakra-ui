# ts-morph Codemod Port

**Date:** 2026-09-10 **Status:** Design approved, pre-implementation
**Package:** `packages/codemod`

## Problem

The v2→v3 codemod is built on jscodeshift, which processes one file at a time
with no cross-file awareness. Users whose tokens live in dedicated files
(`colors.ts`, `spacing.ts`, …) and are imported into the theme as
`colors: colors` get **broken output**: the tokens land under `theme.tokens`
still flat (`{ 500: "#fff" }`) instead of the v3 `{ 500: { value: "#fff" } }`
shape, and the imported files are never touched. The transform can only reach
token objects declared in the same file.

A stop-gap runtime `toTokens()` helper was prototyped on the jscodeshift engine
(currently in the working tree, to be reverted). The team decided instead to
move the codemod to **ts-morph**, whose `Project` abstraction resolves imports
across files, so the cross-file case can be fixed properly — and other
transforms become easier to write.

## Goals

- Port the entire codemod from jscodeshift to ts-morph (full big-bang).
- Fix the cross-file token case by **statically rewriting the imported sibling
  files** (no runtime helper).
- Preserve existing behavior: all 795 current tests remain the oracle (same
  input → same output).
- Remove `jscodeshift` and `@types/jscodeshift` once the port is green.

## Non-goals

- No new transforms beyond the cross-file token capability.
- No CLI UX changes (commander + clack orchestration stays).
- No fallback runtime helper for unresolvable imports — those are warned and
  left for manual migration.

## Decisions

1. **Engine model:** one ts-morph `Project` per run. Cross-file capable.
2. **Cross-file tokens:** static rewrite of sibling files; no `toTokens` shim.
   Unresolvable imports (barrels, path aliases, node_modules, dynamic) get a
   warning and are skipped.
3. **Tests:** keep existing inline snapshots as the oracle; regenerate only
   where formatting genuinely differs, reviewing each diff.
4. **Big-bang scope:** all 43 transforms in this effort, staged for
   reviewability.

## Architecture

### Engine / runner (`src/run-transform.ts`)

- Build a ts-morph `Project` per run.
- Resolution: if a `tsconfig.json` exists near the target files, use it (real
  import resolution). Otherwise create an in-memory `Project`, seed it with the
  target files, and resolve relative imports on demand.
- Run selected transforms over each `SourceFile`, then `.save()` changed files.
  The existing prettier pass formats the output.
- Preserve the current CLI progress/reporting semantics (files changed, errors,
  skipped).

### Transform interface

Replace the jscodeshift `export default (file, api) => string` shape with:

```ts
export interface Transform {
  name: string
  transform(sourceFile: SourceFile, ctx: TransformContext): void
}

export interface TransformContext {
  project: Project
}
```

- Transforms mutate `sourceFile` (and, for cross-file, sibling `SourceFile`s
  reached via `ctx.project`) in place.
- The runner is responsible for saving and formatting.

### Shared utilities (`src/utils/`)

- Port `chakra-tracker` (import + local-name tracking) to ts-morph.
- Drop `parser.ts` — ts-morph parses natively.
- Add small ts-morph AST helpers as needed (object-property wrapping, import
  resolution to a `SourceFile`).

### Test harness (`__tests__/test-utils.ts`)

- `applyTransform(transform, source)` keeps its string→string signature
  (in-memory `Project`, single file, prettier out) so existing inline snapshots
  stay valid.
- Add `applyTransformFiles(transform, files: Record<string, string>)` returning
  all files, for cross-file tests.
- Keep `applyTransformMultiple` (idempotency) working against the new harness.

### theme-tokens cross-file behavior

- When a standard token key's value is an identifier imported from another file,
  resolve the import to its `SourceFile`, find the exported declaration, and
  wrap each leaf value in `{ value: … }` in that file.
- Leave the theme-file reference (`colors: colors`) as-is.
- Arrays and already-`{ value }`-wrapped leaves are left untouched.
- Unresolvable imports: warn, skip.
- Remove the `toTokens` helper path entirely.

### CLI (`src/index.ts`, `src/transforms.ts`, `bin/`)

- Keep commander + clack orchestration.
- Update transform auto-discovery to the new module shape (named `Transform`
  export instead of default jscodeshift transformer).

### Dependencies

- Add `ts-morph`.
- Remove `jscodeshift`, `@types/jscodeshift` after the port is green.
- Keep prettier, commander, `@clack/prompts`, semver, etc.

## Execution plan (staged)

1. **Foundation:** engine + transform interface + test harness +
   `chakra-tracker` port. Land `theme-tokens` (including cross-file sibling
   rewriting + new tests) green as the reference transform.
2. **Fan-out:** port the remaining 42 transforms
   (`removed / components / props / types`) in parallel batches, each validated
   against its own existing test file as the oracle.
3. **Wiring & cutover:** finish runner/CLI wiring, swap dependencies, whole
   suite + `tsc --noEmit` + build all green.

## Transform inventory (43)

- `theme/` — theme-tokens (cross-file), and any siblings.
- `removed/` — removals/renames.
- `components/` — per-component import/prop transforms (largest group).
- `props/` — prop transforms.
- `types/` — system-props type transforms.

(Exact per-file list enumerated during the writing-plans step.)

## Risks & mitigations

- **Snapshot formatting drift:** ts-morph emits differently from
  jscodeshift/recast. Prettier normalizes most; regenerate remaining snapshots
  and review each as a real diff.
- **Cross-file resolution without tsconfig:** relative imports handled;
  barrels/aliases/node_modules skipped with a warning (documented limitation,
  matches the chosen no-fallback decision).
- **Idempotency:** `applyTransformMultiple` tests must still pass; running a
  transform twice must be a no-op.
- **Scope/size:** 43 transforms is large. Mitigated by staging and using the
  existing test suite as a green/red oracle throughout.

## Success criteria

- All existing tests pass on ts-morph (snapshots regenerated only where
  formatting differs, each reviewed).
- New cross-file token tests pass; migrated sibling files are correctly
  `{ value }`-shaped with no runtime helper.
- `tsc --noEmit` and package build are green.
- `jscodeshift` fully removed from `packages/codemod`.
