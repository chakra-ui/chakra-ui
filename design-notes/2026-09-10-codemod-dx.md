# Codemod DX

**Date:** 2026-09-10 **Status:** Scope A + B implemented; Scope C (docs parity)
pending **Package:** `packages/codemod` (+ theming docs) **Related:**
[ts-morph Codemod Port](./2026-09-10-ts-morph-codemod-port.md)

> **Implemented:** `list` command; `--dry-run` alias; non-interactive
> `--transform <names...>` subset on `upgrade`; `--fail-on-warn` on `upgrade`
> and `transform`; structured diagnostics (`ctx.report`) surfaced as "Manual
> follow-ups" in both the single-transform report and the `upgrade` summary;
> Scope C docs↔output parity added to the theming tokens docs (`defineTokens`
> is-a-type-helper note + separate-token-files section). `--dry-run` per-file
> diffs are intentionally deferred to `git diff` on a clean branch (which the
> tool already recommends) rather than reimplementing a diff in the CLI.

## Problem

The codemod migrates code but is opaque about what it did and what it couldn't
do. Two concrete gaps surfaced from a real user:

- A user ran the codemod, got a generated `toTokens(colors)` wrapper, and
  couldn't tell whether it was expected — the docs don't mention it, and the
  codemod said nothing. He had to ask the team to find out.
- The cross-file token case fails silently: broken output, no warning, no
  pointer to what needs manual attention.

Once we move to ts-morph (see related spec), some cross-file cases still can't
be resolved (barrels, path aliases, node_modules). Those need to be
**surfaced**, not swallowed. And the docs need to match what the codemod
actually produces so the next user never has to ask.

## Goals

- Make a codemod run legible: what changed, what was skipped, what needs manual
  follow-up.
- Turn silent failures into actionable warnings.
- Align docs with codemod output so its results are self-explanatory.

## Non-goals

- No contributor/authoring DX in this spec (separate concern).
- No CLI framework change (stay on commander + clack).
- No interactive fixups — report and point, don't prompt-per-change.

## Scope A — Codemod CLI DX

### Dry-run / preview

- `--dry-run` flag: run all transforms, print the summary and per-file diffs,
  write nothing. Lets users preview before committing.
- Reuse the same reporting path as a real run; only the write step is skipped.

### Per-transform selection

- The runner already discovers transforms; expose selection:
  - `--transform <name>` (repeatable) to run a subset.
  - `--list` to print available transform names + descriptions.
- Default remains "run the full upgrade set" (unchanged behavior).

### Post-run migration report

Printed at the end of every run (real or dry):

- Files changed (count + list).
- Files unchanged / skipped.
- **Manual follow-ups** — items the codemod could not complete, each with file,
  location, and what to do (see Scope B).
- One-line pointer to the migration guide.

## Scope B — Failure / diagnostics DX

### Warning model

Transforms collect structured diagnostics instead of failing silently or
throwing:

```ts
interface Diagnostic {
  level: "warn" | "error"
  file: string
  line?: number
  message: string // what happened
  action?: string // what the user should do, incl. a docs link
}
```

The runner aggregates diagnostics and prints them in the migration report,
grouped by file.

### Concrete diagnostics to emit

- **Unresolvable cross-file token import:** "Couldn't resolve `colors` imported
  from `<spec>` — migrate its token values to `{ value: … }` manually. See
  <docs link>." (Replaces the old silent-broken-output and the `toTokens` shim.)
- **Ambiguous / dynamic token source:** re-exports, computed values, spreads the
  transform can't safely rewrite.
- **Already-migrated input:** detected v3 shape → skipped, noted (not an error).

### Non-zero exit on errors (opt-in)

- `--fail-on-warn` for CI: exit non-zero if any `warn`/`error` diagnostics were
  emitted. Default stays zero-exit so local runs aren't disruptive.

## Scope C — Migration-guide DX

Goal: the codemod's output is self-explanatory, so no one has to ask the team
what a generated construct means.

- **Docs ↔ output parity:** the theming tokens docs
  (`/docs/theming/tokens#defining-tokens`) must show the exact shape the codemod
  emits, including the cross-file / separate-token-files pattern.
- **Cross-file section:** document how tokens defined in separate files are
  migrated (sibling files rewritten to `{ value }`), so the result matches
  expectations.
- **Before/after examples:** flat v2 tokens → v3 `{ value }`, both same-file and
  cross-file, mirroring what the codemod produces.
- **`defineTokens` vs raw objects:** clarify that `defineTokens` is a type
  helper (identity), not a runtime transform — the point that caused confusion.
- **Report → docs links:** every manual-follow-up diagnostic links to the
  relevant guide section.

## Success criteria

- `--dry-run`, `--transform`, `--list`, `--fail-on-warn` all work and are
  documented in the codemod README.
- Every unresolvable cross-file token import produces a warning with a file
  location and an actionable message (no silent broken output).
- The theming tokens docs show same-file and cross-file before/after and explain
  `defineTokens`, such that the codemod's output needs no external explanation.

## Open questions

- Diff rendering for `--dry-run`: reuse an existing diff dep or a minimal
  built-in? (Decide during writing-plans; prefer built-in / already- installed —
  no new dependency for a few lines.)
