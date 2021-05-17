import { cx, __DEV__ } from "@chakra-ui/utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Variants as _Variants,
} from "framer-motion"
import * as React from "react"
import {
  TransitionDefaults,
  Variants,
  withDelay,
  WithTransitionConfig,
} from "./transition-utils"

interface SlideFadeOptions {
  /**
   * The offset on the horizontal or `x` axis
   * @default 0
   */
  offsetX?: string | number
  /**
   * The offset on the vertical or `y` axis
   * @default 8
   */
  offsetY?: string | number
  /**
   * If `true`, the element will be transitioned back to the offset when it leaves.
   * Otherwise, it'll only fade out
   * @default true
   */
  reverse?: boolean
}

const variants: Variants<SlideFadeOptions> = {
  initial: ({ offsetX, offsetY, transition, transitionEnd, delay }) => ({
    opacity: 0,
    x: offsetX,
    y: offsetY,
    transition:
      transition?.exit ?? withDelay.exit(TransitionDefaults.exit, delay),
    transitionEnd: transitionEnd?.exit,
  }),
  enter: ({ transition, transitionEnd, delay }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition:
      transition?.enter ?? withDelay.enter(TransitionDefaults.enter, delay),
    transitionEnd: transitionEnd?.enter,
  }),
  exit: ({ offsetY, offsetX, transition, transitionEnd, reverse, delay }) => {
    const offset = { x: offsetX, y: offsetY }
    return {
      opacity: 0,
      transition:
        transition?.exit ?? withDelay.exit(TransitionDefaults.exit, delay),
      ...(reverse
        ? { ...offset, transitionEnd: transitionEnd?.exit }
        : { transitionEnd: { ...offset, ...transitionEnd?.exit } }),
    }
  },
}

export const slideFadeConfig: HTMLMotionProps<"div"> = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants: variants as _Variants,
}

export interface SlideFadeProps
  extends SlideFadeOptions,
    WithTransitionConfig<HTMLMotionProps<"div">> {}

export const SlideFade = React.forwardRef<HTMLDivElement, SlideFadeProps>(
  (props, ref) => {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      className,
      offsetX = 0,
      offsetY = 8,
      transition,
      transitionEnd,
      delay,
      ...rest
    } = props

    const show = unmountOnExit ? isOpen && unmountOnExit : true
    const animate = isOpen || unmountOnExit ? "enter" : "exit"

    const custom = {
      offsetX,
      offsetY,
      reverse,
      transition,
      transitionEnd,
      delay,
    }

    return (
      <AnimatePresence custom={custom}>
        {show && (
          <motion.div
            ref={ref}
            className={cx("chakra-offset-slide", className)}
            custom={custom}
            {...slideFadeConfig}
            animate={animate}
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
