# Popper

A React hooks wrapper for popper.js to dynamic positioning of containers around
a reference.

> This is an internal hook of Chakra-UI and it's not covered by semver, and may
> cause unexpected or broken application behavior. Use them at your own risk.

## Installation

```sh
yarn add @chakra-ui/popper
```

## Basic usage

By default, the `usePopper` hook returns props for the popper, reference and
arrow.

```jsx
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from "@chakra-ui/hooks"
import { usePopper } from "@chakra-ui/popper"

function Example() {
  const { isOpen, onToggle } = useDisclosure()
  const { popperRef, referenceRef, getArrowProps } = usePopper()
  return (
    <>
      <Button ref={referenceRef} onClick={onToggle} mb={2}>
        {isOpen ? "Click me to see less" : "Click me to see more"}
      </Button>
      {isOpen && (
        <Box ref={popperRef} bg="red">
          <div
            {...getArrowProps({
              style: {
                background: "red",
              },
            })}
          />
          This is a popover for the button!
        </Box>
      )}
    </>
  )
}
```

## Parameters

### Changing the placement

You can change the placement of the popper by passing the `placement` option to
`usePopper` and set it to the `popper.js` placement.

```jsx
const { popperRef, referenceRef } = usePopper({
  placement: "right-start",
})
```

### Match reference's width

In some cases, you might want to allow the popper take the width of the
reference. For example, autocomplete, select, etc.

To achieve this, pass the `matchWidth` option and set it to `true`

```jsx
const { popperRef, referenceRef } = usePopper({
  matchWidth: true,
})
```

### Place the popper next to the reference

You can place the popper next to the reference without margin or distance between them.
Useful to create an autocomplete or typeahead feature.

```jsx
const { popperRef, referenceRef } = usePopper({
  gutter: 0,
})
```

### Using inside a fixed container

If the reference element is inside a fixed container, you should use the `fixed` strategy.

```jsx
const { popperRef, referenceRef } = usePopper({
  strategy: 'fixed',
})
```

## Adding transition

When add transitions to a popper component, it is usually advised to apply
popper and transition to different elements.

```jsx
// 1. Import components
import { useDisclosure } from "@chakra-ui/hooks"
import { usePopper } from "@chakra-ui/popper"
import { motion, AnimatePresence, Variants } from "framer-motion"

export function Example() {
  // 2. Create toggle state
  const { isOpen, onToggle } = useDisclosure()

  // 3. Create motion variants
  const slide: Variants = {
    exit: {
      y: -2,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
    },
  }

  // 4. Consume the `usePopper` hook
  const { getPopperProps, getReferenceProps, getArrowProps, transformOrigin } = usePopper({
    placement: "bottom-start",
  })

  return (
    <>
      <button {...getReferenceProps({ onClick: onToggle })}>Toggle</button>
      <div {...getPopperProps()}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              transition={{
                type: "spring",
                duration: 0.2,
              }}
              variants={slide}
              initial="exit"
              animate="enter"
              exit="exit"
              style={{
                background: "red",
                width: 200,
                transformOrigin,
                borderRadius: 4,
              }}
            >
              Testing
              <div
                {...getArrowProps({
                  style: {
                    background: "red",
                  },
                })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
```

> When not rendering the popper conditionally, we recommend using
> `visibility: hidden` instead of `hidden` or `display: none`
