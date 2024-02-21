import { ariaAttr } from "@chakra-ui/utils/attr"
import { callAllHandlers } from "@chakra-ui/utils/call-all"
import { useFieldContext } from "./field-context"
import { UseFieldProps } from "./types"

export function useField<T extends HTMLElement = HTMLInputElement>(
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
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly),
    id: id ?? field?.id,
    disabled: disabled ?? isDisabled ?? field?.isDisabled,
    readOnly: readOnly ?? isReadOnly ?? field?.isReadOnly,
    required: required ?? isRequired ?? field?.isRequired,
    invalid: isInvalid ?? field?.isInvalid,
    onFocus: callAllHandlers(field?.onFocus, onFocus),
    onBlur: callAllHandlers(field?.onBlur, onBlur),
  }
}

export type UseFieldReturn = ReturnType<typeof useField>
