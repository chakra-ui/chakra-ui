import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export const fadeMotionVariants: MotionVariants<"enter" | "exit"> = {
  exit: { opacity: 0 },
  enter: { opacity: 1 },
}

export interface FadeOptions {
  /**
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will slide in
   */
  in?: boolean
}

export interface FadeMotionProps
  extends React.ComponentProps<typeof motion.div> {}

export const FadeMotion = React.forwardRef<HTMLDivElement, FadeMotionProps>(
  function FadeMotion(props, ref) {
    return (
      <motion.div
        ref={ref}
        initial="exit"
        animate="enter"
        exit="exit"
        variants={fadeMotionVariants}
        transition={{
          duration: 0.225,
          ease: [0.4, 0, 0.2, 1],
        }}
        {...props}
      />
    )
  },
)

if (__DEV__) {
  FadeMotion.displayName = "FadeMotion"
}

export interface FadeProps extends FadeMotionProps, FadeOptions {}

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref,
) {
  const { unmountOnExit, in: isOpen, className, ...rest } = props
  const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

  return (
    <AnimatePresence>
      {shouldExpand && (
        <FadeMotion
          ref={ref}
          className={cx("chakra-fade", className)}
          animate={isOpen || unmountOnExit ? "enter" : "exit"}
          {...rest}
        />
      )}
    </AnimatePresence>
  )
})

if (__DEV__) {
  Fade.displayName = "Fade"
}
