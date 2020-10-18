import { cx, warn, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { MotionVariants } from "./__utils"

type CollapseVariants = MotionVariants<"enter" | "exit">

const variants: CollapseVariants = {
  exit: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: parseInt(props.startingHeight as string, 10) > 0 ? 1 : 0,
    }),
    height: props.startingHeight,
    transition: { duration: 0.15 },
  }),
  enter: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: 1,
    }),
    height: props.endingHeight,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  }),
}

export interface CollapseOptions {
  /**
   * If `true`, the opacity of the content will be animated
   */
  animateOpacity?: boolean
  /**
   * If `true`, the collapse will unmount when `in={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will be expanded
   */
  in?: boolean
  /**
   * The height you want the content in it's collapsed state. Set to `0` by default
   */
  startingHeight?: number | string
  /**
   * The height you want the content in it's expanded state. Set to `auto` by default
   */
  endingHeight?: number | string
}

export type ICollapse = CollapseProps

export interface CollapseProps
  extends HTMLMotionProps<"div">,
    CollapseOptions {}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  function Collapse(props, ref) {
    const {
      in: isOpen,
      unmountOnExit,
      animateOpacity = true,
      startingHeight = 0,
      endingHeight = "auto",
      style,
      className,
      onAnimationComplete,
      ...rest
    } = props

    const [ariaHidden, setAriaHidden] = React.useState(() => {
      // If it's open by default, no need to apply `aria-hidden`
      if (isOpen) return false
      // If startingHeight > 0, then content is partially visible
      if (parseInt(props.startingHeight as string, 10) > 0) return false
      // Else, the content is hidden
      return true
    })

    /**
     * Warn 🚨: `startingHeight` and `unmountOnExit` are mutually exclusive
     *
     * If you specify a starting height, the collapsed needs to be mounted
     * for the height to take effect.
     */
    if (startingHeight > 0 && unmountOnExit) {
      warn(
        `startingHeight and unmountOnExit are mutually exclusive. You can't use them together`,
      )
    }

    const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

    const custom = { startingHeight, endingHeight, animateOpacity }

    return (
      <AnimatePresence initial={false} custom={custom}>
        {shouldExpand && (
          <motion.div
            ref={ref}
            aria-hidden={ariaHidden ? "true" : undefined}
            onAnimationComplete={() => {
              setAriaHidden((c) => !c)
              onAnimationComplete?.()
            }}
            className={cx("chakra-collapse", className)}
            initial="exit"
            animate={isOpen || unmountOnExit ? "enter" : "exit"}
            exit="exit"
            {...rest}
            variants={variants}
            style={{ overflow: "hidden", ...style }}
            custom={custom}
          />
        )}
      </AnimatePresence>
    )
  },
)

if (__DEV__) {
  Collapse.displayName = "Collapse"
}
