import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Transition, TransitionProps, TransitionStyles } from "./transition"

export type FadeProps = Omit<TransitionProps, "styles" | "timeout"> & {
  timeout?: number
}

const styles: TransitionStyles = {
  init: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

export const Fade: React.FC<FadeProps> = (props) => {
  const { timeout = 150, ...rest } = props
  return (
    <Transition
      transition={`all ${timeout}ms cubic-bezier(0.175, 0.885, 0.320, 1.175)`}
      styles={styles}
      timeout={{ enter: 0, exit: timeout }}
      {...rest}
    />
  )
}

if (__DEV__) {
  Fade.displayName = "Fade"
}
