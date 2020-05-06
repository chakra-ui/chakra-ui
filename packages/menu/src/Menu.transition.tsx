import {
  Transition,
  TransitionProps,
  TransitionStyles,
} from "@chakra-ui/transition"
import { ensureFocus } from "@chakra-ui/utils"
import * as React from "react"
import { useMenuContext } from "./Menu"

export interface MenuTransitionProps {
  transformOrigin?: string
  children: TransitionProps["children"]
  styles?: TransitionProps["styles"]
}

export const MenuTransition = (props: MenuTransitionProps) => {
  const { transformOrigin = "top left", children, styles } = props
  const menu = useMenuContext()

  const defaultStyles: TransitionStyles = {
    init: {
      opacity: 0,
      transformOrigin: transformOrigin,
      transform: "scale(0.8)",
      transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.320, 1.175)",
      transitionProperty: "opacity, transform",
      transitionDuration: "200ms",
      willChange: "opacity, transform",
    },
    entered: {
      opacity: 1,
      transform: "scale(1)",
    },
    exiting: {
      opacity: 0,
      transform: "scale(0.8)",
    },
  }

  return (
    <Transition
      onEnter={node => {
        node.hidden = false
      }}
      onExited={node => {
        node.hidden = true
        node.style.pointerEvents = null
        if (menu.buttonRef.current) {
          ensureFocus(menu.buttonRef.current)
        }
      }}
      onExit={node => {
        node.hidden = false
      }}
      onExiting={node => {
        node.style.pointerEvents = "none"
      }}
      timeout={{ enter: 0, exit: 200 }}
      in={menu.isOpen}
      styles={styles || defaultStyles}
      unmountOnExit={false}
      children={children}
    />
  )
}
