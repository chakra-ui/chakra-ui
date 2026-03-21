# Modal Component Migration Guide

This guide explains how to migrate from Chakra UI v2 Modal components to the v3
Dialog compound component API.

## Overview

In Chakra UI v3, the Modal component has been redesigned and renamed to Dialog
with:

- **Compound component pattern** for better composition
- **Explicit Portal wrapper** for backdrop and content
- **Dialog.Root** as the main container
- **Simplified event handling** with `onOpenChange`

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest modal <path>
```

This will automatically transform all Modal components to Dialog in your
codebase.

## Component Structure Changes

### v2 (Modal)

```tsx
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

function App() {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Body content</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
```

### v3 (Dialog)

```tsx
import { Button, Dialog, Portal } from "@chakra-ui/react"

function App() {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose()
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Modal Title</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>Body content</Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onClose}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
```

**Key Changes:**

1. `Modal` → `Dialog.Root`
2. All subcomponents accessed via `Dialog.*`
3. Content wrapped in `Portal` (automatically added by codemod)
4. `ModalContent` wrapped in `Dialog.Positioner`
5. Single import: `import { Dialog, Portal } from '@chakra-ui/react'`

---

## Component Renaming

| v2 Component       | v3 Component          | Notes                       |
| ------------------ | --------------------- | --------------------------- |
| `Modal`            | `Dialog.Root`         | Root container              |
| `ModalOverlay`     | `Dialog.Backdrop`     | Backdrop overlay            |
| `ModalContent`     | `Dialog.Content`      | Wrap in `Dialog.Positioner` |
| `ModalHeader`      | `Dialog.Header`       | Header section              |
| `ModalBody`        | `Dialog.Body`         | Body content                |
| `ModalFooter`      | `Dialog.Footer`       | Footer section              |
| `ModalCloseButton` | `Dialog.CloseTrigger` | Close button                |

---

## Prop Transformations

### State Props

#### isOpen → open

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root
  open={isOpen}
  onOpenChange={(e) => {
    if (!e.open) {
      onClose()
    }
  }}
>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `isOpen` → `open`
- `onClose` → handled via `onOpenChange`

---

#### onClose → onOpenChange

The `onClose` callback is now handled through the `onOpenChange` event handler.

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root
  open={isOpen}
  onOpenChange={(e) => {
    if (!e.open) {
      handleClose()
    }
  }}
>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `onClose` callback is invoked when `e.open` is `false`
- Inline arrow functions are automatically extracted

---

### Layout Props

#### isCentered → placement="center"

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} isCentered>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} placement="center">
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `isCentered` → `placement="center"`

---

### Interaction Props

#### closeOnOverlayClick → closeOnInteractOutside

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} closeOnInteractOutside={false}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `closeOnOverlayClick` → `closeOnInteractOutside`

---

#### closeOnEsc → closeOnEscape

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} closeOnEscape={false}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `closeOnEsc` → `closeOnEscape`

---

#### onOverlayClick → onInteractOutside

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} onOverlayClick={handleOverlay}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} onInteractOutside={handleOverlay}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `onOverlayClick` → `onInteractOutside`

---

### Scroll and Focus Props

#### blockScrollOnMount → preventScroll

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} preventScroll={false}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `blockScrollOnMount` → `preventScroll`

---

#### initialFocusRef → initialFocusEl

**Before (v2):**

```tsx
const initialRef = React.useRef()

<Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
const initialRef = React.useRef()

<Dialog.Root open={isOpen} onOpenChange={...} initialFocusEl={() => initialRef.current}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `initialFocusRef={ref}` → `initialFocusEl={() => ref.current}`
- Ref is wrapped in a function that returns `ref.current`

---

#### finalFocusRef → finalFocusEl

**Before (v2):**

```tsx
const finalRef = React.useRef()

<Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
const finalRef = React.useRef()

<Dialog.Root open={isOpen} onOpenChange={...} finalFocusEl={() => finalRef.current}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `finalFocusRef={ref}` → `finalFocusEl={() => ref.current}`
- Ref is wrapped in a function that returns `ref.current`

---

### Event Handler Props

#### onEsc → onEscapeKeyDown

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} onEsc={handleEsc}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} onEscapeKeyDown={handleEsc}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `onEsc` → `onEscapeKeyDown`

---

#### onCloseComplete → onExitComplete

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose} onCloseComplete={handleComplete}>
  {/* content */}
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...} onExitComplete={handleComplete}>
  {/* content */}
</Dialog.Root>
```

**Changes:**

- `onCloseComplete` → `onExitComplete`

---

### Size Props

Modal sizes have been remapped to match v3's size scale.

**v2 Sizes:** `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"` | `"2xl"` | `"3xl"` |
`"4xl"` | `"5xl"` | `"6xl"` | `"full"`

**v3 Sizes:** `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"` | `"cover"` | `"full"`

**Size Mapping:**

| v2 Size | v3 Size |
| ------- | ------- |
| `xs`    | `xs`    |
| `sm`    | `sm`    |
| `md`    | `md`    |
| `lg`    | `lg`    |
| `xl`    | `xl`    |
| `2xl`   | `xl`    |
| `3xl`   | `xl`    |
| `4xl`   | `xl`    |
| `5xl`   | `xl`    |
| `6xl`   | `xl`    |
| `full`  | `full`  |

**Example:**

```tsx
// v2
<Modal size="3xl" isOpen={isOpen} onClose={onClose}>
  {/* content */}
</Modal>

// v3
<Dialog.Root size="xl" open={isOpen} onOpenChange={...}>
  {/* content */}
</Dialog.Root>
```

**Note:** Sizes `2xl` through `6xl` are all mapped to `xl` in v3. If you need
finer control, use custom styling.

---

### Pass-Through Props

The following props pass through unchanged:

| Prop             | Description                                     |
| ---------------- | ----------------------------------------------- |
| `motionPreset`   | Animation preset for enter/exit                 |
| `scrollBehavior` | How content scrolls (`"inside"` or `"outside"`) |
| `trapFocus`      | Whether to trap focus inside dialog             |

**Example:**

```tsx
// v2 and v3 (unchanged)
<Modal
  isOpen={isOpen}
  onClose={onClose}
  motionPreset="slideInBottom"
  scrollBehavior="inside"
  trapFocus={false}
>
  {/* content */}
</Modal>

// v3
<Dialog.Root
  open={isOpen}
  onOpenChange={...}
  motionPreset="slideInBottom"
  scrollBehavior="inside"
  trapFocus={false}
>
  {/* content */}
</Dialog.Root>
```

---

## Removed Props

The following props have been removed in v3:

| Removed Prop            | Reason / Alternative              |
| ----------------------- | --------------------------------- |
| `allowPinchZoom`        | No longer supported               |
| `autoFocus`             | Handled automatically             |
| `lockFocusAcrossFrames` | No longer needed                  |
| `preserveScrollBarGap`  | Handled automatically             |
| `returnFocusOnClose`    | Use `finalFocusEl` instead        |
| `useInert`              | Handled automatically             |
| `portalProps`           | Use `<Portal>` component directly |

---

## Portal Wrapper

In v2, Modal automatically rendered the backdrop and content in a portal. In v3,
you must explicitly use the `<Portal>` component, but **the codemod adds this
automatically**.

**Before (v2):**

```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>{/* content */}</ModalContent>
</Modal>
```

**After (v3):**

```tsx
<Dialog.Root open={isOpen} onOpenChange={...}>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        {/* content */}
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
```

The codemod automatically:

1. Wraps backdrop and positioner in `<Portal>`
2. Adds `Portal` to imports

---

## Complete Examples

### Example 1: Basic Modal

**Before (v2):**

```tsx
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>Modal body text goes here.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

**After (v3):**

```tsx
import { Button, Dialog, Portal } from "@chakra-ui/react"

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) {
            onClose()
          }
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Modal Title</Dialog.Header>
              <Dialog.Body>
                <p>Modal body text goes here.</p>
              </Dialog.Body>
              <Dialog.Footer>
                <Button onClick={onClose}>Close</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
