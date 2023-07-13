import { chakra, ChakraProps } from "@chakra-ui/system"
import { scaleFadeConfig, slideFadeConfig } from "@chakra-ui/transition"
import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"

export interface ModalTransitionProps
  extends Omit<HTMLMotionProps<"section">, "color" | "transition">,
    ChakraProps {
  preset?: "slideInBottom" | "slideInRight" | "scale" | "none"
  motionProps?: HTMLMotionProps<"section">
}

const transitions = {
  slideInBottom: {
    ...slideFadeConfig,
    custom: { offsetY: 16, reverse: true },
  },
  slideInRight: {
    ...slideFadeConfig,
    custom: { offsetX: 16, reverse: true },
  },
  scale: {
    ...scaleFadeConfig,
    custom: { initialScale: 0.95, reverse: true },
  },
  none: {},
}

const MotionSection = chakra(motion.section)

const getMotionProps = (preset: ModalTransitionProps["preset"]) => {
  return transitions[preset || "none"]
}

export const ModalTransition = forwardRef(
  (props: ModalTransitionProps, ref: React.Ref<any>) => {
    const { preset, motionProps = getMotionProps(preset), ...rest } = props
    return (
      <MotionSection ref={ref} {...(motionProps as ChakraProps)} {...rest} />
    )
  },
)

ModalTransition.displayName = "ModalTransition"
