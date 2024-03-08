import { callAllHandlers, cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogCloseTriggerProps extends HTMLChakraProps<"button"> {}

export const DialogCloseTrigger = forwardRef<DialogCloseTriggerProps, "button">(
  function DialogCloseTrigger(props, ref) {
    const styles = useDialogStyles()
    const api = useDialogContext()

    return (
      <chakra.button
        ref={ref}
        {...props}
        css={[styles.closeTrigger, props.css]}
        onClick={callAllHandlers(api.onClose, props.onClick)}
        className={cx("chakra-dialog__close", props.className)}
      />
    )
  },
)

DialogCloseTrigger.displayName = "DialogCloseTrigger"
