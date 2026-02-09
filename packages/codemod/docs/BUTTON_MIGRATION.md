# Button Migration Guide

This document outlines the migration from Chakra UI v2 Button component to v3.

## Prop Changes

### Boolean Props

| v2 Prop      | v3 Prop       | Notes                   |
| ------------ | ------------- | ----------------------- |
| `isActive`   | `data-active` | Now uses data attribute |
| `isDisabled` | `disabled`    | Standard HTML attribute |
| `isLoading`  | `loading`     | Simplified prop name    |

### Other Props

| v2 Prop       | v3 Prop        | Notes                                      |
| ------------- | -------------- | ------------------------------------------ |
| `colorScheme` | `colorPalette` | Renamed for consistency                    |
| `leftIcon`    | (children)     | Move icon as first child                   |
| `rightIcon`   | (children)     | Move icon as last child                    |
| `iconSpacing` | `gap`          | Transformed to gap (removed if gap exists) |
| `variant`     | `variant`      | Same, but `unstyled` becomes boolean prop  |

### Variant Changes

- `variant="unstyled"` → `unstyled` boolean prop (remove `variant` attribute)
- `variant="link"` → `variant="plain"` (renamed for clarity)
- Other variants (`solid`, `outline`, `ghost`) remain the same

## ButtonGroup Changes

### Prop Changes

| v2 Prop      | v3 Prop    | Notes                                              |
| ------------ | ---------- | -------------------------------------------------- |
| `isAttached` | `attached` | Simplified prop name                               |
| `isDisabled` | (removed)  | Propagated to each Button/IconButton child instead |

**Important:** The codemod automatically propagates `isDisabled` from
ButtonGroup to all Button and IconButton children. If a child already has a
`disabled` prop, it won't be overridden.

## Import Changes

**v2:**

```tsx
import { Button } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"
```

No changes to imports - Button remains a named export.

## Usage Examples

### Basic Button

**v2:**

```tsx
import { Button } from "@chakra-ui/react"

;<Button colorScheme="blue">Click me</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"

;<Button colorPalette="blue">Click me</Button>
```

### Button States

**v2:**

```tsx
import { Button } from '@chakra-ui/react'

<Button isActive>Active</Button>
<Button isDisabled>Disabled</Button>
<Button isLoading>Loading</Button>
```

**v3:**

```tsx
import { Button } from '@chakra-ui/react'

<Button data-active>Active</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

### Button with Left Icon

**v2:**

```tsx
import { Button } from "@chakra-ui/react"
import { Download } from "lucide-react"

;<Button leftIcon={<Download />} iconSpacing={4}>
  Download
</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"
import { Download } from "lucide-react"

;<Button gap={4}>
  <Download />
  Download
</Button>
```

### Button with Right Icon

**v2:**

```tsx
import { Button } from "@chakra-ui/react"
import { ArrowRight } from "lucide-react"

;<Button rightIcon={<ArrowRight />}>Next</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"
import { ArrowRight } from "lucide-react"

;<Button>
  Next
  <ArrowRight />
</Button>
```

### Button with Both Icons

**v2:**

```tsx
import { Button } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

;<Button
  leftIcon={<ChevronLeft />}
  rightIcon={<ChevronRight />}
  iconSpacing={2}
>
  Navigate
</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

;<Button gap={2}>
  <ChevronLeft />
  Navigate
  <ChevronRight />
</Button>
```

### Unstyled Button

**v2:**

```tsx
import { Button } from "@chakra-ui/react"

;<Button variant="unstyled">Click me</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"

;<Button unstyled>Click me</Button>
```

### Complete Example

**v2:**

```tsx
import { Button } from "@chakra-ui/react"
import { Download } from "lucide-react"

;<Button
  colorScheme="blue"
  variant="solid"
  size="lg"
  isLoading
  leftIcon={<Download />}
  iconSpacing={2}
>
  Download File
</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"
import { Download } from "lucide-react"

;<Button colorPalette="blue" variant="solid" size="lg" loading>
  <Download />
  Download File
</Button>
```

## Running the Codemod

To automatically migrate your Button components, run:

```bash
npx @chakra-ui/codemod transform button <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform button ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform button ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform button ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Update Props**:
   - `isActive` → `data-active`
   - `isDisabled` → `disabled`
   - `isLoading` → `loading`
   - `colorScheme` → `colorPalette`
   - `variant="unstyled"` → `unstyled` (boolean prop)

