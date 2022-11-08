import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
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

PopoverFooter.displayName = "PopoverFooter"
