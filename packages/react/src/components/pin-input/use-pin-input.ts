"use client"

import { useControllableState } from "@chakra-ui/hooks"
import { ariaAttr, callAllHandlers } from "@chakra-ui/utils"
import { nextById, prevById, queryAll, raf } from "@zag-js/dom-utils"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { PropGetterFn } from "../../styled-system/factory.types"

export interface UsePinInputProps {
  /**
   * If `true`, the pin input receives focus on mount
   */
  autoFocus?: boolean
  /**
   * The value of the pin input. This is the value
   * that will be returned when the pin input is filled
   */
  value?: string[]
  /**
   * The default value of the pin input
   */
  defaultValue?: string[]
  /**
   * Function called on input change
   */
  onChange?: (value: string[]) => void
  /**
   * Function called when all inputs have valid values
   */
  onComplete?: (value: string[]) => void
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
  disabled?: boolean
  /**
   * If `true`, the pin input component is put in the invalid state
   */
  invalid?: boolean
  /**
   * The type of values the pin-input should allow
   */
  type?: "alphanumeric" | "number"
  /**
   * If `true`, the input's value will be masked just like `type=password`
   */
  mask?: boolean
}

function validate(value: string, type: UsePinInputProps["type"]) {
  const NUMERIC_REGEX = /^[0-9]+$/
  const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/i
  const regex = type === "alphanumeric" ? ALPHA_NUMERIC_REGEX : NUMERIC_REGEX
  return regex.test(value)
}

const getItems = (node: HTMLElement | null, id: string) => {
  return queryAll(node, `input[data-ownedby="${id}"]`)
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
    disabled,
    invalid,
    type = "number",
    mask,
  } = props

  const uuid = useId()
  const id = idProp ?? `pin-input-${uuid}`

  const controlRef = useRef<HTMLDivElement>(null)

  const [moveFocus, setMoveFocus] = useState(true)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const [values, setValues] = useControllableState<string[]>({
    defaultValue: defaultValue || [],
    value,
    onChange,
  })

  const focus = useCallback(
    (index: number) => {
      const items = getItems(controlRef.current, id)
      const input = items[index]
      raf(() => input?.focus())
    },
    [id],
  )

  useEffect(() => {
    if (autoFocus) {
      focus(0)
    }
    // We don't want to listen for updates to `autoFocus` since it only runs initially
    // eslint-disable-next-line
  }, [])

  const focusNext = useCallback(
    (index: number) => {
      if (!moveFocus || !manageFocus) return

      const items = getItems(controlRef.current, id)
      const next = nextById(items, `${id}-${index}`, false)

      if (next) {
        raf(() => next.focus())
      }
    },
    [moveFocus, manageFocus, id],
  )

  const setValue = useCallback(
    (value: string, index: number, handleFocus: boolean = true) => {
      const items = getItems(controlRef.current, id)

      const nextValues = [...values]
      nextValues[index] = value
      setValues(nextValues)

      const isComplete =
        value !== "" &&
        nextValues.length === items.length &&
        nextValues.every(
          (inputValue) => inputValue != null && inputValue !== "",
        )

      if (isComplete) {
        onComplete?.(nextValues)
      } else {
        if (handleFocus) focusNext(index)
      }
    },
    [values, setValues, focusNext, onComplete, id],
  )

  const clear = useCallback(() => {
    const items = getItems(controlRef.current, id)
    const values = Array.from<string>({ length: items.length }).fill("")

    setValues(values)

    const first = items[0]
    first?.focus()
  }, [setValues, id])

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

  const getLabelProps: PropGetterFn<"label"> = useCallback(
    (props, ref = null) => {
      return {
        ref,
        ...props,
        id: `${id}-label`,
        htmlFor: `${id}-0`,
        onClick(event) {
          event.preventDefault()
          focus(0)
        },
      }
    },
    [id, focus],
  )

  const getInputProps: PropGetterFn<"input", { index: number }> = useCallback(
    (props, ref = null) => {
      const { index, ...rest } = props!

      /**
       * Improved from: https://github.com/uber/baseweb/blob/master/src/pin-code/pin-code.js
       */
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        const currentValue = values[index]
        const nextValue = getNextValue(currentValue, eventValue)
        const items = getItems(controlRef.current, id)

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
              .filter((_, index) => index < items.length)

            setValues(nextValue)
            // if pasting fills the entire input fields, trigger `onComplete`
            if (nextValue.length === items.length) {
              onComplete?.(nextValue)
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

      const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && manageFocus) {
          if (event.currentTarget.value === "") {
            const items = getItems(controlRef.current, id)
            const prevInput = prevById(items, `${id}-${index}`, false)

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
        ref,
        "aria-label": "pin code",
        inputMode: type === "number" ? "numeric" : "text",
        type: mask ? "password" : inputType,
        ...rest,
        id: `${id}-${index}`,
        "data-ownedby": id,
        disabled: disabled,
        "aria-invalid": ariaAttr(invalid),
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
      disabled,
      mask,
      invalid,
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
    controlRef,
    getInputProps,
    getLabelProps,
    id,
    values,
    setValue,
    setValues,
    clear,
  }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>
