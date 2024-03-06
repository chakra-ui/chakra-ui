import { mergeRefs } from "@chakra-ui/hooks"
import { PropGetter, dataAttr } from "@chakra-ui/utils"
import { useCallback, useId, useState } from "react"
import { FieldContext } from "./types"

export function useFieldProvider(props: FieldContext) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...rootProps
  } = props

  // Generate all the required ids
  const uuid = useId()
  const id = idProp || `field-${uuid}`

  const labelId = `${id}-label`
  const feedbackId = `${id}-feedback`
  const helpTextId = `${id}-helptext`

  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasFeedbackText, setHasFeedbackText] = useState(false)

  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasHelpText, setHasHelpText] = useState(false)

  // Track whether the form element (e.g, `input`) has focus.
  const [isFocused, setFocus] = useState(false)

  const getHelpTextProps = useCallback<PropGetter>(
    (props = {}, _ref = null) => ({
      id: helpTextId,
      ...props,
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(_ref, (node) => {
        if (!node) return
        setHasHelpText(true)
      }),
    }),
    [helpTextId],
  )

  const getLabelProps = useCallback<PropGetter>(
    (props = {}, _ref = null) => ({
      ...props,
      ref: _ref,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: props.id || labelId,
      htmlFor: props.htmlFor || id,
    }),
    [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId],
  )

  const getErrorMessageProps = useCallback<PropGetter>(
    (props = {}, _ref = null) => ({
      id: feedbackId,
      ...props,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(_ref, (node) => {
        if (!node) return
        setHasFeedbackText(true)
      }),
      "aria-live": "polite",
    }),
    [feedbackId],
  )

  const getRootProps = useCallback<PropGetter>(
    (props = {}, _ref = null) => ({
      ...props,
      ...rootProps,
      ref: _ref,
      role: "group",
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
    }),
    [rootProps, isDisabled, isFocused, isInvalid, isReadOnly],
  )

  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
  }
}

export type UseFieldProviderReturn = ReturnType<typeof useFieldProvider>
