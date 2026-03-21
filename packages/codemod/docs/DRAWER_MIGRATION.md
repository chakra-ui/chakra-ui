# Drawer Migration Guide (v2 → v3)

This guide covers the migration of Chakra UI v2 Drawer components to the v3
compound component API.

## Overview

In v3, Drawer has been redesigned with a compound component pattern that
provides more flexibility and clearer component relationships. The codemod
automatically handles most transformations.

## Component Mapping

| v2 Component          | v3 Component                               |
| --------------------- | ------------------------------------------ |
| `<Drawer>`            | `<Drawer.Root>`                            |
| `<DrawerOverlay>`     | `<Drawer.Backdrop>`                        |
| `<DrawerContent>`     | `<Drawer.Positioner>` + `<Drawer.Content>` |
| `<DrawerHeader>`      | `<Drawer.Header>`                          |
| `<DrawerBody>`        | `<Drawer.Body>`                            |
| `<DrawerFooter>`      | `<Drawer.Footer>`                          |
| `<DrawerCloseButton>` | `<Drawer.CloseTrigger>`                    |

## Portal Wrapper

In v2, Drawer automatically rendered content in a portal. In v3, you need to
explicitly wrap the backdrop and positioner in a `<Portal>` component. The
codemod handles this automatically.

**v2:**

```tsx
<Drawer isOpen={isOpen} onClose={onClose}>
  <DrawerOverlay />
  <DrawerContent>{/* content */}</DrawerContent>
</Drawer>
```

**v3:**

```tsx
<Drawer.Root
  open={isOpen}
  onOpenChange={(e) => {
    if (!e.open) onClose()
  }}
>
  <Portal>
    <Drawer.Backdrop />
    <Drawer.Positioner>
      <Drawer.Content>{/* content */}</Drawer.Content>
    </Drawer.Positioner>
  </Portal>
</Drawer.Root>
```

## Prop Transformations

### Drawer.Root Props

| v2 Prop               | v3 Prop                  | Notes                                          |
| --------------------- | ------------------------ | ---------------------------------------------- |
| `isOpen`              | `open`                   | Direct rename                                  |
| `onClose`             | `onOpenChange`           | Now receives event object with `open` property |
| `placement="left"`    | `placement="start"`      | Remapped for RTL support                       |
| `placement="right"`   | `placement="end"`        | Remapped for RTL support                       |
| `placement="top"`     | `placement="top"`        | Unchanged                                      |
| `placement="bottom"`  | `placement="bottom"`     | Unchanged                                      |
| `isFullHeight`        | _(removed)_              | Adds `height="100%"` to `Drawer.Content`       |
| `size`                | `size`                   | Values `2xl`-`6xl` map to `xl`                 |
| `isCentered`          | `placement="center"`     | For centered drawers                           |
| `closeOnEsc`          | `closeOnEscape`          | Direct rename                                  |
| `closeOnOverlayClick` | `closeOnInteractOutside` | Renamed for clarity                            |
| `blockScrollOnMount`  | `preventScroll`          | Renamed for clarity                            |
| `onCloseComplete`     | `onExitComplete`         | Direct rename                                  |
| `onEsc`               | `onEscapeKeyDown`        | Direct rename                                  |
| `onOverlayClick`      | `onInteractOutside`      | Renamed for clarity                            |
| `finalFocusRef`       | `finalFocusEl`           | Now uses function: `() => ref.current`         |
| `initialFocusRef`     | `initialFocusEl`         | Now uses function: `() => ref.current`         |
| `motionPreset`        | `motionPreset`           | Unchanged                                      |
| `scrollBehavior`      | `scrollBehavior`         | Unchanged                                      |
| `trapFocus`           | `trapFocus`              | Unchanged                                      |

### Removed Props

These props have been removed in v3:

- `allowPinchZoom`
- `autoFocus`
- `lockFocusAcrossFrames`
- `preserveScrollBarGap`
- `returnFocusOnClose`
- `useInert`
- `portalProps` (use `<Portal>` component directly)

## Placement Remapping

The `placement` prop has been updated for better RTL support:

```tsx
// v2 → v3
placement="left"   → placement="start"
placement="right"  → placement="end"
placement="top"    → placement="top"     // unchanged
placement="bottom" → placement="bottom"  // unchanged
```

