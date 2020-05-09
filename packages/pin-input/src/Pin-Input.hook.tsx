import * as React from "react"
import { useDescendants, useDescendant } from "@chakra-ui/descendant"
import { useControllableState } from "@chakra-ui/hooks"
import { mergeRefs, callAllHandlers } from "@chakra-ui/utils"
import { useState, useCallback, useEffect } from "react"

export interface UsePinInputProps {
  /**
   * If `true`, the pin input receives focus on mount
   */
  autoFocus?: boolean
  /**
   * The value of the the pin input. This is the value
   * that will be returned when the pin input is filled
   */
  value?: string
  /**
   * The default value of the pin input
   */
  defaultValue?: string
  /**
   * Function called on input change
   */
  onChange?: (value: string) => void
  /**
   * Function called when all inputs have valid values
   */
  onComplete?: (value: string) => void
  /**
   * The placeholder for the pin input
   */
  placeholder?: string
}

function toArray(value?: string) {
  return value?.split("")
}

export function usePinInput(props: UsePinInputProps = {}) {
  const {
    autoFocus,
    value,
    defaultValue,
    onChange,
    onComplete,
    placeholder = "○",
  } = props

  const domContext = useDescendants<HTMLInputElement, {}>()
  const { descendants } = domContext

  const [moveFocus, setMoveFocus] = useState(true)

  const [values, setValues] = useControllableState<string[]>({
    defaultValue: toArray(defaultValue) || [],
    value: toArray(value),
    onChange: values => onChange?.(values.join("")),
  })

  useEffect(() => {
    if (autoFocus) {
      const firstInput = descendants[0]
      firstInput?.element?.focus()
    }
  }, [descendants, autoFocus])

  const focusNext = useCallback(
    (index: number) => {
      if (!moveFocus) return

      const nextInput = descendants[index + 1]
      nextInput?.element?.focus()
    },
    [descendants, moveFocus],
  )

  const setValue = useCallback(
    (value: string, index: number) => {
      const nextValues = [...values]
      nextValues[index] = value
      setValues(nextValues)

      // if we're at the last input, call onComplete (no need to move focus)
      if (index === descendants.length - 1) {
        onComplete?.(nextValues.join(""))
      } else {
        focusNext(index)
      }
    },
    [values, setValues, focusNext, onComplete, descendants.length],
  )

  const clear = React.useCallback(() => {
    const values: string[] = Array(descendants.length).fill("")
    setValues(values)
    const firstInput = descendants[0]
    firstInput.element?.focus()
  }, [descendants, setValues])

  return {
    domContext,
    setValue,
    values,
    setValues,
    setMoveFocus,
    clear,
    onComplete,
    placeholder,
  }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

export interface UsePinInputFieldProps {
  context: UsePinInputReturn
  ref?: React.Ref<HTMLInputElement>
  onChange?: React.ChangeEventHandler
  onKeyDown?: React.KeyboardEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
}

export function usePinInputField(props: UsePinInputFieldProps) {
  const { context, ref: forwardedRef, ...htmlProps } = props

  const ref = React.useRef<HTMLInputElement>(null)

  const {
    setValue,
    values,
    setMoveFocus,
    setValues,
    domContext,
    placeholder,
  } = context

  const { descendants } = domContext

  const index = useDescendant({
    context: domContext,
    element: ref.current,
  })

  const getNextValue = React.useCallback(
    (currentValue: string, eventValue: string) => {
      let nextValue = eventValue
      if (currentValue && currentValue.length > 0) {
        if (currentValue[0] === eventValue[0]) {
          nextValue = eventValue[1]
        } else if (currentValue[0] === eventValue[1]) {
          nextValue = eventValue[0]
        }
      }
      return nextValue
    },
    [],
  )

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value
      const currentValue = values[index]
      const nextValue = getNextValue(currentValue, eventValue)

      // if the value was removed using backspace
      if (nextValue === "") {
        setValue("", index)
        return
      }

      // in the case of an autocomplete or copy and paste
      if (eventValue.length > 2) {
        // see if we can use the string to fill out our values
        if (eventValue.match(/^[0-9]+$/)) {
          const length = descendants.length
          // ensure the value matches the number of inputs
          const nextValue = eventValue.split("").filter((_, i) => i < length)
          setValues(nextValue)
        }
        return
      }

      // only set if the new value is a number
      if (nextValue.match(/^[0-9]$/)) {
        setValue(nextValue, index)
      }

      setMoveFocus(true)
    },
    [
      values,
      index,
      getNextValue,
      setMoveFocus,
      setValue,
      descendants.length,
      setValues,
    ],
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Backspace") {
        //@ts-ignore
        if (event.target.value === "") {
          if (descendants[index - 1]) {
            setValue("", index - 1)
            const prevInput = descendants[index - 1]
            prevInput.element?.focus()
            setMoveFocus(true)
          }
        } else {
          setMoveFocus(false)
        }
      }
    },
    [descendants, index, setValue, setMoveFocus],
  )

  const [hasFocus, setHasFocus] = useState(false)

  const onFocus = useCallback(() => {
    setHasFocus(true)
  }, [])

  const onBlur = useCallback(() => {
    setHasFocus(false)
  }, [])

  const value = values[index] || ""

  return {
    ...htmlProps,
    ref: mergeRefs(ref, forwardedRef),
    onChange: callAllHandlers(htmlProps.onChange, onChange),
    onKeyDown: callAllHandlers(htmlProps.onKeyDown, onKeyDown),
    onFocus: callAllHandlers(htmlProps.onFocus, onFocus),
    onBlur: callAllHandlers(htmlProps.onBlur, onBlur),
    value,
    inputMode: "numeric" as React.InputHTMLAttributes<any>["inputMode"],
    "aria-label": "Please enter your pin code",
    autoComplete: "not-allowed",
    placeholder: hasFocus ? "" : placeholder,
  }
}
