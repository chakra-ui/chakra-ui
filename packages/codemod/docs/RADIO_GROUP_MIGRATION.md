# RadioGroup Migration Guide

This document outlines the migration from Chakra UI v2 RadioGroup component to
v3.

## Component Structure Changes

### v2 Structure

```tsx
import { Radio, RadioGroup } from "@chakra-ui/react"

;<RadioGroup onChange={setValue} value={value}>
  <Stack direction="row">
    <Radio value="1">First</Radio>
    <Radio value="2">Second</Radio>
    <Radio value="3">Third</Radio>
  </Stack>
</RadioGroup>
```

### v3 Structure

```tsx
import { RadioGroup } from "@chakra-ui/react"

;<RadioGroup.Root onValueChange={(e) => setValue(e.value)} value={value}>
  <Stack direction="row">
    <RadioGroup.Item value="1">
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>First</RadioGroup.ItemText>
    </RadioGroup.Item>
    <RadioGroup.Item value="2">
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>Second</RadioGroup.ItemText>
    </RadioGroup.Item>
    <RadioGroup.Item value="3">
      <RadioGroup.ItemHiddenInput />
      <RadioGroup.ItemIndicator />
      <RadioGroup.ItemText>Third</RadioGroup.ItemText>
    </RadioGroup.Item>
  </Stack>
</RadioGroup.Root>
```

## Key Structural Changes

1. **RadioGroup Component:**
   - `<RadioGroup>` → `<RadioGroup.Root>`
   - Namespace component pattern

2. **Radio Component:**
   - `<Radio>` → `<RadioGroup.Item>` with required sub-components:
     - `<RadioGroup.ItemHiddenInput />` - Hidden native input element
     - `<RadioGroup.ItemIndicator />` - Visual indicator (radio dot)
     - `<RadioGroup.ItemText>` - Label text (wraps children)

3. **Nested Structure:**
   - Radio elements can be nested inside other components (Stack, Box, etc.)
   - The codemod recursively finds and transforms all Radio elements

## Prop Changes

### RadioGroup Props

| v2 Prop        | v3 Prop         | Notes                                              |
| -------------- | --------------- | -------------------------------------------------- |
| `onChange`     | `onValueChange` | Receives object: `{ value }` instead of just value |
| `value`        | `value`         | No change                                          |
| `defaultValue` | `defaultValue`  | No change                                          |
| `size`         | `size`          | No change                                          |
| `variant`      | `variant`       | No change                                          |
| `colorScheme`  | `colorPalette`  | Renamed (though colorPalette already works)        |

### Radio Props (now RadioGroup.Item)

| v2 Prop      | v3 Prop    | Notes                   |
| ------------ | ---------- | ----------------------- |
| `isDisabled` | `disabled` | Standard HTML attribute |
| `value`      | `value`    | No change               |

### Props Removed from Radio/RadioGroup.Item

| v2 Prop          | v3 Equivalent | Notes                                              |
| ---------------- | ------------- | -------------------------------------------------- |
| `isInvalid`      | (removed)     | Controlled from RadioGroup.Root                    |
| `isChecked`      | (removed)     | Controlled from RadioGroup.Root                    |
| `defaultChecked` | (removed)     | Use RadioGroup.Root `defaultValue`                 |
| `colorScheme`    | (removed)     | Should be set on RadioGroup.Root as `colorPalette` |

### Props Moved

| v2 Prop      | v3 Location                  | Notes                                        |
| ------------ | ---------------------------- | -------------------------------------------- |
| `inputProps` | `RadioGroup.ItemHiddenInput` | Native input attributes moved to HiddenInput |

## Usage Examples

### Basic RadioGroup

**v2:**

```tsx
import { Radio, RadioGroup, Stack } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup defaultValue="2">
      <Stack spacing={5} direction="row">
        <Radio value="1">Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </Stack>
    </RadioGroup>
  )
}
```

**v3:**

```tsx
import { RadioGroup, Stack } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup.Root defaultValue="2">
      <Stack spacing={5} direction="row">
        <RadioGroup.Item value="1">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="2">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="3">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Radio 3</RadioGroup.ItemText>
        </RadioGroup.Item>
      </Stack>
    </RadioGroup.Root>
  )
}
```

