# Checkbox Migration Guide

This document outlines the migration from Chakra UI v2 Checkbox component to v3.

## Component Structure Changes

### v2 Structure

```tsx
<Checkbox>Label Text</Checkbox>
```

### v3 Structure

```tsx
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Label Text</Checkbox.Label>
</Checkbox.Root>
```

## Prop Changes

### Boolean Props

| v2 Prop           | v3 Prop                   | Notes                          |
| ----------------- | ------------------------- | ------------------------------ |
| `isChecked`       | `checked`                 | Standard prop name             |
| `isDisabled`      | `disabled`                | Standard HTML attribute        |
| `isInvalid`       | `invalid`                 | Simplified prop name           |
| `isReadOnly`      | `readOnly`                | Standard prop name             |
| `isRequired`      | `required`                | Standard HTML attribute        |
| `isIndeterminate` | `checked="indeterminate"` | Special value for checked prop |
| `isFocusable`     | (removed)                 | Not supported in v3            |

### Other Props

| v2 Prop       | v3 Prop/Location                 | Notes                          |
| ------------- | -------------------------------- | ------------------------------ |
| `colorScheme` | `colorPalette`                   | Renamed for consistency        |
| `onChange`    | `onCheckedChange`                | Renamed for clarity            |
| `icon`        | Checkbox.Control children        | Custom icon replaces Indicator |
| `iconColor`   | `color` on Indicator/Icon        | Applied to icon element        |
| `iconSize`    | `boxSize` on Indicator/Icon      | Applied to icon element        |
| `inputProps`  | Spread into Checkbox.HiddenInput | Props for hidden input element |
| `tabIndex`    | Checkbox.HiddenInput             | Moved to hidden input          |

## CheckboxGroup Changes

### Prop Changes

| v2 Prop      | v3 Prop         | Notes                            |
| ------------ | --------------- | -------------------------------- |
| `isDisabled` | `disabled`      | Simplified prop name             |
| `isNative`   | (removed)       | Not supported in v3              |
| `onChange`   | `onValueChange` | Receives array of checked values |

## Usage Examples

### Basic Checkbox

**v2:**

```tsx
import { Checkbox } from "@chakra-ui/react"

;<Checkbox defaultChecked>Accept terms</Checkbox>
```

**v3:**

```tsx
import { Checkbox } from "@chakra-ui/react"

;<Checkbox.Root defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Accept terms</Checkbox.Label>
</Checkbox.Root>
```

### Disabled Checkbox

**v2:**

```tsx
import { Checkbox } from '@chakra-ui/react'

<Checkbox isDisabled>Checkbox</Checkbox>
<Checkbox isDisabled defaultChecked>Checkbox</Checkbox>
```

**v3:**

```tsx
import { Checkbox } from '@chakra-ui/react'

<Checkbox.Root disabled>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Checkbox</Checkbox.Label>
</Checkbox.Root>

<Checkbox.Root disabled defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Checkbox</Checkbox.Label>
</Checkbox.Root>
```

### With Color Scheme

**v2:**

```tsx
import { Checkbox } from '@chakra-ui/react'

<Checkbox colorScheme='red' defaultChecked>
  Checkbox
</Checkbox>
<Checkbox colorScheme='green' defaultChecked>
  Checkbox
</Checkbox>
```

**v3:**

```tsx
import { Checkbox } from '@chakra-ui/react'

<Checkbox.Root colorPalette='red' defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Checkbox</Checkbox.Label>
</Checkbox.Root>

<Checkbox.Root colorPalette='green' defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Checkbox</Checkbox.Label>
</Checkbox.Root>
```

### Different Sizes

**v2:**

```tsx
import { Checkbox, Stack } from "@chakra-ui/react"

;<Stack spacing={[1, 5]} direction={["column", "row"]}>
  <Checkbox size="sm" colorScheme="red">
    Small
  </Checkbox>
  <Checkbox size="md" colorScheme="green" defaultChecked>
    Medium
  </Checkbox>
  <Checkbox size="lg" colorScheme="orange" defaultChecked>
    Large
  </Checkbox>
</Stack>
```

**v3:**

