import { defineStyle } from "@chakra-ui/styled-system"
import { callAll } from "@chakra-ui/utils/call-all"
import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps } from "framer-motion"
import { forwardRef, HTMLChakraProps } from "../system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"
import { PopoverTransition, PopoverTransitionProps } from "./popover-transition"

export interface PopoverContentProps extends PopoverTransitionProps {
  rootProps?: HTMLChakraProps<"div">
  motionProps?: HTMLMotionProps<"section">
}

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
  function PopoverContent(props, ref) {
    const { rootProps, motionProps, ...contentProps } = props

    const api = usePopoverContext()
    const styles = usePopoverStyles()

    const contentStyles = defineStyle({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.content,
    })

    return (
      <PopoverTransition
        {...motionProps}
        {...api.getContentProps(contentProps, ref)}
        onAnimationComplete={callAll(
          api.onAnimationComplete,
          contentProps.onAnimationComplete,
        )}
        className={cx("chakra-popover__content", props.className)}
        __css={contentStyles}
      />
    )
  },
)

PopoverContent.displayName = "PopoverContent"
