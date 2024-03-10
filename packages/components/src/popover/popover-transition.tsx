import { chakra, HTMLChakraProps, forwardRef } from "../system"
import {
  domAnimation,
  HTMLMotionProps,
  LazyMotion,
  m,
  Variant,
} from "framer-motion"
import React from "react"
import { usePopoverContext } from "./popover-context"

type HTMLMotionChakraProps<T extends keyof React.ReactHTML> = Omit<
  HTMLChakraProps<T>,
  keyof HTMLMotionProps<T>
> &
  Omit<
    HTMLMotionProps<T>,
    | "style"
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "variants"
    | "transition"
    | "children"
  > & {
    variants?: MotionVariants
  }

type MotionVariants = Partial<Record<"enter" | "exit", Variant>>

function mergeVariants(variants?: MotionVariants): any {
  if (!variants) return
  return {
    enter: {
      ...variants.enter,
      visibility: "visible",
    },
    exit: {
      ...variants.exit,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  }
}

const scaleFade: MotionVariants = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1],
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0, 0, 0.2, 1],
    },
  },
}

const MotionSection = chakra(m.section)

export interface PopoverTransitionProps
  extends HTMLMotionChakraProps<"section"> {}

export const PopoverTransition = forwardRef(function PopoverTransition(
  props: PopoverTransitionProps,
  ref: React.Ref<any>,
) {
  const { variants = scaleFade, ...rest } = props
  const { isOpen } = usePopoverContext()
  return (
    <LazyMotion features={domAnimation}>
      <MotionSection
        ref={ref}
        variants={mergeVariants(variants)}
        initial={false}
        animate={isOpen ? "enter" : "exit"}
        {...rest}
      />
    </LazyMotion>
  )
})

PopoverTransition.displayName = "PopoverTransition"
