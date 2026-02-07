# RangeSlider Migration Guide

This document outlines the migration from Chakra UI v2 RangeSlider component to
v3 Slider (range mode).

## Component Structure Changes

### v2 Structure

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"

;<RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

### v3 Structure

```tsx
import { Slider } from "@chakra-ui/react"

;<Slider.Root aria-label={["min", "max"]} defaultValue={[10, 30]}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.HiddenInput />
    </Slider.Thumb>
    <Slider.Thumb index={1}>
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.Root>
```

## Key Structural Changes

1. **Component Naming:**
   - `RangeSlider` → `Slider.Root` (unified with regular Slider)
   - `RangeSliderTrack` → `Slider.Track`
   - `RangeSliderFilledTrack` → `Slider.Range`
   - `RangeSliderThumb` → `Slider.Thumb`

2. **New Required Elements:**
   - `<Slider.Control>` - Must wrap Track and Thumbs
   - `<Slider.HiddenInput />` - Must be first child of each Thumb

3. **Import Changes:**
   - Import `Slider` instead of `RangeSlider` components
   - RangeSlider is now just Slider with array value

## Prop Changes

### Slider.Root Props

| v2 Prop        | v3 Prop            | Notes                                                                  |
| -------------- | ------------------ | ---------------------------------------------------------------------- |
| `colorScheme`  | `colorPalette`     | Renamed for consistency                                                |
| `onChange`     | `onValueChange`    | Receives object: `{ value, valueAsString }`                            |
| `onChangeEnd`  | `onValueChangeEnd` | Receives object: `{ value, valueAsString }`                            |
| `value`        | `value`            | Now array: `[min, max]`                                                |
| `defaultValue` | `defaultValue`     | Now array: `[min, max]`                                                |
| `min`          | `min`              | No change                                                              |
| `max`          | `max`              | No change                                                              |
| `step`         | `step`             | No change                                                              |
| `orientation`  | `orientation`      | No change                                                              |
| `isDisabled`   | `disabled`         | Standard HTML attribute (note: v3 uses `isDisabled`, no change needed) |

### Props Removed

| v2 Prop              | v3 Equivalent | Notes                             |
| -------------------- | ------------- | --------------------------------- |
| `focusThumbOnChange` | (removed)     | No longer supported in v3         |
| `reversed`           | (removed)     | Use `dir='rtl'` for RTL direction |

## Usage Examples

### Basic RangeSlider

**v2:**

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"

