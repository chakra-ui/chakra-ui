import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import { useBoolean } from "@chakra-ui/hooks"
import { HTMLChakraProps } from "@chakra-ui/system"
import {
  callAllHandlers,
  focus,
  mergeRefs,
  pick,
  PropGetter,
} from "@chakra-ui/utils"
import React, { useCallback, useEffect, useState } from "react"
import { useDatepickerInputContext } from "./datepicker-input-context"
import {
  END_DATE,
  FocusedInput,
  getInputValue,
  parseDate,
  START_DATE,
} from "./hooks/useDatepicker"

export interface UseDatepickerInputFieldProps extends FormControlOptions {
  /**
   * The `id` to use for the number input field.
   */
  id?: string
  /**
   * The HTML `name` attribute used for forms
   */
  name?: string
}

export const useDatepickerInputField = (
  props: UseDatepickerInputFieldProps,
  inputType: FocusedInput = START_DATE,
) => {
  const {
    name,
    isReadOnly,
    isDisabled,
    isInvalid,
    isRequired,
    ...htmlProps
  } = props

  const isEndDate = inputType === END_DATE
  const ctx = useDatepickerInputContext()

  /**
   * Keep track of the focused state of the input,
   * so to better control focusing for datepicker
   */
  const [isFocused, setFocused] = useBoolean(ctx.focusedInput === inputType)

  useEffect(() => {
    if (ctx.focusedInput === inputType) {
      setFocused.on()
    } else {
      setFocused.off()
    }
  }, [ctx.focusInputOnChange, ctx.focusedInput, inputType, setFocused])

  useEffect(() => {
    if (isFocused) {
      if (isEndDate) {
        focus(ctx.endDateInputRef.current)
      } else {
        focus(ctx.startDateInputRef.current)
      }
    }
    return () => {}
  }, [ctx.endDateInputRef, ctx.startDateInputRef, isEndDate, isFocused])

  const controlProps = useFormControl<HTMLInputElement>(props)
  const inputProps = pick(controlProps, [
    "id",
    "disabled",
    "readOnly",
    "required",
    "aria-invalid",
    "aria-required",
    "aria-readonly",
    "aria-describedby",
    "onFocus",
    "onBlur",
  ])

  const [inputValue, setInputValue] = useState(
    getInputValue(
      isEndDate ? ctx.endDate : ctx.startDate,
      ctx.displayFormat,
      "",
    ),
  )

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateString = e.target.value
      setInputValue(dateString)

      const parsedDate = parseDate(dateString, ctx.displayFormat, new Date())

      if (!Number.isNaN(parsedDate.getDate())) {
        ctx.onDateSelect(parsedDate)
      }
    },
    [ctx],
  )

  useEffect(() => {
    setInputValue(
      getInputValue(
        isEndDate ? ctx.endDate : ctx.startDate,
        ctx.displayFormat,
        "",
      ),
    )
  }, [ctx.displayFormat, ctx.endDate, ctx.startDate, isEndDate])

  const onClickOrFocus = useCallback(() => {
    ctx.changeFocusedInput(inputType)
  }, [ctx, inputType])

  const onBlur = useCallback(() => {
    // setFocused.off()
  }, [])

  const getInputProps: PropGetter<
    HTMLInputElement,
    HTMLChakraProps<"input">
  > = useCallback(
    (props = {}, ref = null) => ({
      name: name || isEndDate ? "endDate" : "startDate",
      type: "text",
      ...props,
      ...inputProps,
      ref: mergeRefs(
        isEndDate ? ctx.endDateInputRef : ctx.startDateInputRef,
        ref,
      ),
      value: inputValue,
      autoComplete: "off",
      autoCorrect: "off",
      onFocus: callAllHandlers(props.onFocus, onClickOrFocus),
      onClick: callAllHandlers(props.onClick, onClickOrFocus),
      onChange: callAllHandlers(props.onChange, onChange),
      onBlur: callAllHandlers(props.onBlur, onBlur),
      tabIndex: isEndDate && ctx.focusedInput === START_DATE ? -1 : 0,
    }),
    [
      ctx.endDateInputRef,
      ctx.focusedInput,
      ctx.startDateInputRef,
      inputProps,
      inputValue,
      isEndDate,
      name,
      onBlur,
      onChange,
      onClickOrFocus,
    ],
  )

  return { getInputProps, htmlProps }
}
