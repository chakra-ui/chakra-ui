## Problem

- A circular import exists between
  [rich-text-editor-control.tsx](file:///Users/lope/Desktop/open-source/chakra/chakra-ui/apps/compositions/src/ui/rich-text-editor-control.tsx)
  and
  [rich-text-editor.tsx](file:///Users/lope/Desktop/open-source/chakra/chakra-ui/apps/compositions/src/ui/rich-text-editor.tsx).
- Cause: `rich-text-editor-control.tsx` imports factory helpers
  (`createBooleanControl`, `createSelectControl`, `createSwatchControl`) from
  `rich-text-editor.tsx`, while `rich-text-editor.tsx` re-exports the entire
  control module via
  `export * as Control from "compositions/ui/rich-text-editor-control"`.
- Symptom: examples that import `Control` and `RichTextEditor` from
  `compositions/ui/rich-text-editor` initialize with undefined or partially
  initialized exports, leading to run-time issues across all rich-text-editor
  examples.

## Approach

- Extract all shared control factories and editor context into a new
  foundational module to remove the back-edge.
- Keep the existing public API
  (`import { Control, RichTextEditor } from "compositions/ui/rich-text-editor"`)
  intact by continuing to re-export `Control` from the main module, but ensure
  `Control` no longer depends on the main module.

## Planned Changes

1. Create `apps/compositions/src/ui/rich-text-editor-core.tsx` with:
   - `RichTextEditorContext`, `useRichTextEditorContext`
   - `RichTextEditorButtonControl`
   - Control factory types: `BaseControlConfig`, `BooleanControlConfig`,
     `SelectOption`, `SelectControlConfig`, `SwatchOption`,
     `SwatchControlConfig`
   - Factory helpers: `createBooleanControl`, `createSelectControl`,
     `createSwatchControl`
2. Update
   [rich-text-editor-control.tsx](file:///Users/lope/Desktop/open-source/chakra/chakra-ui/apps/compositions/src/ui/rich-text-editor-control.tsx):
   - Change imports to read helpers from `compositions/ui/rich-text-editor-core`
     instead of `compositions/ui/rich-text-editor`.
   - No other behavioral changes.
3. Update
   [rich-text-editor.tsx](file:///Users/lope/Desktop/open-source/chakra/chakra-ui/apps/compositions/src/ui/rich-text-editor.tsx):
   - Remove in-file factory/helper definitions.
   - Import `useRichTextEditorContext` from
     `compositions/ui/rich-text-editor-core` for `RichTextEditor.Content`.
   - Import `RichTextEditorButtonControl` from core and continue exporting it
     inside `RichTextEditor` object.
   - Keep `export * as Control from "compositions/ui/rich-text-editor-control"`
     to preserve the existing examples API while breaking the cycle.

## Verification

- Build and run the compositions app; ensure no circular import warnings/errors.
- Open a few examples (e.g.,
  [rich-text-editor-basic.tsx](file:///Users/lope/Desktop/open-source/chakra/chakra-ui/apps/compositions/src/examples/rich-text-editor/rich-text-editor-basic.tsx))
  and verify controls render and act correctly.
- Run TypeScript type-check to confirm the new core module integrates cleanly.

## Notes

- Paths use the existing `compositions/*` alias; `rich-text-editor-core.tsx`
  will sit alongside current files to keep imports stable.
- No public API changes for examples; they continue to import `Control` and
  `RichTextEditor` from the same module.
