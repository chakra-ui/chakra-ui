# Transitions Components Migration Guide

This guide explains how to migrate from Chakra UI v2 transition components
(Fade, ScaleFade, Slide, SlideFade) to the unified v3 Presence component.

## Overview

In Chakra UI v3, all transition components have been consolidated into a single
`Presence` component that uses CSS-based animations instead of JavaScript-based
transitions. This provides:

- **Better performance** - CSS animations are hardware-accelerated
- **Simpler API** - One component to learn instead of four
- **More flexibility** - Combine animations using CSS keyframe names
- **Consistent behavior** - All transitions follow the same pattern

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest transitions <path>
```

This will automatically transform all four transition components in your
codebase.

## Component Transformations

### Fade

**Before (v2):**

```tsx
import { Fade } from "@chakra-ui/react"

function App() {
  return (
    <Fade in={isOpen}>
      <Box>Content</Box>
    </Fade>
  )
}
```

**After (v3):**

```tsx
import { Presence } from "@chakra-ui/react"

function App() {
  return (
    <Presence
      present={isOpen}
      animationName={{
        _open: "fade-in",
        _closed: "fade-out",
      }}
      animationDuration="moderate"
    >
      <Box>Content</Box>
    </Presence>
  )
}
```

**Changes:**

- Component: `Fade` → `Presence`
- Prop: `in` → `present`
- Added: `animationName` with `_open` and `_closed` conditions
- Added: `animationDuration="moderate"`

---

### ScaleFade

**Before (v2):**

```tsx
import { ScaleFade } from "@chakra-ui/react"

function App() {
  return (
    <ScaleFade in={isOpen} initialScale={0.9}>
      <Box>Content</Box>
    </ScaleFade>
  )
}
```

**After (v3):**

```tsx
import { Presence } from "@chakra-ui/react"

function App() {
  return (
    <Presence
      present={isOpen}
      animationStyle={{
        _open: "scale-fade-in",
        _closed: "scale-fade-out",
      }}
      animationDuration="moderate"
    >
      <Box>Content</Box>
    </Presence>
  )
}
```

**Changes:**

- Component: `ScaleFade` → `Presence`
- Prop: `in` → `present`
- Added: `animationStyle` (not `animationName` for scale effects)
- Added: `animationDuration="moderate"`
- **Removed:** `initialScale` - Scale factor is now fixed in CSS keyframes
  (cannot be customized)

**⚠️ Breaking Change:** The `initialScale` prop is no longer supported. If you
need custom scale values, you'll need to define custom CSS keyframes.

---

### Slide

**Before (v2):**

```tsx
import { Slide } from "@chakra-ui/react"

function App() {
  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
      <Box>Content</Box>
    </Slide>
  )
}
```

**After (v3):**

```tsx
import { Presence } from "@chakra-ui/react"

function App() {
  return (
    <Presence
      position="fixed"
      bottom="0"
      insetX="0"
      present={isOpen}
      animationName={{
        _open: "slide-from-bottom-full",
        _closed: "slide-to-bottom-full",
      }}
      animationDuration="moderate"
      style={{ zIndex: 10 }}
    >
      <Box>Content</Box>
    </Presence>
  )
}
```

**Changes:**

- Component: `Slide` → `Presence`
- Prop: `in` → `present`
- **Removed:** `direction` prop
- **Added:** Direction-specific positioning props and animations

#### Direction Mapping

The `direction` prop is transformed into positioning props and
direction-specific animations:

| Direction  | Positioning Props                              | Open Animation           | Close Animation        |
| ---------- | ---------------------------------------------- | ------------------------ | ---------------------- |
| `'top'`    | `position="fixed"`, `top="0"`, `insetX="0"`    | `slide-from-top-full`    | `slide-to-top-full`    |
| `'bottom'` | `position="fixed"`, `bottom="0"`, `insetX="0"` | `slide-from-bottom-full` | `slide-to-bottom-full` |
| `'left'`   | `position="fixed"`, `left="0"`, `insetY="0"`   | `slide-from-left-full`   | `slide-to-left-full`   |
| `'right'`  | `position="fixed"`, `right="0"`, `insetY="0"`  | `slide-from-right-full`  | `slide-to-right-full`  |

**⚠️ Note:** If the `direction` prop contains a dynamic expression (variable or
function), the codemod will default to `'bottom'` direction and add a TODO
comment for manual review.

---

### SlideFade

**Before (v2):**

```tsx
import { SlideFade } from "@chakra-ui/react"

