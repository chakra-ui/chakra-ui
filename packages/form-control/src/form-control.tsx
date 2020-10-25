import { useBoolean, useId, useSafeLayoutEffect } from "@chakra-ui/hooks"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { createContext, cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

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
  extends HTMLChakraProps<"div">,
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

export interface HelpTextProps extends HTMLChakraProps<"div"> {}

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
        return undefined
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
