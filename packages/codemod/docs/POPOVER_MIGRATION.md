# Popover Component Migration Guide

This guide explains how to migrate from Chakra UI v2 Popover components to the
v3 compound component API with positioning enhancements.

## Overview

In Chakra UI v3, the Popover component has been redesigned to use:

- **Compound component pattern** for better composition
- **Positioning object** for all positioning-related props
- **Explicit Positioner** wrapper for content
- **Context API** for render prop patterns

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest popover <path>
```

This will automatically transform all Popover components in your codebase.

## Component Structure Changes

### v2 (Flat Structure)

```tsx
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"

;<Popover>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure?</PopoverBody>
  </PopoverContent>
</Popover>
```

### v3 (Compound Component)

```tsx
import { Button, Popover } from "@chakra-ui/react"

;<Popover.Root>
  <Popover.Trigger asChild>
    <Button>Trigger</Button>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseTrigger />
      <Popover.Title>Confirmation!</Popover.Title>
      <Popover.Body>Are you sure?</Popover.Body>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

**Key Changes:**

1. `Popover` → `Popover.Root`
2. All subcomponents accessed via `Popover.*`
3. `PopoverContent` wrapped in `Popover.Positioner`
4. `asChild` prop added to `Popover.Trigger`
5. Single import: `import { Popover } from '@chakra-ui/react'`

---

## Component Renaming

| v2 Component         | v3 Component           | Notes                        |
| -------------------- | ---------------------- | ---------------------------- |
| `Popover`            | `Popover.Root`         | Root container               |
| `PopoverTrigger`     | `Popover.Trigger`      | Add `asChild` prop           |
| `PopoverContent`     | `Popover.Content`      | Wrap in `Popover.Positioner` |
| `PopoverHeader`      | `Popover.Title`        | Name change                  |
| `PopoverBody`        | `Popover.Body`         | -                            |
| `PopoverFooter`      | `Popover.Footer`       | -                            |
| `PopoverArrow`       | `Popover.Arrow`        | -                            |
| `PopoverCloseButton` | `Popover.CloseTrigger` | Name change                  |
| `PopoverAnchor`      | `Popover.Anchor`       | -                            |

---

## HoverCard Transformation

When using `trigger="hover"` in v2, the codemod automatically transforms the
entire component to use `HoverCard` instead of `Popover`.

### v2 (Popover with hover trigger)

```tsx
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"

;<Popover trigger="hover" openDelay={500} closeDelay={300}>
  <PopoverTrigger>
    <Button>Hover me</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverBody>This appears on hover</PopoverBody>
  </PopoverContent>
</Popover>
```

### v3 (HoverCard)

```tsx
import { Button, HoverCard } from "@chakra-ui/react"

;<HoverCard.Root openDelay={500} closeDelay={300}>
  <HoverCard.Trigger asChild>
    <Button>Hover me</Button>
  </HoverCard.Trigger>
  <HoverCard.Positioner>
    <HoverCard.Content>
      <HoverCard.Arrow />
      <HoverCard.Body>This appears on hover</HoverCard.Body>
    </HoverCard.Content>
  </HoverCard.Positioner>
</HoverCard.Root>
```

**Key Changes:**

1. `Popover` namespace → `HoverCard` namespace
2. `trigger="hover"` prop is removed (implicit in HoverCard)
3. `openDelay` and `closeDelay` props are preserved (specific to hover
   interactions)
4. All subcomponents renamed from `Popover.*` to `HoverCard.*`
5. Import automatically updated to include `HoverCard`

**Benefits:**

- **Semantic clarity** - HoverCard clearly indicates hover-triggered content
- **Appropriate defaults** - HoverCard has defaults optimized for hover
  interactions
- **Better accessibility** - HoverCard implements proper hover/focus patterns

---

## Prop Transformations

### State Props

#### isOpen / defaultIsOpen → open / defaultOpen

**Before (v2):**

```tsx
<Popover isOpen={isOpen} onClose={onClose}>
  {/* ... */}
</Popover>
```

