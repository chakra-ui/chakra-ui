# Steps Migration Guide (v2 → v3)

## Overview

The Steps (Stepper) components in Chakra UI v3 have been redesigned to use a
compound component pattern with dot notation. This guide covers the automatic
transformations and manual considerations when migrating.

## What the Codemod Does

The `steps` transform automatically handles:

1. **Component name transformations** - Converts all Stepper components to
   compound component pattern
2. **Hook detection** - Detects `useSteps` usage and chooses appropriate Root
   component
3. **Hook prop transformations** - Converts `index` to `defaultStep` in
   `useSteps` calls
4. **Index prop handling** - Transforms or removes `index` prop on Stepper based
   on hook usage
5. **Steps.List wrapper** - Wraps Step children in Steps.List (when not using
   hook pattern)

## Component Mappings

| v2 Component      | v3 Component         | Notes                                              |
| ----------------- | -------------------- | -------------------------------------------------- |
| `Stepper`         | `Steps.Root`         | Root container (direct usage)                      |
| `Stepper`         | `Steps.RootProvider` | Root with hook context (when using `useSteps`)     |
| `Step`            | `Steps.Item`         | Individual step item                               |
| `StepIndicator`   | `Steps.Indicator`    | Step indicator wrapper                             |
| `StepStatus`      | `Steps.Status`       | Status-based rendering                             |
| `StepTitle`       | `Steps.Title`        | Step title text                                    |
| `StepDescription` | `Steps.Description`  | Step description text                              |
| `StepSeparator`   | `Steps.Separator`    | Visual separator between steps                     |
| `StepNumber`      | `StepNumber`         | Step number (not transformed - used in StepStatus) |
| `StepIcon`        | `StepIcon`           | Step icon (not transformed - used in StepStatus)   |

## Component Transformations

### 1. Stepper → Steps.Root (Direct Usage)

**Before:**

```tsx
<Stepper index={1}>
  <Step>
    <StepIndicator>
      <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} />
    </StepIndicator>
    <StepTitle>First</StepTitle>
  </Step>
</Stepper>
```

**After:**

```tsx
<Steps.Root step={1}>
  <Steps.List>
    <Steps.Item>
      <Steps.Indicator>
        <Steps.Status complete={<StepIcon />} incomplete={<StepNumber />} />
      </Steps.Indicator>
      <Steps.Title>First</Steps.Title>
    </Steps.Item>
  </Steps.List>
</Steps.Root>
```

**Note:**

- `index` prop becomes `step`
- Children are wrapped in `Steps.List`

### 2. Stepper → Steps.RootProvider (With useSteps Hook)

**Before:**

```tsx
const { activeStep } = useSteps({
  index: 1,
  count: steps.length,
})

return (
  <Stepper index={activeStep}>
    <Step>
      <StepTitle>First</StepTitle>
    </Step>
  </Stepper>
)
```

**After:**

```tsx
const stepsApi = useSteps({
  defaultStep: 1,
  count: steps.length,
})

return (
  <Steps.RootProvider value={stepsApi}>
    <Steps.Item>
      <Steps.Title>First</Steps.Title>
    </Steps.Item>
  </Steps.RootProvider>
)
```

**Note:**

- When `useSteps` is detected anywhere in the file, `Stepper` becomes
  `Steps.RootProvider`
- Destructured assignments are converted to full assignments (e.g.,
  `const stepsApi = useSteps(...)`)
- `index` prop in `useSteps` becomes `defaultStep`
- The hook result is passed to `Steps.RootProvider` via the `value` prop
- `index` prop on Stepper is removed (state is managed by hook)
- No `Steps.List` wrapper (direct children pattern with provider)
- You can still destructure values from the hook result if needed:
  `const { value, goToNext } = stepsApi`

### 3. Step → Steps.Item

**Before:**

```tsx
<Step>
  <StepTitle>Contact Info</StepTitle>
  <StepDescription>Your details</StepDescription>
</Step>
```

**After:**

```tsx
<Steps.Item>
  <Steps.Title>Contact Info</Steps.Title>
  <Steps.Description>Your details</Steps.Description>
</Steps.Item>
```

### 4. StepIndicator → Steps.Indicator

**Before:**

```tsx
<StepIndicator>
  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} />
</StepIndicator>
```

**After:**

```tsx
<Steps.Indicator>
  <Steps.Status complete={<StepIcon />} incomplete={<StepNumber />} />
</Steps.Indicator>
```

### 5. StepStatus → Steps.Status

**Before:**

```tsx
<StepStatus
  complete={<StepIcon />}
  incomplete={<StepNumber />}
  active={<StepNumber />}
/>
```

