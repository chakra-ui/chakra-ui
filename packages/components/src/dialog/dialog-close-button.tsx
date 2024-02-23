import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { cx } from "@chakra-ui/utils/cx"
import { CloseButton, CloseButtonProps } from "../close-button"
import { forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogCloseButtonProps extends CloseButtonProps {}

/**
 * Closes the dialog.
 *
 * Note: You don't need to pass the `onClick` to it, it reads the
 * `onClose` action from the dialog context.
 */
export const DialogCloseButton = forwardRef<CloseButtonProps, "button">(
  function DialogCloseButton(props, ref) {
    const styles = useDialogStyles()
    const api = useDialogContext()

    return (
      <CloseButton
        ref={ref}
        __css={styles.closeButton}
        {...props}
        className={cx("chakra-dialog__close-btn", props.className)}
        onClick={callAllHandlers(props.onClick, (event: React.MouseEvent) => {
          event.stopPropagation()
          api.onClose()
        })}
      />
    )
  },
)

DialogCloseButton.displayName = "DialogCloseButton"
