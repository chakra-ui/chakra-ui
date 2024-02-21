import { ariaAttr } from "@chakra-ui/utils/attr"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { useFieldContext } from "./field-context"
import { UseFieldProps } from "./types"

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 *
 * @internal
 */
export function useField<T extends HTMLElement>(props: UseFieldProps<T>) {
  const { isDisabled, isInvalid, isReadOnly, isRequired, ...rest } =
    useFieldProps(props)

  return {
    ...rest,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly),
  }
}

/**
 * @internal
 */
export function useFieldProps<T extends HTMLElement = HTMLInputElement>(
  props: UseFieldProps<T>,
) {
  const field = useFieldContext()

  const {
    id,
    disabled,
    readOnly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    "aria-describedby": ariaDescribedby,
  } = props

  const labelIds: string[] = ariaDescribedby ? [ariaDescribedby] : []

  // Error message must be described first in all scenarios.
  if (field?.hasFeedbackText && field?.isInvalid) {
    labelIds.push(field.feedbackId)
  }

  if (field?.hasHelpText) {
    labelIds.push(field.helpTextId)
  }

  return {
    "aria-describedby": labelIds.join(" ") || undefined,
    id: id ?? field?.id,
    isDisabled: disabled ?? isDisabled ?? field?.isDisabled,
    isReadOnly: readOnly ?? isReadOnly ?? field?.isReadOnly,
    isRequired: required ?? isRequired ?? field?.isRequired,
    isInvalid: isInvalid ?? field?.isInvalid,
    onFocus: callAllHandlers(field?.onFocus, onFocus),
    onBlur: callAllHandlers(field?.onBlur, onBlur),
  }
}
