import { cx, __DEV__ } from "@chakra-ui/utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionStyle,
  Variants as TVariants,
} from "framer-motion"
import * as React from "react"
import {
  SlideDirection,
  slideTransition,
  TransitionEasings,
  Variants,
  withDelay,
  WithTransitionConfig,
} from "./transition-utils"

export type { SlideDirection }

const defaultTransition = {
  exit: {
    duration: 0.15,
    ease: TransitionEasings.easeInOut,
  },
  enter: {
    type: "spring",
    damping: 25,
    stiffness: 180,
  },
}

const variants: Variants<SlideOptions> = {
  exit: ({ direction, transition, transitionEnd, delay }) => {
    const { exit: exitStyles } = slideTransition({ direction })
    return {
      ...exitStyles,
      transition:
        transition?.exit ?? withDelay.exit(defaultTransition.exit, delay),
      transitionEnd: transitionEnd?.exit,
    }
  },
  enter: ({ direction, transitionEnd, transition, delay }) => {
    const { enter: enterStyles } = slideTransition({ direction })
    return {
      ...enterStyles,
      transition:
        transition?.enter ?? withDelay.enter(defaultTransition.enter, delay),
      transitionEnd: transitionEnd?.enter,
    }
  },
}

export interface SlideOptions {
  /**
   * The direction to slide from
   * @default "right"
   */
  direction?: SlideDirection
}

export interface SlideProps
  extends WithTransitionConfig<HTMLMotionProps<"div">>,
    SlideOptions {}

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  (props, ref) => {
    const {
      direction = "right",
      style,
      unmountOnExit,
      in: isOpen,
      className,
      transition,
      transitionEnd,
      delay,
      ...rest
    } = props

    const transitionStyles = slideTransition({ direction })
    const computedStyle: MotionStyle = Object.assign(
      { position: "fixed" },
      transitionStyles.position,
      style,
    )

    const show = unmountOnExit ? isOpen && unmountOnExit : true
    const animate = isOpen || unmountOnExit ? "enter" : "exit"

    const custom = { transitionEnd, transition, direction, delay }

    return (
      <AnimatePresence custom={custom}>
        {show && (
          <motion.div
            {...rest}
            ref={ref}
            initial="exit"
            className={cx("chakra-slide", className)}
            animate={animate}
            exit="exit"
            custom={custom}
            variants={variants as TVariants}
            style={computedStyle}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  Slide.displayName = "Slide"
}
