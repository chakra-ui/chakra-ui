import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { EASINGS, MotionVariants } from "./__utils"

type FadeMotionVariant = MotionVariants<"enter" | "exit">

const variants: FadeMotionVariant = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: EASINGS.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: EASINGS.easeIn,
    },
  },
}

export const fadeConfig: Omit<HTMLMotionProps<any>, "transition"> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants,
}

export interface FadeProps extends HTMLMotionProps<"div"> {
  /**
   * If `true`, the element will unmount when `in={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * Show the component; triggers the enter or exit states
   */
  in?: boolean
}

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  (props, ref) => {
    const { unmountOnExit, in: isOpen, className, ...rest } = props
    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    return (
      <AnimatePresence>
        {shouldExpand && (
          <motion.div
            ref={ref}
            className={cx("chakra-fade", className)}
            {...fadeConfig}
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            {...rest}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  Fade.displayName = "Fade"
}
