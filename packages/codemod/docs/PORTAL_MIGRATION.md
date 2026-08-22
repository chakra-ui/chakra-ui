# Portal Migration Guide

This document outlines the migration of Portal-related components from Chakra UI
v2 to v3.

## Component Mapping

### v2 → v3

| v2 Component    | v3 Component | Notes                            |
| --------------- | ------------ | -------------------------------- |
| `Portal`        | `Portal`     | Same component, props simplified |
| `PortalManager` | ❌           | Removed (no longer needed)       |

## Import Changes

**v2:**

```tsx
import { Portal, PortalManager } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Portal } from "@chakra-ui/react"
```

## Prop Changes

### Portal

| v2 Prop                | v3 Prop | Notes     |
| ---------------------- | ------- | --------- |
| `containerRef`         | ✅      | Unchanged |
| `appendToParentPortal` | ❌      | Removed   |

## Usage Examples

### Basic Portal

**v2:**

```tsx
import { Portal } from "@chakra-ui/react"

;<Portal>
  <Box bg="red.500">This renders in a portal</Box>
</Portal>
```

**v3:**

```tsx
import { Portal } from "@chakra-ui/react"

;<Portal>
  <Box bg="red.500">This renders in a portal</Box>
</Portal>
```

### Portal with Container Ref

**v2:**

```tsx
import { Portal } from "@chakra-ui/react"

function Demo() {
  const ref = useRef(null)

  return (
    <>
      <div ref={ref} />
      <Portal containerRef={ref}>
        <Box>Portaled content</Box>
      </Portal>
    </>
  )
}
```

**v3:**

```tsx
import { Portal } from "@chakra-ui/react"

function Demo() {
  const ref = useRef(null)

  return (
    <>
      <div ref={ref} />
      <Portal containerRef={ref}>
        <Box>Portaled content</Box>
      </Portal>
    </>
  )
}
```

### PortalManager Removal

**v2:**

```tsx
import { PortalManager } from "@chakra-ui/react"

function App() {
  return (
    <PortalManager>
      <YourApp />
    </PortalManager>
  )
}
```

**v3:**

```tsx
// Simply remove PortalManager wrapper
function App() {
  return <YourApp />
}
```

## Running the Codemod

To automatically migrate your Portal components, run:

```bash
npx @chakra-ui/codemod transform portal <path>
```

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform portal ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform portal ./src --dry
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Remove PortalManager**: Delete all `PortalManager` wrappers and imports
2. **Remove appendToParentPortal**: Remove this prop from all `Portal`
   components
3. **Keep containerRef**: This prop continues to work the same way

## Breaking Changes

### Removed Components

- `PortalManager` - No longer needed in v3; portals are managed automatically

### Removed Props

- `appendToParentPortal` on `Portal` - Portal nesting is now handled
  automatically

## Benefits

The v3 Portal provides:

- **Simpler API**: No need for `PortalManager` wrapper
- **Automatic Management**: Portal nesting handled internally
- **Less Boilerplate**: Remove unnecessary configuration
- **Same Functionality**: Core portal behavior unchanged
