import {
  Transition,
  TransitionProps,
  TransitionStyles,
  TransitionChildrenProps,
} from "@chakra-ui/transition"
import { focus, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useMenuContext } from "./use-menu"

export interface MenuTransitionProps {
  children: (transitionProps: TransitionChildrenProps) => React.ReactNode
  styles?: TransitionProps["styles"]
}

export const MenuTransition: React.FC<MenuTransitionProps> = (props) => {
  const { children, styles } = props
  const menu = useMenuContext()

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
      transitionDuration: "100ms",
      transform: "scale(0.8)",
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
        const menuEl = menu.buttonRef.current
        if (menuEl && document.activeElement !== menuEl) {
          focus(menuEl)
        }
      }}
      onExit={() => {
        ref.current!.hidden = false
      }}
      onExiting={() => {
        ref.current!.style.pointerEvents = "none"
      }}
      timeout={{ enter: 0, exit: menu.isOpen ? 200 : 100 }}
      in={menu.isOpen}
      styles={styles ?? defaultStyles}
      unmountOnExit={false}
      nodeRef={ref}
      children={children}
    />
  )
}

if (__DEV__) {
  MenuTransition.displayName = "MenuTransition"
}
