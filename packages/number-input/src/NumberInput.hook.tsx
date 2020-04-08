import { useCounter, UseCounterProps } from "@chakra-ui/counter"
import { useBooleanState } from "@chakra-ui/hooks"
import {
  callAllHandlers,
  Dict,
  ensureFocus,
  mergeRefs,
  normalizeEventKey,
  StringOrNumber,
} from "@chakra-ui/utils"
import * as React from "react"
import { useSpinner } from "./NumberInput.spinner"
import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
  parse,
} from "./NumberInput.utils"

export interface UseNumberInputProps extends UseCounterProps {
  /**
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean
  /**
   * This controls the value update when you blur out of the input.
   * - If `true` and the value is greater than `max`, the value will be reset to `max`
   * - Else, the value remains the same.
   *
   * @default true
   */
  clampValueOnBlur?: boolean
  /**
   * This is used to format the value so that screen readers
   * can speak out a more human-friendly value.
   *
   * It is used to set the `aria-valuetext` property of the input
   */
  getAriaValueText?(value: number | string): string
  /**
   * If `true`, the input will be in readonly mode
   */
  isReadOnly?: boolean
  /**
   * If `true`, the input will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean
  /**
   * If `true`, the input will be disabled
   */
  isDisabled?: boolean
}

export function useNumberInput(props: UseNumberInputProps = {}) {
  const {
    focusInputOnChange = true,
    clampValueOnBlur = true,
    keepWithinRange = true,
    min = -Infinity,
    max = Infinity,
    step: stepProp = 1,
    isReadOnly,
    isDisabled,
    getAriaValueText,
    isInvalid,
    onChange: onChangeProp,
    ...htmlProps
  } = props

  const counter = useCounter(props)

  const [isFocused, setFocused] = useBooleanState()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const isInteractive = !(isReadOnly || isDisabled)

  const increment = (step = stepProp) => {
    if (isInteractive) {
      counter.increment(step)
    }
  }

  const decrement = (step = stepProp) => {
    if (isInteractive) {
      counter.decrement(step)
    }
  }

  const spinner = useSpinner(increment, decrement)

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const characters = event.target.value.split("")

      const sanitizedCharacters = characters.filter(
        isFloatingPointNumericCharacter,
      )

      const sanitizedValue = sanitizedCharacters.join("")
      counter.update(sanitizedValue)
    },
    // eslint-disable-next-line
    [counter.update],
  )

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!isValidNumericKeyboardEvent(event)) {
      event.preventDefault()
    }

    const eventKey = normalizeEventKey(event)
    const factor = getIncrementFactor(event)
    const valueStep = factor * stepProp

    switch (eventKey) {
      case "ArrowUp":
        event.preventDefault()
        increment(valueStep)
        break
      case "ArrowDown":
        event.preventDefault()
        decrement(valueStep)
        break
      case "Home":
        event.preventDefault()
        counter.update(min)
        break
      case "End":
        event.preventDefault()
        counter.update(max)
        break
      default:
        break
    }
  }

  const getIncrementFactor = (event: React.KeyboardEvent) => {
    let ratio = 1
    if (event.metaKey || event.ctrlKey) {
      ratio = 0.1
    }
    if (event.shiftKey) {
      ratio = 10
    }
    return ratio
  }

  const ariaValueText =
    typeof getAriaValueText === "function"
      ? getAriaValueText(counter.value)
      : undefined

  const validateAndClamp = () => {
    let next = counter.value as StringOrNumber

    if (counter.valueAsNumber < min) {
      next = min
    }

    if (counter.valueAsNumber > max) {
      next = max
    }

    counter.cast(next)
  }

  const onBlur = () => {
    setFocused.off()

    if (clampValueOnBlur) {
      validateAndClamp()
    }
  }

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current) {
      ensureFocus(inputRef.current)
    }
  }

  const spinUp = (event: React.MouseEvent) => {
    event.preventDefault()
    spinner.up()
    focusInput()
  }

  const spinDown = (event: React.MouseEvent) => {
    event.preventDefault()
    spinner.down()
    focusInput()
  }

  return {
    value: counter.value,
    valueAsNumber: counter.valueAsNumber,
    isFocused,
    isDisabled,
    isReadOnly,
    getIncrementButtonProps: (props: Dict = {}) => ({
      ...props,
      onMouseDown: callAllHandlers(props.onMouseDown, spinUp),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      disabled: keepWithinRange && counter.isAtMax,
    }),
    getDecrementButtonProps: (props: Dict = {}) => ({
      ...props,
      onMouseDown: callAllHandlers(props.onMouseDown, spinDown),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      disabled: keepWithinRange && counter.isAtMin,
    }),
    getInputProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(inputRef, props.ref),
      value: counter.value,
      role: "spinbutton",
      type: "text",
      inputMode: "numeric" as any,
      pattern: "[0-9]*",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-disabled": isDisabled,
      "aria-valuenow": counter.valueAsNumber,
      "aria-invalid": isInvalid || counter.isOutOfRange,
      "aria-valuetext": ariaValueText,
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: "off",
      autoCorrect: "off",
      onChange: callAllHandlers(props.onChange, onChange),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, onBlur),
    }),
    htmlProps,
  }
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>
