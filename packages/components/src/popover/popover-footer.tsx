import { chakra, HTMLChakraProps } from "../system"
import { cx } from "@chakra-ui/utils/cx"
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
