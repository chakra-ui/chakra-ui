import { cx } from "@chakra-ui/shared-utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Variants as _Variants,
} from "framer-motion"
import { forwardRef } from "react"
import {
  TRANSITION_DEFAULTS,
  Variants,
  withDelay,
  WithTransitionConfig,
} from "./transition-utils"

export interface FadeProps
  extends WithTransitionConfig<HTMLMotionProps<"div">> {
  /**
   * Should disable the animations
   * @default "false"
   */
  reduceMotion?: boolean
}

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

const reducedMotionVariants: Variants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
}

export const fadeConfig: HTMLMotionProps<"div"> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants as _Variants,
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref,
) {
  const {
    unmountOnExit,
    in: isOpen,
    className,
    transition,
    transitionEnd,
    delay,
    reduceMotion,
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
          variants={reduceMotion ? reducedMotionVariants : variants}
          animate={animate}
          {...rest}
        />
      )}
    </AnimatePresence>
  )
})

Fade.displayName = "Fade"
