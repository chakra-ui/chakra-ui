import { useDescendant, useDescendants } from "@chakra-ui/descendant"
import { useControllableState, useId } from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  createContext,
  mergeRefs,
} from "@chakra-ui/utils"
import * as React from "react"

type InputProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "color" | "height" | "width"
>

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

      const isComplete =
        value !== "" &&
        index === descendants.length - 1 &&
        nextValues.every((inputValue) => inputValue !== "")

      if (isComplete) {
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
        if (value[0] === eventValue.charAt(0)) {
          nextValue = eventValue.charAt(1)
        } else if (value[0] === eventValue.charAt(1)) {
          nextValue = eventValue.charAt(0)
        }
      }
      return nextValue
    },
    [],
  )

  const [focusedIndex, setFocusedIndex] = React.useState(-1)

  const getInputProps = React.useCallback(
    (props: InputProps & { index: number }): InputProps => {
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
          if (validate(eventValue, type)) {
            // Ensure the value matches the number of inputs
            const nextValue = eventValue
              .split("")
              .filter((_, index) => index < descendants.length)

            setValues(nextValue)

            // if pasting fills the entire input fields, trigger `onComplete`
            if (nextValue.length === descendants.length) {
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
      descendants,
      focusedIndex,
      getNextValue,
      id,
      isDisabled,
      mask,
      isInvalid,
      manageFocus,
      onComplete,
      otp,
      placeholder,
      setValue,
      setValues,
      type,
      values,
    ],
  )

  return {
    // prop getter
    getInputProps,
    // state
    id,
    domContext,
    values,
    // actions
    setValue,
    setValues,
    clear,
  }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

export interface UsePinInputFieldProps extends InputProps {
  ref?: React.Ref<HTMLInputElement>
}

export function usePinInputField(
  props: UsePinInputFieldProps = {},
  forwardedRef: React.Ref<any> = null,
) {
  const ref = React.useRef<HTMLInputElement>(null)

  const { domContext, getInputProps } = usePinInputContext()

  const index = useDescendant({
    context: domContext,
    element: ref.current,
  })

  return getInputProps({
    ...props,
    ref: mergeRefs(ref, forwardedRef),
    index,
  })
}
