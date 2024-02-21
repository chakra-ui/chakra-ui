import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps, useStyleConfig } from "../system"
import { useFieldContext } from "./field-context"
import { RequiredIndicator } from "./field-indicator"

export interface FieldLabelProps
  extends HTMLChakraProps<"label">,
    ThemingProps<"FormLabel"> {
  /**
   * @type React.ReactNode
   */
  requiredIndicator?: React.ReactNode
  /**
   * @type React.ReactNode
   */
  optionalIndicator?: React.ReactNode
}

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
    const styles = useStyleConfig("FormLabel", passedProps)
    const props = omitThemingProps(passedProps)

    const {
      className,
      children,
      requiredIndicator = <RequiredIndicator />,
      optionalIndicator = null,
      ...rest
    } = props

    const field = useFieldContext()
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest }

    return (
      <chakra.label
        {...ownProps}
        className={cx("chakra-form__label", props.className)}
        __css={{
          display: "block",
          textAlign: "start",
          ...styles,
        }}
      >
        {children}
        {field?.isRequired ? requiredIndicator : optionalIndicator}
      </chakra.label>
    )
  },
)

FieldLabel.displayName = "FieldLabel"
