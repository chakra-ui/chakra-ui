import { callAllHandlers, cx } from "@chakra-ui/utils"
import { CloseButton, CloseButtonProps } from "../close-button"
import { forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogCloseTriggerProps extends CloseButtonProps {}

export const DialogCloseTrigger = forwardRef<DialogCloseTriggerProps, "button">(
  function DialogCloseTrigger(props, ref) {
    const styles = useDialogStyles()
    const api = useDialogContext()

    return (
      <CloseButton
        ref={ref}
        __css={styles.closeTrigger}
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

DialogCloseTrigger.displayName = "DialogCloseTrigger"
