import React from "react"
import Transition from "react-transition-group/Transition"
import { TransitionContext, TransitionProps } from "./Transition.utils"

interface SlideFadeProps extends TransitionProps {
  initialOffset?: string
}

function getTransitionStyles(initialOffset: string) {
  return {
    init: {
      opacity: 0,
      transform: `translateY(${initialOffset})`,
    },
    entered: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    exiting: {
      opacity: 0,
      transform: `translateY(${initialOffset})`,
    },
  }
}

export const SlideFade = (props: SlideFadeProps) => {
  const {
    in: inProp,
    initialOffset = "20px",
    timeout = 150,
    children,
    ...rest
  } = props

  const transitionStyles = getTransitionStyles(initialOffset)

  const rootStyle = {
    transition: `all ${timeout}ms cubic-bezier(0.4, 0.14, 0.3, 1)`,
  }

  type TransitionState = keyof typeof transitionStyles

  const computeStyle = (state: TransitionState) => ({
    ...rootStyle,
    ...transitionStyles.init,
    ...transitionStyles[state],
  })

  return (
    <Transition
      appear
      in={inProp}
      timeout={{ enter: 50, exit: timeout }}
      unmountOnExit
      {...rest}
    >
      {(state: TransitionState) => (
        <TransitionContext.Provider value={computeStyle(state)}>
          {typeof children === "function"
            ? children(computeStyle(state))
            : children}
        </TransitionContext.Provider>
      )}
    </Transition>
  )
}

export default SlideFade