### Controlled RadioGroup

**v2:**

```tsx
import { Radio, RadioGroup, Stack } from "@chakra-ui/react"
import React from "react"

function RadioExample() {
  const [value, setValue] = React.useState("1")
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </Stack>
    </RadioGroup>
  )
}
```

**v3:**

```tsx
import { RadioGroup, Stack } from "@chakra-ui/react"
import React from "react"

function RadioExample() {
  const [value, setValue] = React.useState("1")
  return (
    <RadioGroup.Root onValueChange={(e) => setValue(e.value)} value={value}>
      <Stack direction="row">
        <RadioGroup.Item value="1">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>First</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="2">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Second</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="3">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Third</RadioGroup.ItemText>
        </RadioGroup.Item>
      </Stack>
    </RadioGroup.Root>
  )
}
```

### With Color Scheme

**v2:**

```tsx
import { Radio, RadioGroup, Stack } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup defaultValue="2">
      <Stack spacing={5} direction="row">
        <Radio colorScheme="red" value="1">
          Radio 1
        </Radio>
        <Radio colorScheme="green" value="2">
          Radio 2
        </Radio>
      </Stack>
    </RadioGroup>
  )
}
```

**v3:**

```tsx
import { RadioGroup, Stack } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup.Root defaultValue="2" colorPalette="red">
      <Stack spacing={5} direction="row">
        <RadioGroup.Item value="1">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="2">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
        </RadioGroup.Item>
      </Stack>
    </RadioGroup.Root>
  )
}
```

**Note:** In v3, `colorPalette` is set on the Root, not on individual items. The
codemod automatically removes `colorScheme` from individual Radio elements.

### Disabled State

**v2:**

```tsx
import { Radio, RadioGroup, Stack } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup defaultValue="1">
      <Stack>
        <Radio value="1" isDisabled>
          Checked
        </Radio>
        <Radio value="2">Unchecked</Radio>
        <Radio value="3">Unchecked</Radio>
      </Stack>
    </RadioGroup>
  )
}
```

**v3:**

```tsx
import { RadioGroup, Stack } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup.Root defaultValue="1">
      <Stack>
        <RadioGroup.Item value="1" disabled>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Checked</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="2">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Unchecked</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="3">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Unchecked</RadioGroup.ItemText>
        </RadioGroup.Item>
      </Stack>
    </RadioGroup.Root>
  )
}
```

### With inputProps

**v2:**

```tsx
import { Radio, RadioGroup } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup>
      <Radio value="1" inputProps={{ "aria-label": "Option 1" }}>
        Radio 1
      </Radio>
      <Radio value="2">Radio 2</Radio>
    </RadioGroup>
  )
}
```

**v3:**

```tsx
import { RadioGroup } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup.Root>
      <RadioGroup.Item value="1">
        <RadioGroup.ItemHiddenInput inputProps={{ "aria-label": "Option 1" }} />
        <RadioGroup.ItemIndicator />
        <RadioGroup.ItemText>Radio 1</RadioGroup.ItemText>
      </RadioGroup.Item>
      <RadioGroup.Item value="2">
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemIndicator />
        <RadioGroup.ItemText>Radio 2</RadioGroup.ItemText>
      </RadioGroup.Item>
    </RadioGroup.Root>
  )
}
```

### With Size and Variant

**v2:**

```tsx
import { Radio, RadioGroup } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup size="lg" variant="outline" defaultValue="1">
      <Radio value="1">Large Radio 1</Radio>
      <Radio value="2">Large Radio 2</Radio>
    </RadioGroup>
  )
}
```

**v3:**

```tsx
import { RadioGroup } from "@chakra-ui/react"

function App() {
  return (
    <RadioGroup.Root size="lg" variant="outline" defaultValue="1">
      <RadioGroup.Item value="1">
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemIndicator />
        <RadioGroup.ItemText>Large Radio 1</RadioGroup.ItemText>
      </RadioGroup.Item>
      <RadioGroup.Item value="2">
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemIndicator />
        <RadioGroup.ItemText>Large Radio 2</RadioGroup.ItemText>
      </RadioGroup.Item>
    </RadioGroup.Root>
  )
}
```

## Running the Codemod

