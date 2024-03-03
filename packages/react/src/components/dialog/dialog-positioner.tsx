import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogPositionerProps extends HTMLChakraProps<"div"> {}

export const DialogPositioner = forwardRef<DialogPositionerProps, "div">(
  (props, ref) => {
    const api = useDialogContext()
    const styles = useDialogStyles()

    return (
      <chakra.div
        {...api.getPositionerProps(props, ref)}
        className={cx("chakra-dialog__positioner", props.className)}
        tabIndex={-1}
        css={styles.positioner}
      />
    )
  },
)

DialogPositioner.displayName = "DialogPositioner"
