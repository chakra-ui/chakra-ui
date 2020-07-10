import { useBoolean, useId, useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  PropsOf,
  useComponentStyle,
} from "@chakra-ui/system"
import { createContext, cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useFormControlLabel } from "./use-form-control"

export interface FormControlOptions {
  /**
   * If `true`, the form control will required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-requred` set to `true`
   */
  isRequired?: boolean
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean
  /**
   * If `true`, the form control will be readonly
   */
  isReadOnly?: boolean
  /**
   * If `true`, the form control will be in it's `loading` state
   */
  isLoading?: boolean
}

interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string
  /**
   * The error message to be displayed when `isInvalid` is set to `true`
   */
  errorText?: string
  /**
   * The assistive text to be displayed that provides additional guidance to users
   */
  helperText?: string
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string
}

type FieldContext = Omit<ReturnType<typeof useProvider>, "htmlProps">

const [FormControlContextProvider, useFormControlContext] = createContext<
  FieldContext
>({
  strict: false,
  name: "FormControlContext",
})

export { useFormControlContext }

function useProvider(props: FormControlContext) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isLoading,
    isReadOnly,
    ...htmlProps
  } = props

  // Generate all the required ids
  const uuid = useId()
  const id = idProp || `field-${uuid}`

  const labelId = `${id}-label`
  const feedbackId = `${id}-feedback`
  const helpTextId = `${id}-helptext`

  /**
   * Track of when the `FormHelperText` has been rendered.
   * We use this to append it's id the the `aria-describedby` of the `input`
   */
  const [hasHelpText, setHasHelpText] = useBoolean()

  // Let's keep track of when we focus the form element (e.g, `input`)
  const [isFocused, setFocus] = useBoolean()

  const context = {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isLoading: !!isLoading,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
  }

  return context
}

const StyledFormControl = chakra("div", {
  themeKey: "Form.Root",
  baseStyle: {
    width: "100%",
    position: "relative",
  },
  attrs: {
    role: "group",
  },
})

export type FormControlProps = FormControlContext &
  PropsOf<typeof StyledFormControl>

/**
 * FormControl
 *
 * React component that provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
export const FormControl = forwardRef<FormControlProps>(function FormControl(
  props,
  ref,
) {
  const { htmlProps, ...context } = useProvider(props)

  const _className = cx("chakra-form-control", props.className)

  return (
    <FormControlContextProvider value={context}>
      <StyledFormControl ref={ref} {...htmlProps} className={_className} />
    </FormControlContextProvider>
  )
})

if (__DEV__) {
  FormControl.displayName = "FormControl"
}

/**
 * Label - Theming
 *
 * To style form labels globally, change the styles in `theme.components.FormLabel`
 */
const StyledLabel = chakra("label", {
  themeKey: "Form.Label",
  baseStyle: {
    display: "block",
    textAlign: "left",
  },
})

export type FormLabelProps = PropsOf<typeof StyledLabel>

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<FormLabelProps>(function FormLabel(
  props,
  ref,
) {
  const { className, ...rest } = props
  const ownProps = useFormControlLabel(rest)

  return (
    <StyledLabel
      ref={ref}
      className={cx("chakra-form__label", props.className)}
      {...ownProps}
    />
  )
})

if (__DEV__) {
  FormLabel.displayName = "FormLabel"
}

/**
 * RequiredIndicator - Theming
 *
 * To style the required indicator globally, change the styled in
 * `theme.components.Form` under the `RequiredIndicator` key
 */
const StyledIndicator = chakra("span", {
  themeKey: "Form.RequiredIndicator",
  attrs: {
    role: "presentation",
    "aria-hidden": true,
  },
})

export type RequiredIndicatorProps = PropsOf<typeof StyledIndicator>

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps>(
  function RequiredIndicator(props, ref) {
    const field = useFormControlContext()

    if (!field?.isRequired) return null

    const _className = cx("chakra-form__required-indicator", props.className)

    return (
      <StyledIndicator
        ref={ref}
        {...props}
        className={_className}
        children={props.children || "*"}
      />
    )
  },
)

if (__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator"
}

/**
 * FormHelperText - Theming
 *
 * To style the required indicator globally, change the styled in
 * `theme.components.Form` under the `HelperText` key
 */
const StyledHelperText = chakra("div", {
  themeKey: "Form.HelperText",
})

export type HelpTextProps = PropsOf<typeof StyledHelperText>

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided
 */
export const FormHelperText = forwardRef<HelpTextProps>(function FormHelperText(
  props,
  ref,
) {
  const field = useFormControlContext()

  /**
   * Notify the field context when the help text is rendered on
   * screen, so we can apply the correct `aria-describedby` to the field (e.g. input, textarea)
   */
  useSafeLayoutEffect(() => {
    field?.setHasHelpText.on()
    return () => field?.setHasHelpText.off()
  }, [])

  const _className = cx("chakra-form__helper-text", props.className)

  return (
    <StyledHelperText
      ref={ref}
      {...props}
      className={_className}
      id={props.id ?? field?.helpTextId}
    />
  )
})

if (__DEV__) {
  FormHelperText.displayName = "FormHelperText"
}

/**
 * ErrorText Theming
 *
 * To style the error text globally, change the styles in
 * `theme.components.Form` under the `ErrorText` key
 */
const StyledErrorText = chakra("div", {
  themeKey: "Form.ErrorText",
  baseStyle: {
    display: "flex",
    alignItems: "center",
  },
  attrs: {
    "aria-live": "polite",
  },
})

export type FormErrorMessageProps = PropsOf<typeof StyledErrorText>

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instrctions on how to fix it.
 */
export const FormErrorMessage = forwardRef<FormErrorMessageProps>(
  function FormErrorMessage(props, ref) {
    const field = useFormControlContext()

    if (!field?.isInvalid) return null

    const _className = cx("chakra-form__error-message", props.className)

    return (
      <StyledErrorText
        ref={ref}
        {...props}
        className={_className}
        id={props.id ?? field?.feedbackId}
      />
    )
  },
)

if (__DEV__) {
  FormErrorMessage.displayName = "FormErrorMessage"
}

/**
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const FormErrorIcon = forwardRef<IconProps>(function FormErrorIcon(
  props,
  ref,
) {
  const styles = useComponentStyle({ themeKey: "Form.ErrorIcon" })
  const field = useFormControlContext()

  if (!field?.isInvalid) return null

  const _className = cx("chakra-form__error-icon", props.className)

  return (
    <Icon ref={ref} aria-hidden sx={styles} {...props} className={_className}>
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </Icon>
  )
})

if (__DEV__) {
  FormErrorIcon.displayName = "FormErrorIcon"
}