## isFullHeight Transformation

In v2, `isFullHeight` was a prop on `Drawer`. In v3, it's applied as
`height="100%"` on `Drawer.Content`:

**v2:**

```tsx
<Drawer isOpen={isOpen} onClose={onClose} isFullHeight>
  <DrawerContent>{/* content */}</DrawerContent>
</Drawer>
```

**v3:**

```tsx
<Drawer.Root
  open={isOpen}
  onOpenChange={(e) => {
    if (!e.open) onClose()
  }}
>
  <Portal>
    <Drawer.Positioner>
      <Drawer.Content height="100%">{/* content */}</Drawer.Content>
    </Drawer.Positioner>
  </Portal>
</Drawer.Root>
```

## onClose Handler Transformation

The `onClose` prop is transformed to `onOpenChange` with a conditional handler:

**v2:**

```tsx
<Drawer isOpen={isOpen} onClose={handleClose}>
```

**v3:**

```tsx
<Drawer.Root
  open={isOpen}
  onOpenChange={(e) => {
    if (!e.open) {
      handleClose()
    }
  }}
>
```

## Size Remapping

In v3, drawer sizes are limited to: `xs`, `sm`, `md`, `lg`, `xl`, `full`. Larger
v2 sizes are mapped to `xl`:

| v2 Size | v3 Size |
| ------- | ------- |
| `xs`    | `xs`    |
| `sm`    | `sm`    |
| `md`    | `md`    |
| `lg`    | `lg`    |
| `xl`    | `xl`    |
| `2xl`   | `xl` ⚠️ |
| `3xl`   | `xl` ⚠️ |
| `4xl`   | `xl` ⚠️ |
| `5xl`   | `xl` ⚠️ |
| `6xl`   | `xl` ⚠️ |
| `full`  | `full`  |

## Focus Management

Ref-based focus props now use functions returning the ref's `.current` value:

**v2:**

```tsx
const cancelRef = useRef()
const submitRef = useRef()

<Drawer
  isOpen={isOpen}
  onClose={onClose}
  initialFocusRef={submitRef}
  finalFocusRef={cancelRef}
>
```

**v3:**

```tsx
const cancelRef = useRef()
const submitRef = useRef()

<Drawer.Root
  open={isOpen}
  onOpenChange={(e) => { if (!e.open) onClose() }}
  initialFocusEl={() => submitRef.current}
  finalFocusEl={() => cancelRef.current}
>
```

## Complete Example

### Before (v2)

```tsx
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react"

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        isFullHeight
        size="md"
        closeOnEsc={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
```

### After (v3)

```tsx
import { Button, Drawer, Portal, useDisclosure } from "@chakra-ui/react"

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>

      <Drawer.Root
        open={isOpen}
        placement="end"
        finalFocusEl={() => btnRef.current}
        size="md"
        closeOnEscape={false}
        onOpenChange={(e) => {
          if (!e.open) {
            onClose()
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content height="100%">
              <Drawer.CloseTrigger />
              <Drawer.Header>Create your account</Drawer.Header>

              <Drawer.Body>
                <input placeholder="Type here..." />
              </Drawer.Body>

              <Drawer.Footer>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}
```

## Import Changes

The codemod automatically consolidates Drawer component imports:

**v2:**

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
```

**v3:**

```tsx
import { Drawer, Portal } from "@chakra-ui/react"
```

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform drawer src/**/*.tsx
```

## Manual Review Required

After running the codemod, review:

1. **Dynamic placement values**: If placement is an expression, it's kept as-is.
   Verify RTL behavior.
2. **Custom Portal usage**: If you had custom portal configurations via
   `portalProps`, migrate to using `<Portal>` component props.
3. **isFullHeight with existing height**: If `DrawerContent` already had a
   `height` prop, the codemod adds `height="100%"` which may override it.
4. **Size expressions**: If `size` is a variable/expression, the codemod keeps
   it as-is. Ensure your size values match v3's available sizes.

## Additional Resources

- [Drawer Documentation](https://chakra-ui.com/docs/components/drawer)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)
- [Compound Components Pattern](https://chakra-ui.com/docs/get-started/compound-components)
