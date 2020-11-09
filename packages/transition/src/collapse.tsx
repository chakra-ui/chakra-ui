import { cx, warn, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { EASINGS, MotionVariants } from "./__utils"

type CollapseVariants = MotionVariants<"enter" | "exit">

const variants: CollapseVariants = {
  exit: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: parseInt(props.startingHeight as string, 10) > 0 ? 1 : 0,
    }),
    height: props.startingHeight,
    transition: { duration: 0.2, ease: EASINGS.easeInOut },
  }),
  enter: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: 1,
    }),
    height: props.endingHeight,
    transition: {
      duration: 0.3,
      ease: EASINGS.easeInOut,
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
   * The height you want the content in its collapsed state. Set to `0` by default
   */
  startingHeight?: number | string
  /**
   * The height you want the content in its expanded state. Set to `auto` by default
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
      // If it is open by default, no need to apply `aria-hidden`
      if (isOpen) return false
      // If startingHeight > 0, then content is partially visible
      if (parseInt(startingHeight as string, 10) > 0) return false
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

    const custom = { startingHeight, endingHeight, animateOpacity }

    const ownProps: HTMLMotionProps<"div"> & React.RefAttributes<any> = {
      ref,
      "aria-hidden": ariaHidden ? "true" : undefined,
      onAnimationComplete: () => {
        if (ariaHidden !== !isOpen) {
          setAriaHidden(!isOpen)
        }
        onAnimationComplete?.()
      },
      className: cx("chakra-collapse", className),
      ...rest,
      variants,
      style: { overflow: "hidden", ...style },
      custom,
    }

    if (unmountOnExit) {
      return (
        <AnimatePresence initial={false} custom={custom}>
          {isOpen && (
            <motion.div
              {...ownProps}
              initial="exit"
              animate="enter"
              exit="exit"
            />
          )}
        </AnimatePresence>
      )
    }

    return (
      <motion.div
        {...ownProps}
        initial={false}
        animate={isOpen ? "enter" : "exit"}
      />
    )
  },
)

if (__DEV__) {
  Collapse.displayName = "Collapse"
}
