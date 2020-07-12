import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { Transition, TransitionProps, TransitionStyles } from "./transition"
import { MotionConfig } from "./motion-config"

export const fadeConfig: MotionConfig = {
  timeout: 500,
  enter: {
    transition: {
      easing: "ease-in-out",
      duration: "500ms",
      property: "opacity",
    },
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  exit: {
    transition: {
      easing: "ease-in-out",
      duration: "500ms",
      property: "opacity",
    },
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
}

export type FadeProps = Omit<TransitionProps, "styles" | "timeout"> & {
  timeout?: number
}

const styles: TransitionStyles = {
  init: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
}

export function Fade(props: FadeProps) {
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
