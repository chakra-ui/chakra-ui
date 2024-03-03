import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverHeaderProps extends HTMLChakraProps<"header"> {}
/**
 * PopoverHeader is the accessible header or label
 * for the popover's content, and it is first announced by screenreaders.
 */

export const PopoverHeader = forwardRef<PopoverHeaderProps, "header">(
  function PopoverHeader(props, ref) {
    const { getHeaderProps } = usePopoverContext()

    const styles = usePopoverStyles()

    return (
      <chakra.header
        {...getHeaderProps(props, ref)}
        className={cx("chakra-popover__header", props.className)}
        css={styles.header}
      />
    )
  },
)

PopoverHeader.displayName = "PopoverHeader"
