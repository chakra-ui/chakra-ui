---
description: Draw docs grid illustrations for components that don't have one
argument-hint: "[component names, or empty for every missing one]"
---

## Context

Every page in `apps/www/content/docs/components` shows an illustration on the
[components overview](https://chakra-ui.com/docs/components/concepts/overview).
They live in `apps/www/components/illustrations` and are registered in its
`index.ts`. The original set was drawn in Figma and converted with
`scripts/generate-icon.ts`. This command draws new ones in the same style and
lets `check:illustrations` decide when they match.

## Task

Draw illustrations for **$ARGUMENTS**. If no names are given, run the check
below and take every component it reports as missing.

1. **Pick a reference.** For each component, choose the existing illustration
   closest in kind and on-screen size (a checkmark sits next to `close-button`,
   a command menu next to `menu`, a field next to `input`). Small primitives get
   small drawings. Read the reference file before drawing.

2. **Draw it** in `apps/www/components/illustrations/<name>.tsx`:

   ```tsx
   // illustration-ref: <reference-name>
   import { createComponent } from "./create-component"

   export const <PascalName>Anatomy = createComponent((props) => {
     const { palette, ...rest } = props
     return (
       <svg width={400} height={300} viewBox="0 0 400 300" fill="none"
         xmlns="http://www.w3.org/2000/svg" {...rest}>
         ...
       </svg>
     )
   })
   ```

   - One focal element, centered, with lots of empty space around it. Aim for
     the shape count of the reference (most originals have 3 to 6 shapes).
   - Surfaces use `palette[3]` (dark) or `palette[2]` (mid). Content on them
     (text bars, icons) uses `palette[15]` or `palette[0]`. No other slots.
   - Text is a rounded bar (`rx` = half the height), as in the reference.
   - No dashed outlines, gradients, `id`s, masks or `<text>` unless the
     reference uses them.

3. **Register it** in `index.ts`: one import and one `allComponents` entry keyed
   by the docs file name.

4. **Check it** from `apps/www`:

   ```sh
   pnpm tsx scripts/check-illustrations.tsx --sheet [names...]
   ```

   It fails on missing or unregistered illustrations, a missing or invalid
   `illustration-ref` (it must name an original, not another new one), palette
   slots outside the list above, and a footprint or ink level too far from the
   reference. The rest of the rules (shape count, no dashes or `<text>`) are on
   you: it writes a PNG with each reference next to its new illustration. Open
   that PNG and look: the new drawing should feel like it came from the same set
   as its neighbor. Fix and rerun until the check passes and the sheet looks
   right.

5. Run `pnpm prettier --write` on the new files and show the sheet to the user.
