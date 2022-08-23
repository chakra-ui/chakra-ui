import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { forwardRef } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export type PopoverCloseButtonProps = CloseButtonProps

export const PopoverCloseButton = forwardRef<CloseButtonProps, "button">(
  function PopoverCloseButton(props, ref) {
    const { onClose } = usePopoverContext()
    const styles = usePopoverStyles()
    return (
      <CloseButton
        size="sm"
        onClick={onClose}
        className={cx("chakra-popover__close-btn", props.className)}
        __css={styles.closeButton}
        ref={ref}
        {...props}
      />
    )
  },
)

PopoverCloseButton.displayName = "PopoverCloseButton"
