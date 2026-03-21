# PinInput Migration Guide

This document outlines the migration from Chakra UI v2 PinInput component to v3.

## Component Structure Changes

### v2 Structure

```tsx
import { PinInput, PinInputField } from "@chakra-ui/react"

;<PinInput>
  <PinInputField />
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>
```

### v3 Structure

```tsx
import { PinInput } from "@chakra-ui/react"

;<PinInput.Root>
  <PinInput.HiddenInput />
  <PinInput.Control>
    <PinInput.Input index={0} />
    <PinInput.Input index={1} />
    <PinInput.Input index={2} />
    <PinInput.Input index={3} />
  </PinInput.Control>
</PinInput.Root>
```

## Key Structural Changes

1. **New Required Elements:**
   - `<PinInput.HiddenInput />` - Must be first child of Root
   - `<PinInput.Control>` - Must wrap all Input elements

2. **Input Index Props:**
   - Each `<PinInput.Input>` requires an `index` prop (0-indexed)
   - Automatically added by the codemod

## Prop Changes

### Value Props

| v2 Prop        | v3 Prop        | Notes                                      |
| -------------- | -------------- | ------------------------------------------ |
| `value`        | `value`        | Now accepts `string[]` instead of `string` |
| `defaultValue` | `defaultValue` | Now accepts `string[]` instead of `string` |

### Boolean Props

| v2 Prop      | v3 Prop    | Notes                   |
| ------------ | ---------- | ----------------------- |
| `isDisabled` | `disabled` | Standard HTML attribute |
| `isInvalid`  | `invalid`  | Simplified prop name    |

### Event Handler Props

| v2 Prop      | v3 Prop           | Notes                                       |
| ------------ | ----------------- | ------------------------------------------- |
| `onChange`   | `onValueChange`   | Receives object: `{ value, valueAsString }` |
| `onComplete` | `onValueComplete` | Receives object: `{ value, valueAsString }` |

### Props Removed

| v2 Prop       | v3 Equivalent | Notes                     |
| ------------- | ------------- | ------------------------- |
| `manageFocus` | (removed)     | No longer supported in v3 |

### Styling Props

| v2 Prop            | v3 Prop/Behavior              | Notes                               |
| ------------------ | ----------------------------- | ----------------------------------- |
| `focusBorderColor` | CSS variable: `--focus-color` | Applied to Input, moved to css prop |
| `errorBorderColor` | CSS variable: `--error-color` | Applied to Input, moved to css prop |

## Usage Examples

### Basic PinInput

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
      <PinInput.Input index={3} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### With Type (Alphanumeric)

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput type="alphanumeric">
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root type="alphanumeric">
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
      <PinInput.Input index={3} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### With OTP Mode

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput otp>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root otp>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
      <PinInput.Input index={3} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### With Mask

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput type="alphanumeric" mask>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root type="alphanumeric" mask>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
      <PinInput.Input index={3} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### With Default Value

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput defaultValue="234">
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root defaultValue={["2", "3", "4"]}>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### With Partial Value

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput defaultValue="23">
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root defaultValue={["2", "3"]}>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### With Placeholder

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput placeholder="🥳">
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root placeholder="🥳">
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### Disabled State

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput isDisabled>
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root disabled>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### Invalid State

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

;<HStack>
  <PinInput isInvalid>
    <PinInputField />
    <PinInputField />
  </PinInput>
</HStack>
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

;<HStack>
  <PinInput.Root invalid>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
    </PinInput.Control>
  </PinInput.Root>
</HStack>
```

### Controlled Component

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [value, setValue] = useState("1234")
  return (
    <HStack>
      <PinInput value={value} onChange={setValue}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [value, setValue] = useState(["1", "2", "3", "4"])
  return (
    <HStack>
      <PinInput.Root value={value} onValueChange={(e) => setValue(e.value)}>
        <PinInput.HiddenInput />
        <PinInput.Control>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
          <PinInput.Input index={3} />
        </PinInput.Control>
      </PinInput.Root>
    </HStack>
  )
}
```

### With Event Handlers

**v2:**

```tsx
import { HStack, PinInput, PinInputField } from "@chakra-ui/react"

function App() {
  const handleChange = (value) => console.log("change", value)
  const handleComplete = (value) => console.log("complete", value)
  return (
    <HStack>
      <PinInput onChange={handleChange} onComplete={handleComplete}>
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  )
}
```

**v3:**

```tsx
import { HStack, PinInput } from "@chakra-ui/react"

function App() {
  const handleChange = (e) => console.log("change", e.value)
  const handleComplete = (e) => console.log("complete", e.value)
  return (
    <HStack>
      <PinInput.Root
        onValueChange={handleChange}
        onValueComplete={handleComplete}
      >
        <PinInput.HiddenInput />
        <PinInput.Control>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
        </PinInput.Control>
      </PinInput.Root>
    </HStack>
  )
}
```

