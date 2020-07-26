import { SystemStyleObject } from "@chakra-ui/system"
import {
  Transition,
  TransitionProps,
  TransitionStyles,
} from "@chakra-ui/transition"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { usePopoverContext } from "./popover"

export interface PopoverTransitionProps {
  children: (styles: SystemStyleObject) => React.ReactNode
  styles?: TransitionProps["styles"]
}

export function PopoverTransition(props: PopoverTransitionProps) {
  const { children, styles } = props
  const popover = usePopoverContext()

  const defaultStyles: TransitionStyles = {
    init: {
      opacity: 0.01,
      transform: "scale(0.8)",
      transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.320, 1.175)",
      transitionProperty: "opacity, transform",
      willChange: "opacity, transform",
    },
    entered: {
      opacity: 1,
      transitionDuration: "200ms",
      transform: "scale(1)",
    },
    exiting: {
      opacity: 0.01,
      transitionDuration: "200ms",
      transform: "scale(0.8)",
    },
  }

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
      timeout={{ enter: 0, exit: 200 }}
      in={popover.isOpen}
      styles={styles ?? defaultStyles}
      unmountOnExit={false}
      children={children}
    />
  )
}

if (__DEV__) {
  PopoverTransition.displayName = "PopoverTransition"
}
