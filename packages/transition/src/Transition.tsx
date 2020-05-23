import * as React from "react"
import CSSTransition, {
  EndHandler,
  EnterHandler,
  TransitionStatus,
  ExitHandler,
  TransitionProps as TProps,
} from "react-transition-group/Transition"

export interface TransitionProps {
  in?: boolean
  addEndListener?: EndHandler
  onEnter?: EnterHandler
  onEntering?: EnterHandler
  onEntered?: EnterHandler
  onExit?: ExitHandler
  onExiting?: ExitHandler
  onExited?: ExitHandler
  unmountOnExit?: boolean
  timeout?: TProps["timeout"]
  transition?: string
  children: (styles: React.CSSProperties) => React.ReactNode
  styles: TransitionStyles
}

export type TransitionStyleState = "init" | "entered" | "exiting"

export type TransitionStyles = {
  [K in TransitionStyleState]?: React.CSSProperties
}

export { TransitionStatus }

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
    <CSSTransition appear unmountOnExit in={inProp} timeout={timeout} {...rest}>
      {(state) => children(getStyle(state))}
    </CSSTransition>
  )
}
