# NumberInput Migration Guide

This document outlines the migration from Chakra UI v2 NumberInput component to
v3.

## Component Structure Changes

### v2 Structure

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

### v3 Structure

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

## Prop Changes

### Boolean Props

| v2 Prop      | v3 Prop    | Notes                   |
| ------------ | ---------- | ----------------------- |
| `isDisabled` | `disabled` | Standard HTML attribute |
| `isInvalid`  | `invalid`  | Simplified prop name    |
| `isReadOnly` | `readOnly` | Standard prop name      |
| `isRequired` | `required` | Standard HTML attribute |

### Value Props

| v2 Prop        | v3 Prop        | Notes                                |
| -------------- | -------------- | ------------------------------------ |
| `value`        | `value`        | Now accepts string instead of number |
| `defaultValue` | `defaultValue` | Now accepts string instead of number |

### Event Handler Props

| v2 Prop     | v3 Prop          | Notes                                       |
| ----------- | ---------------- | ------------------------------------------- |
| `onChange`  | `onValueChange`  | Receives object: `{ value, valueAsNumber }` |
| `onInvalid` | `onValueInvalid` | Called when input is invalid                |

### Props Converted

| v2 Prop           | v3 Prop         | Notes                                               |
| ----------------- | --------------- | --------------------------------------------------- |
| `keepWithinRange` | `allowOverflow` | Inverse boolean: `false` → `true`, `true` → `false` |

### Props Removed

| v2 Prop            | v3 Equivalent | Notes                     |
| ------------------ | ------------- | ------------------------- |
| `isValidCharacter` | (removed)     | No longer supported in v3 |

### Styling Props

| v2 Prop            | v3 Prop/Behavior              | Notes                    |
| ------------------ | ----------------------------- | ------------------------ |
| `focusBorderColor` | CSS variable: `--focus-color` | Moved to css prop object |
| `errorBorderColor` | CSS variable: `--error-color` | Moved to css prop object |

## Usage Examples

### Basic NumberInput

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

### With Min and Max Values

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root defaultValue="15" min={10} max={20}>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

### With Step Value

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput step={5} defaultValue={15} min={10} max={30}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root step={5} defaultValue="15" min={10} max={30}>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

### With Precision

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput defaultValue={15} precision={2} step={0.2}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root defaultValue="15" precision={2} step={0.2}>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

### Disabled State

**v2:**

```tsx
import { NumberInput, NumberInputField } from "@chakra-ui/react"

;<NumberInput isDisabled>
  <NumberInputField />
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root disabled>
  <NumberInput.Input />
</NumberInput.Root>
```

### Invalid State

**v2:**

```tsx
import { NumberInput, NumberInputField } from "@chakra-ui/react"

;<NumberInput isInvalid>
  <NumberInputField />
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root invalid>
  <NumberInput.Input />
</NumberInput.Root>
```

### Read-Only State

**v2:**

```tsx
import { NumberInput, NumberInputField } from "@chakra-ui/react"

;<NumberInput isReadOnly>
  <NumberInputField />
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root readOnly>
  <NumberInput.Input />
</NumberInput.Root>
```

### Required State

**v2:**

```tsx
import { NumberInput, NumberInputField } from "@chakra-ui/react"

;<NumberInput isRequired>
  <NumberInputField />
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root required>
  <NumberInput.Input />
</NumberInput.Root>
```

### Controlled Component with onChange

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import React from "react"

