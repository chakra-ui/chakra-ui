import { forwardRef, PropsOf } from "@chakra-ui/system"
import { AnimatePresence, motion, Variant } from "framer-motion"
import * as React from "react"

export type MotionVariants<T extends string> = Record<T, Variant>

export const collapseMotionVariants: MotionVariants<"open" | "collapsed"> = {
  collapsed: (props: CollapseOptions) => ({
    opacity: parseInt(props.startingHeight as string, 10) > 0 ? 1 : 0,
    height: props.startingHeight,
    transition: { duration: 0.15 },
  }),
  open: (props: CollapseOptions) => ({
    opacity: 1,
    height: props.endingHeight,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  }),
}

export interface CollapseOptions {
  unmountOnExit?: boolean
  /**
   * If `true`, the content will be visible
   */
  isOpen?: boolean
  /**
   * The height you want the content in it's collapsed state. Set to `0` by default
   */
  startingHeight?: number | string
  /**
   * The height you want the content in it's expanded state. Set to `auto` by default
   */
  endingHeight?: number | string
  /**
   * The custom framer-motion variants to use
   */
  motionVariants?: MotionVariants<"open" | "collapsed">
}

interface CollapseProps extends PropsOf<typeof motion.div>, CollapseOptions {}

export const Collapse = forwardRef<CollapseProps, "div">((props, ref) => {
  const {
    isOpen,
    unmountOnExit,
    startingHeight = 0,
    endingHeight = "auto",
    motionVariants,
    style,
    ...rest
  } = props

  /**
   * Warn 🚨: `startingHeight` and `unmountOnExit` are mutually exclusive
   *
   * If you specify a starting height, the collapsed needs to be mounted
   * for the height to take effect.
   */
  if (startingHeight > 0 && unmountOnExit) {
    console.warn(
      `startingHeight and unmountOnExit are mutually exclusive. You can't use them together`,
    )
  }

  const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

  return (
    <AnimatePresence initial={false} custom={{ startingHeight, endingHeight }}>
      {shouldExpand && (
        <motion.div
          ref={ref}
          initial="collapsed"
          animate={isOpen || unmountOnExit ? "open" : "collapsed"}
          exit="collapsed"
          {...rest}
          variants={motionVariants ?? collapseMotionVariants}
          style={{ overflow: "hidden", ...style }}
          custom={{ startingHeight, endingHeight }}
        />
      )}
    </AnimatePresence>
  )
})

Collapse.displayName = "Collapse"
