import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useDialogStyles } from "./dialog-context"

export interface DialogFooterProps extends HTMLChakraProps<"footer"> {}

/**
 * Houses the action buttons of the dialog.
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogFooter = forwardRef<DialogFooterProps, "footer">(
  function DialogFooter(props, ref) {
    const styles = useDialogStyles()

    return (
      <chakra.footer
        ref={ref}
        {...props}
        __css={styles.footer}
        className={cx("chakra-dialog__footer", props.className)}
      />
    )
  },
)

DialogFooter.displayName = "DialogFooter"
