# Stats Migration Guide (v2 → v3)

## Overview

The Stats components in Chakra UI v3 have been redesigned to use a compound
component pattern with dot notation. This guide covers the automatic
transformations and manual considerations when migrating.

## What the Codemod Does

The `stats` transform automatically handles:

1. **Component name transformations** - Converts all Stat components to compound
   component pattern
2. **StatArrow type handling** - Transforms `type` prop to separate components
3. **StatGroup transformation** - Converts group wrapper to new pattern

## Component Mappings

| v2 Component                | v3 Component         | Notes                     |
| --------------------------- | -------------------- | ------------------------- |
| `Stat`                      | `Stat.Root`          | Root container            |
| `StatLabel`                 | `Stat.Label`         | Label text                |
| `StatNumber`                | `Stat.ValueText`     | Main value display        |
| `StatHelpText`              | `Stat.HelpText`      | Helper text               |
| `StatArrow type="increase"` | `Stat.UpIndicator`   | Up arrow (no type prop)   |
| `StatArrow type="decrease"` | `Stat.DownIndicator` | Down arrow (no type prop) |
| `StatGroup`                 | `Stat.Root`          | Group container           |

## Component Transformations

### 1. Stat → Stat.Root

**Before:**

```tsx
<Stat>
  <StatLabel>Collected Fees</StatLabel>
  <StatNumber>£0.00</StatNumber>
</Stat>
```

**After:**

```tsx
<Stat.Root>
  <Stat.Label>Collected Fees</Stat.Label>
  <Stat.ValueText>£0.00</Stat.ValueText>
</Stat.Root>
```

### 2. StatLabel → Stat.Label

**Before:**

```tsx
<StatLabel>Total Sales</StatLabel>
```

**After:**

```tsx
<Stat.Label>Total Sales</Stat.Label>
```

### 3. StatNumber → Stat.ValueText

**Before:**

```tsx
<StatNumber>1,234</StatNumber>
```

**After:**

```tsx
<Stat.ValueText>1,234</Stat.ValueText>
```

### 4. StatHelpText → Stat.HelpText

**Before:**

```tsx
<StatHelpText>Feb 12 - Feb 28</StatHelpText>
```

**After:**

```tsx
<Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
```

### 5. StatArrow Transformation

The `StatArrow` component with the `type` prop is split into two separate
components based on the direction.

**Increase Arrow:**

**Before:**

```tsx
<StatHelpText>
  <StatArrow type="increase" />
  23.36%
</StatHelpText>
```

**After:**

```tsx
<Stat.HelpText>
  <Stat.UpIndicator />
  23.36%
</Stat.HelpText>
```

**Decrease Arrow:**

**Before:**

```tsx
<StatHelpText>
  <StatArrow type="decrease" />
  9.05%
</StatHelpText>
```

**After:**

```tsx
<Stat.HelpText>
  <Stat.DownIndicator />
  9.05%
</Stat.HelpText>
```

**Note:** The `type` prop is removed and the component name changes based on the
type value.

### 6. StatGroup → Stat.Root

The `StatGroup` component becomes `Stat.Root` in v3:

**Before:**

```tsx
<StatGroup>
  <Stat>
    <StatLabel>Sent</StatLabel>
    <StatNumber>345,670</StatNumber>
  </Stat>
  <Stat>
    <StatLabel>Clicked</StatLabel>
    <StatNumber>45</StatNumber>
  </Stat>
</StatGroup>
```

**After:**

```tsx
<Stat.Root>
  <Stat.Root>
    <Stat.Label>Sent</Stat.Label>
    <Stat.ValueText>345,670</Stat.ValueText>
  </Stat.Root>
  <Stat.Root>
    <Stat.Label>Clicked</Stat.Label>
    <Stat.ValueText>45</Stat.ValueText>
  </Stat.Root>
</Stat.Root>
```

**Note:** In v3, you nest multiple `Stat.Root` components within a parent
`Stat.Root` to create a group.

## Complete Example

### Before (v2)

