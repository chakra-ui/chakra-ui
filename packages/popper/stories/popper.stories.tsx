import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { usePopper } from "../src"
import { motion, AnimatePresence, Variants } from "framer-motion"

export default {
  title: "Popper",
}

export const Basic = () => {
  const { isOpen, onToggle } = useDisclosure()

  const { popper, reference, arrow, transformOrigin } = usePopper({
    placement: "bottom-start",
    matchWidth: true,
  })

  return (
    <>
      <button onClick={onToggle} style={{ margin: 400 }} {...reference}>
        Reference Tooltip Trigger
      </button>

      {isOpen && (
        <div
          {...popper}
          style={{
            ...popper.style,
            width: 250,
            background: "red",
            padding: 15,
            borderRadius: 6,
            transformOrigin,
            // visibility: disclosure.isOpen ? "visible" : "hidden",
          }}
        >
          Popper
          <div
            {...arrow}
            style={{
              ...arrow.style,
              color: "red",
            }}
          />
        </div>
      )}
    </>
  )
}

export const WithTransition = () => {
  const { isOpen, onToggle } = useDisclosure()

  const { popper, reference, arrow, transformOrigin } = usePopper({
    placement: "bottom-start",
  })

  const slide: Variants = {
    exit: { y: -2, opacity: 0 },
    enter: { y: 0, opacity: 1 },
  }

  const bg = "red"

  return (
    <>
      <button {...reference} onClick={onToggle}>
        Toggle
      </button>
      <div {...popper}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              transition={{
                type: "spring",
                duration: 0.3,
              }}
              variants={slide}
              initial="exit"
              animate="enter"
              exit="exit"
              style={{
                background: bg,
                width: 200,
                padding: transformOrigin,
                borderRadius: 4,
              }}
            >
              Testing
              <div {...arrow} style={{ ...arrow.style, color: bg }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
