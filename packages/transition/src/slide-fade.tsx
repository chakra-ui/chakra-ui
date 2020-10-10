import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export const slideFadeMotionVariants: MotionVariants<
  "initial" | "enter" | "exit"
> = {
  initial: (props) => ({
    opacity: 0,
    x: props.offsetX,
    y: props.offsetY,
  }),
  exit: (props) => ({
    opacity: 0,
    ...(props.reverse && {
      x: props.offsetX,
      y: props.offsetY,
    }),
    ...(!props.reverse && {
      transitionEnd: {
        x: props.offsetX,
        y: props.offsetY,
      },
    }),
  }),
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
  },
}

export interface SlideFadeMotionProps
  extends React.ComponentProps<typeof motion.div> {
  /**
   * The offset on the horizontal or `x` axis
   */
  offsetX?: number
  /**
   * The offset on the vertical or `y` axis
   */
  offsetY?: number
  /**
   * If `true`, the element will be transitioned back to the offset when it leaves.
   * Otherwise, it'll only fade out
   */
  reverse?: boolean
}

export const SlideFadeMotion = React.forwardRef<
  HTMLDivElement,
  SlideFadeMotionProps
>(function SlideFadeMotion(props, ref) {
  const { offsetX, offsetY, reverse, ...rest } = props

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: 0.15,
        ease: [0, 0, 0.4, 1],
      }}
      variants={slideFadeMotionVariants}
      custom={{ offsetX, offsetY, reverse }}
      {...rest}
    />
  )
})

export interface SlideFadeProps extends SlideFadeMotionProps {
  /**
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will slide in
   */
  in?: boolean
}

export const SlideFade = React.forwardRef<HTMLDivElement, SlideFadeProps>(
  function SlideFade(props, ref) {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      className,
      offsetX = 0,
      offsetY = 8,
      ...rest
    } = props

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true
    const motionProps = { offsetX, offsetY, reverse }

    return (
      <AnimatePresence custom={motionProps}>
        {shouldExpand && (
          <SlideFadeMotion
            ref={ref}
            className={cx("chakra-offset-slide", className)}
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            {...motionProps}
            {...rest}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  SlideFade.displayName = "SlideFade"
}