function App() {
  return (
    <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Slider } from "@chakra-ui/react"

function App() {
  return (
    <Slider.Root aria-label={["min", "max"]} defaultValue={[10, 30]}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

### With Color Scheme

**v2:**

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"

function App() {
  return (
    <RangeSlider
      aria-label={["min", "max"]}
      colorScheme="pink"
      defaultValue={[10, 30]}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Slider } from "@chakra-ui/react"

function App() {
  return (
    <Slider.Root
      aria-label={["min", "max"]}
      colorPalette="pink"
      defaultValue={[10, 30]}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

### Vertical Orientation

**v2:**

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"

function App() {
  return (
    <RangeSlider
      aria-label={["min", "max"]}
      colorScheme="pink"
      defaultValue={[10, 30]}
      orientation="vertical"
      minH="32"
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Slider } from "@chakra-ui/react"

function App() {
  return (
    <Slider.Root
      aria-label={["min", "max"]}
      colorPalette="pink"
      defaultValue={[10, 30]}
      orientation="vertical"
      minH="32"
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

### Custom Styling

**v2:**

```tsx
import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"
import { MdGraphicEq } from "react-icons/md"

function App() {
  return (
    <RangeSlider aria-label={["min", "max"]} defaultValue={[30, 80]}>
      <RangeSliderTrack bg="red.100">
        <RangeSliderFilledTrack bg="tomato" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0}>
        <Box color="tomato" as={MdGraphicEq} />
      </RangeSliderThumb>
      <RangeSliderThumb boxSize={6} index={1}>
        <Box color="tomato" as={MdGraphicEq} />
      </RangeSliderThumb>
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Box, Slider } from "@chakra-ui/react"
import { MdGraphicEq } from "react-icons/md"

function App() {
  return (
    <Slider.Root aria-label={["min", "max"]} defaultValue={[30, 80]}>
      <Slider.Control>
        <Slider.Track bg="red.100">
          <Slider.Range bg="tomato" />
        </Slider.Track>
        <Slider.Thumb boxSize={6} index={0}>
          <Slider.HiddenInput />
          <Box color="tomato" as={MdGraphicEq} />
        </Slider.Thumb>
        <Slider.Thumb boxSize={6} index={1}>
          <Slider.HiddenInput />
          <Box color="tomato" as={MdGraphicEq} />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

### With Min, Max, and Step

**v2:**

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"

function App() {
  return (
    <RangeSlider defaultValue={[120, 240]} min={0} max={300} step={30}>
      <RangeSliderTrack bg="red.100">
        <RangeSliderFilledTrack bg="tomato" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0} />
      <RangeSliderThumb boxSize={6} index={1} />
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Slider } from "@chakra-ui/react"

function App() {
  return (
    <Slider.Root defaultValue={[120, 240]} min={0} max={300} step={30}>
      <Slider.Control>
        <Slider.Track bg="red.100">
          <Slider.Range bg="tomato" />
        </Slider.Track>
        <Slider.Thumb boxSize={6} index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb boxSize={6} index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

### Controlled RangeSlider

**v2:**

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [value, setValue] = useState([20, 60])
  return (
    <RangeSlider value={value} onChange={setValue} min={0} max={100}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Slider } from "@chakra-ui/react"
import { useState } from "react"

function App() {
  const [value, setValue] = useState([20, 60])
  return (
    <Slider.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      min={0}
      max={100}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

### With Event Handlers

**v2:**

```tsx
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react"

function App() {
  return (
    <RangeSlider
      aria-label={["min", "max"]}
      onChange={(val) => console.log("changing", val)}
      onChangeEnd={(val) => console.log("done", val)}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}
```

**v3:**

```tsx
import { Slider } from "@chakra-ui/react"

function App() {
  return (
    <Slider.Root
      aria-label={["min", "max"]}
      onValueChange={(e) => console.log("changing", e.value)}
      onValueChangeEnd={(e) => console.log("done", e.value)}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        <Slider.Thumb index={1}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
```

## Running the Codemod

To automatically migrate your RangeSlider components, run:

```bash
npx @chakra-ui/codemod transform range-slider <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform range-slider ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform range-slider ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform range-slider ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Update Imports**:
   - Change from `RangeSlider` components to `Slider`

2. **Update Component Names**:
   - `<RangeSlider>` → `<Slider.Root>`
   - `<RangeSliderTrack>` → `<Slider.Track>`
   - `<RangeSliderFilledTrack>` → `<Slider.Range>`
   - `<RangeSliderThumb>` → `<Slider.Thumb>`

3. **Add Required Elements**:
   - Wrap Track and Thumbs in `<Slider.Control>`
   - Add `<Slider.HiddenInput />` as first child of each Thumb

4. **Update Props**:
   - `colorScheme` → `colorPalette`
   - `onChange` → `onValueChange` (receives `{ value, valueAsString }` object)
   - `onChangeEnd` → `onValueChangeEnd` (receives `{ value, valueAsString }`
     object)
   - Remove `focusThumbOnChange`
   - Remove `reversed` (use `dir='rtl'` if needed)

## Breaking Changes

### Component Structure

- RangeSlider now uses unified Slider component
- Requires explicit Slider.Control wrapper
- Each Thumb requires Slider.HiddenInput as first child

### Component Naming

- All `RangeSlider*` → `Slider.*` (namespace component)
- Unified with single-value Slider component

### Props Renamed

- `colorScheme` → `colorPalette`
- `onChange` → `onValueChange`
- `onChangeEnd` → `onValueChangeEnd`

### Props Removed

- `focusThumbOnChange` - no longer supported
- `reversed` - use `dir='rtl'` for RTL layouts

### Event Handler Signatures

- `onChange(value)` → `onValueChange({ value, valueAsString })`
- `onChangeEnd(value)` → `onValueChangeEnd({ value, valueAsString })`
- Handlers receive an object with `value` (array) and `valueAsString` (joined
  string)

### Hook Changes

- `useRangeSlider()` → `useSlider()` (unified hook from @ark-ui/react)

## Codemod Capabilities

The codemod will:

- ✅ Transform `<RangeSlider>` to `<Slider.Root>` with proper structure
- ✅ Transform all RangeSlider sub-components to Slider equivalents
- ✅ Add `<Slider.Control>` wrapper around Track and Thumbs
- ✅ Add `<Slider.HiddenInput />` to each Thumb
- ✅ Transform `colorScheme` to `colorPalette`
- ✅ Transform `onChange` to `onValueChange`
- ✅ Transform `onChangeEnd` to `onValueChangeEnd`
- ✅ Remove `focusThumbOnChange` prop
- ✅ Remove `reversed` prop
- ✅ Preserve all other props and attributes
- ✅ Preserve complex children in Thumbs

## Benefits

The v3 Slider (RangeSlider) component provides:

- **Unified Component**: Single Slider component for both single and range
  sliders
- **Better Accessibility**: Improved ARIA attributes and screen reader support
- **Explicit Structure**: Clear separation with Control, Track, Range, and Thumb
  components
- **Flexible Styling**: Direct access to all sub-components for custom styling
- **Standard Props**: Uses standard HTML attributes where possible
- **Better TypeScript Support**: Improved type inference with namespace
  components
- **Consistent API**: Follows the same pattern as other compound components in
  v3

## Notes

- **IMPORTANT**: v3 uses a unified `Slider` component for both single-value and
  range sliders
  - Single value: `<Slider.Root value={50}>` with one Thumb
  - Range values: `<Slider.Root value={[10, 30]}>` with multiple Thumbs
- Event handlers receive an object `{ value, valueAsString }` instead of just
  the value:
  - v2: `onChange={(value) => setValue(value)}`
  - v3: `onValueChange={(e) => setValue(e.value)}`
- Each `<Slider.Thumb>` requires `<Slider.HiddenInput />` as first child for
  proper form integration
- `<Slider.Control>` is required to wrap Track and Thumbs
- All styling props work on any sub-component (Root, Control, Track, Range,
  Thumb)
- The `index` prop on Thumbs is preserved and required for proper range slider
  functionality
