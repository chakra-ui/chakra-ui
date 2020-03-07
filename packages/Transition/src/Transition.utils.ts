import * as React from "react"
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
} from "react-transition-group/Transition"

export const TransitionContext = React.createContext<React.CSSProperties>({})

export const useTransitionStyle = () => React.useContext(TransitionContext)

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
  timeout?: number
  children: React.ReactNode | ((styles: React.CSSProperties) => React.ReactNode)
}