```tsx
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"

export default function App() {
  return (
    <>
      {/* Single Stat */}
      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>Feb 12 - Feb 28</StatHelpText>
      </Stat>

      {/* Stat Group */}
      <StatGroup>
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Clicked</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </>
  )
}
```

### After (v3)

```tsx
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"

export default function App() {
  return (
    <>
      {/* Single Stat */}
      <Stat.Root>
        <Stat.Label>Collected Fees</Stat.Label>
        <Stat.ValueText>£0.00</Stat.ValueText>
        <Stat.HelpText>Feb 12 - Feb 28</Stat.HelpText>
      </Stat.Root>

      {/* Stat Group */}
      <Stat.Root>
        <Stat.Root>
          <Stat.Label>Sent</Stat.Label>
          <Stat.ValueText>345,670</Stat.ValueText>
          <Stat.HelpText>
            <Stat.UpIndicator />
            23.36%
          </Stat.HelpText>
        </Stat.Root>
        <Stat.Root>
          <Stat.Label>Clicked</Stat.Label>
          <Stat.ValueText>45</Stat.ValueText>
          <Stat.HelpText>
            <Stat.DownIndicator />
            9.05%
          </Stat.HelpText>
        </Stat.Root>
      </Stat.Root>
    </>
  )
}
```

## Props Preservation

All props on components are preserved during transformation:

**Before:**

```tsx
<Stat px={4} py={2} bg="gray.100">
  <StatLabel fontSize="sm">Total</StatLabel>
  <StatNumber fontSize="2xl" fontWeight="bold">
    1,234
  </StatNumber>
</Stat>
```

**After:**

```tsx
<Stat.Root px={4} py={2} bg="gray.100">
  <Stat.Label fontSize="sm">Total</Stat.Label>
  <Stat.ValueText fontSize="2xl" fontWeight="bold">
    1,234
  </Stat.ValueText>
</Stat.Root>
```

Props on `StatArrow` (except `type`) are also preserved:

**Before:**

```tsx
<StatArrow type="increase" color="green.500" />
```

**After:**

```tsx
<Stat.UpIndicator color="green.500" />
```

## Manual Steps Required

### 1. Run the Codemod

```bash
npx @chakra-ui/codemod@latest stats path/to/files
```

### 2. Review StatGroup Usage

The codemod transforms `StatGroup` to `Stat.Root`, which means you'll have
nested `Stat.Root` components. Review these to ensure the structure makes sense
for your use case:

```tsx
// After codemod
<Stat.Root>
  {" "}
  {/* Was StatGroup */}
  <Stat.Root>
    {" "}
    {/* Was Stat */}
    ...
  </Stat.Root>
  <Stat.Root>
    {" "}
    {/* Was Stat */}
    ...
  </Stat.Root>
</Stat.Root>
```

You may want to add layout props to the parent `Stat.Root` for proper spacing:

```tsx
<Stat.Root display="flex" gap={4}>
  <Stat.Root>...</Stat.Root>
  <Stat.Root>...</Stat.Root>
</Stat.Root>
```

### 3. Update Imports

While the codemod transforms component usage, you should update your imports to
only import what you need:

**Before:**

```tsx
import {
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
```

**After (v3):**

```tsx
import { Stat } from "@chakra-ui/react"

// All subcomponents are accessed via Stat.Label, Stat.ValueText, etc.
```

Or if using the snippet pattern:

```tsx
import { Stat } from "@/components/ui/stat"
```

## Common Patterns

### Basic Stat

**Before:**

```tsx
<Stat>
  <StatLabel>Downloads</StatLabel>
  <StatNumber>1,234</StatNumber>
  <StatHelpText>Jan 1 - Jan 31</StatHelpText>
</Stat>
```

**After:**

```tsx
<Stat.Root>
  <Stat.Label>Downloads</Stat.Label>
  <Stat.ValueText>1,234</Stat.ValueText>
  <Stat.HelpText>Jan 1 - Jan 31</Stat.HelpText>
</Stat.Root>
```

### Stat with Trend

**Before:**

