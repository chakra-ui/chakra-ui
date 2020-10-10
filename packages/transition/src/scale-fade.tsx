import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

export const scaleFadeMotionVariants: MotionVariants<"enter" | "exit"> = {
  exit: (props) => ({
    opacity: 0,
    ...(props.reverse
      ? { scale: props.initialScale }
      : { transitionEnd: { scale: props.initialScale } }),
    transition: {
      duration: 0.1,
      easings: "easeOut",
    },
  }),
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export interface ScaleFadeMotionProps
  extends React.ComponentProps<typeof motion.div> {
  /**
   * The offset on the horizontal or `x` axis
   */
  initialScale?: number
  /**
   * If `true`, the element will transition back to exit state
   */
  reverse?: boolean
}

export const ScaleFadeMotion = React.forwardRef<
  HTMLDivElement,
  ScaleFadeMotionProps
>(function ScaleFadeMotion(props, ref) {
  const { initialScale, reverse, ...rest } = props

  return (
    <motion.div
      ref={ref}
      initial="exit"
      animate="enter"
      exit="exit"
      variants={scaleFadeMotionVariants}
      custom={{ initialScale, reverse }}
      {...rest}
    />
  )
})

if (__DEV__) {
  ScaleFadeMotion.displayName = "ScaleFadeMotion"
}

export interface ScaleFadeProps extends ScaleFadeMotionProps {
  /**
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will slide in
   */
  in?: boolean
}

export const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>(
  function ScaleFade(props, ref) {
    const {
      unmountOnExit,
      in: isOpen,
      reverse = true,
      initialScale = 0.95,
      className,
      ...rest
    } = props

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    return (
      <AnimatePresence custom={{ initialScale, reverse }}>
        {shouldExpand && (
          <ScaleFadeMotion
            ref={ref}
            className={cx("chakra-offset-slide", className)}
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            reverse={reverse}
            initialScale={initialScale}
            {...rest}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  ScaleFade.displayName = "ScaleFade"
}
