import React from "react"
import Transition, { TransitionProps } from "react-transition-group/Transition"
import { TransitionContext } from "./Transition.context"
import { Omit } from "@chakra-ui/utils"

interface SlideFadeProps extends Omit<TransitionProps, "timeout"> {
  timeout?: number
  initialOffset?: string
  children: React.ReactNode | ((styles: React.CSSProperties) => React.ReactNode)
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

export const SlideFade = ({
  in: inProp,
  initialOffset = "20px",
  timeout = 150,
  children,
  ...props
}: SlideFadeProps) => {
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
      {...props}
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
