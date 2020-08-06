import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { Transition, TransitionProps } from "./transition"

export interface SlideFadeProps
  extends Omit<TransitionProps, "styles" | "timeout"> {
  /**
   * The initial offset to slide from
   */
  initialOffset?: string
  /**
   * The transition timeout
   */
  timeout?: number
}

function getTransitionStyles(initialOffset: string) {
  return {
    init: {
      opacity: 0,
      transform: `translateY(${initialOffset})`,
    },
    entered: {
      opacity: 1,
      transform: `translateY(0px)`,
    },
    exiting: {
      opacity: 0,
      transform: `translateY(${initialOffset})`,
    },
  }
}

export const SlideFade: React.FC<SlideFadeProps> = (props) => {
  const { initialOffset = "20px", timeout = 150, ...rest } = props

  const styles = getTransitionStyles(initialOffset)

  return (
    <Transition
      styles={styles}
      transition={`all ${timeout}ms cubic-bezier(0.4, 0.14, 0.3, 1)`}
      timeout={{ enter: 0, exit: timeout }}
      {...rest}
    />
  )
}

if (__DEV__) {
  SlideFade.displayName = "SlideFade"
}
