import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
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
        __css={styles.header}
      />
    )
  },
)
if (__DEV__) {
  PopoverHeader.displayName = "PopoverHeader"
}
