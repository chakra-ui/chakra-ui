import { useDisclosure } from "@chakra-ui/hooks"
import { motion, Variants } from "framer-motion"
import * as React from "react"
import { usePopper } from "../src"

export default {
  title: "Popper",
}

export const Basic = () => {
  const { isOpen, onToggle } = useDisclosure()

  const { referenceRef, popperRef } = usePopper({
    placement: "bottom-start",
    matchWidth: true,
  })

  return (
    <>
      <button ref={referenceRef} style={{ margin: 400 }} onClick={onToggle}>
        Reference Tooltip Trigger
      </button>

      {isOpen && (
        <div
          ref={popperRef}
          style={{
            width: 250,
            background: "red",
            "--popper-arrow-bg": "red",
            padding: 15,
            borderRadius: 6,
          }}
        >
          Popper
          <div data-popper-arrow="">
            <div data-popper-arrow-inner="" />
          </div>
        </div>
      )}
    </>
  )
}

export const WithTransition = () => {
  const { isOpen, onToggle } = useDisclosure()

  const { referenceRef, popperRef } = usePopper({
    placement: "bottom-start",
  })

  const slide: Variants = {
    exit: { y: -2, opacity: 0 },
    enter: { y: 0, opacity: 1 },
  }

  const bg = "red"

  return (
    <>
      <button ref={referenceRef} onClick={onToggle}>
        Toggle
      </button>
      <div ref={popperRef} style={{ "--popper-arrow-bg": "red" }}>
        <motion.div
          transition={{
            duration: 0.15,
            easings: "easeInOut",
          }}
          variants={slide}
          initial={false}
          animate={isOpen ? "enter" : "exit"}
          style={{
            background: bg,
            width: 200,
            transformOrigin: "var(--popper-transform-origin)",
            borderRadius: 4,
          }}
        >
          Testing
          <div data-popper-arrow="">
            <div data-popper-arrow-inner="" />
          </div>
        </motion.div>
      </div>
    </>
  )
}

declare module "csstype" {
  interface Properties {
    [k: string]: any
  }
}
