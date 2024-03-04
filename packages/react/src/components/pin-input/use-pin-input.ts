import { useControllableState } from "@chakra-ui/hooks"
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils"
import { nextById, prevById, queryAll } from "@zag-js/dom-utils"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { InputProps } from "./use-pin-input-field"

/* -------------------------------------------------------------------------------------------------
 * usePinInput hook
 * -----------------------------------------------------------------------------------------------*/

export interface UsePinInputProps {
  /**
   * If `true`, the pin input receives focus on mount
   */
  autoFocus?: boolean
  /**
   * The value of the pin input. This is the value
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
   * If `true`, the pin input component signals to its fields that they should
   * use `autocomplete="one-time-code"`.
   */
  otp?: boolean
  /**
   * The top-level id string that will be applied to the input fields.
   * The index of the input will be appended to this top-level id.
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
  /**
   * The type of values the pin-input should allow
   */
  type?: "alphanumeric" | "number"
  /**
   * If `true`, the input's value will be masked just like `type=password`
   */
  mask?: boolean
}

const toArray = (value?: string) => value?.split("")

function validate(value: string, type: UsePinInputProps["type"]) {
  const NUMERIC_REGEX = /^[0-9]+$/
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/i
  const regex = type === "alphanumeric" ? ALPHA_NUMERIC_REGEX : NUMERIC_REGEX
  return regex.test(value)
}

function getAllItems(root: HTMLElement | null) {
  return queryAll(root, "input")
}

/* -------------------------------------------------------------------------------------------------
 * usePinInput - handles the general pin input logic
 * -----------------------------------------------------------------------------------------------*/

/**
 * @internal
 */
export function usePinInput(props: UsePinInputProps = {}) {
  const {
    autoFocus,
    value,
    defaultValue,
    onChange,
    onComplete,
    placeholder = "○",
    manageFocus = true,
    otp = false,
    id: idProp,
    isDisabled,
    isInvalid,
    type = "number",
    mask,
  } = props

  const uuid = useId()
  const id = idProp ?? `pin-input-${uuid}`

  const containerRef = useRef<HTMLDivElement>(null)

  const [moveFocus, setMoveFocus] = useState(true)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const [values, setValues] = useControllableState<string[]>({
    defaultValue: toArray(defaultValue) || [],
    value: toArray(value),
    onChange: (values) => onChange?.(values.join("")),
  })

  useEffect(() => {
    if (autoFocus) {
      const first = getAllItems(containerRef.current)[0]
      if (first) {
        requestAnimationFrame(() => {
          first.focus()
        })
      }
    }
    // We don't want to listen for updates to `autoFocus` since it only runs initially
    // eslint-disable-next-line
  }, [])

  const focusNext = useCallback(
    (index: number) => {
      if (!moveFocus || !manageFocus) return
      const next = nextById(
        getAllItems(containerRef.current),
        `${id}-${index}`,
        false,
      )
      if (next) {
        requestAnimationFrame(() => {
          next.focus()
        })
      }
    },
    [moveFocus, manageFocus, id],
  )

  const setValue = useCallback(
    (value: string, index: number, handleFocus: boolean = true) => {
      const allItems = getAllItems(containerRef.current)
      const nextValues = [...values]
      nextValues[index] = value
      setValues(nextValues)

      const isComplete =
        value !== "" &&
        nextValues.length === allItems.length &&
        nextValues.every(
          (inputValue) => inputValue != null && inputValue !== "",
        )

      if (isComplete) {
        onComplete?.(nextValues.join(""))
      } else {
        if (handleFocus) focusNext(index)
      }
    },
    [values, setValues, focusNext, onComplete],
  )

  const clear = useCallback(() => {
    const allItems = getAllItems(containerRef.current)
    const values: string[] = Array(allItems.length).fill("")
    setValues(values)
    const first = allItems[0]
    first?.focus()
  }, [setValues])

  const getNextValue = useCallback((value: string, eventValue: string) => {
    let nextValue = eventValue
    if (value?.length > 0) {
      if (value[0] === eventValue.charAt(0)) {
        nextValue = eventValue.charAt(1)
      } else if (value[0] === eventValue.charAt(1)) {
        nextValue = eventValue.charAt(0)
      }
    }
    return nextValue
  }, [])

  const getInputProps = useCallback(
    (props: InputProps & { index: number }): InputProps => {
      const { index, ...rest } = props

      /**
       * Improved from: https://github.com/uber/baseweb/blob/master/src/pin-code/pin-code.js
       */
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        const currentValue = values[index]
        const nextValue = getNextValue(currentValue, eventValue)
        const allItems = getAllItems(containerRef.current)

        // if the value was removed using backspace
        if (nextValue === "") {
          setValue("", index)
          return
        }

        // in the case of an autocomplete or copy and paste
        if (eventValue.length > 2) {
          // see if we can use the string to fill out our values
          if (validate(eventValue, type)) {
            // Ensure the value matches the number of inputs
            const nextValue = eventValue
              .split("")
              .filter((_, index) => index < allItems.length)

            setValues(nextValue)
            // if pasting fills the entire input fields, trigger `onComplete`
            if (nextValue.length === allItems.length) {
              onComplete?.(nextValue.join(""))
            }
          }
        } else {
          // only set if the new value is a number
          if (validate(nextValue, type)) {
            setValue(nextValue, index)
          }

          setMoveFocus(true)
        }
      }

      const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Backspace" && manageFocus) {
          if ((event.target as HTMLInputElement).value === "") {
            const prevInput = prevById(
              getAllItems(containerRef.current),
              `${id}-${index}`,
              false,
            )
            if (prevInput) {
              setValue("", index - 1, false)
              prevInput?.focus()
              setMoveFocus(true)
            }
          } else {
            setMoveFocus(false)
          }
        }
      }

      const onFocus = () => {
        setFocusedIndex(index)
      }

      const onBlur = () => {
        setFocusedIndex(-1)
      }

      const hasFocus = focusedIndex === index
      const inputType = type === "number" ? "tel" : "text"

      return {
        "aria-label": "Please enter your pin code",
        inputMode: type === "number" ? "numeric" : "text",
        type: mask ? "password" : inputType,
        ...rest,
        id: `${id}-${index}`,
        disabled: isDisabled,
        "aria-invalid": ariaAttr(isInvalid),
        onChange: callAllHandlers(rest.onChange, onChange),
        onKeyDown: callAllHandlers(rest.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(rest.onFocus, onFocus),
        onBlur: callAllHandlers(rest.onBlur, onBlur),
        value: values[index] || "",
        autoComplete: otp ? "one-time-code" : "off",
        placeholder: hasFocus ? "" : placeholder,
      }
    },
    [
      focusedIndex,
      getNextValue,
      id,
      isDisabled,
      mask,
      isInvalid,
      manageFocus,
      otp,
      placeholder,
      setValue,
      type,
      values,
      setValues,
      onComplete,
    ],
  )

  return {
    containerRef,
    // prop getter
    getInputProps,
    // state
    id,
    values,
    // actions
    setValue,
    setValues,
    clear,
  }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>
