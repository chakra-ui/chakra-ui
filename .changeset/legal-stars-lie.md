---
"@chakra-ui/react": minor
"@chakra-ui/cli": minor
---

Add a `--augment` flag to the CLI's `typegen` command. When used with
`--outdir`, it emits a single module augmentation file
(`declare module "@chakra-ui/react"`) instead of the in-package `.gen` files, so
a custom theme defined outside the package can extend Chakra UI's type system
(tokens, recipes, conditions, etc.) via TypeScript declaration merging.
