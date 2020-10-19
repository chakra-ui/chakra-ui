import * as React from "react"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, dataAttr, Dict, __DEV__ } from "@chakra-ui/utils"
import { useFormControlContext } from "./form-control"

export function useFormControlLabel(props: Dict) {
  const field = useFormControlContext()
  return {
    ...props,
    "data-focus": dataAttr(field?.isFocused),
    "data-disabled": dataAttr(field?.isDisabled),
    "data-invalid": dataAttr(field?.isInvalid),
    "data-loading": dataAttr(field?.isLoading),
    "data-readonly": dataAttr(field?.isReadOnly),
    id: props.id ?? field?.labelId,
    htmlFor: props.htmlFor ?? field?.id,
  }
}

export interface FormLabelProps
  extends PropsOf<typeof chakra.label>,
    ThemingProps {}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<FormLabelProps, "label">(function FormLabel(
  props,
  ref,
) {
  const styles = useStyleConfig("FormLabel", props)
  const { className, children, ...rest } = omitThemingProps(props)

  const ownProps = useFormControlLabel(rest)
  const field = useFormControlContext()

  return (
    <chakra.label
      ref={ref}
      className={cx("chakra-form__label", props.className)}
      __css={{
        display: "block",
        textAlign: "left",
        ...styles,
      }}
      {...ownProps}
    >
      {children}
      {field?.isRequired && <RequiredIndicator />}
    </chakra.label>
  )
})

if (__DEV__) {
  FormLabel.displayName = "FormLabel"
}

export interface RequiredIndicatorProps extends PropsOf<typeof chakra.span> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, "span">(
  function RequiredIndicator(props, ref) {
    const { children, className, ...rest } = props
    const field = useFormControlContext()
    const styles = useStyles()

    if (!field?.isRequired) return null

    const _className = cx("chakra-form__required-indicator", className)

    return (
      <chakra.span
        role="presentation"
        aria-hidden
        ref={ref}
        {...rest}
        __css={styles.requiredIndicator}
        className={_className}
      >
        {children || "*"}
      </chakra.span>
    )
  },
)

if (__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator"
}
