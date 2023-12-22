import { defineStyle } from "@chakra-ui/styled-system"
import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { callAll } from "@chakra-ui/utils/call-all"
import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps } from "framer-motion"
import { usePopoverContext, usePopoverStyles } from "./popover-context"
import { PopoverTransition, PopoverTransitionProps } from "./popover-transition"

export interface PopoverContentProps extends PopoverTransitionProps {
  rootProps?: HTMLChakraProps<"div">
  motionProps?: HTMLMotionProps<"section">
}

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
  function PopoverContent(props, ref) {
    const { rootProps, motionProps, ...contentProps } = props

    const { getPopoverProps, getPopoverPositionerProps, onAnimationComplete } =
      usePopoverContext()

    const styles = usePopoverStyles()

    const contentStyles = defineStyle({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.content,
    })

    return (
      <chakra.div
        {...getPopoverPositionerProps(rootProps)}
        __css={styles.popper}
        className="chakra-popover__popper"
      >
        <PopoverTransition
          {...motionProps}
          {...getPopoverProps(contentProps, ref)}
          onAnimationComplete={callAll(
            onAnimationComplete,
            contentProps.onAnimationComplete,
          )}
          className={cx("chakra-popover__content", props.className)}
          __css={contentStyles}
        />
      </chakra.div>
    )
  },
)

PopoverContent.displayName = "PopoverContent"
