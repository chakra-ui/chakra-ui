import {
  ensureFocus,
  normalizeEventKey,
  callAllHandlers,
  mergeRefs,
} from "@chakra-ui/utils"
import * as React from "react"
import { useCounter, CounterHookProps } from "@chakra-ui/counter"
import { useUpdateEffect, useInterval, useBooleanState } from "@chakra-ui/hooks"
import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
} from "./NumberInput.utils"

export interface NumberInputHookProps extends CounterHookProps {
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
  getAriaValueText?: (value: number | string) => string
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
   * Specifies the value extracted from formatter
   * @default parseFloat
   *
   */
  parse?: (value: string) => number
  /**
   * Specifies the format of the value presented
   */
  format?: (value: string | number) => string
  /**
   * decimal separator
   */
  decimalSeparator?: string
}

export function useNumberInput(props: NumberInputHookProps = {}) {
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
    parse,
    format,
    decimalSeparator,
    onChange: onChangeProp,
    ...htmlProps
  } = props

  const counter = useCounter(props)

  const [isFocused, setFocused] = useBooleanState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const isInteractive = !(isReadOnly || isDisabled)

  useUpdateEffect(() => {
    if (focusInputOnChange && inputRef.current) {
      ensureFocus(inputRef.current)
    }
  }, [counter.value, focusInputOnChange])

  const increment = (step = stepProp) => {
    if (!isInteractive) return
    let valueToUse = +counter.value
    if (isNaN(valueToUse)) {
      valueToUse = min
    }
    const nextValue = counter.clamp(valueToUse + step)
    counter.update(nextValue)
  }

  const decrement = (step = stepProp) => {
    if (!isInteractive) return
    let valueToUse = +counter.value
    if (isNaN(valueToUse)) {
      valueToUse = min
    }
    const nextValue = counter.clamp(valueToUse - step)
    counter.update(nextValue)
  }

  const spinner = useSpinner(increment, decrement)

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const valueChars = value.split("")
      const sanitizedValueChars = valueChars.filter(
        isFloatingPointNumericCharacter,
      )
      const sanitizedValue = sanitizedValueChars.join("")
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
    if (counter.value > max) counter.update(max)
    if (counter.value < min) counter.update(min)
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

  type InputProps = {
    ref?: React.Ref<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onChange?: React.ChangeEventHandler<HTMLInputElement>
  }

  type ButtonProps = {
    onMouseDown?: React.MouseEventHandler
    onMouseUp?: React.MouseEventHandler
  }

  return {
    value: counter.value,
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

export type NumberInputHookReturn = ReturnType<typeof useNumberInput>

const CONTINUOUS_CHANGE_DELAY = 300
const CONTINUOUS_CHANGE_INTERVAL = 50

function useSpinner(increment: Function, decrement: Function) {
  type Action = "increment" | "decrement"

  // To keep incrementing/decrementing on mousedown, we call that `spinning`
  const [isSpinning, setIsSpinning] = React.useState(false)

  // This state keeps track of the action ("increment" or "decrement")
  const [action, setAction] = React.useState<Action | null>(null)

  // To increment the value the first time you mousedown, we call that `runOnce`
  const [runOnce, setRunOnce] = React.useState(true)

  // Store the timeout instance id in a ref, so we can clear the timeout later
  const timeoutRef = React.useRef<any>(null)

  // Clears the timeout from memory
  const removeTimeout = () => clearTimeout(timeoutRef.current)

  /**
   * useInterval hook provides a performant way to
   * update the state value at specific interval
   */
  useInterval(
    () => {
      if (action === "increment") increment()
      if (action === "decrement") decrement()
    },
    isSpinning ? CONTINUOUS_CHANGE_INTERVAL : null,
  )

  // Function to activate the spinning and increment the value
  const up = React.useCallback(() => {
    // increment the first fime
    if (runOnce) increment()

    // after a delay, keep incrementing at interval ("spinning up")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false)
      setIsSpinning(true)
      setAction("increment")
    }, CONTINUOUS_CHANGE_DELAY)
  }, [increment, runOnce])

  // Function to activate the spinning and increment the value
  const down = React.useCallback(() => {
    // decrement the first fime
    if (runOnce) decrement()

    // after a delay, keep decrementing at interval ("spinning down")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false)
      setIsSpinning(true)
      setAction("decrement")
    }, CONTINUOUS_CHANGE_DELAY)
  }, [decrement, runOnce])

  // Function to stop spinng (useful for mouseup, keyup handlers)
  const stop = React.useCallback(() => {
    setRunOnce(true)
    setIsSpinning(false)
    removeTimeout()
  }, [])

  /**
   * If the component unmounts while spinning,
   * let's clear the timeout as well
   */
  React.useEffect(() => {
    return () => {
      removeTimeout()
    }
  }, [])

  return { up, down, stop }
}