2. **Move Icons to Children**:
   - Remove `leftIcon` prop and add icon as first child
   - Remove `rightIcon` prop and add icon as last child
   - Remove `iconSpacing` prop (use gap or spacing utilities if needed)

3. **Preserve Other Props**:
   - All other props remain the same (size, variant, onClick, etc.)

## Breaking Changes

### Button Props Renamed

- `isActive` → `data-active` (now uses data attribute)
- `isDisabled` → `disabled` (standard HTML attribute)
- `isLoading` → `loading` (simplified name)
- `colorScheme` → `colorPalette` (consistent naming)

### Button Props Moved to Children

- `leftIcon` → first child element
- `rightIcon` → last child element

### Button Props Removed

- `iconSpacing` → removed (use gap or spacing utilities instead)

### Button Variant Changes

- `variant="unstyled"` → `unstyled` boolean prop (variant attribute removed)
- `variant="link"` → `variant="plain"` (renamed for clarity)

### ButtonGroup Changes

- `isAttached` → `attached` (simplified prop name)
- `isDisabled` → removed (automatically propagated to Button/IconButton
  children)
  - The codemod automatically adds `disabled` prop to each Button/IconButton
    child
  - Existing `disabled` props on children are preserved

## Codemod Capabilities

The codemod will:

- ✅ Transform all boolean props (`isActive`, `isDisabled`, `isLoading`)
- ✅ Rename `colorScheme` to `colorPalette`
- ✅ Transform `variant="unstyled"` to `unstyled` boolean prop
- ✅ Move `leftIcon` to first child (unwrapped if JSX element)
- ✅ Move `rightIcon` to last child (unwrapped if JSX element)
- ✅ Remove `iconSpacing` prop
- ✅ Preserve all other props and attributes

## ButtonGroup Examples

### Basic ButtonGroup

**v2:**

```tsx
import { Button, ButtonGroup } from "@chakra-ui/react"

;<ButtonGroup isAttached>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</ButtonGroup>
```

**v3:**

```tsx
import { Button, ButtonGroup } from "@chakra-ui/react"

;<ButtonGroup attached>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</ButtonGroup>
```

### ButtonGroup with isDisabled

**v2:**

```tsx
import { Button, ButtonGroup } from "@chakra-ui/react"

;<ButtonGroup isDisabled>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

**v3:**

```tsx
import { Button, ButtonGroup } from "@chakra-ui/react"

;<ButtonGroup>
  <Button disabled>Button 1</Button>
  <Button disabled>Button 2</Button>
</ButtonGroup>
```

### ButtonGroup with Expression-based isDisabled

**v2:**

```tsx
import { Button, ButtonGroup } from "@chakra-ui/react"

function App({ loading }) {
  return (
    <ButtonGroup isDisabled={loading}>
      <Button>Save</Button>
      <Button>Cancel</Button>
    </ButtonGroup>
  )
}
```

**v3:**

```tsx
import { Button, ButtonGroup } from "@chakra-ui/react"

function App({ loading }) {
  return (
    <ButtonGroup>
      <Button disabled={loading}>Save</Button>
      <Button disabled={loading}>Cancel</Button>
    </ButtonGroup>
  )
}
```

### ButtonGroup with Mixed Button Types

**v2:**

```tsx
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react"
import { FiSettings } from "react-icons/fi"

;<ButtonGroup isDisabled isAttached>
  <Button>Action</Button>
  <IconButton icon={<FiSettings />} aria-label="Settings" />
</ButtonGroup>
```

**v3:**

```tsx
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react"
import { FiSettings } from "react-icons/fi"

;<ButtonGroup attached>
  <Button disabled>Action</Button>
  <IconButton icon={<FiSettings />} aria-label="Settings" disabled />
</ButtonGroup>
```

## Benefits

The v3 Button component provides:

- **Standard HTML Attributes**: Uses `disabled` instead of `isDisabled` for
  better HTML compliance
- **Cleaner Icon Integration**: Icons as children allow for more flexible
  layouts
- **Better Composition**: Children-based approach enables more complex button
  content
- **Consistent Naming**: `colorPalette` aligns with other components
- **Simpler API**: Boolean props without `is` prefix
- **No Breaking Styling**: All existing styling props continue to work

## Notes

- The `data-active` attribute in v3 allows for CSS styling with `[data-active]`
  selector
- Icon spacing can now be controlled using the `gap` prop on Button or spacing
  utilities
- The `loading` state in v3 includes built-in loading spinner support
- All other Button features (variants, sizes, styling props) work identically to
  v2
- When icons are variables or expressions (not JSX elements), they remain
  wrapped in `{}`
