import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { Transition, TransitionProps } from "./transition"

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

export const ScaleFade: React.FC<ScaleFadeProps> = (props) => {
  const { initialScale = 0.9, timeout = 150, ...rest } = props
  const styles = getTransitionStyles(initialScale)

  return (
    <Transition
      styles={styles}
      transition={`all ${timeout}ms cubic-bezier(0.45, 0, 0.40, 1)`}
      timeout={{ enter: 0, exit: timeout }}
      unmountOnExit
      {...rest}
    />
  )
}

if (__DEV__) {
  ScaleFade.displayName = "ScaleFade"
}
