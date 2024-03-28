"use client"

import { HTMLMotionProps, Variant, motion } from "framer-motion"
import React, { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
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

const MotionSection = chakra(motion.section)

export interface PopoverTransitionProps
  extends HTMLMotionChakraProps<"section"> {}

export const PopoverTransition = forwardRef<
  HTMLElement,
  PopoverTransitionProps
>(function PopoverTransition(props, ref) {
  const { variants = scaleFade, ...rest } = props
  const { open } = usePopoverContext()
  return (
    <MotionSection
      ref={ref}
      variants={mergeVariants(variants)}
      initial={false}
      animate={open ? "enter" : "exit"}
      {...rest}
    />
  )
})

PopoverTransition.displayName = "PopoverTransition"