**After (v3):**

```tsx
<Popover.Root
  open={isOpen}
  onOpenChange={(e) => {
    if (!e.open) onClose()
  }}
>
  {/* ... */}
</Popover.Root>
```

**Changes:**

- `isOpen` → `open`
- `defaultIsOpen` → `defaultOpen`
- `onClose` + `onOpen` → `onOpenChange` with `{ open: boolean }` parameter

---

### Interaction Props

#### closeOnBlur → closeOnInteractOutside

**Before (v2):**

```tsx
<Popover closeOnBlur={false}>{/* ... */}</Popover>
```

**After (v3):**

```tsx
<Popover.Root closeOnInteractOutside={false}>{/* ... */}</Popover.Root>
```

---

#### closeOnEsc → closeOnEscape

**Before (v2):**

```tsx
<Popover closeOnEsc={false}>{/* ... */}</Popover>
```

**After (v3):**

```tsx
<Popover.Root closeOnEscape={false}>{/* ... */}</Popover.Root>
```

---

### Lazy Mounting

#### isLazy → lazyMount

**Before (v2):**

```tsx
<Popover isLazy>{/* ... */}</Popover>
```

**After (v3):**

```tsx
<Popover.Root lazyMount>{/* ... */}</Popover.Root>
```

---

#### lazyBehavior → unmountOnExit

**Before (v2):**

```tsx
<Popover isLazy lazyBehavior="unmount">
  {/* ... */}
</Popover>
```

**After (v3):**

```tsx
<Popover.Root lazyMount unmountOnExit>
  {/* ... */}
</Popover.Root>
```

**Note:** `lazyBehavior='keepMounted'` is the default behavior in v3, so this
prop can be removed.

---

## Positioning Props (Grouped into `positioning` object)

All positioning-related props are now grouped in a `positioning` object:

### placement

**Before (v2):**

```tsx
<Popover placement="top-start">{/* ... */}</Popover>
```

**After (v3):**

```tsx
<Popover.Root positioning={{ placement: "top-start" }}>
  {/* ... */}
</Popover.Root>
```

---

### Multiple Positioning Props

**Before (v2):**

```tsx
<Popover placement="bottom" gutter={8} flip={false} matchWidth strategy="fixed">
  {/* ... */}
</Popover>
```

**After (v3):**

```tsx
<Popover.Root
  positioning={{
    placement: "bottom",
    gutter: 8,
    flip: false,
    sameWidth: true,
    strategy: "fixed",
  }}
>
  {/* ... */}
</Popover.Root>
```

---

### Positioning Props Reference

| v2 Prop           | v3 Positioning Prop           | Description                     |
| ----------------- | ----------------------------- | ------------------------------- |
| `placement`       | `positioning.placement`       | Preferred placement             |
| `boundary`        | `positioning.boundary`        | Boundary element                |
| `flip`            | `positioning.flip`            | Enable flip behavior            |
| `gutter`          | `positioning.gutter`          | Gap between trigger and content |
| `matchWidth`      | `positioning.sameWidth`       | Match trigger width             |
| `offset`          | `positioning.offset`          | Offset from trigger             |
| `strategy`        | `positioning.strategy`        | Positioning strategy            |
| `arrowPadding`    | `positioning.arrowPadding`    | Arrow padding                   |
| `preventOverflow` | `positioning.preventOverflow` | Prevent overflow behavior       |

---

## Pass-Through Props

The following props are passed through unchanged:

| Prop        | Description                       |
| ----------- | --------------------------------- |
| `autoFocus` | Controls automatic focus behavior |
| `direction` | Text direction (ltr/rtl)          |
| `id`        | HTML id attribute                 |

**Example:**

```tsx
// Before (v2)
<Popover autoFocus={false} direction='rtl' id='my-popover'>
  {/* ... */}
</Popover>

// After (v3)
<Popover.Root autoFocus={false} direction='rtl' id='my-popover'>
  {/* ... */}
</Popover.Root>
```

---

## Removed Props

The following props have been removed:

