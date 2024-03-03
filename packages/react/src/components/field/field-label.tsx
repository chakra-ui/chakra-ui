import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"
import { useFieldContext } from "./field-context"
import { RequiredIndicator } from "./field-indicator"

export interface FieldLabelProps
  extends HTMLChakraProps<"label">,
    SystemRecipeProps<"FormLabel"> {
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
    const recipe = useRecipe("FormLabel")
    const [variantProps, localProps] = recipe.splitVariantProps(passedProps)
    const styles = recipe(variantProps)

    const {
      className,
      children,
      requiredIndicator = <RequiredIndicator />,
      optionalIndicator = null,
      ...rest
    } = localProps

    const field = useFieldContext()
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest }

    return (
      <chakra.label
        {...ownProps}
        className={cx("chakra-form__label", localProps.className)}
        css={{
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
