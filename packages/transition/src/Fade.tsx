import * as React from "react"
import { Transition, TransitionProps, TransitionStyles } from "./Transition"

export type FadeProps = Omit<TransitionProps, "styles" | "timeout"> & {
  timeout?: number
}

const styles: TransitionStyles = {
  init: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

export function Fade(props: FadeProps) {
  const { timeout = 250, ...rest } = props
  return (
    <Transition
      transition={`all ${timeout}ms cubic-bezier(0.175, 0.885, 0.320, 1.175)`}
      styles={styles}
      timeout={{ enter: 50, exit: timeout }}
      {...rest}
    />
  )
}

export default Fade