| Removed Prop             | Reason / Alternative                                           |
| ------------------------ | -------------------------------------------------------------- |
| `computePositionOnMount` | No longer needed                                               |
| `returnFocusOnClose`     | Handled automatically                                          |
| `arrowShadowColor`       | Use CSS styling instead                                        |
| `trigger`                | Automatically transformed to `HoverCard` if value is `"hover"` |
| `arrowSize`              | Automatically transferred to `Popover.Arrow` with CSS variable |
| `modifiers`              | No longer supported - use positioning props instead            |
| `openDelay`              | Removed for Popover, preserved for HoverCard (auto-detected)   |
| `closeDelay`             | Removed for Popover, preserved for HoverCard (auto-detected)   |

---

## Render Prop Pattern

### Using Popover.Context

For accessing popover state within the render tree, use `Popover.Context`:

**Before (v2):**

```tsx
<Popover>
  {({ isOpen, onClose }) => (
    <>
      <PopoverTrigger>
        <Button>Click to {isOpen ? "close" : "open"}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Button onClick={onClose}>Close</Button>
        </PopoverBody>
      </PopoverContent>
    </>
  )}
</Popover>
```

**After (v3):**

```tsx
<Popover.Root>
  <Popover.Context>
    {({ open: isOpen, setOpen }) => {
      const onClose = () => setOpen(false)
      const onOpen = () => setOpen(true)
      return (
        <>
          <Popover.Trigger asChild>
            <Button>Click to {isOpen ? "close" : "open"}</Button>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Body>
                <Button onClick={onClose}>Close</Button>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </>
      )
    }}
  </Popover.Context>
</Popover.Root>
```

**Context API Changes:**

- `isOpen` → `open: isOpen` (destructuring rename)
- `onClose` → `const onClose = () => setOpen(false)` (helper function)
- `onOpen` → `const onOpen = () => setOpen(true)` (helper function)
- The codemod automatically adds only the helpers you need based on what you use

### Render Prop Transformation Examples

**Only `isOpen` used:**

```tsx
// Before
{
  ;({ isOpen }) => <Button>{isOpen ? "Open" : "Closed"}</Button>
}

// After
{
  ;({ open: isOpen }) => <Button>{isOpen ? "Open" : "Closed"}</Button>
}
```

**`isOpen` and `onClose` used:**

```tsx
// Before
{
  ;({ isOpen, onClose }) => (
    <Button onClick={onClose}>{isOpen ? "Close" : "Open"}</Button>
  )
}

// After
{
  ;({ open: isOpen, setOpen }) => {
    const onClose = () => setOpen(false)
    return <Button onClick={onClose}>{isOpen ? "Close" : "Open"}</Button>
  }
}
```

**All three used:**

```tsx
// Before
{
  ;({ isOpen, onClose, onOpen }) => (
    <Button onClick={isOpen ? onClose : onOpen}>Toggle</Button>
  )
}

// After
{
  ;({ open: isOpen, setOpen }) => {
    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)
    return <Button onClick={isOpen ? onClose : onOpen}>Toggle</Button>
  }
}
```

---

## Complete Examples

### Example 1: Basic Popover

**Before (v2):**

```tsx
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>Body content</PopoverBody>
        <PopoverFooter>Footer content</PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
```

**After (v3):**

```tsx
import { Button, Popover } from "@chakra-ui/react"

export default function App() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Title>Header</Popover.Title>
          <Popover.CloseTrigger />
          <Popover.Body>Body content</Popover.Body>
          <Popover.Footer>Footer content</Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
```

---

### Example 2: Controlled Popover

**Before (v2):**

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"

