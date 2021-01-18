# @chakra-ui/theme-typings

Generate TypeScript types to provide autocomplete for your custom theme.

## Usage

```sh
npx @chakra-ui/theme-typings <path/to/your/theme.(js|ts)>
```

```sh
$ npx @chakra-ui/theme-typings --help

Usage: create-chakra-theme-typings [options]

Options:
  --out <path>  output directory e.g.
                node_modules/@chakra-ui/styled-system/dist/types/theming.types.d.ts
  -h, --help    display help for command
Example call:
  $ create-chakra-theme-typings theme.ts
```

> You need to run this command after every `npm install`, because it updates
> some files in your node_modules

For convenience, you can add a postinstall script to your `package.json`, so you
don't have to think about this every time you reinstall your dependencies.

```json title="package.json"
"scripts": {
  "gen:theme-typings": "create-chakra-theme-typings <path/to/your/theme.(js|ts)>",
  "postinstall": "npm run gen:theme-typings"
}
```
