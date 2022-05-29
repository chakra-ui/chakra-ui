---
"@chakra-ui/cli": minor
---

New watch flag for the tokens command. You can specify a directory path to watch
for changes. It defaults to the parent dir of `<source>`, e.g.
`src/theme/theme.ts` => `src/theme`.

```shell
> chakra-cli tokens src/theme/theme.ts --watch

> chakra-cli tokens --help
Usage: chakra-cli tokens [options] <source>

Options:
  --out <path>              output file e.g. node_modules/@chakra-ui/styled-system/dist/declarations/src/theming.types.d.ts
  --strict-component-types  Generate strict types for props variant and size
  --watch [path]            Watch directory for changes and rebuild
  -h, --help                display help for command

```
