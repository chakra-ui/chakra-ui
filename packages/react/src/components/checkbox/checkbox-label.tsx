import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"

export interface CheckboxLabelProps extends HTMLChakraProps<"span"> {}

export const CheckboxLabel = forwardRef<CheckboxLabelProps, "span">(
  function CheckboxLabel(props, ref) {
    const api = useCheckboxContext()
    const styles = useCheckboxStyles()

    return (
      <chakra.span
        className="chakra-checkbox__label"
        {...api.getLabelProps(props, ref)}
        css={[styles.label, props.css]}
      />
    )
  },
)

CheckboxLabel.displayName = "CheckboxLabel"
