import { FormControlOptions, useFormControlContext } from "./form-control"
import { ariaAttr, dataAttr, callAllHandlers, Dict } from "@chakra-ui/utils"

export type UseFormControlProps<T extends HTMLElement> = FormControlOptions & {
  id?: string
  onFocus?: React.FocusEventHandler<T>
  onBlur?: React.FocusEventHandler<T>
  disabled?: boolean
  readOnly?: boolean
}

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 */
export function useFormControl<T extends HTMLElement>(
  props: UseFormControlProps<T>,
) {
  const field = useFormControlContext()
  const describedBy: string[] = []

  if (field?.isInvalid) {
    /**
     * Error message must be described first
     * in all scenarios
     */
    if (describedBy.length > 0) {
      describedBy.unshift(field.feedbackId)
    } else {
      describedBy.push(field.feedbackId)
    }
  }

  if (field?.hasHelpText) describedBy.push(field.helpTextId)
  const ariaDescribedBy = describedBy.join(" ")

  return {
    ...props,
    id: props.id ?? field?.id,
    disabled: props.disabled || props.isDisabled || field?.isDisabled,
    readOnly: props.readOnly || props.isReadOnly || field?.isReadOnly,
    "aria-invalid": ariaAttr(props.isInvalid || field?.isInvalid),
    "aria-required": ariaAttr(props.isRequired || field?.isRequired),
    "aria-readonly": ariaAttr(props.isReadOnly || field?.isReadOnly),
    "aria-describedby": ariaDescribedBy || undefined,
    onFocus: callAllHandlers(field?.onFocus, props.onFocus),
    onBlur: callAllHandlers(field?.onBlur, props.onBlur),
  }
}

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