function ControlledUsage() {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button onClick={onToggle}>Popover Target</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>Content</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
```

**After (v3):**

```tsx
import { Button, Popover } from "@chakra-ui/react"
import { useState } from "react"

function ControlledUsage() {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{ placement: "right" }}
      closeOnInteractOutside={false}
    >
      <Popover.Trigger asChild>
        <Button onClick={() => setOpen(!open)}>Popover Target</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>Content</Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
```

---

### Example 3: Popover with Portal

**Before (v2):**

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react"

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverBody>Content</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
```

**After (v3):**

```tsx
import { Button, Popover, Portal } from "@chakra-ui/react"

export default function App() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body>Content</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
```

**Note:** Portal usage remains the same, but wraps `Popover.Positioner` instead
of `PopoverContent`.

---

## Import Changes

**Before (v2):**

```tsx
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react"
```

**After (v3):**

```tsx
import { Popover } from "@chakra-ui/react"
```

All subcomponents are accessed via the compound component pattern:
`Popover.Root`, `Popover.Trigger`, etc.

---

## Manual Migration Steps

After running the codemod, review your code for:

1. **onClose/onOpen handlers on Root** - Merge into `onOpenChange`:

   ```tsx
   // Before
   onOpen={handleOpen} onClose={handleClose}

   // After
   onOpenChange={(e) => e.open ? handleOpen() : handleClose()}
   ```

   **Note:** The codemod automatically handles render prop transformations - it
   adds helper functions for `onClose` and `onOpen` when used in render props.

2. **initialFocusRef** - Automatically converted to function:

   ```tsx
   // Before
   initialFocusRef={ref}

   // After
   initialFocusEl={() => ref.current}
   ```

   **Note:** The codemod automatically wraps the ref in a function that returns
   `ref.current`.

3. **Hover trigger** - Automatically transformed to `HoverCard`:

   ```tsx
   // The codemod automatically detects trigger="hover" and converts
   // the entire component from Popover.* to HoverCard.*
   // v2: <Popover trigger="hover">...</Popover>
   // v3: <HoverCard.Root>...</HoverCard.Root>
   import { HoverCard } from "@chakra-ui/react"
   ```

   The transformation is complete and automatic - all subcomponents, props, and
   imports are updated.

---

## Testing

After migration, test:

1. **Open/Close behavior** - Verify popover opens and closes correctly
2. **Positioning** - Check placement and positioning work as expected
3. **Focus management** - Ensure focus is handled correctly
4. **Keyboard navigation** - Test Escape key and tab behavior
5. **Accessibility** - Verify ARIA attributes and screen reader announcements

---

## Benefits of v3 Structure

1. **Better composition** - Compound components provide clear structure
2. **Explicit positioning** - All positioning props grouped logically
3. **Improved performance** - Better control over rendering and updates
4. **Type safety** - Enhanced TypeScript support
5. **Cleaner API** - Explicit Positioner makes layout intentions clear

---

## Common Issues

### Issue: Popover doesn't position correctly

**Solution:** Ensure `Popover.Content` is wrapped in `Popover.Positioner`:

```tsx
<Popover.Root>
  <Popover.Trigger asChild>...</Popover.Trigger>
  <Popover.Positioner>
    {" "}
    {/* Don't forget this! */}
    <Popover.Content>...</Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

---

### Issue: Context properties not working

**Solution:** Update property names:

- `isOpen` → `popover.open`
- `onClose` → `popover.setOpen(false)`
- `onOpen` → `popover.setOpen(true)`

---

### Issue: Trigger doesn't work

**Solution:** Add `asChild` prop to `Popover.Trigger`:

```tsx
<Popover.Trigger asChild>
  <Button>Click me</Button>
</Popover.Trigger>
```

---

## Need Help?

If you encounter issues during migration:

1. Check the
   [Popover component documentation](https://chakra-ui.com/docs/components/popover)
2. Review the
   [Zag.js Popover documentation](https://zagjs.com/components/react/popover)
3. Open an issue on [GitHub](https://github.com/chakra-ui/chakra-ui/issues)

---

## See Also

- [Popover Component Documentation](https://chakra-ui.com/docs/components/popover)
- [HoverCard Component](https://chakra-ui.com/docs/components/hover-card) (for
  hover trigger)
- [Tooltip Component](https://chakra-ui.com/docs/components/tooltip) (for simple
  tooltips)
- [Chakra UI v3 Migration Guide](https://chakra-ui.com/docs/migration)
