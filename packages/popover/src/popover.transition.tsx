import { SystemStyleObject } from "@chakra-ui/system"
import { Transition, TransitionStyles } from "@chakra-ui/transition"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { usePopoverContext } from "./popover"

export interface PopoverTransitionProps {
  children: (styles: SystemStyleObject) => React.ReactNode
  styles?: TransitionStyles
}

const defaultStyles: TransitionStyles = {
  init: {
    opacity: 0.01,
    transform: "scale(0.9)",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionProperty: "opacity, transform",
    willChange: "opacity, transform",
  },
  entered: {
    opacity: 1,
    transitionDuration: "150ms",
    transform: "scale(1)",
  },
  exiting: {
    opacity: 0.01,
    transitionDuration: "150ms",
    transform: "scale(0.9)",
  },
}

export function PopoverTransition(props: PopoverTransitionProps) {
  const { children, styles = defaultStyles } = props

  const popover = usePopoverContext()

  return (
    <Transition
      onEnter={(node) => {
        node.hidden = false
      }}
      onExited={(node) => {
        node.hidden = true
        node.style.pointerEvents = "auto"
      }}
      onExit={(node) => {
        node.hidden = false
      }}
      onExiting={(node) => {
        node.style.pointerEvents = "none"
      }}
      timeout={{ enter: 0, exit: 150 }}
      in={popover.isOpen}
      styles={styles}
      unmountOnExit={false}
      children={children}
    />
  )
}

if (__DEV__) {
  PopoverTransition.displayName = "PopoverTransition"
}
