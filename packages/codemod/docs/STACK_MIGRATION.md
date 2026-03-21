# Stack Migration Guide

This document outlines the migration of Stack-related components from Chakra UI
v2 to v3.

## Component Mapping

### v2 → v3

| v2 Component   | v3 Component     |
| -------------- | ---------------- |
| `Stack`        | `Stack`          |
| `VStack`       | `VStack`         |
| `HStack`       | `HStack`         |
| `StackDivider` | `StackSeparator` |

## Import Changes

**v2:**

```tsx
import { HStack, Stack, StackDivider, VStack } from "@chakra-ui/react"
```

**v3:**

```tsx
import { HStack, Stack, StackSeparator, VStack } from "@chakra-ui/react"
```

## Prop Changes

| v2 Prop   | v3 Prop     | Notes                     |
| --------- | ----------- | ------------------------- |
| `spacing` | `gap`       | Renamed for CSS alignment |
| `divider` | `separator` | Renamed for consistency   |

## Usage Examples

### Basic Stack with Spacing

**v2:**

```tsx
import { Stack } from "@chakra-ui/react"

;<Stack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>
```

**v3:**

```tsx
import { Stack } from "@chakra-ui/react"

;<Stack gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>
```

### VStack and HStack

**v2:**

```tsx
import { VStack, HStack } from '@chakra-ui/react'

<VStack spacing={4}>
  <Box>Vertical 1</Box>
  <Box>Vertical 2</Box>
</VStack>

<HStack spacing={6}>
  <Box>Horizontal 1</Box>
  <Box>Horizontal 2</Box>
</HStack>
```

**v3:**

```tsx
import { VStack, HStack } from '@chakra-ui/react'

<VStack gap={4}>
  <Box>Vertical 1</Box>
  <Box>Vertical 2</Box>
</VStack>

<HStack gap={6}>
  <Box>Horizontal 1</Box>
  <Box>Horizontal 2</Box>
</HStack>
```

### Stack with Divider/Separator

**v2:**

```tsx
import { Stack, StackDivider } from "@chakra-ui/react"

;<Stack spacing={4} divider={<StackDivider />}>
  <Box>Section 1</Box>
  <Box>Section 2</Box>
  <Box>Section 3</Box>
</Stack>
```

**v3:**

```tsx
import { Stack, StackSeparator } from "@chakra-ui/react"

;<Stack gap={4} separator={<StackSeparator />}>
  <Box>Section 1</Box>
  <Box>Section 2</Box>
  <Box>Section 3</Box>
</Stack>
```

### Styled Separator

**v2:**

```tsx
import { Stack, StackDivider } from "@chakra-ui/react"

;<Stack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
  <Box>Section 1</Box>
  <Box>Section 2</Box>
</Stack>
```

**v3:**

```tsx
import { Stack, StackSeparator } from "@chakra-ui/react"

;<Stack gap={4} separator={<StackSeparator borderColor="gray.200" />}>
  <Box>Section 1</Box>
  <Box>Section 2</Box>
</Stack>
```

### Standalone Separator

**v2:**

```tsx
import { Stack, StackDivider } from "@chakra-ui/react"

;<Stack>
  <Box>Section 1</Box>
  <StackDivider />
  <Box>Section 2</Box>
</Stack>
```

**v3:**

```tsx
import { Stack, StackSeparator } from "@chakra-ui/react"

;<Stack>
  <Box>Section 1</Box>
  <StackSeparator />
  <Box>Section 2</Box>
</Stack>
```

### Stack with Direction

**v2:**

```tsx
import { Stack } from "@chakra-ui/react"

;<Stack spacing={4} direction={{ base: "column", md: "row" }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

**v3:**

```tsx
import { Stack } from "@chakra-ui/react"

;<Stack gap={4} direction={{ base: "column", md: "row" }}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

## Running the Codemod

To automatically migrate your Stack components, run:

```bash
npx @chakra-ui/codemod transform stack <path>
```

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform stack ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform stack ./src --dry
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Prop Renames**:
   - Change `spacing` to `gap` on all Stack components
   - Change `divider` to `separator`
2. **Component Rename**:
   - Replace `StackDivider` with `StackSeparator`
3. **Import Updates**:
   - Update imports to use `StackSeparator` instead of `StackDivider`

## Breaking Changes

### Prop Renames

- `spacing` → `gap` (aligns with CSS gap property)
- `divider` → `separator` (more semantically accurate)

### Component Renames

- `StackDivider` → `StackSeparator` (consistent naming)

## Benefits

The v3 Stack provides:

- **CSS Alignment**: `gap` prop aligns with standard CSS gap property
- **Better Semantics**: "separator" better describes the component's role
- **Consistent API**: Matches modern CSS layout terminology
- **Same Functionality**: All layout features work identically
