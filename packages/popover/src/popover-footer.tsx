import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { usePopoverStyles } from "./popover-context"

export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {}

export function PopoverFooter(props: PopoverFooterProps) {
  const styles = usePopoverStyles()
  return (
    <chakra.footer
      {...props}
      className={cx("chakra-popover__footer", props.className)}
      __css={styles.footer}
    />
  )
}
if (__DEV__) {
  PopoverFooter.displayName = "PopoverFooter"
}
