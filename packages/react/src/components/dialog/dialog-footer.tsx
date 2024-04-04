"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useDialogStyles } from "./dialog-context"

export interface DialogFooterProps extends HTMLChakraProps<"footer"> {}

/**
 * Houses the action buttons of the dialog.
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogFooter = forwardRef<HTMLElement, DialogFooterProps>(
  function DialogFooter(props, ref) {
    const styles = useDialogStyles()

    return (
      <chakra.footer
        ref={ref}
        {...props}
        css={[styles.footer, props.css]}
        className={cx("chakra-dialog__footer", props.className)}
      />
    )
  },
)

DialogFooter.displayName = "DialogFooter"
