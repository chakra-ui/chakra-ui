import * as React from "react"
import Transition from "react-transition-group/Transition"
import { TransitionContext, TransitionProps } from "./Transition.utils"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FadeProps extends TransitionProps {}

const transitionStyles = {
  init: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

type TransitionState = keyof typeof transitionStyles

export function Fade(props: FadeProps) {
  const { children, in: inProp, timeout = 250, ...rest } = props
  const computeStyle = (state: TransitionState) => ({
    ...transitionStyles.init,
    transition: `all ${timeout}ms cubic-bezier(0.175, 0.885, 0.320, 1.175)`,
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

export default Fade
