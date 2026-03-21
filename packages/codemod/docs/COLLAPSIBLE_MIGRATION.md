# Collapse → Collapsible Migration Guide

This document outlines the migration from Chakra UI v2 Collapse component to v3
Collapsible.

## Component Mapping

### v2 → v3

| v2 Component | v3 Component          |
| ------------ | --------------------- |
| `Collapse`   | `Collapsible.Root`    |
|              | `Collapsible.Content` |

## Import Changes

**v2:**

```tsx
import { Collapse } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Collapsible } from "@chakra-ui/react"
```

## Prop Changes

| v2 Prop          | v3 Prop | Notes                           |
| ---------------- | ------- | ------------------------------- |
| `in`             | `open`  | Renamed for consistency         |
| `animateOpacity` | ❌      | Removed (always animated in v3) |

## Usage Examples

### Basic Collapsible

**v2:**

```tsx
import { Button, Collapse } from "@chakra-ui/react"

function Demo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
      <Collapse in={isOpen}>
        <Box p={4} bg="gray.100">
          Collapsible content
        </Box>
      </Collapse>
    </>
  )
}
```

**v3:**

```tsx
import { Button, Collapsible } from "@chakra-ui/react"

function Demo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
      <Collapsible.Root open={isOpen}>
        <Collapsible.Content>
          <Box p={4} bg="gray.100">
            Collapsible content
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
```

### With Animation Options

**v2:**

```tsx
import { Collapse } from "@chakra-ui/react"

;<Collapse in={isOpen} animateOpacity startingHeight={20} endingHeight="auto">
  <Box>Content</Box>
</Collapse>
```

**v3:**

```tsx
import { Collapsible } from "@chakra-ui/react"

;<Collapsible.Root open={isOpen} startingHeight={20} endingHeight="auto">
  <Collapsible.Content>
    <Box>Content</Box>
  </Collapsible.Content>
</Collapsible.Root>
```

### Unmount on Exit

**v2:**

```tsx
import { Collapse } from "@chakra-ui/react"

;<Collapse in={isOpen} unmountOnExit>
  <ExpensiveComponent />
</Collapse>
```

**v3:**

```tsx
import { Collapsible } from "@chakra-ui/react"

;<Collapsible.Root open={isOpen} unmountOnExit>
  <Collapsible.Content>
    <ExpensiveComponent />
  </Collapsible.Content>
</Collapsible.Root>
```

## Running the Codemod

To automatically migrate your Collapse components, run:

```bash
npx @chakra-ui/codemod transform collapsible <path>
```

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform collapsible ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform collapsible ./src --dry
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Import Changes**: Replace `Collapse` import with `Collapsible`
2. **Component Structure**: Wrap content in `Collapsible.Root` >
   `Collapsible.Content`
3. **Prop Renames**: Change `in` to `open`
4. **Remove Props**: Remove `animateOpacity` (always animated in v3)

## Breaking Changes

### Component Structure

- v2 had a single `Collapse` component
- v3 uses compound components: `Collapsible.Root` wraps `Collapsible.Content`

### Prop Renames

- `in` → `open`

### Removed Props

- `animateOpacity` - Opacity animation is now always included in v3
