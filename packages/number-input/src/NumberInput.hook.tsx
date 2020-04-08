import {
  ensureFocus,
  normalizeEventKey,
  callAllHandlers,
  mergeRefs,
} from "@chakra-ui/utils"
import * as React from "react"
import { useCounter, UseCounterProps } from "@chakra-ui/counter"
import { useUpdateEffect, useInterval, useBooleanState } from "@chakra-ui/hooks"
import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
  parse,
} from "./NumberInput.utils"
import { useSpinner } from "./NumberInput.spinner"

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
  /**
   * decimal separator
   */
  decimalSeparator?: string
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
    decimalSeparator,
    onChange: onChangeProp,
    ...htmlProps
  } = props

  const counter = useCounter(props)

  const [isFocused, setFocused] = useBooleanState()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const isInteractive = !(isReadOnly || isDisabled)

  useUpdateEffect(() => {
    if (focusInputOnChange && inputRef.current) {
      ensureFocus(inputRef.current)
    }
  }, [counter.value, focusInputOnChange])

  const increment = (step = stepProp) => {
    if (!isInteractive) return

    let valueToUse = parse(counter.value)

    if (isNaN(valueToUse)) {
      valueToUse = min
    }

    const nextValue = counter.clamp(valueToUse + step)
    counter.update(nextValue)
  }

  const decrement = (step = stepProp) => {
    if (!isInteractive) return

    let valueToUse = parse(counter.value)

    if (isNaN(valueToUse)) {
      valueToUse = min
    }

    const nextValue = counter.clamp(valueToUse - step)
    counter.update(nextValue)
  }

  const spinner = useSpinner(increment, decrement)

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueCharacters = event.target.value.split("")

      const sanitizedValueCharacters = valueCharacters.filter(
        isFloatingPointNumericCharacter,
      )

      const sanitizedValue = sanitizedValueCharacters.join("")
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

  const validateAndClamp = () => {
    if (counter.value > max) {
      counter.update(max)
    }

    if (counter.value < min) {
      counter.update(min)
    }
  }

  const ariaValueText =
    typeof getAriaValueText === "function"
      ? getAriaValueText(counter.value)
      : undefined

  const onBlur = () => {
    setFocused.off()

    if (clampValueOnBlur) {
      validateAndClamp()
    }
  }

  type InputProps = React.ComponentPropsWithRef<"input">

  type ButtonProps = {
    onMouseDown?: React.MouseEventHandler
    onMouseUp?: React.MouseEventHandler
  }

  return {
    value: counter.value,
    valueAsNumber: counter.valueAsNumber,
    isFocused,
    isDisabled,
    isReadOnly,
    getIncrementButtonProps: (props: ButtonProps = {}) => ({
      ...props,
      onMouseDown: callAllHandlers(props.onMouseDown, spinner.up),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      disabled: counter.isAtMax,
    }),
    getDecrementButtonProps: (props: ButtonProps = {}) => ({
      ...props,
      onMouseDown: callAllHandlers(props.onMouseDown, spinner.down),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      disabled: counter.isAtMin,
    }),
    getInputProps: (props: InputProps = {}) => ({
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
