# @chakra-ui/codemod

## 3.37.1

## 3.37.0

### Minor Changes

- [#10934](https://github.com/chakra-ui/chakra-ui/pull/10934)
  [`8474ab4`](https://github.com/chakra-ui/chakra-ui/commit/8474ab47feca9d051517ec6a2993a1f73405cafa)
  Thanks [@Adebesin-Cell](https://github.com/Adebesin-Cell)! - Speed up the
  `upgrade` command and add a readable dry-run preview.
  - Run transforms in-process instead of spawning a Node process per transform,
    taking a full run from ~30s to a few seconds.
  - `upgrade --dry` now lists the files that would change and, per file, the
    components and props it touches (e.g. `Button, color palette`).
  - Large projects write the full breakdown to `chakra-codemod-report.md`;
    smaller ones print it inline.
  - Stop the `color-mode` transform from installing a snippet during a dry run,
    and use the current CLI flag instead of the removed `--yes`.
  - Stop the `steps` transform from adding a stray `Steps` import to files that
    don't use a stepper.

### Patch Changes

- [#10933](https://github.com/chakra-ui/chakra-ui/pull/10933)
  [`d2bca06`](https://github.com/chakra-ui/chakra-ui/commit/d2bca06f3cbad0578b6e66496f3fabdb63cfb845)
  Thanks [@Adebesin-Cell](https://github.com/Adebesin-Cell)! - Fix three bugs in
  the `upgrade` command:
  - `--dry` now prints a summary of which transforms would change files. Before,
    it silenced jscodeshift and showed nothing.
  - `.ts` files now use the `ts` parser instead of `tsx`, so type assertions and
    generic arrows no longer throw and get skipped.
  - The unused-package check no longer scans `node_modules`, so it stops
    flagging `framer-motion` and `@emotion/styled` as used when only a
    dependency imports them (and runs much faster).

## 3.36.1

### Patch Changes

- [`dd9fa1c`](https://github.com/chakra-ui/chakra-ui/commit/dd9fa1c44b1e3df7375a9ce06def49e44c003d3b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Require
  Node.js >=22 (Node 18 and 20 are end-of-life)

## 3.36.0

## 3.35.0

## 3.34.0

### Patch Changes

- [`a3c5396`](https://github.com/chakra-ui/chakra-ui/commit/a3c5396794638c405db5b19c82bbe87973c20bed)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix issue where
  `Steps` was added to the import list.
  - Fix issue where `ChakraProvider value={defaultSystem}` was wrapped in
    `String()` — the system engine is passed through correctly.

## 3.33.0

### Patch Changes

- [`113bc55`](https://github.com/chakra-ui/chakra-ui/commit/113bc557225f9892313c195fba747aafc3af3150)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactor codemod to
  support more component props

## 3.32.0

### Minor Changes

- [#10538](https://github.com/chakra-ui/chakra-ui/pull/10538)
  [`341085a`](https://github.com/chakra-ui/chakra-ui/commit/341085a57aa9ea50f940cd6426eb0bdf3294cdef)
  Thanks [@Adebesin-Cell](https://github.com/Adebesin-Cell)! - Adds a new
  `@chakra-ui/codemod` package to automate migration from Chakra UI v2 to v3.

  The codemod helps developers update renamed props, restructure components, and
  refactor theme configurations according to the official
  [migration guide](https://chakra-ui.com/docs/get-started/migration). It
  supports dry-run mode and aims to reduce manual effort while ensuring
  compatibility with v3.
