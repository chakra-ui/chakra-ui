import * as React from "react"
import { useDescendants, useDescendant } from "@chakra-ui/descendant"

export interface PinStateHookProps {
  autoFocus?: boolean
  value?: string
  defaultValue?: string
  onChange?: (nextValue: string) => void
  onComplete?: () => void
}

export function usePinInputState(props: PinStateHookProps = {}) {
  const { autoFocus } = props

  const descendantsContext = useDescendants<HTMLInputElement, {}>()

  const { descendants } = descendantsContext

  const [moveFocus, setMoveFocus] = React.useState(true)

  const [values, setValues] = React.useState<string[]>([])

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
      focusNext(index)
    },
    [values, focusNext],
  )

  const clear = React.useCallback(() => {
    const values: string[] = Array(descendants.length).fill("")
    setValues(values)
    const firstInput = descendants[0]
    firstInput.element?.focus()
  }, [descendants])

  return {
    descendantsContext,
    setValue,
    values,
    setValues,
    setMoveFocus,
    clear,
  }
}

type PinInputHookReturn = ReturnType<typeof usePinInputState>

export interface PinInputHookProps {
  context: PinInputHookReturn
}

export function usePinInput(props: PinInputHookProps) {
  const { context } = props

  const ref = React.useRef<HTMLInputElement>(null)

  const {
    setValue,
    values,
    setMoveFocus,
    setValues,
    descendantsContext,
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
    placeholder: hasFocus ? "" : "○",
    size: 1,
  }
}