```tsx
import { Checkbox, Stack } from "@chakra-ui/react"

;<Stack spacing={[1, 5]} direction={["column", "row"]}>
  <Checkbox.Root size="sm" colorPalette="red">
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Small</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root size="md" colorPalette="green" defaultChecked>
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Medium</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root size="lg" colorPalette="orange" defaultChecked>
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Large</Checkbox.Label>
  </Checkbox.Root>
</Stack>
```

### Invalid State

**v2:**

```tsx
import { Checkbox } from "@chakra-ui/react"

;<Checkbox isInvalid>Checkbox</Checkbox>
```

**v3:**

```tsx
import { Checkbox } from "@chakra-ui/react"

;<Checkbox.Root invalid>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Checkbox</Checkbox.Label>
</Checkbox.Root>
```

### Custom Icon Color and Size

**v2:**

```tsx
import { Checkbox } from "@chakra-ui/react"

;<Checkbox iconColor="blue.400" iconSize="1rem">
  Option
</Checkbox>
```

**v3:**

```tsx
import { Checkbox } from "@chakra-ui/react"

;<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator color="blue.400" boxSize="1rem" />
  </Checkbox.Control>
  <Checkbox.Label>Option</Checkbox.Label>
</Checkbox.Root>
```

### Custom Icon

**v2:**

```tsx
import { CheckIcon } from "@chakra-ui/icons"
import { Checkbox } from "@chakra-ui/react"

;<Checkbox icon={<CheckIcon />}>Custom Icon</Checkbox>
```

**v3:**

```tsx
import { CheckIcon } from "@chakra-ui/icons"
import { Checkbox } from "@chakra-ui/react"

;<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <CheckIcon />
  </Checkbox.Control>
  <Checkbox.Label>Custom Icon</Checkbox.Label>
</Checkbox.Root>
```

### Indeterminate State

**v2:**

```tsx
import { Checkbox } from "@chakra-ui/react"

function App() {
  const [isIndeterminate, setIsIndeterminate] = useState(true)

  return (
    <Checkbox isIndeterminate={isIndeterminate} isChecked={allChecked}>
      Select All
    </Checkbox>
  )
}
```

**v3:**

```tsx
import { Checkbox } from "@chakra-ui/react"

function App() {
  const [isIndeterminate, setIsIndeterminate] = useState(true)

  return (
    <Checkbox.Root checked={isIndeterminate ? "indeterminate" : allChecked}>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Select All</Checkbox.Label>
    </Checkbox.Root>
  )
}
```

### Controlled Checkbox with onChange

**v2:**

```tsx
import { Checkbox } from "@chakra-ui/react"

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      isChecked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      Remember me
    </Checkbox>
  )
}
```

**v3:**

```tsx
import { Checkbox } from "@chakra-ui/react"

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={(e) => setChecked(!!e.checked)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Remember me</Checkbox.Label>
    </Checkbox.Root>
  )
}
```

### CheckboxGroup

**v2:**

```tsx
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"

function App() {
  const [values, setValues] = useState(["react"])

  return (
    <CheckboxGroup value={values} onChange={setValues}>
      <Stack direction="column">
        <Checkbox value="react">React</Checkbox>
        <Checkbox value="vue">Vue</Checkbox>
        <Checkbox value="svelte">Svelte</Checkbox>
      </Stack>
    </CheckboxGroup>
  )
}
```

**v3:**

```tsx
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"

function App() {
  const [values, setValues] = useState(["react"])

  return (
    <CheckboxGroup value={values} onValueChange={setValues}>
      <Stack direction="column">
        <Checkbox.Root value="react">
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>React</Checkbox.Label>
        </Checkbox.Root>

        <Checkbox.Root value="vue">
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Vue</Checkbox.Label>
        </Checkbox.Root>

        <Checkbox.Root value="svelte">
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Svelte</Checkbox.Label>
        </Checkbox.Root>
      </Stack>
    </CheckboxGroup>
  )
}
```

### CheckboxGroup with Disabled State

**v2:**

```tsx
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"

;<CheckboxGroup isDisabled>
  <Checkbox>Option 1</Checkbox>
  <Checkbox>Option 2</Checkbox>
</CheckboxGroup>
```

**v3:**