function App() {
  return (
    <SlideFade in={isOpen} offsetY="20px">
      <Box>Content</Box>
    </SlideFade>
  )
}
```

**After (v3):**

```tsx
import { Presence } from "@chakra-ui/react"

function App() {
  return (
    <Presence
      present={isOpen}
      animationName={{
        _open: "slide-from-bottom, fade-in",
        _closed: "slide-to-bottom, fade-out",
      }}
      animationDuration="moderate"
    >
      <Box>Content</Box>
    </Presence>
  )
}
```

**Changes:**

- Component: `SlideFade` → `Presence`
- Prop: `in` → `present`
- Added: `animationName` with combined animations (comma-separated)
- Added: `animationDuration="moderate"`
- **Removed:** `offsetY` and `offsetX` - Offset distance is now fixed at 0.5rem
  in CSS keyframes

**⚠️ Breaking Change:** Custom offset values are no longer supported. If you
need different offset distances, you'll need to define custom CSS keyframes.

---

## Import Handling

The codemod automatically updates imports:

**Single component:**

```tsx
// Before
import { Fade, Box } from '@chakra-ui/react'
// After
import { Presence, Box } from '@chakra-ui/react'
```

**Multiple transition components:**

```tsx
// Before
import { Fade, ScaleFade, Slide, SlideFade, Box } from '@chakra-ui/react'
// After
import { Presence, Box } from '@chakra-ui/react'
```

**Presence already imported:**

```tsx
// Before
import { Fade, Presence, Box } from '@chakra-ui/react'
// After (Fade removed, Presence kept)
import { Presence, Box } from '@chakra-ui/react'
```

## Animation Duration

All transformed components use `animationDuration="moderate"` by default. You
can customize this with the following values:

- `"fast"` - Quick animations
- `"moderate"` - Default speed
- `"slow"` - Slower, more deliberate animations

Or use a custom duration string (e.g., `"0.3s"`, `"200ms"`).

## Custom Animations

If the built-in animations don't meet your needs, you can define custom CSS
keyframes:

```tsx
import { Presence } from "@chakra-ui/react"

function App() {
  return (
    <Presence
      present={isOpen}
      css={{
        "&[data-open]": {
          animation: "custom-fade-in 0.3s ease-out",
        },
        "&[data-closed]": {
          animation: "custom-fade-out 0.3s ease-in",
        },
        "@keyframes custom-fade-in": {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "@keyframes custom-fade-out": {
          from: { opacity: 1, transform: "translateY(0)" },
          to: { opacity: 0, transform: "translateY(-10px)" },
        },
      }}
    >
      <Box>Content</Box>
    </Presence>
  )
}
```

## Additional Props

All other props (like `unmountOnExit`, `delay`, `style`, etc.) are preserved
during transformation:

```tsx
// Before
<Fade in={isOpen} unmountOnExit delay={0.2} style={{ zIndex: 999 }}>
  Content
</Fade>

// After
<Presence
  present={isOpen}
  unmountOnExit
  delay={0.2}
  style={{ zIndex: 999 }}
  animationName={{
    _open: "fade-in",
    _closed: "fade-out"
  }}
  animationDuration="moderate"
>
  Content
</Presence>
```

## Manual Migration Steps

After running the codemod, review your code for:

1. **Dynamic Slide directions** - The codemod defaults to `'bottom'` and adds a
   TODO comment
2. **Custom scale values** - You'll need to define custom keyframes if you
   relied on `initialScale`
3. **Custom offset values** - You'll need to define custom keyframes if you
   relied on `offsetY`/`offsetX`
4. **Animation timing** - Verify `animationDuration="moderate"` works for your
   use case

## Testing

After migration, test all animated components to ensure:

- Animations trigger correctly on state changes
- Timing and easing feel appropriate
- No visual regressions
- Accessibility features still work (keyboard navigation, screen readers)

## Need Help?

If you encounter issues during migration:

1. Check the
   [Presence component documentation](https://chakra-ui.com/docs/components/presence)
2. Review the
   [animation system documentation](https://chakra-ui.com/docs/styling/animations)
3. Open an issue on [GitHub](https://github.com/chakra-ui/chakra-ui/issues)

## See Also

- [Presence Component Documentation](https://chakra-ui.com/docs/components/presence)
- [CSS Animations in Chakra UI](https://chakra-ui.com/docs/styling/animations)
- [Migration Guide](https://chakra-ui.com/docs/migration)
