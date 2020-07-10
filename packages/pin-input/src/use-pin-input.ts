import { useDescendants, useDescendant } from "@chakra-ui/descendant"
import { useControllableState, useId } from "@chakra-ui/hooks"
import {
  mergeRefs,
  callAllHandlers,
  createContext,
  ariaAttr,
} from "@chakra-ui/utils"
import * as React from "react"

export type PinInputContext = UsePinInputReturn & {
  /**
   * Sets the pin input component to the disabled state
   */
  isDisabled?: boolean
  /**
   * Sets the pin input component to the invalid state
   */
  isInvalid?: boolean
}

const [PinInputContextProvider, usePinInputContext] = createContext<
  PinInputContext
>({
  name: "PinInputContext",
  errorMessage:
    "usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`",
})

export { PinInputContextProvider, usePinInputContext }

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
  /**
   * If `true`, focus will move automatically to the next input once filled
   * @default true
   */
  manageFocus?: boolean
  /**
   * The base id string that will be applied to the input fields.
   * The index of the input will be appended to this base id.
   *
   * @example
   * if id="foo", the first input will have `foo-0`
   */
  id?: string
  /**
   * If `true`, the pin input component is put in the disabled state
   */
  isDisabled?: boolean
  /**
   * If `true`, the pin input component is put in the invalid state
   */
  isInvalid?: boolean
}

function toArray(value?: string) {
  if (typeof value === "string") {
    return value.split("")
  }
  return undefined
}

export function usePinInput(props: UsePinInputProps = {}) {
  const {
    autoFocus,
    value,
    defaultValue,
    onChange,
    onComplete,
    placeholder = "○",
    manageFocus = true,
    id: idProp,
    isDisabled,
    isInvalid,
  } = props

  const uuid = useId()
  const id = idProp ?? `pin-input-${uuid}`

  const domContext = useDescendants<HTMLInputElement, {}>()
  const { descendants } = domContext

  const [moveFocus, setMoveFocus] = React.useState(true)

  const [values, setValues] = useControllableState<string[]>({
    defaultValue: toArray(defaultValue) || [],
    value: toArray(value),
    onChange: (values) => onChange?.(values.join("")),
  })

  React.useEffect(() => {
    if (autoFocus) {
      const firstInput = descendants[0]
      firstInput?.element?.focus()
    }
  }, [descendants, autoFocus])

  const focusNext = React.useCallback(
    (index: number) => {
      if (!moveFocus || !manageFocus) return

      const nextInput = descendants[index + 1]
      nextInput?.element?.focus()
    },
    [descendants, moveFocus, manageFocus],
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
    id,
    domContext,
    setValue,
    values,
    setValues,
    setMoveFocus,
    clear,
    onComplete,
    placeholder,
    manageFocus,
    isDisabled,
    isInvalid,
  }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

export interface UsePinInputFieldProps {
  ref?: React.Ref<HTMLInputElement>
  onChange?: React.ChangeEventHandler
  onKeyDown?: React.KeyboardEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
}

export function usePinInputField(props: UsePinInputFieldProps = {}) {
  const { ref: forwardedRef, ...rest } = props

  const ref = React.useRef<HTMLInputElement>(null)

  const {
    id,
    isDisabled,
    isInvalid,
    setValue,
    values,
    setMoveFocus,
    setValues,
    domContext,
    placeholder,
    manageFocus,
  } = usePinInputContext()

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

  // Improved from: https://github.com/uber/baseweb/blob/master/src/pin-code/pin-code.js
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
      if (event.key === "Backspace" && manageFocus) {
        if ((event.target as HTMLInputElement).value === "") {
          const prevInput = descendants[index - 1]
          if (prevInput) {
            setValue("", index - 1)
            prevInput.element?.focus()
            setMoveFocus(true)
          }
        } else {
          setMoveFocus(false)
        }
      }
    },
    [descendants, index, setValue, setMoveFocus, manageFocus],
  )

  const [hasFocus, setHasFocus] = React.useState(false)

  const onFocus = React.useCallback(() => {
    setHasFocus(true)
  }, [])

  const onBlur = React.useCallback(() => {
    setHasFocus(false)
  }, [])

  return {
    ...rest,
    id: `${id}-${index}`,
    disabled: isDisabled,
    "aria-invalid": ariaAttr(isInvalid),
    ref: mergeRefs(ref, forwardedRef),
    onChange: callAllHandlers(rest.onChange, onChange),
    onKeyDown: callAllHandlers(rest.onKeyDown, onKeyDown),
    onFocus: callAllHandlers(rest.onFocus, onFocus),
    onBlur: callAllHandlers(rest.onBlur, onBlur),
    value: values[index] || "",
    inputMode: "numeric" as React.InputHTMLAttributes<any>["inputMode"],
    "aria-label": rest["aria-label"] || "Please enter your pin code",
    autoComplete: "not-allowed",
    placeholder: hasFocus ? "" : placeholder,
  }
}
