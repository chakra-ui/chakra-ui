# Tooltip Migration Guide (v2 → v3)

## Overview

The Tooltip component in Chakra UI v3 is now a **snippet** component that you
copy into your project, rather than importing from `@chakra-ui/react`. This
guide covers the automatic transformations and manual considerations when
migrating.

## What the Codemod Does

The `tooltip` transform automatically handles:

1. **Import path changes** - Updates imports from `@chakra-ui/react` to
   `@/components/ui/tooltip`
2. **Prop renames** - `label` → `content`, `hasArrow` → `showArrow`,
   `closeOnEsc` → `closeOnEscape`, `closeOnMouseDown` → `closeOnPointerDown`
3. **Event handler merging** - Combines `onOpen` and `onClose` into single
   `onOpenChange` handler
4. **Positioning props grouping** - Groups `placement`, `gutter`, `offset`,
   `arrow`, `arrowPadding` into single `positioning` object
5. **Offset transformation** - Converts array `[mainAxis, crossAxis]` to object
   `{ mainAxis, crossAxis }`
6. **shouldWrapChildren** - Wraps children in `<span>` element
7. **Deprecated props removal** - Removes `modifiers`, `motionProps`,
   `portalProps`, `arrowSize`, `arrowShadowColor`

## Import Changes

### Before (v2)

```tsx
import { Tooltip } from "@chakra-ui/react"
```

### After (v3)

```tsx
import { Tooltip } from "@/components/ui/tooltip"
```

