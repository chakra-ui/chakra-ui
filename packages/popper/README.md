# Popper

A React hooks wrapper for popper.js to dynamic positioning of containers around
a reference.

## Installation

```sh
yarn add @chakra-ui/popper
```

## Basic usage

By default, the `usePopper` hook returns props for the popper, reference and
arrow.

```jsx
const { popper, reference, arrow } = usePopper()
```

## Changing the placement

You can change the placement of the popper by passing the `placement` option to
`usePopper` and set it to the `popper.js` placement.

```jsx
const { popper, reference, arrow, transformOrigin } = usePopper({
  placement: "right-start",
})
```

### Match reference's width

In some cases, you might want to allow the popper take the width of the
reference. For example, autocomplete, select, etc.

To achieve this, pass the `matchWidth` option and set it to `true`

```jsx
const { popper, reference, arrow, transformOrigin } = usePopper({
  placement: "right-start",
  matchWidth: true,
})
```

### Adding transition

When add transitions to a popper component, it's usually advised to apply popper
and transition to different elements.

```jsx
// 1. Import components
import { useDisclosure } from "@chakra-ui/hooks"
import { usePopper } from "@chakra-ui/popper"
import { motion, AnimatePresence } from "framer-motion"

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
  const { popper, reference, arrow, transformOrigin } = usePopper({
    placement: "bottom-start",
  })

  return (
    <>
      <button {...reference} onClick={onToggle}>
        Toggle
      </button>
      {/* 5. Attach popper to this div */}
      <div {...popper}>
        <AnimatePresence>
          {isOpen && (
            {/* 6. Add transition to `motion.div` */}
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
              <div {...arrow} style={{ ...arrow.style, color: "red" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
```
