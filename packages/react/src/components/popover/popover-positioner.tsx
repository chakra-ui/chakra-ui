import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverPositionerProps extends HTMLChakraProps<"div"> {}

export const PopoverPositioner = forwardRef<PopoverPositionerProps, "div">(
  function PopoverPositioner(props, ref) {
    const api = usePopoverContext()
    const styles = usePopoverStyles()

    return (
      <chakra.div
        {...api.getPositionerProps(props, ref)}
        css={styles.positioner}
        className="chakra-popover__positioner"
      />
    )
  },
)

PopoverPositioner.displayName = "PopoverPositioner"
