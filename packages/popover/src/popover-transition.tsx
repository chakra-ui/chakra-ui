import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { HTMLMotionProps, motion, Variant } from "framer-motion"
import { mergeWith } from "@chakra-ui/utils"
import React from "react"
import { usePopoverContext } from "./popover-context"

// TODO: consider moving this to some util
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
  > & {
    variants?: MotionVariants
  }

type MotionVariants = Partial<Record<"enter" | "exit", Variant>>

const mergeVariants = (variants?: MotionVariants) => {
  if (!variants) return
  return mergeWith(variants, {
    enter: {
      visibility: "visible",
    },
    exit: {
      transitionEnd: {
        visibility: "hidden",
      },
    },
  })
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

const Section = motion(chakra.section)

export interface PopoverTransitionProps
  extends HTMLMotionChakraProps<"section"> {}

export const PopoverTransition = React.forwardRef(
  (props: HTMLMotionChakraProps<"section">, ref: React.Ref<any>) => {
    const { isOpen } = usePopoverContext()
    return (
      <Section
        ref={ref}
        variants={mergeVariants(props.variants)}
        {...props}
        initial={false}
        animate={isOpen ? "enter" : "exit"}
      />
    )
  },
)

PopoverTransition.defaultProps = {
  variants: scaleFade,
}
