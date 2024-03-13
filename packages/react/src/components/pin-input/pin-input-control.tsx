import { mergeRefs } from "@chakra-ui/hooks"
import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePinInputContext } from "./pin-input-context"

export interface PinInputControlProps extends HTMLChakraProps<"div"> {}

export const PinInputControl = forwardRef<PinInputControlProps, "div">(
  function PinInputControl(props, ref) {
    const api = usePinInputContext()
    return (
      <chakra.div
        ref={mergeRefs(ref, api.controlRef)}
        {...props}
        className={cx("chakra-pin-input__control", props.className)}
      />
    )
  },
)

PinInputControl.displayName = "PinInputControl"
