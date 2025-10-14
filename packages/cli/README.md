# @chakra-ui/cli

Generate TypeScript types to provide autocomplete for your custom theme and add
components and blocks to your project.

## Commands

### Type Generation

Generate TypeScript types for your custom theme:

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

### Snippets

Add community-driven snippets to your project:

```sh
# Add recommended snippets
npx @chakra-ui/cli snippet add

# Add specific snippets
npx @chakra-ui/cli snippet add provider toaster

# List available snippets
npx @chakra-ui/cli snippet list
```

### Pro Blocks

Add premium blocks from Chakra UI Pro to your project:

```sh
# Interactive block selection
npx @chakra-ui/cli blocks add

# Add all variants of a specific block
npx @chakra-ui/cli blocks add hero

# Add a specific variant of a block
npx @chakra-ui/cli blocks add hero --variant "simple"

# List available blocks
npx @chakra-ui/cli blocks list

# List blocks in a specific category
npx @chakra-ui/cli blocks list --category "marketing"
```

#### Pro Blocks Setup

To use Pro blocks, you need a Chakra UI Pro API key:

1. Get your API key from [Chakra UI Pro](https://pro.chakra-ui.com)
2. Set the environment variable:

   ```sh
   export CHAKRA_UI_PRO_API_KEY="your-api-key"
   ```

   Or create a `.env` file in your project root:

   ```env
   CHAKRA_UI_PRO_API_KEY=your-api-key
   ```

#### Pro Blocks Options

- `--variant <variant>`: Add a specific variant instead of all variants
- `--outdir <dir>`: Specify output directory for blocks
- `--force`: Overwrite existing files
- `--dry-run`: Preview what will be downloaded without writing files
- `--tsx`: Force TypeScript JSX format (auto-detected by default)
