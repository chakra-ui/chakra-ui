import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import CSSTransition, {
  CSSTransitionProps,
} from "react-transition-group/CSSTransition"

type Picked =
  | "onEnter"
  | "onEntered"
  | "timeout"
  | "onExited"
  | "onExit"
  | "classNames"
  | "onExiting"
  | "in"
  | "unmountOnExit"
  | "mountOnEnter"

export type HiddenTransitionProps = Pick<
  CSSTransitionProps<HTMLElement>,
  Picked
> & {
  nodeRef: React.RefObject<HTMLElement>
  children: React.ReactNode
  appear?: boolean
}

export const HiddenTransition: React.FC<HiddenTransitionProps> = (props) => {
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
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener("transitionend", done, false)
      }}
      onEnter={(isAppearing) => {
        if (nodeRef.current) {
          nodeRef.current.hidden = false
        }
        onEnter?.(isAppearing)
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
  HiddenTransition.displayName = "HiddenTransition"
}
