import { forwardRef, PropsOf } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export type SlideDirection = keyof typeof offset

const offset = {
  bottom: {
    motion: { y: "100%" },
    baseStyle: {
      maxWidth: "100vw",
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  top: {
    motion: { y: "-100%" },
    baseStyle: {
      maxWidth: "100vw",
      top: 0,
      left: 0,
      right: 0,
    },
  },
  left: {
    motion: { x: "-100%" },
    baseStyle: {
      width: "100%",
      height: "100vh",
      left: 0,
      top: 0,
    },
  },
  right: {
    motion: { x: "100%" },
    baseStyle: {
      width: "100%",
      right: 0,
      top: 0,
      height: "100vh",
    },
  },
}

export const slideMotionVariants: MotionVariants<"show" | "hide"> = {
  hide: (direction: string) => {
    const { motion } = offset[direction] ?? {}
    return {
      ...motion,
      transition: {
        duration: 0.2,
        easings: "easeInOut",
      },
    }
  },
  show: (direction: string) => {
    const { motion } = offset[direction] ?? {}
    const [axis] = motion ? Object.keys(motion) : ["x"]
    return {
      [axis]: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 180,
      },
    }
  },
}

export interface SlideOptions {
  /**
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * The direction to slide from
   * @default "right"
   */
  direction?: SlideDirection
  /**
   * If `true`, the content will slide in
   */
  isOpen?: boolean
}

type SlideProps = PropsOf<typeof motion.div> & SlideOptions

export const Slide = forwardRef<SlideProps, "div">((props, ref) => {
  const {
    direction = "right",
    style,
    unmountOnExit,
    isOpen,
    className,
    ...rest
  } = props

  const { baseStyle } = offset[direction] ?? {}
  const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

  return (
    <AnimatePresence custom={direction}>
      {shouldExpand && (
        <motion.div
          ref={ref}
          initial="hide"
          className={cx("chakra-slide", className)}
          animate={isOpen || unmountOnExit ? "show" : "hide"}
          exit="hide"
          custom={direction}
          variants={slideMotionVariants}
          style={{
            position: "fixed",
            ...baseStyle,
            ...style,
          }}
          {...rest}
        />
      )}
    </AnimatePresence>
  )
})

if (__DEV__) {
  Slide.displayName = "Slide"
}
