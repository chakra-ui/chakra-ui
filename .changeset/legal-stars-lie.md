---
"@chakra-ui/react": minor
"@chakra-ui/cli": minor
---

Support shipping generated types with your codebase via the CLI's `typegen`
command. Passing `--outdir <dir>` now emits a single module augmentation file
(`declare module "@chakra-ui/react"`) to that directory, so a custom theme
defined outside the package can extend Chakra UI's type system (tokens, recipes,
conditions, etc.) via TypeScript declaration merging. Without `--outdir`, the
internal `.gen` types are generated in-package as before.
