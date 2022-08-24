import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useFormControlContext, useFormControlStyles } from "./form-control"

export interface FormLabelProps
  extends HTMLChakraProps<"label">,
    ThemingProps<"FormLabel"> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement
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
export const FormLabel = forwardRef<FormLabelProps, "label">(function FormLabel(
  passedProps,
  ref,
) {
  const styles = useStyleConfig("FormLabel", passedProps)
  const props = omitThemingProps(passedProps)

  const {
    className,
    children,
    requiredIndicator = <RequiredIndicator />,
    optionalIndicator = null,
    ...rest
  } = props

  const field = useFormControlContext()
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
})

FormLabel.displayName = "FormLabel"

export interface RequiredIndicatorProps extends HTMLChakraProps<"span"> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, "span">(
  function RequiredIndicator(props, ref) {
    const field = useFormControlContext()
    const styles = useFormControlStyles()

    if (!field?.isRequired) return null

    const className = cx("chakra-form__required-indicator", props.className)

    return (
      <chakra.span
        {...field?.getRequiredIndicatorProps(props, ref)}
        __css={styles.requiredIndicator}
        className={className}
      />
    )
  },
)

RequiredIndicator.displayName = "RequiredIndicator"