**After:**

```tsx
<Steps.Status
  complete={<StepIcon />}
  incomplete={<StepNumber />}
  active={<StepNumber />}
/>
```

**Note:** `StepIcon` and `StepNumber` are NOT transformed - they remain as-is
and are used within `Steps.Status`.

### 6. StepTitle → Steps.Title

**Before:**

```tsx
<StepTitle>First Step</StepTitle>
```

**After:**

```tsx
<Steps.Title>First Step</Steps.Title>
```

### 7. StepDescription → Steps.Description

**Before:**

```tsx
<StepDescription>Contact Info</StepDescription>
```

**After:**

```tsx
<Steps.Description>Contact Info</Steps.Description>
```

### 8. StepSeparator → Steps.Separator

**Before:**

```tsx
<StepSeparator />
```

**After:**

```tsx
<Steps.Separator />
```

## Hook Pattern Transformation

### useSteps Hook Props

| v2 Prop | v3 Prop       | Transformation  |
| ------- | ------------- | --------------- |
| `index` | `defaultStep` | Property rename |
| `count` | `count`       | No change       |

**Before:**

```tsx
const { activeStep } = useSteps({
  index: 0,
  count: 3,
})
```

**After:**

```tsx
const stepsApi = useSteps({
  defaultStep: 0,
  count: 3,
})

// You can still destructure if needed:
// const { value, goToNext, goToPrev } = stepsApi
```

### Hook Detection Logic

The codemod detects `useSteps` usage anywhere in the file and changes behavior:

**Without `useSteps`:**

- `Stepper` → `Steps.Root`
- `index` prop → `step` prop
- Children wrapped in `Steps.List`

**With `useSteps`:**

- `Stepper` → `Steps.RootProvider`
- Destructured hook calls converted to full assignment (e.g.,
  `const stepsApi = useSteps(...)`)
- `value={stepsApi}` prop added to `Steps.RootProvider`
- `index` prop removed from Stepper (managed by hook)
- No `Steps.List` wrapper
- Hook's `index` → `defaultStep`

## Complete Examples

### Basic Stepper (No Hook)

**Before (v2):**

```tsx
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react"

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
]

export default function App() {
  return (
    <Stepper index={1}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
```

**After (v3):**

```tsx
import { Box } from "@chakra-ui/react"

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
  { title: "Third", description: "Select Rooms" },
]

export default function App() {
  return (
    <Steps.Root step={1}>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index}>
            <Steps.Indicator>
              <Steps.Status
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </Steps.Indicator>

            <Box flexShrink="0">
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Description>{step.description}</Steps.Description>
            </Box>

            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  )
}
```

### Stepper with useSteps Hook

**Before (v2):**

```tsx
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react"

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
]

export default function App() {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
```

**After (v3):**

```tsx
import { Box, useSteps } from "@chakra-ui/react"

const steps = [
  { title: "First", description: "Contact Info" },
  { title: "Second", description: "Date & Time" },
]

export default function App() {
  const stepsApi = useSteps({
    defaultStep: 0,
    count: steps.length,
  })

  return (
    <Steps.RootProvider value={stepsApi}>
      {steps.map((step, index) => (
        <Steps.Item key={index}>
          <Steps.Indicator>
            <Steps.Status
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </Steps.Indicator>
          <Box>
            <Steps.Title>{step.title}</Steps.Title>
            <Steps.Description>{step.description}</Steps.Description>
          </Box>
          <Steps.Separator />
        </Steps.Item>
      ))}
    </Steps.RootProvider>
  )
}
```

## Props Preservation

All props on components are preserved during transformation:

**Before:**

```tsx
<Stepper index={1} orientation="vertical" height="400px" gap="0">
  <Step>First</Step>
</Stepper>
```

**After:**

```tsx
<Steps.Root step={1} orientation="vertical" height="400px" gap="0">
  <Steps.List>
    <Steps.Item>First</Steps.Item>
  </Steps.List>
</Steps.Root>
```

Props like `orientation`, `height`, `gap`, `size`, `colorScheme`, etc. are
preserved on the transformed components.

## Import Handling

The codemod automatically updates imports:

1. **Removes old component imports:** Stepper, Step, StepIndicator, StepStatus,
   StepTitle, StepDescription, StepSeparator
2. **Adds Steps import:** Automatically adds `Steps` to use compound components
3. **Preserves useSteps:** Keeps `useSteps` import if it was used
4. **Preserves other imports:** Keeps non-Steps imports like Box, Button, etc.

**Before:**

```tsx
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react"
```

**After (without useSteps):**