```tsx
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"

;<CheckboxGroup disabled>
  <Checkbox.Root>
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Option 1</Checkbox.Label>
  </Checkbox.Root>

  <Checkbox.Root>
    <Checkbox.HiddenInput />
    <Checkbox.Control>
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label>Option 2</Checkbox.Label>
  </Checkbox.Root>
</CheckboxGroup>
```

## Running the Codemod

To automatically migrate your Checkbox components, run:

```bash
npx @chakra-ui/codemod transform checkbox <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform checkbox ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform checkbox ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform checkbox ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Restructure Components**:
   - `<Checkbox>` → `<Checkbox.Root>`
   - Add `<Checkbox.HiddenInput />` as first child
   - Add `<Checkbox.Control>` with `<Checkbox.Indicator />` or custom icon
   - Wrap text content in `<Checkbox.Label>`

2. **Update Props**:
   - `isChecked` → `checked`
   - `isDisabled` → `disabled`
   - `isInvalid` → `invalid`
   - `isReadOnly` → `readOnly`
   - `isRequired` → `required`
   - `isIndeterminate` → `checked="indeterminate"` (or ternary expression)
   - `onChange` → `onCheckedChange`
   - `colorScheme` → `colorPalette`
   - Remove `isFocusable`

3. **Handle Special Props**:
   - Move `icon` prop content into `<Checkbox.Control>`
   - Apply `iconColor` as `color` on Indicator/icon
   - Apply `iconSize` as `boxSize` on Indicator/icon
   - Spread `inputProps` into `<Checkbox.HiddenInput>`
   - Move `tabIndex` to `<Checkbox.HiddenInput>`

4. **Update CheckboxGroup**:
   - `isDisabled` → `disabled`
   - `onChange` → `onValueChange`
   - Remove `isNative`

## Breaking Changes

### Component Structure

- Checkbox now requires explicit child components (HiddenInput, Control, Label)
- No longer a single self-contained component

### Props Renamed

- `isChecked` → `checked`
- `isDisabled` → `disabled`
- `isInvalid` → `invalid`
- `isReadOnly` → `readOnly`
- `isRequired` → `required`
- `onChange` → `onCheckedChange`
- `colorScheme` → `colorPalette`

### Props Moved

- `icon` → Checkbox.Control children
- `iconColor` → `color` on Indicator/icon element
- `iconSize` → `boxSize` on Indicator/icon element
- `inputProps` → spread into Checkbox.HiddenInput
- `tabIndex` → Checkbox.HiddenInput

### Props Removed

- `isFocusable` - no longer supported

### Special Handling

- `isIndeterminate` → use `checked="indeterminate"` or ternary expression

### CheckboxGroup Changes

- `isDisabled` → `disabled`
- `isNative` → removed
- `onChange` → `onValueChange` (receives array of values)

## Codemod Capabilities

The codemod will:

- ✅ Transform `<Checkbox>` to `<Checkbox.Root>` structure
- ✅ Add required child components (HiddenInput, Control, Label, Indicator)
- ✅ Transform all boolean props (isChecked, isDisabled, isInvalid, etc.)
- ✅ Rename `colorScheme` to `colorPalette`
- ✅ Transform `onChange` to `onCheckedChange`
- ✅ Handle `isIndeterminate` transformation to `checked` ternary
- ✅ Move custom `icon` prop to Checkbox.Control
- ✅ Apply `iconColor` and `iconSize` to Indicator/icon
- ✅ Move `inputProps` and `tabIndex` to Checkbox.HiddenInput
- ✅ Transform CheckboxGroup props
- ✅ Preserve all other props and attributes

## Benefits

The v3 Checkbox component provides:

- **Composable Structure**: Build custom checkbox designs with full control
- **Accessible by Default**: Built-in ARIA attributes and keyboard navigation
- **Flexible Styling**: Direct access to all sub-components for styling
- **Custom Icons**: Easy integration of custom check icons
- **Standard Props**: Uses standard HTML attributes where possible
- **Better TypeScript Support**: Improved type safety with explicit structure
- **Cleaner API**: Simplified prop names and consistent patterns

## Notes

- The `onCheckedChange` event in v3 receives an object with a `checked`
  property, not a DOM event
- The `checked` prop can accept `true`, `false`, or `"indeterminate"` as values
- Custom icons replace the default Indicator component entirely
- All styling props work on any sub-component (Root, Control, Label, etc.)
