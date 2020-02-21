import * as React from "react"

export const TransitionContext = React.createContext<React.CSSProperties>({})
export const useTransitionStyle = () => React.useContext(TransitionContext)
