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

interface ScaleFadeOptions {
  /**
   * The initial scale of the element
   * @default 0.95
   */
  initialScale?: number
  /**
   * If `true`, the element will transition back to exit state
   * @default true
   */
  reverse?: boolean
}

const variants: Variants<ScaleFadeOptions> = {
  exit: ({ reverse, initialScale, transition, transitionEnd, delay }) => ({
    opacity: 0,
    ...(reverse
      ? { scale: initialScale, transitionEnd: transitionEnd?.exit }
      : { transitionEnd: { scale: initialScale, ...transitionEnd?.exit } }),
    transition:
      transition?.exit ?? withDelay.exit(TRANSITION_DEFAULTS.exit, delay),
  }),
  enter: ({ transitionEnd, transition, delay }) => ({
    opacity: 1,
    scale: 1,
    transition:
      transition?.enter ?? withDelay.enter(TRANSITION_DEFAULTS.enter, delay),
    transitionEnd: transitionEnd?.enter,
  }),
}

export const scaleFadeConfig: HTMLMotionProps<"div"> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants as _Variants,
}

export interface ScaleFadeProps
  extends ScaleFadeOptions,
    WithTransitionConfig<HTMLMotionProps<"div">> {}

export const ScaleFade = forwardRef<HTMLDivElement, ScaleFadeProps>(
  function ScaleFade(props, ref) {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      initialScale = 0.95,
      className,
      transition,
      transitionEnd,
      delay,
      ...rest
    } = props

    const show = unmountOnExit ? isOpen && unmountOnExit : true
    const animate = isOpen || unmountOnExit ? "enter" : "exit"

    const custom = { initialScale, reverse, transition, transitionEnd, delay }

    return (
      <AnimatePresence custom={custom}>
        {show && (
          <motion.div
            ref={ref}
            className={cx("chakra-offset-slide", className)}
            {...scaleFadeConfig}
            animate={animate}
            custom={custom}
            {...rest}
          />
        )}
      </AnimatePresence>
    )
  },
)

ScaleFade.displayName = "ScaleFade"