```tsx
<Stat>
  <StatLabel>Revenue</StatLabel>
  <StatNumber>$45,670</StatNumber>
  <StatHelpText>
    <StatArrow type="increase" />
    12.5%
  </StatHelpText>
</Stat>
```

**After:**

```tsx
<Stat.Root>
  <Stat.Label>Revenue</Stat.Label>
  <Stat.ValueText>$45,670</Stat.ValueText>
  <Stat.HelpText>
    <Stat.UpIndicator />
    12.5%
  </Stat.HelpText>
</Stat.Root>
```

### Multiple Stats (Grid)

**Before:**

```tsx
<StatGroup>
  <Stat>
    <StatLabel>Metric 1</StatLabel>
    <StatNumber>100</StatNumber>
  </Stat>
  <Stat>
    <StatLabel>Metric 2</StatLabel>
    <StatNumber>200</StatNumber>
  </Stat>
  <Stat>
    <StatLabel>Metric 3</StatLabel>
    <StatNumber>300</StatNumber>
  </Stat>
</StatGroup>
```

**After:**

```tsx
<Stat.Root display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
  <Stat.Root>
    <Stat.Label>Metric 1</Stat.Label>
    <Stat.ValueText>100</Stat.ValueText>
  </Stat.Root>
  <Stat.Root>
    <Stat.Label>Metric 2</Stat.Label>
    <Stat.ValueText>200</Stat.ValueText>
  </Stat.Root>
  <Stat.Root>
    <Stat.Label>Metric 3</Stat.Label>
    <Stat.ValueText>300</Stat.ValueText>
  </Stat.Root>
</Stat.Root>
```

## Edge Cases

### Non-Chakra Stat Components

The codemod only transforms Stat components imported from `@chakra-ui/react`.
Custom stat components are not affected:

```tsx
import { Stat } from "./custom-stats"

// This will NOT be transformed
;<Stat>
  <StatLabel>Custom</StatLabel>
</Stat>
```

### Dynamic StatArrow Type

If you use a dynamic value for the `type` prop, you'll need to manually handle
this case:

**Before:**

```tsx
<StatArrow type={isIncrease ? "increase" : "decrease"} />
```

**After (manual fix):**

```tsx
{
  isIncrease ? <Stat.UpIndicator /> : <Stat.DownIndicator />
}
```

## Troubleshooting

### Missing StatArrow Transformation

**Problem:** `StatArrow` wasn't transformed to `Stat.UpIndicator` or
`Stat.DownIndicator`.

**Solution:** Ensure the `type` prop is a string literal (`'increase'` or
`'decrease'`). Dynamic values require manual transformation.

### Nested Stat.Root Components

**Problem:** After transforming `StatGroup`, you have nested `Stat.Root`
components.

**Solution:** This is expected behavior. Add layout props to the parent for
proper spacing:

```tsx
<Stat.Root display="flex" gap={4}>
  <Stat.Root>...</Stat.Root>
  <Stat.Root>...</Stat.Root>
</Stat.Root>
```

### Import Errors

**Problem:** Components not found after migration.

**Solution:** Update imports to use the new compound component pattern:

```tsx
// Remove individual imports
// import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'
// Use single import
import { Stat } from "@chakra-ui/react"
```

## Migration Checklist

- [ ] Run the stats codemod on your codebase
- [ ] Review all `StatGroup` transformations and add layout props if needed
- [ ] Update imports to use compound component pattern
- [ ] Check for dynamic `StatArrow type` props and manually fix
- [ ] Test stat components in your app
- [ ] Verify trend indicators (up/down arrows) display correctly
- [ ] Check responsive layouts for stat groups
- [ ] Update any custom styling that depended on old component structure

## Additional Resources

- [Chakra UI v3 Documentation](https://chakra-ui.com)
- [Stat Component Docs](https://chakra-ui.com/docs/components/stat)
- [Migration Guide](https://chakra-ui.com/docs/getting-started/migration)
- [Codemod CLI Documentation](https://github.com/chakra-ui/chakra-ui/tree/main/packages/codemod)
