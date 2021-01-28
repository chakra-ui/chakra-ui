# @chakra-ui/cli

Generate TypeScript types to provide autocomplete for your custom theme.

## Usage

```sh
npx @chakra-ui/cli tokens <path/to/your/theme.(js|ts)>
```

```sh
$ npx @chakra-ui/cli --help

Usage: chakra-cli tokens [options]

Options:
  --out <path>  output directory e.g.
                node_modules/@chakra-ui/styled-system/dist/types/theming.types.d.ts
  -h, --help    display help for command

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
