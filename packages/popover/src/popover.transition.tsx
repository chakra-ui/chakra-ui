import {
  Transition,
  TransitionProps,
  TransitionStyles,
  TransitionChildrenProps,
} from "@chakra-ui/transition"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { usePopoverContext } from "./popover"

export interface PopoverTransitionProps {
  children: (transitionProps: TransitionChildrenProps) => React.ReactNode
  styles?: TransitionProps["styles"]
}

export const PopoverTransition: React.FC<PopoverTransitionProps> = (props) => {
  const { children, styles } = props

  const popover = usePopoverContext()

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

  const ref = React.useRef<HTMLElement>()

  return (
    <Transition
      onEnter={() => {
        ref.current!.hidden = false
      }}
      onExited={() => {
        ref.current!.hidden = true
        ref.current!.style.pointerEvents = "auto"
      }}
      onExit={() => {
        ref.current!.hidden = false
      }}
      onExiting={() => {
        ref.current!.style.pointerEvents = "none"
      }}
      timeout={{ enter: 0, exit: 150 }}
      in={popover.isOpen}
      styles={styles ?? defaultStyles}
      unmountOnExit={false}
      children={children}
      nodeRef={ref}
    />
  )
}

if (__DEV__) {
  PopoverTransition.displayName = "PopoverTransition"
}
