# @chakra-ui/codemod

Codemods for migrating Chakra UI codebases from v2 to v3.

## Installation

No installation required when using `npx`:

```bash
npx @chakra-ui/codemod <transform> <path>
```

---

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

---

### Running Individual Transforms

You can also run individual transforms on specific directories or files:

```bash
npx @chakra-ui/codemod <transform-name> <path>
```

**Examples:**

```bash
# Transform Button components in src directory
npx @chakra-ui/codemod button ./src

# Run multiple transforms
npx @chakra-ui/codemod rename-boolean-props ./src

# Dry run to preview changes
npx @chakra-ui/codemod button ./src --dry
```

---

## Available Transforms

All available transforms are automatically discovered from the `transforms`
folder.

- Component transforms (e.g., `button`, `checkbox`, `slider`, `modal-to-dialog`)
- Props transforms (e.g., `rename-boolean-props`, `color-palette`,
  `style-props`)

For a full list of transforms, see the
[auto-discovered registry in `transforms.js`](./transforms.js).

> Each transform has a description and targets specific props or components.

---

## Options

- `--dry` - Preview changes without modifying files
- `--print` - Print transformed output to console
- `--force` - Bypass Git safety checks
- `--verbose` - Show detailed output (upgrade only)

---

## Examples

```bash
# Upgrade to latest version
npx @chakra-ui/codemod upgrade

# Upgrade to a specific version
npx @chakra-ui/codemod upgrade 3.0.0

# Run transform with dry-run
npx @chakra-ui/codemod button ./src --dry
```

---

## Git Safety

Codemods check if your Git working directory is clean before running, ensuring
easy revert of changes.

Bypass with:

```bash
npx @chakra-ui/codemod button ./src --force
```

---

## Documentation

For detailed migration guidance and manual steps, visit:
[Chakra UI Migration Guide](https://chakra-ui.com/docs/get-started/migration)

---

## Contributing

If you encounter issues or want to add new transforms, please contribute via the
[Chakra UI GitHub repository](https://github.com/chakra-ui/chakra-ui).