```

---

### Example 2: Centered Modal with Focus Management

**Before (v2):**

```tsx
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Button ref={finalRef} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={finalRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Centered Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Focus will return to the button when closed.</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
```

**After (v3):**

```tsx
import { Button, Dialog, Portal } from "@chakra-ui/react"

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>
      <Button ref={finalRef} onClick={onOpen}>
        Open Modal
      </Button>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) {
            onClose()
          }
        }}
        finalFocusEl={() => finalRef.current}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Centered Modal</Dialog.Header>
              <Dialog.CloseTrigger />
              <Dialog.Body>
                Focus will return to the button when closed.
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
```

---

### Example 3: Modal with Custom Size and Motion

**Before (v2):**

```tsx
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Large Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Large Modal</ModalHeader>
          <ModalBody>
            <p>Content with custom size and animation.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
```

**After (v3):**

```tsx
import { Button, Dialog, Portal } from "@chakra-ui/react"

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Large Modal</Button>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) {
            onClose()
          }
        }}
        size="xl"
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Large Modal</Dialog.Header>
              <Dialog.Body>
                <p>Content with custom size and animation.</p>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
```

**Note:** `size="4xl"` is automatically mapped to `size="xl"` in v3.

---

## Manual Migration Steps

After running the codemod, review your code for:

1. **Portal placement** - Verify Portal wraps both Backdrop and Positioner
2. **Focus management** - Check that focus behavior works as expected
3. **Custom sizes** - Verify size mappings are appropriate for your use case
4. **Event handlers** - Ensure `onOpenChange` logic works correctly
5. **Animation** - Test that `motionPreset` animations work as expected

---

## Testing

After migration, test:

1. **Open/Close behavior** - Verify dialog opens and closes correctly
2. **Keyboard interaction** - Test Escape key and tab navigation
3. **Focus management** - Ensure focus moves correctly on open/close
4. **Backdrop interaction** - Test clicking outside to close (if enabled)
5. **Accessibility** - Verify ARIA attributes and screen reader behavior
6. **Responsive behavior** - Check different sizes and viewports

---

## Benefits of v3 Structure

1. **Clearer composition** - Explicit Portal and Positioner components
2. **Better control** - More granular control over rendering and positioning
3. **Improved performance** - Optimized rendering and updates
4. **Enhanced TypeScript** - Better type safety and autocomplete
5. **Consistent API** - Unified with other overlay components (Popover, Drawer,
   etc.)

---

## Need Help?

If you encounter issues during migration:

1. Check the
   [Dialog component documentation](https://chakra-ui.com/docs/components/dialog)
2. Review the [migration guide](https://chakra-ui.com/docs/migration)
3. Open an issue on [GitHub](https://github.com/chakra-ui/chakra-ui/issues)

---

## See Also

- [Dialog Component Documentation](https://chakra-ui.com/docs/components/dialog)
- [Portal Component](https://chakra-ui.com/docs/components/portal)
- [Drawer Component](https://chakra-ui.com/docs/components/drawer) (similar
  pattern)
- [Chakra UI v3 Migration Guide](https://chakra-ui.com/docs/migration)
