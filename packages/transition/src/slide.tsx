import * as React from "react"
import { __DEV__ } from "@chakra-ui/utils"
import { Transition, TransitionProps } from "./transition"
import { motion, Variants } from "framer-motion"

export type SlideDirection = "left" | "right" | "bottom" | "top"

const offset = {
  bottom: { y: "100%" },
  top: { y: "-100%" },
  left: { x: "-100%" },
  right: { x: "100%" },
}

export const slideVariants: Variants = {
  hide: (props) => {
    const directionProps = offset[props.direction]
    return {
      ...directionProps,
      transition: {
        duration: 0.2,
        easings: "linear",
      },
    }
  },
  show: (props) => {
    const directionProps = offset[props.direction]
    const [dir] = Object.keys(directionProps)
    return {
      [dir]: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 180,
      },
    }
  },
}

type Placement = "left" | "right" | "bottom" | "top"

function createBaseStyle(placement: Placement) {
  switch (placement) {
    case "bottom": {
      return {
        maxWidth: "100vw",
        bottom: 0,
        left: 0,
        right: 0,
      }
    }
    case "top": {
      return {
        maxWidth: "100vw",
        top: 0,
        left: 0,
        right: 0,
      }
    }
    case "left": {
      return {
        width: "100%",
        height: "100vh",
        left: 0,
        top: 0,
      }
    }
    case "right": {
      return {
        width: "100%",
        right: 0,
        top: 0,
        height: "100vh",
      }
    }
    default:
      break
  }
}

export const Slide = (props) => {
  return <motion.div />
}

Slide.displayName = "Slide"
