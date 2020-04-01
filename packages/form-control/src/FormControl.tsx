import { useBooleanState, useId, useSafeLayoutEffect } from "@chakra-ui/hooks"
import Icon from "@chakra-ui/icon"
import { chakra, PropsOf, useComponentStyle } from "@chakra-ui/system"
import { attr, callAllHandlers, createContext } from "@chakra-ui/utils"
import * as React from "react"

export interface ControlProps {
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

interface FormControlContext extends ControlProps {
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

type FieldContext = ReturnType<typeof useFormControl>

const [FieldContextProvider, useFieldContext] = createContext<FieldContext>({
  strict: false,
})

export { useFieldContext }

function useFormControl(props: FormControlContext) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isLoading,
    isReadOnly,
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
  const [hasHelpText, setHasHelpText] = useBooleanState()

  // Let's keep track of when we focus the form element (e.g, `input`)
  const [isFocused, setFocus] = useBooleanState(false)

  const context = {
    isRequired,
    isInvalid,
    isLoading,
    isReadOnly,
    isDisabled,
    isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
  }

  return context
}

//////////////////////////////////////////////////////////////////////////////

const StyledFormControl = chakra("div", {
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
export const FormControl = React.forwardRef(
  (props: FormControlProps, ref: React.Ref<any>) => {
    const {
      id,
      isRequired,
      isInvalid,
      isDisabled,
      label,
      errorText,
      helperText,
      ...rest
    } = props

    const fieldContext = useFormControl(props)

    return (
      <FieldContextProvider value={fieldContext}>
        <StyledFormControl data-chakra-form-control="" ref={ref} {...rest} />
      </FieldContextProvider>
    )
  },
)

//////////////////////////////////////////////////////////////////////////////
/**
 * Theming
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
 * Formlabel
 *
 * React component that enhances the usability of form controls.
 *
 * A `FormLabel` is used to inform users as to what information
 * is requested for a form field. Every form field should have a `FormLabel`.
 */
export const FormLabel = React.forwardRef(
  (props: FormLabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const field = useFieldContext()

    return (
      <StyledLabel
        {...props}
        data-chakra-form-label=""
        ref={ref}
        data-focus={attr(field?.isFocused)}
        data-disabled={attr(field?.isDisabled)}
        data-invalid={attr(field?.isInvalid)}
        data-loading={attr(field?.isLoading)}
        data-readonly={attr(field?.isReadOnly)}
        id={props.id ?? field?.labelId}
        htmlFor={props.htmlFor ?? field?.id}
      />
    )
  },
)

//////////////////////////////////////////////////////////////////////////////

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
 * Required Indicator
 *
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 *
 */
export const RequiredIndicator = React.forwardRef(
  (props: RequiredIndicatorProps, ref: React.Ref<any>) => {
    const field = useFieldContext()

    if (!field?.isRequired) return null

    return (
      <StyledIndicator data-chakra-required-indicator="" ref={ref} {...props} />
    )
  },
)

//////////////////////////////////////////////////////////////////////////////

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
export function FormHelperText(props: HelpTextProps) {
  const field = useFieldContext()

  /**
   * Notify the field context when the help text is rendered on
   * screen, so we can apply the correct `aria-describedby` to the field (e.g. input, textarea)
   */
  useSafeLayoutEffect(() => {
    field?.setHasHelpText.on()
    return () => {
      field?.setHasHelpText.off()
    }
  }, [])

  return (
    <StyledHelperText
      data-chakra-form-helper-text=""
      {...props}
      id={props.id ?? field?.helpTextId}
    />
  )
}

//////////////////////////////////////////////////////////////////////////////

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
 * FormErrorMessage
 *
 * Used to provide feedback about an invalid input,
 * and suggest clear instrctions on how to fix it.
 */
export function FormErrorMessage(props: FormErrorMessageProps) {
  const field = useFieldContext()

  if (!field?.isInvalid) return null

  return (
    <StyledErrorText
      data-chakra-form-error-message=""
      {...props}
      id={props.id || field?.feedbackId}
    />
  )
}

//////////////////////////////////////////////////////////////////////////////

export type FieldHookProps<T extends HTMLElement> = ControlProps & {
  id?: string
  onFocus?: React.FocusEventHandler<T>
  onBlur?: React.FocusEventHandler<T>
}

/**
 * useField
 *
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
export function useField<T extends HTMLElement>(props: FieldHookProps<T>) {
  const field = useFieldContext()
  const describedBy: string[] = []

  if (field?.isInvalid) describedBy.push(field.feedbackId)
  if (field?.hasHelpText) describedBy.push(field.helpTextId)
  const ariaDescribedBy = describedBy.join(" ")

  return {
    ...props,
    id: props.id || field?.id,
    disabled: props.isDisabled || field?.isDisabled,
    readOnly: props.isReadOnly || field?.isReadOnly,
    "aria-invalid": props.isInvalid || field?.isInvalid,
    "aria-required": props.isRequired || field?.isRequired,
    "aria-readonly": props.isReadOnly || field?.isReadOnly,
    "aria-describedby": ariaDescribedBy || undefined,
    onFocus: callAllHandlers(field?.onFocus, props.onFocus),
    onBlur: callAllHandlers(field?.onBlur, props.onBlur),
  }
}

//////////////////////////////////////////////////////////////////////////////

export type FormErrorIconProps = PropsOf<typeof Icon>

/**
 * FormErrorIcon
 *
 * Used as the visual indicator that a field is invalid or
 * a field has incorrect values.
 */
export const FormErrorIcon = (props: FormErrorIconProps) => {
  const styles = useComponentStyle({ themeKey: "Form.ErrorIcon" })
  const field = useFieldContext()

  if (!field?.isInvalid) return null

  return (
    <Icon data-form-error-icon="" aria-hidden sx={styles} {...props}>
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </Icon>
  )
}