```tsx
import { Box, Steps } from "@chakra-ui/react"
```

**After (with useSteps):**

```tsx
import { Box, Steps, useSteps } from "@chakra-ui/react"
```

**Note:** `StepIcon` and `StepNumber` are not imported or transformed - they
remain as JSX components within `Steps.Status`.

## Manual Steps Required

### 1. Run the Codemod

```bash
npx @chakra-ui/codemod@latest steps path/to/files
```

### 2. Verify Steps Import

The codemod automatically adds the `Steps` import to your file:

```tsx
import { Steps } from "@chakra-ui/react"
```

**If using snippets:** You may want to change the import path to your snippet
location:

```tsx
import { Steps } from "@/components/ui/steps"
```

### 3. Review Hook Pattern

If using `useSteps`, verify:

- `Stepper` was transformed to `Steps.RootProvider`
- Destructured hook calls were converted to full assignment (e.g.,
  `const stepsApi = useSteps(...)`)
- `value={stepsApi}` prop was added to `Steps.RootProvider`
- `index` prop was removed from Stepper
- `index` was renamed to `defaultStep` in the hook call
- No `Steps.List` wrapper was added (direct children pattern)

**Note:** If you need to access values from the hook (like `value`, `goToNext`,
`goToPrev`), you can destructure them from the result:

```tsx
const stepsApi = useSteps({ defaultStep: 0, count: 3 })
const { value, goToNext, goToPrev } = stepsApi
```

### 4. Review Direct Pattern

If NOT using `useSteps`, verify:

- `Stepper` was transformed to `Steps.Root`
- `index` prop was renamed to `step`
- Children are wrapped in `Steps.List`

### 5. Handle StepIcon and StepNumber

These components are NOT transformed by the codemod. They remain as-is and are
typically used within `Steps.Status`:

```tsx
<Steps.Status
  complete={<StepIcon />}
  incomplete={<StepNumber />}
  active={<StepNumber />}
/>
```

If you need to replace them, do so manually based on your v3 implementation.

## Common Patterns

### Vertical Orientation

**Before:**

```tsx
<Stepper orientation="vertical" index={1}>
  <Step>First</Step>
  <Step>Second</Step>
</Stepper>
```

**After:**

```tsx
<Steps.Root orientation="vertical" step={1}>
  <Steps.List>
    <Steps.Item>First</Steps.Item>
    <Steps.Item>Second</Steps.Item>
  </Steps.List>
</Steps.Root>
```

### With Size and ColorScheme

**Before:**

```tsx
<Stepper size="lg" colorScheme="blue" index={0}>
  <Step>First</Step>
</Stepper>
```

**After:**

```tsx
<Steps.Root size="lg" colorScheme="blue" step={0}>
  <Steps.List>
    <Steps.Item>First</Steps.Item>
  </Steps.List>
</Steps.Root>
```

### Mapped Steps

**Before:**

```tsx
const steps = [{ title: 'First' }, { title: 'Second' }]

<Stepper index={1}>
  {steps.map((step, index) => (
    <Step key={index}>
      <StepTitle>{step.title}</StepTitle>
    </Step>
  ))}
</Stepper>
```

**After:**

```tsx
const steps = [{ title: 'First' }, { title: 'Second' }]

<Steps.Root step={1}>
  <Steps.List>
    {steps.map((step, index) => (
      <Steps.Item key={index}>
        <Steps.Title>{step.title}</Steps.Title>
      </Steps.Item>
    ))}
  </Steps.List>
</Steps.Root>
```

### With Custom Indicators

**Before:**

```tsx
<Stepper index={0}>
  <Step>
    <StepIndicator>
      <StepStatus
        complete={<CheckIcon />}
        incomplete={<StepNumber />}
        active={<Spinner />}
      />
    </StepIndicator>
    <StepTitle>Processing</StepTitle>
  </Step>
</Stepper>
```

**After:**

```tsx
<Steps.Root step={0}>
  <Steps.List>
    <Steps.Item>
      <Steps.Indicator>
        <Steps.Status
          complete={<CheckIcon />}
          incomplete={<StepNumber />}
          active={<Spinner />}
        />
      </Steps.Indicator>
      <Steps.Title>Processing</Steps.Title>
    </Steps.Item>
  </Steps.List>
</Steps.Root>
```

## Edge Cases

### Non-Chakra Stepper Components

The codemod only transforms Stepper components imported from `@chakra-ui/react`.
Custom stepper components are not affected:

```tsx
import { Stepper } from "./custom-stepper"

// This will NOT be transformed
;<Stepper>
  <Step>Custom</Step>
</Stepper>
```

