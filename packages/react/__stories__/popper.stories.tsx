import { useDisclosure } from "@chakra-ui/hooks"
import { Variants, motion } from "framer-motion"
import { usePopper } from "../src/popper"

export default {
  title: "System / Popper",
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
            ["--popper-arrow-bg" as string]: "red",
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
      <div ref={popperRef} style={{ ["--popper-arrow-bg" as string]: "red" }}>
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

export const WithMatchWidth = () => {
  const { onToggle } = useDisclosure()

  const { getPopperProps, getReferenceProps } = usePopper({
    placement: "bottom-start",
    matchWidth: true,
  })

  const popperProps = getPopperProps()

  return (
    <>
      <button
        {...getReferenceProps()}
        onClick={onToggle}
        style={{ width: "400px", margin: 400 }}
      >
        Toggle
      </button>
      <div
        {...popperProps}
        style={{
          ...popperProps,
          background: "red",
        }}
      >
        <div style={{ width: "100%" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </div>
      </div>
    </>
  )
}
