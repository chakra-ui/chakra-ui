import { chakra } from "@chakra-ui/system"
import { scaleFadeConfig, slideFadeConfig } from "@chakra-ui/transition"
import { HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"

export interface ModalTransitionProps extends HTMLMotionProps<any> {
  preset: "slideInBottom" | "slideInRight" | "scale"
}

const transitions = {
  slideInBottom: {
    ...slideFadeConfig,
    custom: { offsetY: 8, reverse: true },
  },
  slideInRight: {
    ...slideFadeConfig,
    custom: { offsetX: 8, reverse: true },
  },
  scale: {
    ...scaleFadeConfig,
    custom: { initialScale: 0.95, reverse: true },
  },
}

const Motion = chakra(motion.section)

export const ModalTransition = React.forwardRef(
  (props: ModalTransitionProps, ref: React.Ref<any>) => {
    const { preset, ...rest } = props
    const motionProps = transitions[preset]
    return <Motion ref={ref} {...motionProps} {...(rest as any)} />
  },
)
