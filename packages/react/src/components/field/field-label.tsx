import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useFieldContext, useFieldStyles } from "./field-context"

export interface FieldLabelProps extends HTMLChakraProps<"label"> {}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FieldLabel = forwardRef<FieldLabelProps, "label">(
  function FormLabel(passedProps, ref) {
    const styles = useFieldStyles()
    const { className, children, ...rest } = passedProps

    const field = useFieldContext()
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest }

    return (
      <chakra.label
        {...ownProps}
        className={cx("chakra-field__label", className)}
        css={[styles.label, rest.css]}
      >
        {children}
      </chakra.label>
    )
  },
)

FieldLabel.displayName = "FieldLabel"
