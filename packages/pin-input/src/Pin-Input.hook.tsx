import * as React from "react"
import { useDescendants, useDescendant } from "@chakra-ui/descendant"
import { useControllableState } from "@chakra-ui/hooks"

export interface PinInputHookProps {
  autoFocus?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  placeholder?: string
}

function toArray(value?: string) {
  return value?.split("")
}

export function usePinInput(props: PinInputHookProps = {}) {
  const {
    autoFocus,
    value,
    defaultValue,
    onChange,
    onComplete,
    placeholder = "○",
  } = props

  const descendantsContext = useDescendants<HTMLInputElement, {}>()
  const { descendants } = descendantsContext

  const [moveFocus, setMoveFocus] = React.useState(true)

  const [values, setValues] = useControllableState<string[]>({
    defaultValue: toArray(defaultValue) || [],
    value: toArray(value),
    onChange: values => onChange?.(values.join("")),
  })

  React.useEffect(() => {
    if (autoFocus) {
      const firstInput = descendants[0]
      firstInput?.element?.focus()
    }
  }, [descendants, autoFocus])

  const focusNext = React.useCallback(
    (index: number) => {
      if (!moveFocus) return

      const nextInput = descendants[index + 1]
      nextInput?.element?.focus()
    },
    [descendants, moveFocus],
  )

  const setValue = React.useCallback(
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
    descendantsContext,
    setValue,
    values,
    setValues,
    setMoveFocus,
    clear,
    onComplete,
    placeholder,
  }
}

export type PinInputHookReturn = ReturnType<typeof usePinInput>

export interface PinInputFieldHookProps {
  context: PinInputHookReturn
}

export function usePinInputField(props: PinInputFieldHookProps) {
  const { context } = props

  const ref = React.useRef<HTMLInputElement>(null)

  const {
    setValue,
    values,
    setMoveFocus,
    setValues,
    descendantsContext,
    placeholder,
  } = context

  const { descendants } = descendantsContext

  const { index } = useDescendant({
    context: descendantsContext,
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

  const onChange = React.useCallback(
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

  const onKeyDown = React.useCallback(
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

  const [hasFocus, setHasFocus] = React.useState(false)

  const onFocus = React.useCallback(() => {
    setHasFocus(true)
  }, [])

  const onBlur = React.useCallback(() => {
    setHasFocus(false)
  }, [])

  const value = values[index] || ""

  return {
    ref,
    onChange,
    onKeyDown,
    onFocus,
    onBlur,
    value,
    inputMode: "numeric" as React.InputHTMLAttributes<any>["inputMode"],
    "aria-label": "Please enter your pin code",
    autoComplete: "not-allowed",
    placeholder: hasFocus ? "" : placeholder,
  }
}
