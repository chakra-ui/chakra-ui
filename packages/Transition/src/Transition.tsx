import * as React from "react"
import CSSTransition, {
  TransitionStatus,
  EndHandler,
  EnterHandler,
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

export type TransitionStyles = {
  [K in TransitionStatus]?: React.CSSProperties
} & { init?: React.CSSProperties }

export { TransitionStatus }

export function Transition(props: TransitionProps) {
  const {
    styles,
    in: inProp,
    timeout = 200,
    transition = `all ${timeout}ms ease-in-out`,
    children,
    ...rest
  } = props

  const computedStyle = (state: TransitionStatus) => ({
    ...styles.init,
    transition,
    ...styles[state],
  })

  return (
    <CSSTransition appear unmountOnExit in={inProp} timeout={timeout} {...rest}>
      {state => children(computedStyle(state))}
    </CSSTransition>
  )
}
