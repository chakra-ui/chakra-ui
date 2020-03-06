import { useBooleanState, useId, useIsomorphicEffect } from "@chakra-ui/hooks"
import { PropsOf } from "@chakra-ui/system"
import {
  callAllHandlers as compose,
  createContext,
  makeDataAttr as attr,
} from "@chakra-ui/utils"
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

interface FieldProviderProps extends ControlProps {
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

type FieldContext = ReturnType<typeof useFieldProvider>

const [FieldContextProvider, useFieldContext] = createContext<FieldContext>(
  false,
)

export { useFieldContext }

function useFieldProvider(props: FieldProps) {
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
  const id = idProp || `input-${uuid}`

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

export type FieldProps = FieldProviderProps & PropsOf<"div">

export const BaseField = React.forwardRef(
  (props: FieldProps, ref: React.Ref<HTMLDivElement>) => {
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
    const fieldContext = useFieldProvider(props)
    return (
      <FieldContextProvider value={fieldContext}>
        <div role="group" ref={ref} {...htmlProps} />
      </FieldContextProvider>
    )
  },
)

//////////////////////////////////////////////////////////////////////////////

export const BaseLabel = React.forwardRef<HTMLLabelElement, PropsOf<"label">>(
  (props, ref) => {
    const field = useFieldContext()

    return (
      <label
        {...props}
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

export const BaseRequiredIndicator = React.forwardRef<HTMLSpanElement, {}>(
  (props, ref) => {
    const field = useFieldContext()
    if (!field.isRequired) return null
    return <span aria-hidden role="presentation" ref={ref} {...props} />
  },
)

//////////////////////////////////////////////////////////////////////////////

export function BaseHelpText(props: PropsOf<"div">) {
  const field = useFieldContext()

  /**
   * Notify the field context when the BaseHelpText is rendered on
   * screen, so we can apply the correct `aria-describedby` to the field (e.g. input, textarea)
   */
  useIsomorphicEffect(() => {
    field.setHasHelpText(true)
    return () => {
      field.setHasHelpText(false)
    }
  }, [])

  return <div {...props} id={props.id || field.helpTextId} />
}

//////////////////////////////////////////////////////////////////////////////

export function BaseErrorText(props: PropsOf<"div">) {
  const context = useFieldContext()
  if (!context.isInvalid) return null
  return (
    <div {...props} aria-live="polite" id={props.id || context.feedbackId} />
  )
}

//////////////////////////////////////////////////////////////////////////////

export type FieldElementProps<T extends HTMLElement> = ControlProps & {
  id?: string
  onFocus?: React.FocusEventHandler<T>
  onBlur?: React.FocusEventHandler<T>
}

export function useField<T extends HTMLElement>(props: FieldElementProps<T>) {
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
    onFocus: compose(field?.onFocus, props.onFocus),
    onBlur: compose(field?.onBlur, props.onBlur),
  }
}
