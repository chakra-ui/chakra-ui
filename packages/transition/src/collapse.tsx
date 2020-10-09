import { forwardRef, PropsOf } from "@chakra-ui/system"
import { AnimatePresence, motion, Variant } from "framer-motion"
import * as React from "react"

export type MotionVariants<T extends string> = Record<T, Variant>

export const collapseVariants: MotionVariants<"open" | "collapsed"> = {
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
  unMountOnExit?: boolean
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
  motionConfig?: MotionVariants<"open" | "collapsed">
}

interface CollapseProps extends PropsOf<typeof motion.div>, CollapseOptions {}

export const Collapse = forwardRef<CollapseProps, "div">((props, ref) => {
  const {
    isOpen,
    unMountOnExit,
    startingHeight = 0,
    endingHeight = "auto",
    motionConfig,
    style,
    ...rest
  } = props

  /**
   * Warn 🚨: `startingHeight` and `unMountOnExit` are mutually exclusive
   *
   * If you specify a starting height, the collapsed needs to be mounted
   * for the height to take effect.
   */
  if (startingHeight > 0 && unMountOnExit) {
    console.warn(
      `startingHeight and unMountOnExit are mutually exclusive. You can't use them together`,
    )
  }

  const shouldExpand = unMountOnExit ? isOpen && unMountOnExit : true

  return (
    <AnimatePresence initial={false} custom={{ startingHeight, endingHeight }}>
      {shouldExpand && (
        <motion.div
          ref={ref}
          initial="collapsed"
          animate={isOpen || unMountOnExit ? "open" : "collapsed"}
          exit="collapsed"
          {...rest}
          variants={motionConfig ?? collapseVariants}
          style={{ overflow: "hidden", ...style }}
          custom={{ startingHeight, endingHeight }}
        />
      )}
    </AnimatePresence>
  )
})

Collapse.displayName = "Collapse"
