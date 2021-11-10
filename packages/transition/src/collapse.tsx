import { useUpdateEffect } from "@chakra-ui/hooks"
import { cx, warn, __DEV__ } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"
import { EASINGS, MotionVariants } from "./__utils"

type CollapseVariants = MotionVariants<"enter" | "exit">

const hasHeightValue = (value?: string | number) =>
  value != null && parseInt(value.toString(), 10) > 0

const variants: CollapseVariants = {
  exit: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: hasHeightValue(props.startingHeight) ? 1 : 0,
    }),
    height: props.startingHeight,
    transition: {
      height: { duration: 0.2, ease: EASINGS.ease },
      opacity: { duration: 0.3, ease: EASINGS.ease },
    },
  }),
  enter: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: 1,
    }),
    height: props.endingHeight,
    transition: {
      height: {
        duration: 0.3,
        ease: EASINGS.ease,
      },
      opacity: {
        duration: 0.4,
        ease: EASINGS.ease,
      },
    },
  }),
}

export interface CollapseOptions {
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean
  /**
   * If `true`, the element will unmount when `in={false}` and animation is done
   */
  unmountOnExit?: boolean
  /**
   * If `true`, the content will be expanded
   */
  in?: boolean
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight?: number | string
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight?: number | string
}

export type ICollapse = CollapseProps

type Display = React.CSSProperties["display"]

export interface CollapseProps
  extends HTMLMotionProps<"div">,
    CollapseOptions {}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  (props, ref) => {
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

    const fromZeroHeight = startingHeight === 0

    const [open, setOpen] = React.useState(!!isOpen)

    const getInitialHidden = () => {
      // If it is open by default, no need to apply `aria-hidden`
      if (isOpen) return false
      // If startingHeight > 0, then content is partially visible
      if (hasHeightValue(startingHeight)) return false
      // Else, the content is hidden
      return true
    }

    const [display, setDisplay] = React.useState<Display>(() => {
      if (!fromZeroHeight) return "block"
      const hidden = getInitialHidden()
      return hidden ? "none" : "block"
    })

    useUpdateEffect(() => {
      setDisplay("block")
      setOpen(!!isOpen)
    }, [isOpen])

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
      onAnimationComplete: () => {
        if (!open && fromZeroHeight) {
          setDisplay("none")
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
        style={{ ...ownProps.style, display }}
        initial={false}
        animate={open ? "enter" : "exit"}
      />
    )
  },
)

if (__DEV__) {
  Collapse.displayName = "Collapse"
}
