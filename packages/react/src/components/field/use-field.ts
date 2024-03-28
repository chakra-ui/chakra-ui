"use client"

import { ariaAttr, callAllHandlers } from "@chakra-ui/utils"
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
    invalid,
    onFocus,
    onBlur,
    "aria-describedby": ariaDescribedby,
    ...restProps
  } = props

  const labelIds: string[] = ariaDescribedby ? [ariaDescribedby] : []

  // Error message must be described first in all scenarios.
  if (field?.hasFeedbackText && field?.invalid) {
    labelIds.push(field.feedbackId)
  }

  if (field?.hasHelpText) {
    labelIds.push(field.helpTextId)
  }

  return {
    ...restProps,
    "aria-describedby": labelIds.join(" ") || undefined,
    "aria-invalid": ariaAttr(invalid),
    "aria-required": ariaAttr(required),
    "aria-readonly": ariaAttr(readOnly),
    id: id ?? field?.id,
    disabled: disabled ?? field?.disabled,
    readOnly: readOnly ?? field?.readOnly,
    required: required ?? field?.required,
    invalid: invalid ?? field?.invalid,
    onFocus: callAllHandlers(field?.onFocus, onFocus),
    onBlur: callAllHandlers(field?.onBlur, onBlur),
  }
}

export type UseFieldReturn = ReturnType<typeof useField>
