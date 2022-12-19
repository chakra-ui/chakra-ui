# @chakra-ui/cli

Generate TypeScript types to provide autocomplete for your custom theme.

## Usage

```sh
npx @chakra-ui/cli tokens <path/to/your/theme.(js|ts)>
```

or

```sh
npx @chakra-ui/cli tokens <@your-org/chakra-theme-package>
```

```sh
$ npx @chakra-ui/cli tokens --help

Usage: chakra-cli tokens [options] <source>

Options:
  --out <path>              output file e.g. node_modules/@chakra-ui/styled-system/dist/declarations/src/theming.types.d.ts
  --strict-component-types  Generate strict types for props variant and size
  --strict-token-types      Generate strict types for theme tokens (e.g. color, spacing)
  --no-format               Disable auto formatting
  --watch [path]            Watch directory for changes and rebuild
  --template <template>     Choose the template to use for the generation (choices: "default", "augmentation", default: "default"
  -h, --help                display help for command

Example call:
  $ chakra-cli tokens theme.ts
```

> Note 🚨: If you delete the `node_modules` directory, you'll need to re-run the
> command to get proper typings again.

For convenience, you can add a `postinstall` script to your `package.json`, so
you don't have to think about this every time you re-install your dependencies.

```json title="package.json"
"scripts": {
  "gen:theme-typings": "chakra-cli tokens <path/to/your/theme.(js|ts)>",
  "postinstall": "npm run gen:theme-typings"
}
```
