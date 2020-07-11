/**@jsx jsx */
import { jsx } from "@chakra-ui/system"
import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { usePopper, toTransformOrigin } from "../src"
import CSSTransition from "react-transition-group/CSSTransition"

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
      <CSSTransition
        nodeRef={popper.ref}
        in={disclosure.isOpen}
        timeout={150}
        classNames="tooltip"
        onEnter={() => {
          popper.ref.current.hidden = false
        }}
        onExited={() => {
          popper.ref.current.hidden = true
          popper.ref.current.style.pointerEvents = "auto"
        }}
        onExit={() => {
          popper.ref.current.hidden = false
        }}
        onExiting={() => {
          popper.ref.current.style.pointerEvents = "none"
        }}
      >
        <div
          hidden={!disclosure.isOpen}
          className="tooltip"
          {...popper}
          style={{
            ...popper.style,
            width: 250,
            background: "red",
            padding: 15,
            borderRadius: 6,
            transformOrigin: toTransformOrigin(placement),
          }}
          sx={{
            "&.tooltip": {
              opacity: 0,
              transform: "scale(0.8)",
              "&-enter": {
                opacity: 0,
                transform: "scale(0.8)",
              },
              "&-enter-active": {
                opacity: 1,
                transform: "scale(1)",
                transitionTimingFunction: "cubic-bezier(0,0,0.2,1)",
                transitionProperty: "transform, opacity",
                transitionDuration: "150ms",
              },
              "&-enter-done": {
                opacity: 1,
                transform: "scale(1)",
              },
              "&-exit": {
                opacity: 1,
                transform: "scale(1)",
              },
              "&-exit-active": {
                opacity: 0,
                transform: "scale(0.8)",
                transitionTimingFunction: "cubic-bezier(0.4,0,1,1)",
                transitionProperty: "transform, opacity",
                transitionDuration: "150ms",
              },
              "&-exit-done": {
                opacity: 0,
                transform: "scale(0.8)",
              },
            },
          }}
        >
          Popper
        </div>
      </CSSTransition>
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
