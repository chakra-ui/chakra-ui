import { cx } from "@chakra-ui/utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  Variants as _Variants,
  motion,
} from "framer-motion"
import { forwardRef } from "react"
import {
  TRANSITION_DEFAULTS,
  Variants,
  WithTransitionConfig,
  withDelay,
} from "./transition-utils"

export interface FadeProps
  extends WithTransitionConfig<HTMLMotionProps<"div">> {}

const variants: Variants = {
  enter: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 1,
    transition:
      transition?.enter ?? withDelay.enter(TRANSITION_DEFAULTS.enter, delay),
    transitionEnd: transitionEnd?.enter,
  }),
  exit: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 0,
    transition:
      transition?.exit ?? withDelay.exit(TRANSITION_DEFAULTS.exit, delay),
    transitionEnd: transitionEnd?.exit,
  }),
}

export const fadeConfig: HTMLMotionProps<"div"> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants as _Variants,
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
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

Fade.displayName = "Fade"