function Example() {
  const format = (val) => "$" + val
  const parse = (val) => val.replace(/^\$/, "")
  const [value, setValue] = React.useState("1.53")

  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
      max={50}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"
import React from "react"

function Example() {
  const format = (val) => "$" + val
  const parse = (val) => val.replace(/^\$/, "")
  const [value, setValue] = React.useState("1.53")

  return (
    <NumberInput.Root
      onValueChange={(e) => setValue(parse(e.value))}
      value={format(value)}
      max={50}
    >
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
    </NumberInput.Root>
  )
}
```

### Different Sizes

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react"

;<Stack shouldWrapChildren direction="row">
  <NumberInput size="xs" maxW={16} defaultValue={15} min={10}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>

  <NumberInput size="sm" maxW={20} defaultValue={15} min={10}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>

  <NumberInput size="md" maxW={24} defaultValue={15} min={10}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>

  <NumberInput size="lg" maxW={32} defaultValue={15} min={10}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
</Stack>
```

**v3:**

```tsx
import { NumberInput, Stack } from "@chakra-ui/react"

;<Stack shouldWrapChildren direction="row">
  <NumberInput.Root size="xs" maxW={16} defaultValue="15" min={10}>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.IncrementTrigger />
      <NumberInput.DecrementTrigger />
    </NumberInput.Control>
  </NumberInput.Root>

  <NumberInput.Root size="sm" maxW={20} defaultValue="15" min={10}>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.IncrementTrigger />
      <NumberInput.DecrementTrigger />
    </NumberInput.Control>
  </NumberInput.Root>

  <NumberInput.Root size="md" maxW={24} defaultValue="15" min={10}>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.IncrementTrigger />
      <NumberInput.DecrementTrigger />
    </NumberInput.Control>
  </NumberInput.Root>

  <NumberInput.Root size="lg" maxW={32} defaultValue="15" min={10}>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.IncrementTrigger />
      <NumberInput.DecrementTrigger />
    </NumberInput.Control>
  </NumberInput.Root>
</Stack>
```

### With Custom Styling

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput size="sm" defaultValue={15} min={10}>
  <NumberInputField focusBorderColor="red.200" />
  <NumberInputStepper>
    <NumberIncrementStepper
      bg="green.200"
      _active={{ bg: "green.300" }}
      children="+"
    />
    <NumberDecrementStepper
      bg="pink.200"
      _active={{ bg: "pink.300" }}
      children="-"
    />
  </NumberInputStepper>
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root size="sm" defaultValue="15" min={10}>
  <NumberInput.Input css={{ "--focus-color": "red.200" }} />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger bg="green.200" _active={{ bg: "green.300" }}>
      +
    </NumberInput.IncrementTrigger>
    <NumberInput.DecrementTrigger bg="pink.200" _active={{ bg: "pink.300" }}>
      -
    </NumberInput.DecrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>
```

### With Mouse Wheel Support

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

function MouseWheelExample() {
  return (
    <NumberInput allowMouseWheel>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

function MouseWheelExample() {
  return (
    <NumberInput.Root allowMouseWheel>
      <NumberInput.Input />
      <NumberInput.Control>
        <NumberInput.IncrementTrigger />
        <NumberInput.DecrementTrigger />
      </NumberInput.Control>
    </NumberInput.Root>
  )
}
```

### With Clamp Value on Blur

**v2:**

```tsx
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

;<NumberInput defaultValue={15} max={30} clampValueOnBlur={false}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
```

**v3:**

```tsx
import { NumberInput } from "@chakra-ui/react"

;<NumberInput.Root defaultValue="15" max={30} clampValueOnBlur={false}>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

## Running the Codemod

To automatically migrate your NumberInput components, run:

```bash
npx @chakra-ui/codemod transform number-input <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform number-input ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform number-input ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform number-input ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Update Component Names**:
   - `<NumberInput>` → `<NumberInput.Root>`
   - `<NumberInputField>` → `<NumberInput.Input>`
   - `<NumberInputStepper>` → `<NumberInput.Control>`
   - `<NumberIncrementStepper>` → `<NumberInput.IncrementTrigger>`
   - `<NumberDecrementStepper>` → `<NumberInput.DecrementTrigger>`

2. **Update Props**:
   - `isDisabled` → `disabled`
   - `isInvalid` → `invalid`
   - `isReadOnly` → `readOnly`
   - `isRequired` → `required`
   - `onChange` → `onValueChange` (receives `{ value, valueAsNumber }`)
   - `onInvalid` → `onValueInvalid`
   - `keepWithinRange` → `allowOverflow` (inverse: `false` → `true`, `true` →
     `false`)

3. **Remove Unsupported Props**:
   - Remove `isValidCharacter`

4. **Update Styling Props**:
   - `focusBorderColor='red.200'` → `css={{ '--focus-color': 'red.200' }}`
   - `errorBorderColor='red.500'` → `css={{ '--error-color': 'red.500' }}`

## Breaking Changes

### Component Naming

- `NumberInput` → `NumberInput.Root` (namespace component)
- `NumberInputField` → `NumberInput.Input`
- `NumberInputStepper` → `NumberInput.Control`
- `NumberIncrementStepper` → `NumberInput.IncrementTrigger`
- `NumberDecrementStepper` → `NumberInput.DecrementTrigger`

### Props Renamed

- `isDisabled` → `disabled`
- `isInvalid` → `invalid`
- `isReadOnly` → `readOnly`
- `isRequired` → `required`
- `onChange` → `onValueChange`
- `onInvalid` → `onValueInvalid`

### Value Type Changes

- `value` now accepts `string` instead of `number`
- `defaultValue` now accepts `string` instead of `number`
- Numbers will be automatically converted to strings by the codemod where
  possible

### Props Converted

- `keepWithinRange` → `allowOverflow` (inverse boolean)
  - `keepWithinRange={false}` becomes `allowOverflow={true}`
  - `keepWithinRange={true}` becomes `allowOverflow={false}`

### Props Removed

- `isValidCharacter` - no longer supported

### Event Handler Signatures

- `onChange(value)` → `onValueChange({ value, valueAsNumber })`
- `onInvalid(message, value)` → `onValueInvalid({ reason, value })`

### Styling Changes

- `focusBorderColor` and `errorBorderColor` moved to CSS variables
- Must use `css` prop: `css={{ '--focus-color': 'red.200' }}`

## Codemod Capabilities

The codemod will:

- ✅ Transform all component names to namespace syntax
- ✅ Transform `isDisabled` → `disabled`
- ✅ Transform `isInvalid` → `invalid`
- ✅ Transform `isReadOnly` → `readOnly`
- ✅ Transform `isRequired` → `required`
- ✅ Transform event handlers: `onChange`, `onInvalid`
- ✅ Convert `keepWithinRange` to `allowOverflow` (inverse boolean)
- ✅ Remove unsupported props: `isValidCharacter`
- ✅ Convert numeric `value` and `defaultValue` to strings
- ✅ Transform `focusBorderColor` and `errorBorderColor` to CSS variables
- ✅ Preserve all other props and attributes

## Benefits

The v3 NumberInput component provides:

- **Composable Architecture**: Build custom number input controls with full
  flexibility
- **Better Accessibility**: Improved ARIA attributes and keyboard navigation
- **Cleaner API**: Simplified prop names align with web standards
- **TypeScript Support**: Better type inference with namespace components
- **Flexible Styling**: Direct access to all sub-components for custom styling
- **Standard Props**: Uses standard HTML attributes where possible
- **Modern Patterns**: Follows React best practices with controlled components

## Notes

- **IMPORTANT**: `value` and `defaultValue` now accept strings instead of
  numbers in v3:
  - Numeric literals are converted: `value={15}` → `value="15"`
  - Expressions are wrapped: `value={myVar}` → `value={String(myVar)}`
  - Function calls are wrapped: `value={format(val)}` →
    `value={String(format(val))}`
  - String literals are preserved: `value="15"` → `value="15"`
- The `onValueChange` handler in v3 receives an object
  `{ value, valueAsNumber }`, not just the value string
  - `value` is the string representation
  - `valueAsNumber` is the parsed number value
- The `focusBorderColor` and `errorBorderColor` props are moved to CSS variables
  in the `css` prop
- `keepWithinRange` from v2 is converted to `allowOverflow` in v3 with inverse
  boolean logic
- `isValidCharacter` is no longer supported in v3
- All styling props work on any sub-component (Root, Input, Control, etc.)
- The stepper buttons can be customized using `IncrementTrigger` and
  `DecrementTrigger` components
- Mouse wheel support is available via the `allowMouseWheel` prop
