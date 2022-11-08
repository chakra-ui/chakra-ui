import { callAll, cx } from "@chakra-ui/shared-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
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
    const contentStyles: SystemStyleObject = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.content,
    }

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
