import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { EASINGS, MotionVariants } from "./__utils"

export type SlideDirection = keyof typeof directions

const directions = {
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
      left: 0,
      top: 0,
      bottom: 0,
    },
  },
  right: {
    motion: { x: "100%" },
    baseStyle: {
      width: "100%",
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
}

type SlideVariants = MotionVariants<"enter" | "exit">

const variants: SlideVariants = {
  exit: (direction: string) => {
    const { motion } = directions[direction] ?? {}
    return {
      ...motion,
      transition: {
        duration: 0.15,
        ease: EASINGS.easeInOut,
      },
    }
  },
  enter: (direction: string) => {
    const { motion } = directions[direction] ?? {}
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
   * If `true`, the element will unmount when `in={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * The direction to slide from
   * @default "right"
   */
  direction?: SlideDirection
  /**
   * Show the component; triggers the enter or exit states
   */
  in?: boolean
}

export interface SlideProps extends HTMLMotionProps<"div">, SlideOptions {}

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  (props, ref) => {
    const {
      direction = "right",
      style,
      unmountOnExit,
      in: isOpen,
      className,
      ...rest
    } = props

    const { baseStyle } = directions[direction] ?? {}
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
            variants={variants}
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
