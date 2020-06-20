import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import CSSTransition from "react-transition-group/Transition"
import type {
  TransitionProps as TProps,
  TransitionStatus,
} from "react-transition-group/Transition"

export type BaseProps = Pick<
  TProps,
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
    //@ts-ignore
    ...styles[state],
  })

  return (
    <CSSTransition
      appear
      unmountOnExit
      in={inProp}
      timeout={timeout}
      {...(rest as any)}
    >
      {(state) => children(getStyle(state))}
    </CSSTransition>
  )
}

if (__DEV__) {
  Transition.displayName = "Transition"
}