To automatically migrate your RadioGroup components, run:

```bash
npx @chakra-ui/codemod transform radio-group <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform radio-group ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform radio-group ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform radio-group ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Update Component Names**:
   - `<RadioGroup>` → `<RadioGroup.Root>`
   - `<Radio>` → `<RadioGroup.Item>`

2. **Add Required Sub-components** for each Radio:
   - Add `<RadioGroup.ItemHiddenInput />` as first child
   - Add `<RadioGroup.ItemIndicator />` as second child
   - Wrap children text in `<RadioGroup.ItemText>`

3. **Update RadioGroup Props**:
   - `onChange` → `onValueChange` (receives `{ value }` object)

4. **Update Radio Props**:
   - `isDisabled` → `disabled`
   - Remove `isInvalid`, `isChecked`, `defaultChecked` (controlled from Root)
   - Move `inputProps` to `ItemHiddenInput`
   - Remove `colorScheme` from individual items (set on Root as `colorPalette`)

## Breaking Changes

### Component Structure

- RadioGroup now requires explicit namespace pattern (RadioGroup.Root,
  RadioGroup.Item)
- Each Radio requires three sub-components: ItemHiddenInput, ItemIndicator,
  ItemText
- No standalone Radio component - must be used within RadioGroup.Root

### Component Naming

- `RadioGroup` → `RadioGroup.Root` (namespace component)
- `Radio` → `RadioGroup.Item` (requires sub-components)

### Props Renamed

- `onChange` → `onValueChange` on RadioGroup.Root
- `isDisabled` → `disabled` on RadioGroup.Item

### Props Removed

- `isInvalid` - controlled from RadioGroup.Root
- `isChecked` - controlled from RadioGroup.Root
- `defaultChecked` - use RadioGroup.Root `defaultValue`
- `colorScheme` on individual items - set on RadioGroup.Root as `colorPalette`

### Event Handler Signatures

- `onChange(value)` → `onValueChange({ value })`
- Handler receives an object with `value` property instead of just the value

### Props Moved

- `inputProps` moved from Radio to RadioGroup.ItemHiddenInput

## Codemod Capabilities

The codemod will:

- ✅ Transform `<RadioGroup>` to `<RadioGroup.Root>` with proper structure
- ✅ Transform `<Radio>` to `<RadioGroup.Item>` with all required sub-components
- ✅ Add `<RadioGroup.ItemHiddenInput />` automatically
- ✅ Add `<RadioGroup.ItemIndicator />` automatically
- ✅ Wrap children in `<RadioGroup.ItemText>`
- ✅ Transform `onChange` to `onValueChange` on RadioGroup.Root
- ✅ Transform `isDisabled` to `disabled` on RadioGroup.Item
- ✅ Remove `isInvalid`, `isChecked`, `defaultChecked` props
- ✅ Remove `colorScheme` from individual items
- ✅ Move `inputProps` to ItemHiddenInput
- ✅ Recursively transform nested Radio elements (inside Stack, Box, etc.)
- ✅ Preserve all other props and attributes

## Benefits

The v3 RadioGroup component provides:

- **Explicit Structure**: Clear separation of concerns with HiddenInput,
  Indicator, and Text
- **Better Accessibility**: Improved ARIA attributes and screen reader support
- **Flexible Styling**: Direct access to all sub-components for custom styling
- **Standard Props**: Uses standard HTML attributes where possible (disabled vs
  isDisabled)
- **Better TypeScript Support**: Improved type inference with namespace
  components
- **Consistent API**: Follows the same pattern as other compound components in
  v3

## Notes

- **IMPORTANT**: The `onValueChange` handler receives an object `{ value }`
  instead of just the value:
  - v2: `onChange={(value) => setValue(value)}`
  - v3: `onValueChange={(e) => setValue(e.value)}`
- Each `<RadioGroup.Item>` requires three sub-components for proper
  functionality
- The codemod automatically handles nested Radio elements inside other
  components
- `<RadioGroup.ItemHiddenInput />` is required for proper form integration and
  accessibility
- `colorScheme`/`colorPalette` should be set on RadioGroup.Root, not on
  individual items
- All styling props work on any sub-component (Root, Item, ItemHiddenInput,
  ItemIndicator, ItemText)
