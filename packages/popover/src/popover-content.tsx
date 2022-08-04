import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { callAll, cx, __DEV__ } from "@chakra-ui/utils"
import { usePopoverContext, usePopoverStyles } from "./popover-context"
import { PopoverTransition, PopoverTransitionProps } from "./popover-transition"

export interface PopoverContentProps extends PopoverTransitionProps {
  rootProps?: HTMLChakraProps<"div">
}

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
  function PopoverContent(props, ref) {
    const { rootProps, ...contentProps } = props

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
if (__DEV__) {
  PopoverContent.displayName = "PopoverContent"
}
