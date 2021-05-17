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

export interface FadeProps
  extends WithTransitionConfig<HTMLMotionProps<"div">> {}

const variants: Variants = {
  enter: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 1,
    transition:
      transition?.enter ?? withDelay.enter(TransitionDefaults.enter, delay),
    transitionEnd: transitionEnd?.enter,
  }),
  exit: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 0,
    transition:
      transition?.exit ?? withDelay.exit(TransitionDefaults.exit, delay),
    transitionEnd: transitionEnd?.exit,
  }),
}

export const fadeConfig: HTMLMotionProps<"div"> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants as _Variants,
}

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  (props, ref) => {
    const {
      unmountOnExit,
      in: isOpen,
      className,
      transition,
      transitionEnd,
      delay,
      ...rest
    } = props

    const animate = isOpen || unmountOnExit ? "enter" : "exit"
    const show = unmountOnExit ? isOpen && unmountOnExit : true

    const custom = { transition, transitionEnd, delay }

    return (
      <AnimatePresence custom={custom}>
        {show && (
          <motion.div
            ref={ref}
            className={cx("chakra-fade", className)}
            custom={custom}
            {...fadeConfig}
            animate={animate}
            {...rest}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  Fade.displayName = "Fade"
}
