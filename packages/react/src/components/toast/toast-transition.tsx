"use client"

import { HTMLMotionProps, Variants, motion } from "framer-motion"
import { forwardRef } from "react"
import { useToastContext } from "./toast-context"

const variants: Variants = {
  initial(props) {
    const { placement } = props

    const dir = ["top", "bottom"].includes(placement) ? "y" : "x"

    let factor = ["top-end", "bottom-end"].includes(placement) ? 1 : -1
    if (placement === "bottom") factor = 1

    return {
      opacity: 0,
      [dir]: factor * 24,
    }
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export const ToastTransition = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(function ToastTransition(props, ref) {
  const api = useToastContext()
  return (
    <motion.div
      ref={ref}
      layout
      className="chakra-toast__transition"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={{ placement: api.placement }}
      {...props}
    />
  )
})
