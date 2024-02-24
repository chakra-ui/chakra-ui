import { cx } from "@chakra-ui/utils/cx"
import { CloseButton, CloseButtonProps } from "../close-button"
import { forwardRef } from "../system"
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
      __css={styles.closeTrigger}
    />
  )
})

PopoverCloseTrigger.displayName = "PopoverCloseTrigger"
