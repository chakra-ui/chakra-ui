import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { useControllableState, useId } from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  createContext,
  mergeRefs,
} from "@chakra-ui/utils"
import * as React from "react"

type InputProps = React.ComponentPropsWithRef<"input">

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

const [PinInputProvider, usePinInputContext] = createContext<PinInputContext>({
  name: "PinInputContext",
  errorMessage:
    "usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`",
})

export { PinInputProvider, usePinInputContext }

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
  type?: "string" | "number"
}

function toArray(value?: string) {
  return typeof value === "string" ? value.split("") : undefined
}

function checkValueRegex(value: string, type: "string" | "number") {
  const NUMERIC_REGEX = /^[0-9]+$/
  const ALPHA_NUMERIC_REGEX = /^[a-z0-9]+$/i
  return value.match(type === "string" ? ALPHA_NUMERIC_REGEX : NUMERIC_REGEX)
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
    type = "number",
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
    // We don't want to listen for updates to `autoFocus` since it only runs initially
    // eslint-disable-next-line
  }, [descendants])

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

  const getNextValue = React.useCallback(
    (value: string, eventValue: string) => {
      let nextValue = eventValue
      if (value?.length > 0) {
        const [firstValue, secondValue] = eventValue
        if (value[0] === firstValue) {
          nextValue = secondValue
        } else if (value[0] === secondValue) {
          nextValue = firstValue
        }
      }
      return nextValue
    },
    [],
  )

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const getInputProps = React.useCallback(
    (props: InputProps & { index: number }) => {
      const { index, ...rest } = props

      /**
       * Improved from: https://github.com/uber/baseweb/blob/master/src/pin-code/pin-code.js
       */
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          if (checkValueRegex(eventValue, type)) {
            // Ensure the value matches the number of inputs
            const nextValue = eventValue
              .split("")
              .filter((_, index) => index < descendants.length)

            setValues(nextValue)

            // if pasting fills the entire input fields, trigger `onComplete`
            if (nextValue.length === descendants.length) {
              onComplete?.(nextValue.join(""))
            }
          } else {
            return
          }
        }

        // only set if the new value is a number
        if (checkValueRegex(nextValue, type)) {
          setValue(nextValue, index)
        }

        setMoveFocus(true)
      }

      const onKeyDown = (event: React.KeyboardEvent) => {
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
      }

      const onFocus = () => {
        setFocusedIndex(index)
      }

      const onBlur = () => {
        setFocusedIndex(-1)
      }

      const hasFocus = focusedIndex === index

      return {
        "aria-label": "Please enter your pin code",
        inputMode: "numeric" as React.InputHTMLAttributes<any>["inputMode"],
        ...rest,
        id: `${id}-${index}`,
        disabled: isDisabled,
        "aria-invalid": ariaAttr(isInvalid),
        onChange: callAllHandlers(rest.onChange, onChange),
        onKeyDown: callAllHandlers(rest.onKeyDown, onKeyDown),
        onFocus: callAllHandlers(rest.onFocus, onFocus),
        onBlur: callAllHandlers(rest.onBlur, onBlur),
        value: values[index] || "",
        autoComplete: "not-allowed",
        placeholder: hasFocus ? "" : placeholder,
      }
    },
    [
      descendants,
      focusedIndex,
      getNextValue,
      id,
      isDisabled,
      isInvalid,
      manageFocus,
      onComplete,
      placeholder,
      setValue,
      setValues,
      type,
      values,
    ],
  )

  return {
    getInputProps,
    type,
    id,
    getNextValue,
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

export interface UsePinInputFieldProps extends InputProps {
  ref?: React.Ref<HTMLInputElement>
}

export function usePinInputField(props: UsePinInputFieldProps = {}) {
  const { ref: forwardedRef, ...rest } = props

  const ref = React.useRef<HTMLInputElement>(null)

  const { domContext, getInputProps } = usePinInputContext()

  const index = useDescendant({
    context: domContext,
    element: ref.current,
  })

  return getInputProps({
    ...rest,
    ref: mergeRefs(ref, forwardedRef),
    index,
  })
}
