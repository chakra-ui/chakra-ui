import { cx, mergeWith, warn, __DEV__ } from "@chakra-ui/utils"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Variants as _Variants,
} from "framer-motion"
import * as React from "react"
import {
  TransitionEasings,
  Variants,
  withDelay,
  WithTransitionConfig,
} from "./transition-utils"

const isNumeric = (value?: string | number) =>
  value != null && parseInt(value.toString(), 10) > 0

export interface CollapseOptions {
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight?: number | string
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight?: number | string
}

const defaultTransitions = {
  exit: {
    height: { duration: 0.2, ease: TransitionEasings.ease },
    opacity: { duration: 0.3, ease: TransitionEasings.ease },
  },
  enter: {
    height: { duration: 0.3, ease: TransitionEasings.ease },
    opacity: { duration: 0.4, ease: TransitionEasings.ease },
  },
}

const variants: Variants<CollapseOptions> = {
  exit: ({
    animateOpacity,
    startingHeight,
    transition,
    transitionEnd,
    delay,
  }) => ({
    ...(animateOpacity && { opacity: isNumeric(startingHeight) ? 1 : 0 }),
    height: startingHeight,
    transitionEnd: transitionEnd?.exit,
    transition:
      transition?.exit ?? withDelay.exit(defaultTransitions.exit, delay),
  }),
  enter: ({
    animateOpacity,
    endingHeight,
    transition,
    transitionEnd,
    delay,
  }) => ({
    ...(animateOpacity && { opacity: 1 }),
    height: endingHeight,
    transitionEnd: transitionEnd?.enter,
    transition:
      transition?.enter ?? withDelay.enter(defaultTransitions.enter, delay),
  }),
}

export type ICollapse = CollapseProps

export interface CollapseProps
  extends WithTransitionConfig<HTMLMotionProps<"div">>,
    CollapseOptions {}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  (props, ref) => {
    const {
      in: isOpen,
      unmountOnExit,
      animateOpacity = true,
      startingHeight = 0,
      endingHeight = "auto",
      style,
      className,
      transition,
      transitionEnd,
      ...rest
    } = props

    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        setMounted(true)
      })
      return () => clearTimeout(timeout)
    }, [])

    /**
     * Warn 🚨: `startingHeight` and `unmountOnExit` are mutually exclusive
     *
     * If you specify a starting height, the collapsed needs to be mounted
     * for the height to take effect.
     */
    warn({
      condition: Boolean(startingHeight > 0 && unmountOnExit),
      message: `startingHeight and unmountOnExit are mutually exclusive. You can't use them together`,
    })

    const hasStartingHeight = parseFloat(startingHeight.toString()) > 0

    const custom = {
      startingHeight,
      endingHeight,
      animateOpacity,
      transition: !mounted ? { enter: { duration: 0 } } : transition,
      transitionEnd: mergeWith(transitionEnd, {
        exit: unmountOnExit
          ? undefined
          : {
              display: hasStartingHeight ? "block" : "none",
            },
      }),
    }

    const show = unmountOnExit ? isOpen : true
    const animate = isOpen || unmountOnExit ? "enter" : "exit"

    return (
      <AnimatePresence initial={false} custom={custom}>
        {show && (
          <motion.div
            ref={ref}
            {...rest}
            className={cx("chakra-collapse", className)}
            style={{
              overflow: "hidden",
              display: "block",
              ...style,
            }}
            custom={custom}
            variants={variants as _Variants}
            initial={unmountOnExit ? "exit" : false}
            animate={animate}
            exit="exit"
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  Collapse.displayName = "Collapse"
}
