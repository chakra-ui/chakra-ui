import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { HTMLMotionProps } from "framer-motion"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"
import { DialogFocusScope } from "./dialog-focus"
import { DialogTransition } from "./dialog-transition"

export interface DialogContentProps extends HTMLChakraProps<"section"> {
  /**
   * The props to forward to the dialog's content wrapper
   */
  containerProps?: HTMLChakraProps<"div">
  /**
   * The custom framer-motion transition to use for the dialog
   */
  motionProps?: HTMLMotionProps<"section">
}

export const DialogContent = forwardRef<DialogContentProps, "section">(
  (props, ref) => {
    const {
      className,
      children,
      containerProps: rootProps,
      motionProps,
      ...rest
    } = props

    const { getDialogProps, getDialogContainerProps } = useDialogContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps(rootProps)

    const _className = cx("chakra-dialog__content", className)

    const styles = useDialogStyles()

    const dialogStyles = defineStyle({
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      outline: 0,
      ...styles.dialog,
    })

    const dialogContainerStyles = defineStyle({
      display: "flex",
      width: "100vw",
      height: "$100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.dialogContainer,
    })

    const { motionPreset } = useDialogContext()

    return (
      <DialogFocusScope>
        <chakra.div
          {...containerProps}
          className="chakra-dialog__content-container"
          tabIndex={-1}
          __css={dialogContainerStyles}
        >
          <DialogTransition
            preset={motionPreset}
            motionProps={motionProps}
            className={_className}
            {...dialogProps}
            __css={dialogStyles}
          >
            {children}
          </DialogTransition>
        </chakra.div>
      </DialogFocusScope>
    )
  },
)

DialogContent.displayName = "DialogContent"
