import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useCheckboxContext, useCheckboxStyles } from "./checkbox-context"

export interface CheckboxLabelProps extends HTMLChakraProps<"span"> {}

export const CheckboxLabel = forwardRef<CheckboxLabelProps, "span">(
  function CheckboxLabel(props, ref) {
    const { getLabelProps, spacing } = useCheckboxContext()
    const styles = useCheckboxStyles()

    return (
      <chakra.span
        className="chakra-checkbox__label"
        {...getLabelProps(props, ref)}
        __css={{
          marginStart: spacing,
          ...styles.label,
        }}
      />
    )
  },
)

CheckboxLabel.displayName = "CheckboxLabel"
