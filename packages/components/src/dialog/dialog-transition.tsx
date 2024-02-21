import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"
import { ChakraProps, chakra } from "../system"
import { scaleFadeConfig, slideFadeConfig } from "../transition"
import { DialogMotionPreset } from "./dialog-types"

export interface DialogTransitionProps
  extends Omit<HTMLMotionProps<"section">, "color" | "transition">,
    ChakraProps {
  preset?: DialogMotionPreset
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
  slideInTop: {
    ...slideFadeConfig,
    custom: { offsetY: -16, reverse: true },
  },
  slideInLeft: {
    ...slideFadeConfig,
    custom: { offsetX: -16, reverse: true },
  },
  scale: {
    ...scaleFadeConfig,
    custom: { initialScale: 0.95, reverse: true },
  },
  none: {},
}

const MotionSection = chakra(motion.section)

const getMotionProps = (preset: DialogTransitionProps["preset"]) => {
  return transitions[preset || "none"]
}

export const DialogTransition = forwardRef(
  (props: DialogTransitionProps, ref: React.Ref<any>) => {
    const { preset, motionProps = getMotionProps(preset), ...rest } = props
    return (
      <MotionSection ref={ref} {...(motionProps as ChakraProps)} {...rest} />
    )
  },
)

DialogTransition.displayName = "DialogTransition"
