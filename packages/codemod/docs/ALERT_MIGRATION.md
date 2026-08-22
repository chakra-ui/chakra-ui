# Alert Component Migration Guide

This document outlines the migration from Chakra UI v2 Alert components to v3.

## Component Mapping

### v2 → v3

| v2 Component       | v3 Component        |
| ------------------ | ------------------- |
| `Alert`            | `Alert.Root`        |
| `AlertIcon`        | `Alert.Indicator`   |
| `AlertTitle`       | `Alert.Title`       |
| `AlertDescription` | `Alert.Description` |

### New Components in v3

| Component       | Description                           |
| --------------- | ------------------------------------- |
| `Alert.Content` | Content wrapper for title/description |

## Import Changes

**v2:**

```tsx
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react"
```

**v3:**

```tsx
import { Alert } from "@chakra-ui/react"
```

In v3, all Alert-related components are accessed through the `Alert` namespace.

## Variant Changes

### v3 Variants

- `subtle` (default)
- `solid`
- `surface`
- `outline`

### Variant Mapping

| v2 Variant    | v3 Transformation                                                                       |
| ------------- | --------------------------------------------------------------------------------------- |
| `subtle`      | `subtle` (no change)                                                                    |
| `solid`       | `solid` (no change)                                                                     |
| `left-accent` | `variant="subtle"` + `borderStartWidth="3px"` + `borderStartColor="colorPalette.solid"` |
| `top-accent`  | `variant="subtle"` + `borderTopWidth="3px"` + `borderTopColor="colorPalette.solid"`     |

## Prop Changes

| v2 Prop   | v3 Equivalent | Notes                                    |
| --------- | ------------- | ---------------------------------------- |
| `addRole` | (removed)     | Not needed in v3 - handled automatically |

## Usage Examples

### Basic Alert with Icon

**v2:**

```tsx
import { Alert, AlertIcon } from "@chakra-ui/react"

;<Alert status="error">
  <AlertIcon />
  There was an error processing your request
</Alert>
```

**v3:**

```tsx
import { Alert } from "@chakra-ui/react"

;<Alert.Root status="error">
  <Alert.Indicator />
  There was an error processing your request
</Alert.Root>
```

### Alert with Title and Description

**v2:**

```tsx
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react"

;<Alert status="error">
  <AlertIcon />
  <AlertTitle>Your browser is outdated!</AlertTitle>
  <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
</Alert>
```

**v3:**

```tsx
import { Alert } from "@chakra-ui/react"

;<Alert.Root status="error">
  <Alert.Indicator />
  <Alert.Title>Your browser is outdated!</Alert.Title>
  <Alert.Description>Your Chakra experience may be degraded.</Alert.Description>
</Alert.Root>
```

### Multiple Alerts with Different Statuses

**v2:**

```tsx
import { Alert, AlertIcon, Stack } from "@chakra-ui/react"

;<Stack spacing={3}>
  <Alert status="error">
    <AlertIcon />
    There was an error processing your request
  </Alert>

  <Alert status="success">
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status="warning">
    <AlertIcon />
    Seems your account is about expire, upgrade now
  </Alert>

  <Alert status="info">
    <AlertIcon />
    Chakra is going live on August 30th. Get ready!
  </Alert>
</Stack>
```

**v3:**

```tsx
import { Alert, Stack } from "@chakra-ui/react"

;<Stack spacing={3}>
  <Alert.Root status="error">
    <Alert.Indicator />
    There was an error processing your request
  </Alert.Root>

  <Alert.Root status="success">
    <Alert.Indicator />
    Data uploaded to the server. Fire on!
  </Alert.Root>

  <Alert.Root status="warning">
    <Alert.Indicator />
    Seems your account is about expire, upgrade now
  </Alert.Root>

  <Alert.Root status="info">
    <Alert.Indicator />
    Chakra is going live on August 30th. Get ready!
  </Alert.Root>
</Stack>
```

### Alerts with Different Variants

**v2:**

