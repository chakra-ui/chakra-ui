import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useDialogStyles } from "./dialog-context"

export interface DialogFooterProps extends HTMLChakraProps<"footer"> {}

/**
 * Houses the action buttons of the dialog.
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogFooter = forwardRef<DialogFooterProps, "footer">(
  (props, ref) => {
    const styles = useDialogStyles()

    const footerStyles = defineStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      ...styles.footer,
    })

    return (
      <chakra.footer
        ref={ref}
        {...props}
        __css={footerStyles}
        className={cx("chakra-dialog__footer", props.className)}
      />
    )
  },
)

DialogFooter.displayName = "DialogFooter"
