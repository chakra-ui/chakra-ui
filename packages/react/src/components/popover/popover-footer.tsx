import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { usePopoverStyles } from "./popover-context"

export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {}

export function PopoverFooter(props: PopoverFooterProps) {
  const styles = usePopoverStyles()
  return (
    <chakra.footer
      {...props}
      className={cx("chakra-popover__footer", props.className)}
      css={styles.footer}
    />
  )
}

PopoverFooter.displayName = "PopoverFooter"
