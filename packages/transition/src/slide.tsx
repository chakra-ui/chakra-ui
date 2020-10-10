import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export type SlideDirection = keyof typeof directionEnum

const directionEnum = {
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

export const slideMotionVariants: MotionVariants<"enter" | "exit"> = {
  exit: (direction: string) => {
    const { motion } = directionEnum[direction] ?? {}
    return {
      ...motion,
      transition: {
        duration: 0.15,
        easings: "easeInOut",
      },
    }
  },
  enter: (direction: string) => {
    const { motion } = directionEnum[direction] ?? {}
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
  in?: boolean
}

interface SlideProps
  extends React.ComponentProps<typeof motion.div>,
    SlideOptions {}

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  function Slide(props, ref) {
    const {
      direction = "right",
      style,
      unmountOnExit,
      in: isOpen,
      className,
      ...rest
    } = props

    const { baseStyle } = directionEnum[direction] ?? {}
    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    return (
      <AnimatePresence custom={direction}>
        {shouldExpand && (
          <motion.div
            ref={ref}
            initial="exit"
            className={cx("chakra-slide", className)}
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            exit="exit"
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
  },
)

if (__DEV__) {
  Slide.displayName = "Slide"
}
