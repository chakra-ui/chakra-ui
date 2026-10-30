---
"@chakra-ui/react": patch
"@chakra-ui/charts": patch
---

Fix type declarations not resolving under `moduleResolution: "node16"` or
`"nodenext"`, which made every component a missing export (TS2305). Relative
imports in the published `.d.ts` files now include their extension.
