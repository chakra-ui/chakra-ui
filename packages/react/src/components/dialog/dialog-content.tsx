import { cx } from "@chakra-ui/utils"
import { HTMLMotionProps } from "framer-motion"
import { HTMLChakraProps, forwardRef } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "./dialog-context"
import { DialogFocusScope } from "./dialog-focus-scope"
import { DialogTransition } from "./dialog-transition"

export interface DialogContentProps extends HTMLChakraProps<"section"> {
  /**
   * The custom framer-motion transition to use for the dialog
   */
  motionProps?: HTMLMotionProps<"section">
}

export const DialogContent = forwardRef<DialogContentProps, "section">(
  function DialogContent(props, ref) {
    const { className, children, motionProps, ...restProps } = props

    const api = useDialogContext()
    const styles = useDialogStyles()

    return (
      <DialogFocusScope>
        <DialogTransition
          preset={api.motionPreset}
          motionProps={motionProps}
          {...(api.getContentProps(restProps, ref) as any)}
          className={cx("chakra-dialog__content", className)}
          css={styles.content}
        >
          {children}
        </DialogTransition>
      </DialogFocusScope>
    )
  },
)

DialogContent.displayName = "DialogContent"
