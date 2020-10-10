import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export const ScaleFadeMotionVariants: MotionVariants<"enter" | "exit"> = {
  exit: (props: ScaleFadeOptions) => ({
    opacity: 0,
    ...(props.reverse
      ? { scale: props.initialScale }
      : { transitionEnd: { scale: props.initialScale } }),
    transition: {
      duration: 0.1,
      easings: "easeOut",
    },
  }),
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export interface ScaleFadeOptions {
  /**
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will slide in
   */
  in?: boolean
  /**
   * The offset on the horizontal or `x` axis
   */
  initialScale?: number
  reverse?: boolean
}

interface ScaleFadeProps
  extends React.ComponentProps<typeof motion.div>,
    ScaleFadeOptions {}

export const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
  function ScaleFade(props, ref) {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      className,
      initialScale = 0.95,
      ...rest
    } = props

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    return (
      <AnimatePresence custom={{ initialScale, reverse }}>
        {shouldExpand && (
          <motion.div
            ref={ref}
            initial="exit"
            className={cx("chakra-offset-slide", className)}
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            exit="exit"
            variants={ScaleFadeMotionVariants}
            custom={{ initialScale, reverse }}
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
