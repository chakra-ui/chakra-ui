import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import ReactTransition from "react-transition-group/Transition"
import type {
  TransitionProps as ReactTransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition"

export type BaseProps = Pick<
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

export interface TransitionProps extends BaseProps {
  transition?: string
  children: (styles: React.CSSProperties) => React.ReactNode
  styles: TransitionStyles
}

export type TransitionStyleState = "init" | "entered" | "exiting"

export type TransitionStyles = {
  [K in TransitionStyleState]?: React.CSSProperties
}

export type { TransitionStatus }

export function Transition(props: TransitionProps) {
  const {
    styles,
    in: inProp,
    timeout = 150,
    transition = `all ${timeout}ms ease-in-out`,
    children,
    ...rest
  } = props

  const getStyle = (state: TransitionStatus) => ({
    ...styles.init,
    transition,
    ...(styles as any)[state],
  })

  return (
    <ReactTransition
      appear
      unmountOnExit
      in={inProp}
      timeout={timeout}
      {...(rest as any)}
    >
      {(state) => children(getStyle(state))}
    </ReactTransition>
  )
}

if (__DEV__) {
  Transition.displayName = "Transition"
}
