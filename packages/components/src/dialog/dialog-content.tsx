import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps } from "framer-motion"
import { HTMLChakraProps, forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"
import { DialogFocusScope } from "./dialog-focus"
import { DialogTransition } from "./dialog-transition"

export interface DialogContentProps extends HTMLChakraProps<"section"> {
  /**
   * The custom framer-motion transition to use for the dialog
   */
  motionProps?: HTMLMotionProps<"section">
}

export const DialogContent = forwardRef<DialogContentProps, "section">(
  (props, ref) => {
    const { className, children, motionProps, ...rest } = props

    const api = useDialogContext()
    const styles = useDialogStyles()

    const { motionPreset } = useDialogContext()

    return (
      <DialogFocusScope>
        <DialogTransition
          preset={motionPreset}
          motionProps={motionProps}
          {...(api.getContentProps(rest, ref) as any)}
          className={cx("chakra-dialog__content", className)}
          __css={styles.content}
        >
          {children}
        </DialogTransition>
      </DialogFocusScope>
    )
  },
)

DialogContent.displayName = "DialogContent"
