import { useBooleanState, useId, useIsomorphicEffect } from "@chakra-ui/hooks"
import { PropsOf, createChakra, useColorModeValue } from "@chakra-ui/system"
import {
  callAllHandlers,
  createContext,
  makeDataAttr as attr,
} from "@chakra-ui/utils"
import * as React from "react"
import Icon from "@chakra-ui/icon"

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
  const [hasHelpText, setHasHelpText] = React.useState(false)

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

const StyledFormControl = createChakra("div")

export type FormControlProps = FormControlContext &
  PropsOf<typeof StyledFormControl>

export const FormControl = React.forwardRef(
  (props: FormControlProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      id,
      isRequired,
      isInvalid,
      isDisabled,
      label,
      errorText,
      helperText,
      ...htmlProps
    } = props
    const fieldContext = useFormControl(props)
    return (
      <FieldContextProvider value={fieldContext}>
        <StyledFormControl
          data-chakra-form-control=""
          role="group"
          ref={ref}
          {...htmlProps}
        />
      </FieldContextProvider>
    )
  },
)

//////////////////////////////////////////////////////////////////////////////

const StyledFormLabel = createChakra("label", {
  themeKey: "Label",
  baseStyle: {
    fontSize: "md",
    paddingRight: "12px",
    paddingBottom: "4px",
    opacity: 1,
    _disabled: {
      opacity: 0.4,
    },
    textAlign: "left",
    verticalAlign: "middle",
    display: "inline-block",
  },
})

export type FormLabelProps = PropsOf<typeof StyledFormLabel>

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const field = useFieldContext()

    return (
      <StyledFormLabel
        {...props}
        data-chakra-form-label=""
        ref={ref}
        data-focus={attr(field.isFocused)}
        data-disabled={attr(field.isDisabled)}
        data-invalid={attr(field.isInvalid)}
        data-loading={attr(field.isLoading)}
        data-readonly={attr(field.isReadOnly)}
        id={props.id || field.labelId}
        htmlFor={props.htmlFor || field.id}
      />
    )
  },
)

//////////////////////////////////////////////////////////////////////////////

const StyledIndicator = createChakra("span", {
  themeKey: "RequiredIndicator",
  baseStyle: props => ({
    marginLeft: 1,
    color: props.colorMode === "dark" ? "red.300" : "red.500",
  }),
})

export type RequiredIndicatorProps = PropsOf<typeof StyledIndicator>

export const RequiredIndicator = React.forwardRef<HTMLSpanElement, {}>(
  (props, ref) => {
    const field = useFieldContext()
    if (!field.isRequired) return null
    return (
      <StyledIndicator
        data-chakra-required-indicator=""
        aria-hidden
        role="presentation"
        ref={ref}
        {...props}
      />
    )
  },
)

//////////////////////////////////////////////////////////////////////////////

const StyledFormHelperText = createChakra("div", {
  themeKey: "HelpText",
  baseStyle: props => ({
    marginTop: 2,
    color: props.colorMode === "dark" ? "whiteAlpha.600" : "gray.500",
    lineHeight: "normal",
    fontSize: "sm",
  }),
})

export type HelpTextProps = PropsOf<typeof StyledFormHelperText>

export function FormHelperText(props: HelpTextProps) {
  const field = useFieldContext()

  /**
   * Notify the field context when the help text is rendered on
   * screen, so we can apply the correct `aria-describedby` to the field (e.g. input, textarea)
   */
  useIsomorphicEffect(() => {
    field.setHasHelpText(true)
    return () => {
      field.setHasHelpText(false)
    }
  }, [])

  return (
    <StyledFormHelperText
      data-chakra-form-helper-text=""
      {...props}
      id={props.id || field.helpTextId}
    />
  )
}

//////////////////////////////////////////////////////////////////////////////

const StyledErrorMessage = createChakra("div", {
  themeKey: "ErrorText",
  baseStyle: props => ({
    color: props.colorMode === "dark" ? "red.300" : "red.500",
    marginTop: 2,
    fontSize: "sm",
    display: "flex",
    alignItems: "center",
  }),
})

export type FormErrorMessageProps = PropsOf<typeof StyledErrorMessage>

export function FormErrorMessage(props: FormErrorMessageProps) {
  const context = useFieldContext()
  if (!context.isInvalid) return null
  return (
    <StyledErrorMessage
      data-chakra-form-error-message=""
      {...props}
      aria-live="polite"
      id={props.id || context.feedbackId}
    />
  )
}

//////////////////////////////////////////////////////////////////////////////

export type FieldHookProps<T extends HTMLElement> = ControlProps & {
  id?: string
  onFocus?: React.FocusEventHandler<T>
  onBlur?: React.FocusEventHandler<T>
}

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

export const FormErrorIcon = (props: FormErrorIconProps) => {
  const color = useColorModeValue(`red.500`, `red.300`)
  const field = useFieldContext()

  if (!field.isInvalid) return null

  return (
    <Icon data-form-error-icon="" color={color} {...props}>
      <path
        fill="currentColor"
        d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
      />
    </Icon>
  )
}
