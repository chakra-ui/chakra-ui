import React from "react"
import { Transition, TransitionProps } from "./Transition"

function getTransitionStyles(initialScale: number) {
  return {
    init: {
      opacity: 0,
      transform: `scale(${initialScale})`,
    },
    entered: {
      opacity: 1,
      transform: `scale(1)`,
    },
    exiting: {
      opacity: 0,
      transform: `scale(${initialScale})`,
    },
  }
}

export type ScaleFadeProps = Omit<TransitionProps, "styles" | "timeout"> & {
  /** The initial scale to animate from */
  initialScale?: number
  /** The transition timeout */
  timeout?: number
}

export const ScaleFade = (props: ScaleFadeProps) => {
  const { initialScale = 0.9, timeout = 300, ...rest } = props
  const styles = getTransitionStyles(initialScale)

  return (
    <Transition
      styles={styles}
      transition={`all ${timeout}ms cubic-bezier(0.45, 0, 0.40, 1)`}
      timeout={{ enter: 50, exit: timeout }}
      unmountOnExit
      {...rest}
    />
  )
}
