"use client"

import { cx, warn } from "@chakra-ui/utils"
import type { Target, TargetAndTransition, Transition } from "framer-motion"
import {
  AnimatePresence,
  HTMLMotionProps,
  Variants as _Variants,
  motion,
} from "framer-motion"
import { forwardRef, useEffect, useState } from "react"

type WithMotionState<P> = Partial<Record<"enter" | "exit", P>>

type TransitionConfig = WithMotionState<Transition>

type TransitionEndConfig = WithMotionState<Target>

type DelayConfig = WithMotionState<number>

type TransitionProperties = {
  /**
   * Custom `transition` definition for `enter` and `exit`
   */
  transition?: TransitionConfig
  /**
   * Custom `transitionEnd` definition for `enter` and `exit`
   */
  transitionEnd?: TransitionEndConfig
  /**
   * Custom `delay` definition for `enter` and `exit`
   */
  delay?: number | DelayConfig
}
const EASE = [0.25, 0.1, 0.25, 1]

const isNumeric = (value?: string | number) =>
  value != null && parseInt(value.toString(), 10) > 0

type TargetResolver<P = {}> = (
  props: P & TransitionProperties,
) => TargetAndTransition

type Variant<P = {}> = TargetAndTransition | TargetResolver<P>

type Variants<P = {}> = {
  enter: Variant<P>
  exit: Variant<P>
  initial?: Variant<P>
}

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
    height: { duration: 0.2, ease: EASE },
    opacity: { duration: 0.3, ease: EASE },
  },
  enter: {
    height: { duration: 0.3, ease: EASE },
    opacity: { duration: 0.4, ease: EASE },
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
    transition: transition?.exit ?? {
      ...defaultTransitions.exit,
      delay: typeof delay === "number" ? delay : delay?.["exit"],
    },
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
    transition: transition?.enter ?? {
      ...defaultTransitions.enter,
      delay: typeof delay === "number" ? delay : delay?.["enter"],
    },
  }),
}

export type WithTransitionConfig<P extends object> = Omit<P, "transition"> &
  TransitionProperties & {
    /**
     * If `true`, the element will unmount when `in={false}` and animation is done
     */
    unmountOnExit?: boolean
    /**
     * Show the component; triggers when enter or exit states
     */
    in?: boolean
  }

export interface CollapseProps
  extends WithTransitionConfig<HTMLMotionProps<"div">>,
    CollapseOptions {}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (props, ref) => {
    const {
      in: open,
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

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
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
      condition: Number(startingHeight) > 0 && !!unmountOnExit,
      message: `startingHeight and unmountOnExit are mutually exclusive. You can't use them together`,
    })

    const hasStartingHeight = parseFloat(startingHeight.toString()) > 0

    const custom = {
      startingHeight,
      endingHeight,
      animateOpacity,
      transition: !mounted ? { enter: { duration: 0 } } : transition,
      transitionEnd: {
        enter: transitionEnd?.enter,
        exit: unmountOnExit
          ? transitionEnd?.exit
          : {
              ...transitionEnd?.exit,
              display: hasStartingHeight ? "block" : "none",
            },
      },
    }

    const show = unmountOnExit ? open : true
    const animate = open || unmountOnExit ? "enter" : "exit"

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

Collapse.displayName = "Collapse"
