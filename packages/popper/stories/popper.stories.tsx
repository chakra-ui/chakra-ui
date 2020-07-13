/**@jsx jsx */
import { useDisclosure } from "@chakra-ui/hooks"
import { jsx } from "@chakra-ui/system"
import {
  HiddenTransition,
  MotionConfig,
  motionConfigToCSS,
} from "@chakra-ui/transition"
import * as React from "react"
import { toTransformOrigin, usePopper } from "../src"

const scale: MotionConfig = {
  timeout: { enter: 100, exit: 75 },
  enter: {
    transition: {
      easing: "ease-out",
      duration: "100ms",
      property: "transform, opacity",
    },
    from: {
      opacity: 0,
      transform: "scale(0.95)",
    },
    to: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  exit: {
    transition: {
      easing: "ease-in",
      duration: "75ms",
      property: "transform, opacity",
    },
    from: {
      opacity: 1,
      transform: "scale(1)",
    },
    to: {
      opacity: 0,
      transform: "scale(0.95)",
    },
  },
}

export default {
  title: "Popper",
}

export const Basic = () => {
  const disclosure = useDisclosure()

  const { popper, reference, placement } = usePopper({
    placement: "bottom-end",
    forceUpdate: disclosure.isOpen,
  })

  return (
    <React.Fragment>
      <button
        onClick={disclosure.onToggle}
        style={{ margin: 400 }}
        {...reference}
      >
        Reference Tooltip Trigger
      </button>
      <HiddenTransition
        nodeRef={popper.ref}
        in={disclosure.isOpen}
        timeout={scale.timeout}
        classNames="tooltip"
      >
        <div
          hidden={!disclosure.isOpen}
          className="tooltip"
          {...popper}
          style={{
            ...popper.style,
            width: 250,
            background: "white",
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)",
            border: "1px solid #d2d6dc",
            padding: 15,
            borderRadius: 6,
            transformOrigin: toTransformOrigin(placement),
          }}
          sx={motionConfigToCSS(scale, "tooltip")}
        >
          Popper
        </div>
      </HiddenTransition>
    </React.Fragment>
  )
}

export const Conditional = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { popper, reference, arrow } = usePopper({
    placement: "bottom-start",
    forceUpdate: isOpen,
  })

  return (
    <React.Fragment>
      <button
        onMouseOver={onOpen}
        onMouseLeave={onClose}
        style={{ margin: 40 }}
        {...reference}
      >
        Reference
      </button>
      {isOpen && (
        <div
          {...popper}
          style={{
            ...popper.style,
            background: "red",
            padding: 15,
            minWidth: 200,
          }}
        >
          <div {...arrow} style={{ ...arrow.style, background: "inherit" }} />
          Popper
        </div>
      )}
    </React.Fragment>
  )
}
