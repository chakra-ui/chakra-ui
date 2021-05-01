import { cx, __DEV__ } from "@chakra-ui/utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Transition,
} from "framer-motion"
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

type VariantOption = {
  direction: string
  transition?: {
    enter?: Transition
    exit?: Transition
  }
}

const variants: SlideVariants = {
  exit: (props: VariantOption) => {
    const { motion } = directions[props.direction] ?? {}
    return {
      ...motion,
      transition: props.transition?.exit,
    }
  },
  enter: (props: VariantOption) => {
    const { motion } = directions[props.direction] ?? {}
    const [axis] = motion ? Object.keys(motion) : ["x"]
    return {
      [axis]: 0,
      transition: props.transition?.enter,
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
  /**
   * Framer-motion's transition config for `enter` and `exit` variants
   */
  transition?: VariantOption["transition"]
}

export interface SlideProps
  extends Omit<HTMLMotionProps<"div">, "transition">,
    SlideOptions {}

const defaultTransition: SlideOptions["transition"] = {
  exit: {
    duration: 0.15,
    ease: EASINGS.easeInOut,
  },
  enter: {
    type: "spring",
    damping: 25,
    stiffness: 180,
  },
}

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  (props, ref) => {
    const {
      direction = "right",
      style,
      unmountOnExit,
      in: isOpen,
      className,
      transition,
      ...rest
    } = props

    const { baseStyle } = directions[direction] ?? {}
    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    const custom: Pick<SlideOptions, "direction" | "transition"> = {
      direction,
      transition: { ...defaultTransition, ...transition },
    }

    return (
      <AnimatePresence custom={custom}>
        {shouldExpand && (
          <motion.div
            ref={ref}
            initial="exit"
            className={cx("chakra-slide", className)}
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            exit="exit"
            custom={custom}
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
