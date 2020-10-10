import { forwardRef, PropsOf } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export const slideFadeMotionVariants: MotionVariants<
  "initial" | "enter" | "exit"
> = {
  initial: (props: SlideFadeOptions) => ({
    opacity: 0,
    x: props.offsetX,
    y: props.offsetY,
  }),
  exit: (props: SlideFadeOptions) => ({
    opacity: 0,
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
  },
}

export interface SlideFadeOptions {
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
}

interface SlideFadeProps extends PropsOf<typeof motion.div>, SlideFadeOptions {}

export const SlideFade = forwardRef<SlideFadeProps, "div">((props, ref) => {
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

  return (
    <AnimatePresence custom={{ offsetX, offsetY, reverse }}>
      {shouldExpand && (
        <motion.div
          ref={ref}
          initial="initial"
          className={cx("chakra-offset-slide", className)}
          transition={{
            duration: 0.15,
            ease: [0, 0, 0.4, 1],
          }}
          animate={isOpen || unmountOnExit ? "enter" : "exit"}
          exit="exit"
          variants={slideFadeMotionVariants}
          custom={{ offsetX, offsetY, reverse }}
          {...rest}
        />
      )}
    </AnimatePresence>
  )
})

if (__DEV__) {
  SlideFade.displayName = "SlideFade"
}