```tsx
import { Alert, AlertIcon, Stack } from "@chakra-ui/react"

;<Stack spacing={3}>
  <Alert status="success" variant="subtle">
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status="success" variant="solid">
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status="success" variant="left-accent">
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>

  <Alert status="success" variant="top-accent">
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>
</Stack>
```

**v3:**

```tsx
import { Alert, Stack } from "@chakra-ui/react"

;<Stack spacing={3}>
  <Alert.Root status="success" variant="subtle">
    <Alert.Indicator />
    Data uploaded to the server. Fire on!
  </Alert.Root>

  <Alert.Root status="success" variant="solid">
    <Alert.Indicator />
    Data uploaded to the server. Fire on!
  </Alert.Root>

  <Alert.Root
    status="success"
    variant="subtle"
    borderStartWidth="3px"
    borderStartColor="colorPalette.solid"
  >
    <Alert.Indicator />
    Data uploaded to the server. Fire on!
  </Alert.Root>

  <Alert.Root
    status="success"
    variant="subtle"
    borderTopWidth="3px"
    borderTopColor="colorPalette.solid"
  >
    <Alert.Indicator />
    Data uploaded to the server. Fire on!
  </Alert.Root>
</Stack>
```

### Alert Without Icon

**v2:**

```tsx
import { Alert, AlertDescription, AlertTitle } from "@chakra-ui/react"

;<Alert status="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please be careful.</AlertDescription>
</Alert>
```

**v3:**

```tsx
import { Alert } from "@chakra-ui/react"

;<Alert.Root status="warning">
  <Alert.Title>Warning</Alert.Title>
  <Alert.Description>Please be careful.</Alert.Description>
</Alert.Root>
```

## Running the Codemod

To automatically migrate your Alert components, run:

```bash
npx @chakra-ui/codemod transform alert <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform alert ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform alert ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform alert ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually or need to handle edge cases:

1. **Import Changes**: Import `Alert` from `@chakra-ui/react` instead of
   individual component names
2. **Component Names**: Replace component names with their v3 equivalents using
   dot notation:
   - `Alert` → `Alert.Root`
   - `AlertIcon` → `Alert.Indicator`
   - `AlertTitle` → `Alert.Title`
   - `AlertDescription` → `Alert.Description`
3. **Status Prop**: The `status` prop remains the same (info, warning, success,
   error, neutral)
4. **Variant Handling**:
   - `subtle` and `solid` remain unchanged
   - `left-accent` → `variant="subtle"` + add `borderStartWidth="3px"` and
     `borderStartColor="colorPalette.solid"`
   - `top-accent` → `variant="subtle"` + add `borderTopWidth="3px"` and
     `borderTopColor="colorPalette.solid"`
5. **Remove Props**: Remove `addRole` prop (handled automatically in v3)
6. **Styling**: All existing styling props work the same way

## Breaking Changes

### Component Names

- All Alert subcomponents now use namespace imports (e.g., `Alert.Indicator`
  instead of `AlertIcon`)

### Variant Names

- `left-accent` → `variant="subtle"` with `borderStartWidth="3px"` and
  `borderStartColor="colorPalette.solid"`
- `top-accent` → `variant="subtle"` with `borderTopWidth="3px"` and
  `borderTopColor="colorPalette.solid"`
- New variants added: `surface`, `outline`
- `subtle` and `solid` variants remain unchanged

### Props Removed

- `addRole` prop removed (role is automatically applied in v3)

### No Other Changes

- `status` prop works the same (info, warning, success, error, neutral)
- All styling props continue to work
- Default variant is `subtle` in both versions

## Benefits

The v3 Alert component provides:

- **Consistent API**: All components use namespace imports
- **Better TypeScript support**: Improved type inference and autocomplete
- **Simplified imports**: Single import for all Alert-related components
- **New components**: `Alert.Content` for better structure
- **Reduced bundle size**: Tree-shakeable namespace exports
- **Enhanced variants**: New `surface` and `outline` variants for more styling
  options
