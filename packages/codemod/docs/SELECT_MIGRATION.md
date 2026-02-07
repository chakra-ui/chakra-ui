# Select → NativeSelect Migration Guide

This document outlines the migration from Chakra UI v2 Select component to v3
NativeSelect.

## Component Mapping

### v2 → v3

| v2 Component | v3 Component             |
| ------------ | ------------------------ |
| `Select`     | `NativeSelect.Root`      |
|              | `NativeSelect.Field`     |
|              | `NativeSelect.Indicator` |

## Import Changes

**v2:**

```tsx
import { Select } from "@chakra-ui/react"
```

**v3:**

```tsx
import { NativeSelect } from "@chakra-ui/react"
```

## Prop Changes

| v2 Prop | v3 Prop | Notes                                |
| ------- | ------- | ------------------------------------ |
| `icon`  | ❌      | Use `NativeSelect.Indicator` instead |

## Usage Examples

### Basic Select

**v2:**

```tsx
import { Select } from "@chakra-ui/react"

;<Select placeholder="Select option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>
```

**v3:**

```tsx
import { NativeSelect } from "@chakra-ui/react"

;<NativeSelect.Root>
  <NativeSelect.Field placeholder="Select option">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator />
</NativeSelect.Root>
```

### Select with Variants

**v2:**

```tsx
import { Select } from "@chakra-ui/react"

;<Select placeholder="Select option" variant="filled" size="lg">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**v3:**

```tsx
import { NativeSelect } from "@chakra-ui/react"

;<NativeSelect.Root>
  <NativeSelect.Field placeholder="Select option" variant="filled" size="lg">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator />
</NativeSelect.Root>
```

### Select with Event Handlers

**v2:**

```tsx
import { Select } from "@chakra-ui/react"

;<Select
  placeholder="Select option"
  onChange={(e) => console.log(e.target.value)}
>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**v3:**

```tsx
import { NativeSelect } from "@chakra-ui/react"

;<NativeSelect.Root>
  <NativeSelect.Field
    placeholder="Select option"
    onChange={(e) => console.log(e.target.value)}
  >
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator />
</NativeSelect.Root>
```

### Controlled Select

**v2:**

```tsx
import { Select } from "@chakra-ui/react"

function Demo() {
  const [value, setValue] = useState("")

  return (
    <Select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  )
}
```

**v3:**

```tsx
import { NativeSelect } from "@chakra-ui/react"

function Demo() {
  const [value, setValue] = useState("")

  return (
    <NativeSelect.Root>
      <NativeSelect.Field
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
```

## Running the Codemod

To automatically migrate your Select components, run:

```bash
npx @chakra-ui/codemod transform select <path>
```

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform select ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform select ./src --dry
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Import Changes**: Replace `Select` import with `NativeSelect`
2. **Component Structure**:
   - Wrap in `NativeSelect.Root`
   - Move props to `NativeSelect.Field`
   - Add `NativeSelect.Indicator` for dropdown arrow
3. **Remove icon Prop**: Remove `icon` prop if present (use indicator styling
   instead)

## Breaking Changes

### Component Structure

- v2 had a single `Select` component
- v3 uses compound components: `NativeSelect.Root` wraps `NativeSelect.Field`
  and `NativeSelect.Indicator`

### Removed Props

- `icon` - Use `NativeSelect.Indicator` component for custom dropdown arrows

## Benefits

The v3 NativeSelect provides:

- **Better Composition**: Separate concerns between container, field, and
  indicator
- **More Flexible Styling**: Style each part independently
- **Clearer Structure**: Explicit indicator component
- **Same Functionality**: All native select features work identically
