import { useBoolean, useId, useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  PropsOf,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyleConfig,
  useStyles,
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

type ControlContext = Omit<
  ReturnType<typeof useFormControlProvider>,
  "htmlProps"
>

const [FormControlProvider, useFormControlContext] = createContext<
  ControlContext
>({
  strict: false,
  name: "FormControlContext",
})

export { useFormControlContext }

function useFormControlProvider(props: FormControlContext) {
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

export interface FormControlProps
  extends PropsOf<typeof chakra.div>,
    ThemingProps,
    FormControlContext {}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
export const FormControl = forwardRef<FormControlProps, "div">(
  function FormControl(props, ref) {
    const styles = useMultiStyleConfig("Form", props)
    const ownProps = omitThemingProps(props)
    const { htmlProps, ...context } = useFormControlProvider(ownProps)

    const _className = cx("chakra-form-control", props.className)

    return (
      <FormControlProvider value={context}>
        <StylesProvider value={styles}>
          <chakra.div
            role="group"
            ref={ref}
            {...htmlProps}
            className={_className}
            __css={{
              width: "100%",
              position: "relative",
            }}
          />
        </StylesProvider>
      </FormControlProvider>
    )
  },
)

if (__DEV__) {
  FormControl.displayName = "FormControl"
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
    const field = useFormControlContext()
    const styles = useStyles()

    if (!field?.isRequired) return null

    const _className = cx("chakra-form__required-indicator", props.className)

    return (
      <chakra.span
        role="presentation"
        aria-hidden
        ref={ref}
        {...props}
        __css={styles.requiredIndicator}
        className={_className}
        children={props.children || "*"}
      />
    )
  },
)

if (__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator"
}

export interface HelpTextProps extends PropsOf<typeof chakra.div> {}

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided
 */
export const FormHelperText = forwardRef<HelpTextProps, "div">(
  function FormHelperText(props, ref) {
    const field = useFormControlContext()
    const styles = useStyles()

    /**
     * Notify the field context when the help text is rendered on
     * screen, so we can apply the correct `aria-describedby` to the field (e.g. input, textarea)
     */
    useSafeLayoutEffect(() => {
      if (field?.isInvalid) {
        return
      }

      field?.setHasHelpText.on()
      return () => field?.setHasHelpText.off()
    }, [])

    if (field?.isInvalid) {
      return null
    }

    const _className = cx("chakra-form__helper-text", props.className)

    return (
      <chakra.div
        ref={ref}
        __css={styles.helperText}
        {...props}
        className={_className}
        id={props.id ?? field?.helpTextId}
      />
    )
  },
)

if (__DEV__) {
  FormHelperText.displayName = "FormHelperText"
}

export interface FormErrorMessageProps extends PropsOf<typeof chakra.div> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instrctions on how to fix it.
 */
export const FormErrorMessage = forwardRef<FormErrorMessageProps, "div">(
  function FormErrorMessage(props, ref) {
    const styles = useStyles()
    const field = useFormControlContext()

    if (!field?.isInvalid) return null

    const _className = cx("chakra-form__error-message", props.className)

    return (
      <chakra.div
        aria-live="polite"
        ref={ref}
        {...props}
        __css={{
          display: "flex",
          alignItems: "center",
          ...styles.errorText,
        }}
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
export const FormErrorIcon = forwardRef<IconProps, "svg">(
  function FormErrorIcon(props, ref) {
    const styles = useStyles()
    const field = useFormControlContext()

    if (!field?.isInvalid) return null

    const _className = cx("chakra-form__error-icon", props.className)

    return (
      <Icon
        ref={ref}
        aria-hidden
        {...props}
        __css={styles.errorIcon}
        className={_className}
      >
        <path
          fill="currentColor"
          d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
        />
      </Icon>
    )
  },
)

if (__DEV__) {
  FormErrorIcon.displayName = "FormErrorIcon"
}
