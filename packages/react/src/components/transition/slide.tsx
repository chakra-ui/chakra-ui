import { cx } from "@chakra-ui/utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  MotionStyle,
  Variants as TVariants,
  motion,
} from "framer-motion"
import { forwardRef } from "react"
import {
  SlideDirection,
  TRANSITION_EASINGS,
  Variants,
  WithTransitionConfig,
  getSlideTransition,
  withDelay,
} from "./transition-utils"

export type { SlideDirection }

const defaultTransition = {
  exit: {
    duration: 0.15,
    ease: TRANSITION_EASINGS.easeInOut,
  },
  enter: {
    type: "spring",
    damping: 25,
    stiffness: 180,
  },
}

const variants: Variants<SlideOptions> = {
  exit: ({ direction, transition, transitionEnd, delay }) => {
    const { exit: exitStyles } = getSlideTransition({ direction })
    return {
      ...exitStyles,
      transition:
        transition?.exit ?? withDelay.exit(defaultTransition.exit, delay),
      transitionEnd: transitionEnd?.exit,
    }
  },
  enter: ({ direction, transitionEnd, transition, delay }) => {
    const { enter: enterStyles } = getSlideTransition({ direction })
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
    SlideOptions {
  motionProps?: HTMLMotionProps<"div">
}

export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  function Slide(props, ref) {
    const {
      direction = "right",
      style,
      unmountOnExit,
      in: isOpen,
      className,
      transition,
      transitionEnd,
      delay,
      motionProps,
      ...rest
    } = props

    const transitionStyles = getSlideTransition({ direction })
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
            {...motionProps}
          />
        )}
      </AnimatePresence>
    )
  },
)

Slide.displayName = "Slide"
