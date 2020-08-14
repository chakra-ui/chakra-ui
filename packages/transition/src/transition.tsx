import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import ReactTransition from "react-transition-group/Transition"
import type {
  TransitionProps as ReactTransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition"

type RTGProps = Pick<
  ReactTransitionProps,
  | "in"
  | "onEnter"
  | "onEntering"
  | "onEntered"
  | "onExit"
  | "onExiting"
  | "onExited"
  | "unmountOnExit"
  | "timeout"
>

export type TransitionChildrenProps = {
  ref: React.RefObject<any>
  style: React.CSSProperties
}

export interface TransitionProps extends RTGProps {
  transition?: string
  children: (
    transitionChildrenProps: TransitionChildrenProps,
  ) => React.ReactNode
  styles: TransitionStyles
  nodeRef?: React.RefObject<any>
}

export type TransitionStyleState = "init" | "entered" | "exiting"

export type TransitionStyles = {
  [K in TransitionStyleState]?: React.CSSProperties
}

export type { TransitionStatus }

export const Transition: React.FC<TransitionProps> = (props) => {
  const {
    styles,
    in: inProp,
    timeout = 150,
    transition = `all ${timeout}ms ease-in-out`,
    children,
    nodeRef,
    ...rest
  } = props

  const getStyle = (state: TransitionStatus) => ({
    ...styles.init,
    transition,
    ...(styles as any)[state],
  })

  const internalNodeRef = React.useRef<any>()

  return (
    <ReactTransition
      appear
      unmountOnExit
      in={inProp}
      timeout={timeout}
      nodeRef={nodeRef || internalNodeRef}
      {...(rest as any)}
    >
      {(state: TransitionStatus) =>
        children({
          style: getStyle(state),
          ref: nodeRef || internalNodeRef,
        })
      }
    </ReactTransition>
  )
}

if (__DEV__) {
  Transition.displayName = "Transition"
}