## Running the Codemod

To automatically migrate your PinInput components, run:

```bash
npx @chakra-ui/codemod transform pin-input <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform pin-input ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform pin-input ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform pin-input ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Update Component Names**:
   - `<PinInput>` → `<PinInput.Root>`
   - `<PinInputField>` → `<PinInput.Input>`

2. **Add Required Elements**:
   - Add `<PinInput.HiddenInput />` as first child of Root
   - Wrap all Input elements in `<PinInput.Control>`

3. **Add Index Props**:
   - Add `index={0}`, `index={1}`, etc. to each Input element

4. **Update Value Props**:
   - Convert string values to arrays:
     - `value='1234'` → `value={['1', '2', '3', '4']}`
     - `defaultValue='234'` → `defaultValue={['2', '3', '4']}`
   - For variables: `value={pin}` → `value={pin.split('')}`

5. **Update Props**:
   - `isDisabled` → `disabled`
   - `isInvalid` → `invalid`
   - `onChange` → `onValueChange` (receives `{ value, valueAsString }`)
   - `onComplete` → `onValueComplete` (receives `{ value, valueAsString }`)
   - Remove `manageFocus`

6. **Update Styling Props**:
   - Move `focusBorderColor`/`errorBorderColor` from Input to CSS variables

## Breaking Changes

### Component Structure

- PinInput now requires explicit child structure with HiddenInput, Control, and
  indexed Inputs
- No longer a simple wrapper of input fields

### Component Naming

- `PinInput` → `PinInput.Root` (namespace component)
- `PinInputField` → `PinInput.Input` (requires `index` prop)

### Value Type Changes

- `value` now accepts `string[]` instead of `string`
- `defaultValue` now accepts `string[]` instead of `string`
- Values are automatically converted by the codemod:
  - String literals: `'234'` → `['2', '3', '4']`
  - Expressions: `{pin}` → `{pin.split('')}`

### Props Renamed

- `isDisabled` → `disabled`
- `isInvalid` → `invalid`
- `onChange` → `onValueChange`
- `onComplete` → `onValueComplete`

### Props Removed

- `manageFocus` - no longer supported

### Event Handler Signatures

- `onChange(value)` → `onValueChange({ value, valueAsString })`
- `onComplete(value)` → `onValueComplete({ value, valueAsString })`

### Styling Changes

- `focusBorderColor` and `errorBorderColor` moved to CSS variables
- Must use `css` prop on Input: `css={{ '--focus-color': 'red.200' }}`

## Codemod Capabilities

The codemod will:

- ✅ Transform `<PinInput>` to `<PinInput.Root>` with proper structure
- ✅ Add `<PinInput.HiddenInput />` as first child
- ✅ Wrap all inputs in `<PinInput.Control>`
- ✅ Transform `<PinInputField>` to `<PinInput.Input>` with auto-indexed props
- ✅ Convert string values to arrays (`'234'` → `['2', '3', '4']`)
- ✅ Wrap value expressions in `.split('')` method
- ✅ Transform boolean props (isDisabled, isInvalid)
- ✅ Transform event handlers (onChange, onComplete)
- ✅ Remove `manageFocus` prop
- ✅ Transform `focusBorderColor`/`errorBorderColor` to CSS variables
- ✅ Preserve all other props and attributes

## Benefits

The v3 PinInput component provides:

- **Explicit Structure**: Clear separation of concerns with HiddenInput,
  Control, and Input
- **Better Accessibility**: Improved ARIA attributes and screen reader support
- **Type Safety**: Array-based values provide better type checking
- **Flexible Styling**: Direct access to all sub-components for custom styling
- **Standard Props**: Uses standard HTML attributes where possible
- **Better TypeScript Support**: Improved type inference with namespace
  components
- **Indexed Inputs**: Explicit index props make the component behavior more
  predictable

## Notes

- **IMPORTANT**: `value` and `defaultValue` now accept `string[]` instead of
  `string`:
  - String literals are converted: `value='1234'` →
    `value={['1', '2', '3', '4']}`
  - Expressions are wrapped: `value={pin}` → `value={pin.split('')}`
- The `onValueChange` and `onValueComplete` handlers receive an object
  `{ value, valueAsString }`
  - `value` is the array of characters
  - `valueAsString` is the joined string value
- Each `<PinInput.Input>` requires an `index` prop (0-indexed)
- The codemod automatically adds proper index props based on the order of
  PinInputField elements
- `<PinInput.HiddenInput />` is required for proper form integration and
  accessibility
- `<PinInput.Control>` is required to wrap all Input elements
- All styling props work on any sub-component (Root, Input, Control, etc.)
