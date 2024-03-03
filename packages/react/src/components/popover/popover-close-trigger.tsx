import { cx } from "@chakra-ui/utils"
import { forwardRef } from "../../styled-system"
import { CloseButton, CloseButtonProps } from "../close-button"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverCloseTriggerProps extends CloseButtonProps {}

export const PopoverCloseTrigger = forwardRef<
  PopoverCloseTriggerProps,
  "button"
>(function PopoverCloseTrigger(props, ref) {
  const api = usePopoverContext()
  const styles = usePopoverStyles()
  return (
    <CloseButton
      size="sm"
      onClick={api.onClose}
      ref={ref}
      {...props}
      className={cx("chakra-popover__close-trigger", props.className)}
      css={styles.closeTrigger}
    />
  )
})

PopoverCloseTrigger.displayName = "PopoverCloseTrigger"
