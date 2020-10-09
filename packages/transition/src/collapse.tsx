import { forwardRef, PropsOf } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, motion, Variant } from "framer-motion"
import * as React from "react"

export type MotionVariants<T extends string> = Record<T, Variant>

export const collapseMotionVariants: MotionVariants<"open" | "collapsed"> = {
  collapsed: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: parseInt(props.startingHeight as string, 10) > 0 ? 1 : 0,
    }),
    height: props.startingHeight,
    transition: { duration: 0.15 },
  }),
  open: (props: CollapseOptions) => ({
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
   * If `true`, the collapse will unmount when `isOpen={false}` and animation is done
   */
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

export type ICollapse = CollapseProps

export interface CollapseProps
  extends PropsOf<typeof motion.div>,
    CollapseOptions {}

export const Collapse = forwardRef<CollapseProps, "div">((props, ref) => {
  const {
    isOpen,
    unmountOnExit,
    animateOpacity = true,
    startingHeight = 0,
    endingHeight = "auto",
    motionVariants,
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
    console.warn(
      `startingHeight and unmountOnExit are mutually exclusive. You can't use them together`,
    )
  }

  const shouldExpand = unmountOnExit ? isOpen && unmountOnExit : true

  const variantProps = { startingHeight, endingHeight, animateOpacity }

  return (
    <AnimatePresence initial={false} custom={variantProps}>
      {shouldExpand && (
        <motion.div
          ref={ref}
          aria-hidden={ariaHidden ? "true" : undefined}
          onAnimationComplete={() => {
            setAriaHidden((c) => !c)
            onAnimationComplete?.()
          }}
          className={cx("chakra-collapse", className)}
          initial="collapsed"
          animate={isOpen || unmountOnExit ? "open" : "collapsed"}
          exit="collapsed"
          {...rest}
          variants={motionVariants ?? collapseMotionVariants}
          style={{ overflow: "hidden", ...style }}
          custom={variantProps}
        />
      )}
    </AnimatePresence>
  )
})

if (__DEV__) {
  Collapse.displayName = "Collapse"
}
