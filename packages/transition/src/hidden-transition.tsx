import * as React from "react"
import CSSTransition, {
  CSSTransitionProps,
} from "react-transition-group/CSSTransition"
import { Omit, __DEV__ } from "@chakra-ui/utils"

export type HiddenCSSTransitionProps = Omit<CSSTransitionProps, "nodeRef"> & {
  nodeRef: React.RefObject<HTMLElement>
  children: React.ReactNode
}

export function HiddenCSSTransition(props: HiddenCSSTransitionProps) {
  const {
    nodeRef,
    children,
    onEnter,
    onExited,
    onExit,
    onExiting,
    ...rest
  } = props

  return (
    <CSSTransition
      {...rest}
      addEndListener={(done: any) => {
        nodeRef.current?.addEventListener("transitionend", done, false)
      }}
      onEnter={() => {
        if (nodeRef.current) {
          nodeRef.current.hidden = false
        }
        onEnter?.()
      }}
      onExited={() => {
        if (nodeRef.current) {
          nodeRef.current.hidden = true
          nodeRef.current.style.pointerEvents = "auto"
        }
        onExited?.()
      }}
      onExit={() => {
        if (nodeRef.current) {
          nodeRef.current.hidden = false
        }
        onExit?.()
      }}
      onExiting={() => {
        if (nodeRef.current) {
          nodeRef.current.style.pointerEvents = "none"
        }
        onExiting?.()
      }}
    >
      {children}
    </CSSTransition>
  )
}

if (__DEV__) {
  HiddenCSSTransition.displayName = "HiddenCSSTransition"
}
