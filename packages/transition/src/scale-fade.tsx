import { cx, mergeWith, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { EASINGS, MotionVariants } from "./__utils"

type ScaleFadeVariants = MotionVariants<"enter" | "exit">

const variants: ScaleFadeVariants = {
  exit: (props) => ({
    opacity: 0,
    ...(props.reverse
      ? { scale: props.initialScale }
      : { transitionEnd: { scale: props.initialScale } }),
    transition: {
      duration: 0.1,
      ease: EASINGS.easeOut,
    },
  }),
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: EASINGS.easeInOut,
    },
  },
}

export const scaleFadeConfig: HTMLMotionProps<"div"> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants,
}

export interface ScaleFadeProps extends HTMLMotionProps<"div"> {
  /**
   * The initial scale of the element
   */
  initialScale?: number
  /**
   * If `true`, the element will transition back to exit state
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

export const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
  function ScaleFade(props, ref) {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      initialScale = 0.95,
      className,
      ...rest
    } = props

    const show = unmountOnExit ? isOpen && unmountOnExit : true
    const custom = { initialScale, reverse }

    const motionProps = mergeWith(scaleFadeConfig, {
      custom,
      animate: isOpen || unmountOnExit ? "enter" : "exit",
    })

    return (
      <AnimatePresence custom={custom}>
        {show && (
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
  ScaleFade.displayName = "ScaleFade"
}
