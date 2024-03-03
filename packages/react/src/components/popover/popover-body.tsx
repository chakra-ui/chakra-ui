import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverBodyProps extends HTMLChakraProps<"div"> {}
/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */

export const PopoverBody = forwardRef<PopoverBodyProps, "div">(
  function PopoverBody(props, ref) {
    const { getBodyProps } = usePopoverContext()

    const styles = usePopoverStyles()

    return (
      <chakra.div
        {...getBodyProps(props, ref)}
        className={cx("chakra-popover__body", props.className)}
        css={styles.body}
      />
    )
  },
)

PopoverBody.displayName = "PopoverBody"
