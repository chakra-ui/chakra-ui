import { cx, mergeWith, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { EASINGS, MotionVariants } from "./__utils"

type SlideFadeVariant = MotionVariants<"initial" | "enter" | "exit">

const transitions = {
  enter: {
    duration: 0.2,
    ease: EASINGS.easeOut,
  },
  exit: {
    duration: 0.1,
    ease: EASINGS.easeIn,
  },
}

const variants: SlideFadeVariant = {
  initial: (props) => ({
    opacity: 0,
    x: props.offsetX,
    y: props.offsetY,
    transition: transitions.exit,
  }),
  exit: (props) => ({
    opacity: 0,
    transition: transitions.exit,
    ...(props.reverse && {
      x: props.offsetX,
      y: props.offsetY,
    }),
    ...(!props.reverse && {
      transitionEnd: {
        x: props.offsetX,
        y: props.offsetY,
      },
    }),
  }),
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: transitions.enter,
  },
}

export const slideFadeConfig: HTMLMotionProps<"div"> = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants,
}

export interface SlideFadeProps extends HTMLMotionProps<"div"> {
  /**
   * The offset on the horizontal or `x` axis
   */
  offsetX?: number
  /**
   * The offset on the vertical or `y` axis
   */
  offsetY?: number
  /**
   * If `true`, the element will be transitioned back to the offset when it leaves.
   * Otherwise, it'll only fade out
   */
  reverse?: boolean
  /**
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will slide in
   */
  in?: boolean
}

export const SlideFade = React.forwardRef<HTMLDivElement, SlideFadeProps>(
  function SlideFade(props, ref) {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      className,
      offsetX = 0,
      offsetY = 8,
      ...rest
    } = props

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    const custom = { offsetX, offsetY, reverse }
    const motionProps = mergeWith(slideFadeConfig, {
      custom,
      animate: isOpen || unmountOnExit ? "enter" : "exit",
    })

    return (
      <AnimatePresence custom={custom}>
        {shouldExpand && (
          <motion.div
            ref={ref}
            className={cx("chakra-offset-slide", className)}
            {...motionProps}
            {...rest}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  SlideFade.displayName = "SlideFade"
}