**Note:** The snippet must be copied to your project first. See the
[Chakra UI documentation](https://chakra-ui.com) for the snippet code.

### Multiple Imports

When you have multiple Chakra imports, only Tooltip is moved:

**Before:**

```tsx
import { Box, Button, Tooltip } from "@chakra-ui/react"
```

**After:**

```tsx
import { Tooltip } from "@/components/ui/tooltip"
import { Box, Button } from "@chakra-ui/react"
```

## Prop Transformations

### 1. Label → Content

The `label` prop has been renamed to `content`.

**Before:**

```tsx
<Tooltip label="Helpful information">
  <button>Hover me</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip content="Helpful information">
  <button>Hover me</button>
</Tooltip>
```

### 2. hasArrow → showArrow

The `hasArrow` prop has been renamed to `showArrow`.

**Before:**

```tsx
<Tooltip label="Info" hasArrow>
  <button>Hover me</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip content="Info" showArrow>
  <button>Hover me</button>
</Tooltip>
```

### 3. Event Handler Renames

**closeOnEsc → closeOnEscape:**

```tsx
// Before
<Tooltip label="Info" closeOnEsc={false}>

// After
<Tooltip content="Info" closeOnEscape={false}>
```

**closeOnMouseDown → closeOnPointerDown:**

```tsx
// Before
<Tooltip label="Info" closeOnMouseDown>

// After
<Tooltip content="Info" closeOnPointerDown>
```

### 4. Event Handler Merging (onOpen/onClose → onOpenChange)

The separate `onOpen` and `onClose` callbacks are now merged into a single
`onOpenChange` handler that receives an event object with an `open` property.

**Before:**

```tsx
<Tooltip
  label="Info"
  onOpen={() => console.log("Tooltip opened")}
  onClose={() => console.log("Tooltip closed")}
>
  <button>Hover</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip
  content="Info"
  onOpenChange={(e) => {
    if (e.open) {
      console.log("Tooltip opened")
    } else {
      console.log("Tooltip closed")
    }
  }}
>
  <button>Hover</button>
</Tooltip>
```

**Note:** The codemod automatically merges both handlers into a single
conditional. If you only had `onOpen` or `onClose`, the other branch will be
empty.

### 5. Positioning Props Grouping

Positioning-related props are now grouped into a `positioning` object.

**Props that are grouped:**

- `placement`
- `gutter`
- `offset` (also transforms array to object)
- `arrow`

**Before:**

```tsx
<Tooltip label="Info" placement="bottom-end" gutter={16} offset={[10, 5]}>
  <button>Click</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip
  content="Info"
  positioning={{
    placement: "bottom-end",
    gutter: 16,
    offset: {
      mainAxis: 10,
      crossAxis: 5,
    },
  }}
>
  <button>Click</button>
</Tooltip>
```

**Note:** The `offset` prop is transformed from an array `[mainAxis, crossAxis]`
to an object `{ mainAxis, crossAxis }` for better clarity.

### 6. Arrow Props Handling

Arrow-related props are handled differently in v3:

**arrowPadding → positioning.arrowPadding:**

```tsx
// Before
<Tooltip label="Info" arrowPadding={8} hasArrow>

// After
<Tooltip content="Info" showArrow positioning={{ arrowPadding: 8 }}>
```

**arrowSize → removed (use CSS instead):**

```tsx
// Before
<Tooltip label="Info" arrowSize={10} hasArrow>

// After (arrowSize removed, use CSS for custom sizing)
<Tooltip content="Info" showArrow>
```

**arrowShadowColor → removed:**

```tsx
// Before
<Tooltip label="Info" arrowShadowColor="red.500" hasArrow>

// After (arrowShadowColor removed)
<Tooltip content="Info" showArrow>
```

### 7. Deprecated Props Removal

These props are removed in v3 and the codemod will automatically delete them:

- `modifiers` - Use positioning props instead
- `motionProps` - Animation handled by snippet
- `portalProps` - Portal behavior handled by snippet
- `arrowSize` - Use CSS variables for custom arrow sizing
- `arrowShadowColor` - Use CSS for arrow styling

### 8. shouldWrapChildren Transformation

The `shouldWrapChildren` prop is replaced by automatically wrapping children in
a `<span>` element:

**Before:**

```tsx
<Tooltip label="Info" shouldWrapChildren>
  Hover text
</Tooltip>
```

**After:**

```tsx
<Tooltip content="Info">
  <span>Hover text</span>
</Tooltip>
```

This also works with JSX children:

**Before:**

```tsx
<Tooltip label="Info" shouldWrapChildren>
  <button>Click</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip content="Info">
  <span>
    <button>Click</button>
  </span>
</Tooltip>
```

## Complete Example

### Before (v2)

```tsx
import { Box, Tooltip } from "@chakra-ui/react"

export default function App() {
  return (
    <Box>
      <Tooltip
        label="Click to edit profile"
        hasArrow
        arrowSize={12}
        arrowPadding={8}
        closeOnEsc={false}
        closeOnMouseDown
        placement="right"
        gutter={12}
        offset={[0, 8]}
        onOpen={() => console.log("opened")}
        onClose={() => console.log("closed")}
        shouldWrapChildren
        modifiers={[{ name: "preventOverflow" }]}
        motionProps={{ initial: { opacity: 0 } }}
        bg="gray.800"
        color="white"
        openDelay={500}
      >
        Edit Profile
      </Tooltip>
    </Box>
  )
}
```

### After (v3)

```tsx
import { Tooltip } from "@/components/ui/tooltip"
import { Box } from "@chakra-ui/react"

export default function App() {
  return (
    <Box>
      <Tooltip
        content="Click to edit profile"
        showArrow
        closeOnEscape={false}
        closeOnPointerDown
        onOpenChange={(e) => {
          if (e.open) {
            console.log("opened")
          } else {
            console.log("closed")
          }
        }}
        bg="gray.800"
        color="white"
        openDelay={500}
        positioning={{
          placement: "right",
          gutter: 12,
          offset: {
            mainAxis: 0,
            crossAxis: 8,
          },
          arrowPadding: 8,
        }}
      >
        <span>Edit Profile</span>
      </Tooltip>
    </Box>
  )
}
```

**Note:** The codemod automatically:

- Removed `arrowSize`, `modifiers`, `motionProps` (deprecated props)
- Wrapped text children in `<span>` (due to `shouldWrapChildren`)
- Merged `onOpen`/`onClose` into `onOpenChange`
- Grouped positioning props including `arrowPadding`
- Transformed `offset` array to object

## Props Reference

### Renamed Props

| v2 Prop            | v3 Prop              | Notes                         |
| ------------------ | -------------------- | ----------------------------- |
| `label`            | `content`            | Content to display in tooltip |
| `hasArrow`         | `showArrow`          | Show arrow indicator          |
| `closeOnEsc`       | `closeOnEscape`      | Close on Escape key           |
| `closeOnMouseDown` | `closeOnPointerDown` | Close on pointer down         |

### Merged Event Handlers

| v2 Props             | v3 Prop        | Notes                                                |
| -------------------- | -------------- | ---------------------------------------------------- |
| `onOpen` + `onClose` | `onOpenChange` | Combined into single handler with `e.open` condition |

### Positioning Props (Grouped)

These props are now nested under the `positioning` object:

| Prop        | Type                                      | Description                                           |
| ----------- | ----------------------------------------- | ----------------------------------------------------- |
| `placement` | `string`                                  | Tooltip placement position                            |
| `gutter`    | `number`                                  | Distance between tooltip and trigger                  |
| `offset`    | `{ mainAxis: number, crossAxis: number }` | Offset from default position (transformed from array) |
| `arrow`     | `object`                                  | Arrow configuration                                   |

### Unchanged Props

These props work the same in v3:

- `defaultOpen` - Default open state
- `open` - Controlled open state
- `openDelay` - Delay before opening (ms)
- `closeDelay` - Delay before closing (ms)
- Style props: `bg`, `color`, `fontSize`, etc.

## Manual Steps Required

### 1. Copy the Tooltip Snippet

Before running the codemod, copy the Tooltip snippet to your project:

```bash
# Copy from Chakra UI documentation
# Save to: src/components/ui/tooltip.tsx
```

### 2. Run the Codemod

```bash
npx @chakra-ui/codemod@latest tooltip path/to/files
```

### 3. Update Path Alias (if needed)

If you don't use `@/` as your path alias, update the imports manually:

```tsx
// Change from:
import { Tooltip } from '@/components/ui/tooltip'

// To your project's convention:
import { Tooltip } from '~/components/ui/tooltip'
// or
import { Tooltip } from 'components/ui/tooltip'
```

### 4. Review Positioning Props

The codemod groups positioning props automatically, but review the output to
ensure correct values:

```tsx
// Auto-generated positioning object
positioning={{
  placement: 'bottom',
  gutter: 8,
  offset: [0, 10],
}}
```

## Common Patterns

### Conditional Tooltips

**Before:**

```tsx
<Tooltip label={isDisabled ? "Not available" : "Click to continue"}>
  <button disabled={isDisabled}>Continue</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip content={isDisabled ? "Not available" : "Click to continue"}>
  <button disabled={isDisabled}>Continue</button>
</Tooltip>
```

### Custom Styling

**Before:**

```tsx
<Tooltip
  label="Custom tooltip"
  bg="purple.500"
  color="white"
  fontSize="md"
  px={4}
  py={2}
  borderRadius="lg"
>
  <button>Hover</button>
</Tooltip>
```

**After:**

```tsx
<Tooltip
  content="Custom tooltip"
  bg="purple.500"
  color="white"
  fontSize="md"
  px={4}
  py={2}
  borderRadius="lg"
>
  <button>Hover</button>
</Tooltip>
```

### With Arrow Customization

**Before:**

```tsx
<Tooltip
  label="Info"
  hasArrow
  arrow={{ size: 12, shadowColor: "gray.300" }}
  placement="top"
>
  <span>Info</span>
</Tooltip>
```

**After:**

```tsx
<Tooltip
  content="Info"
  hasArrow
  positioning={{
    placement: "top",
    arrow: { size: 12, shadowColor: "gray.300" },
  }}
>
  <span>Info</span>
</Tooltip>
```

## Edge Cases

### Non-Chakra Tooltips

The codemod only transforms Tooltip components imported from `@chakra-ui/react`.
Custom tooltip components are not affected:

```tsx
import { Tooltip } from "./custom-tooltip"

// This will NOT be transformed

;<Tooltip label="Custom">Content</Tooltip>
```

### Spread Props

Spread props are preserved on the component:

```tsx
// Before
<Tooltip label="Info" {...tooltipProps}>

// After
<Tooltip content="Info" {...tooltipProps}>
```

**Note:** If `tooltipProps` contains positioning props, you may need to manually
update the object structure.

## Troubleshooting

### Import Error After Migration

**Problem:** `Cannot find module '@/components/ui/tooltip'`

**Solution:** Ensure you've copied the Tooltip snippet to your project. Check
that the path alias `@/` is configured in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Positioning Not Working

**Problem:** Tooltip positioning is incorrect after migration.

**Solution:** Check that positioning props are correctly grouped:

```tsx
// Correct
positioning={{ placement: 'top', gutter: 8 }}

// Incorrect (will not work)
placement="top"
gutter={8}
```

### Multiple Positioning Objects

**Problem:** If you have spread props with positioning, you might end up with
duplicates.

**Solution:** Manually merge positioning objects:

```tsx
// Before auto-fix
<Tooltip
  content="Info"
  {...props}
  positioning={{ placement: 'top' }}
/>

// After manual fix
<Tooltip
  content="Info"
  {...props}
  positioning={{ ...props.positioning, placement: 'top' }}
/>
```

## Migration Checklist

- [ ] Copy Tooltip snippet to your project
- [ ] Run the codemod on your codebase
- [ ] Update path aliases if needed (change from `@/` to your convention)
- [ ] Test tooltip functionality in your app
- [ ] Review positioning props are correctly grouped
- [ ] Check custom styled tooltips still work
- [ ] Verify conditional tooltips work correctly
- [ ] Test keyboard interactions (Escape key)
- [ ] Test pointer interactions
- [ ] Update any TypeScript types if using custom Tooltip wrappers

## Additional Resources

- [Chakra UI v3 Documentation](https://chakra-ui.com)
- [Tooltip Snippet Code](https://chakra-ui.com/docs/components/tooltip)
- [Migration Guide](https://chakra-ui.com/docs/getting-started/migration)
- [Codemod CLI Documentation](https://github.com/chakra-ui/chakra-ui/tree/main/packages/codemod)
