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
  (props, ref) => {
    const { onClick, className, ...rest } = props
    const { onClose } = useDialogContext()

    const _className = cx("chakra-dialog__close-btn", className)

    const styles = useDialogStyles()

    return (
      <CloseButton
        ref={ref}
        __css={styles.closeButton}
        className={_className}
        onClick={callAllHandlers(onClick, (event: React.MouseEvent) => {
          event.stopPropagation()
          onClose()
        })}
        {...rest}
      />
    )
  },
)

DialogCloseButton.displayName = "DialogCloseButton"
