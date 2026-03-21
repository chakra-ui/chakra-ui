# Divider → Separator Migration Guide

This document outlines the migration from Chakra UI v2 Divider component to v3
Separator.

## Component Mapping

### v2 → v3

| v2 Component | v3 Component |
| ------------ | ------------ |
| `Divider`    | `Separator`  |

## Import Changes

**v2:**

```tsx
import { Divider } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Separator } from "@chakra-ui/react"
```

## Usage Examples

### Basic Horizontal Separator

**v2:**

```tsx
import { Divider, Stack } from "@chakra-ui/react"

;<Stack>
  <div>Section 1</div>
  <Divider />
  <div>Section 2</div>
</Stack>
```

**v3:**

```tsx
import { Separator, Stack } from "@chakra-ui/react"

;<Stack>
  <div>Section 1</div>
  <Separator />
  <div>Section 2</div>
</Stack>
```

### Vertical Separator

**v2:**

```tsx
import { Divider, HStack } from "@chakra-ui/react"

;<HStack>
  <div>Left</div>
  <Divider orientation="vertical" height="20px" />
  <div>Right</div>
</HStack>
```

**v3:**

```tsx
import { HStack, Separator } from "@chakra-ui/react"

;<HStack>
  <div>Left</div>
  <Separator orientation="vertical" height="20px" />
  <div>Right</div>
</HStack>
```

### Separator with Styling

**v2:**

```tsx
import { Divider } from "@chakra-ui/react"

;<Divider borderColor="gray.300" borderWidth="2px" my={4} />
```

**v3:**

```tsx
import { Separator } from "@chakra-ui/react"

;<Separator borderColor="gray.300" borderWidth="2px" my={4} />
```

### Separator with Variants

**v2:**

```tsx
import { Divider, Stack } from "@chakra-ui/react"

;<Stack spacing={4}>
  <Divider variant="solid" />
  <Divider variant="dashed" />
  <Divider variant="dotted" />
</Stack>
```

**v3:**

```tsx
import { Separator, Stack } from "@chakra-ui/react"

;<Stack spacing={4}>
  <Separator variant="solid" />
  <Separator variant="dashed" />
  <Separator variant="dotted" />
</Stack>
```

### Multiple Separators

**v2:**

```tsx
import { Box, Divider } from "@chakra-ui/react"

;<Box>
  <Divider />
  <div>Content</div>
  <Divider />
</Box>
```

**v3:**

```tsx
import { Box, Separator } from "@chakra-ui/react"

;<Box>
  <Separator />
  <div>Content</div>
  <Separator />
</Box>
```

## Running the Codemod

To automatically migrate your Divider components, run:

```bash
npx @chakra-ui/codemod transform divider <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform divider ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform divider ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform divider ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Import Changes**: Replace `Divider` import with `Separator`
2. **Component Name**: Replace all `<Divider>` components with `<Separator>`
3. **Props**: All props remain the same - no prop changes needed
4. **Styling**: All existing styling props work the same way

## Breaking Changes

### Component Name

- `Divider` renamed to `Separator` for better semantic clarity

### No Other Changes

- All props from v2 work the same way in v3
- `orientation` prop (horizontal/vertical) remains unchanged
- All variant options remain unchanged
- All styling props continue to work

## Benefits

The v3 Separator component provides:

- **Better Semantics**: "Separator" more clearly describes the component's
  purpose
- **Consistent API**: Aligns with standard web terminology
- **Same Functionality**: All v2 features and props work identically in v3
- **No Breaking Changes**: Only the name changed, everything else is the same

## Notes

- The component was renamed from `Divider` to `Separator` to better align with
  semantic HTML and ARIA standards
- All existing functionality, props, and styling options remain exactly the same
- This is a simple rename with no behavioral changes
