import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogPositionerProps extends HTMLChakraProps<"div"> {}

export const DialogPositioner = forwardRef<DialogPositionerProps, "div">(
  (props, ref) => {
    const api = useDialogContext()

    const styles = useDialogStyles()

    const _styles = defineStyle({
      display: "flex",
      width: "100vw",
      height: "$100vh",
      position: "fixed",
      left: 0,
      top: 0,
      ...styles.positioner,
    })

    return (
      <chakra.div
        {...api.getPositionerProps(props, ref)}
        className={cx("chakra-dialog__positioner", props.className)}
        tabIndex={-1}
        __css={_styles}
      />
    )
  },
)

DialogPositioner.displayName = "DialogPositioner"