### Mixed Hook and Direct Usage

If you have both hook-based and direct usage in the same file, the codemod will
treat ALL Stepper instances as hook-based (using `Steps.RootProvider`). This may
require manual adjustment:

```tsx
// File has useSteps somewhere
const { activeStep } = useSteps({ index: 0, count: 3 })

// This will become Steps.RootProvider (may need manual adjustment)
<Stepper index={1}>
  <Step>Static Step</Step>
</Stepper>
```

**Fix:** Manually change back to `Steps.Root` with `step` prop if this Stepper
doesn't use the hook.

## Troubleshooting

### Steps.List Not Added

**Problem:** After transformation, Steps.List wrapper is missing.

**Solution:** This should not happen with the latest codemod. If it does, verify
you're using the latest version:

```bash
npx @chakra-ui/codemod@latest steps path/to/files
```

### Wrong Root Component

**Problem:** `Steps.Root` was used instead of `Steps.RootProvider` (or vice
versa).

**Solution:**

- If using `useSteps` hook → should be `Steps.RootProvider`
- If NOT using hook → should be `Steps.Root`
- Check if `useSteps` is imported and called anywhere in the file

### Index Prop Not Renamed

**Problem:** `index` prop wasn't renamed to `step` or removed.

**Solution:**

- Direct usage: `index` should become `step`
- Hook usage: `index` should be removed from Stepper
- Hook call: `index` in `useSteps({ index: 0 })` should become `defaultStep`

### Import Errors

**Problem:** Components not found after migration.

**Solution:** The codemod automatically adds `Steps` import. If you still see
errors:

1. **Check the import was added:**

   ```tsx
   import { Steps } from "@chakra-ui/react"
   ```

2. **If using snippets**, update the import path:

   ```tsx
   import { Steps } from "@/components/ui/steps"
   ```

3. **If using useSteps**, verify it's imported:
   ```tsx
   import { Steps, useSteps } from "@chakra-ui/react"
   ```

### StepIcon/StepNumber Not Working

**Problem:** StepIcon or StepNumber components showing errors.

**Solution:** These are NOT automatically transformed. Verify they're used
correctly within `Steps.Status`:

```tsx
<Steps.Status complete={<StepIcon />} incomplete={<StepNumber />} />
```

If you need different components, replace them manually based on your v3
implementation.

### Missing Value Prop on Steps.RootProvider

**Problem:** `Steps.RootProvider` is missing the `value` prop after
transformation.

**Solution:** This should be automatically added by the codemod. Verify:

1. You're using the latest codemod version
2. The hook result is assigned to a variable
3. Add it manually if needed:

```tsx
const stepsApi = useSteps({ defaultStep: 0, count: 3 })
<Steps.RootProvider value={stepsApi}>
```

### Destructured Hook Not Working

**Problem:** After transformation, references to destructured values (like
`activeStep`) are broken.

**Solution:** The codemod converts destructured patterns to full assignments.
Update your code to destructure from the result:

**Before:**

```tsx
const { activeStep, goToNext } = useSteps({ index: 0, count: 3 })
// activeStep used in JSX
```

**After:**

```tsx
const stepsApi = useSteps({ defaultStep: 0, count: 3 })
const { value: activeStep, goToNext } = stepsApi
// Now activeStep works again
```

## Migration Checklist

- [ ] Run the steps codemod on your codebase
- [ ] Add Steps import (snippet or direct)
- [ ] Verify hook pattern transformations:
  - [ ] `Stepper` → `Steps.RootProvider`
  - [ ] Destructured hooks converted to full assignments
  - [ ] `value` prop added to `Steps.RootProvider`
  - [ ] `index` → `defaultStep` in hook calls
  - [ ] Update any references to destructured values
- [ ] Verify direct pattern transformations:
  - [ ] `Stepper` → `Steps.Root`
  - [ ] `index` → `step` prop
  - [ ] `Steps.List` wrapper added
- [ ] Update imports if needed
- [ ] Check StepIcon and StepNumber usage in Steps.Status
- [ ] Test stepper functionality in your app
- [ ] Verify responsive layouts for vertical/horizontal orientation
- [ ] Check accessibility with screen readers
- [ ] Update any custom styling that depended on old component structure

## Additional Resources

- [Chakra UI v3 Documentation](https://chakra-ui.com)
- [Steps Component Docs](https://chakra-ui.com/docs/components/steps)
- [Migration Guide](https://chakra-ui.com/docs/getting-started/migration)
- [Codemod CLI Documentation](https://github.com/chakra-ui/chakra-ui/tree/main/packages/codemod)
