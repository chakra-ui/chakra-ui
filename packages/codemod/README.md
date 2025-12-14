# @chakra-ui/codemod

Codemods for migrating Chakra UI codebases from v2 to v3.

## Installation

```bash
npx @chakra-ui/codemod <transform> <path>
```

No installation required when using `npx`.

## Quick Start

### Upgrade Command (Recommended)

The easiest way to upgrade your entire project:

```bash
npx @chakra-ui/codemod upgrade
```

This command will:

1. Update your dependencies (`@chakra-ui/react`, `@emotion/react`)
2. Remove unused packages (`@emotion/styled`, `framer-motion`)
3. Let you select which codemods to run
4. Apply the selected transformations

### Running Individual Transforms

You can also run individual transforms:

```bash
npx @chakra-ui/codemod <transform-name> <path>
```

**Example:**

```bash
# Transform Button components in src directory
npx @chakra-ui/codemod button ./src

# Transform all components
npx @chakra-ui/codemod rename-boolean-props .

# Dry run to see changes without applying them
npx @chakra-ui/codemod button ./src --dry
```

## Available Transforms

### Component Transforms

- **`button`** - Transform Button component props
- **`input`** - Transform Input component props
- **`checkbox`** - Transform Checkbox to compound components
- **`stack`** - Transform Stack spacing to gap
- **`modal-to-dialog`** - Transform Modal to Dialog
- **`select-to-native-select`** - Transform Select to NativeSelect
- **`spinner`** - Transform Spinner props
- **`icon-button`** - Transform IconButton props
- **`link`** - Transform Link isExternal prop
- **`collapse-to-collapsible`** - Transform Collapse to Collapsible

### Props Transforms

- **`rename-boolean-props`** - Rename boolean props (isOpen → open, etc.)
- **`color-palette`** - Transform colorScheme to colorPalette
- **`style-props`** - Transform style props (noOfLines → lineClamp, etc.)
- **`gradient-props`** - Transform gradient props
- **`nested-styles`** - Transform sx/\_\_css to css prop

## Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison
- `--force` - Bypass Git safety checks
- `--verbose` - Show detailed output (upgrade command only)

## Examples

### Upgrade to latest version

```bash
npx @chakra-ui/codemod upgrade
```

### Upgrade to specific version

```bash
npx @chakra-ui/codemod upgrade 3.0.0
```

### Dry run to preview changes

```bash
npx @chakra-ui/codemod upgrade --dry
```

### Run specific transform

```bash
npx @chakra-ui/codemod button ./src
```

### Run transform with dry-run

```bash
npx @chakra-ui/codemod button ./src --dry
```

## Git Safety

By default, codemods check if your Git working directory is clean before making
changes. This is to ensure you can easily revert changes if needed.

You can bypass this check with the `--force` flag:

```bash
npx @chakra-ui/codemod button ./src --force
```

## Documentation

For detailed migration guide and manual steps, visit:
https://chakra-ui.com/docs/get-started/migration

## Contributing

If you find issues or want to add more transforms, please contribute to the
[Chakra UI repository](https://github.com/chakra-ui/chakra-ui).
