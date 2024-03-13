import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { usePinInputContext } from "./pin-input-context"

export interface PinInputLabelProps extends HTMLChakraProps<"label"> {}

export const PinInputLabel = forwardRef<PinInputLabelProps, "label">(
  function PinInputLabel(props, ref) {
    const api = usePinInputContext()
    return (
      <chakra.label
        {...api.getLabelProps(props, ref)}
        className={cx("chakra-pin-input__label", props.className)}
      />
    )
  },
)

PinInputLabel.displayName = "PinInputLabel"
