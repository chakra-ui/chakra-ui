import { ensureFocus, normalizeEventKey, throttle } from "@chakra-ui/utils"
import * as React from "react"
import { useCounter, CounterOptions } from "@chakra-ui/counter"
import { useUpdateEffect, useInterval } from "@chakra-ui/hooks"

export interface NumberInputHookProps extends CounterOptions {
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

const TIMEOUT_DURATION = 300
const INTERVAL_DURATION = 50

type Action = "increment" | "decrement"
type VoidFunction = () => void

function useSpinner() {
  const counter = useCounter({})
  const { increment, decrement } = counter

  const [isSpinning, setIsSpinning] = React.useState(false)
  const [action, setAction] = React.useState<Action | null>(null)
  const [runOnce, setRunOnce] = React.useState(true)

  const timeoutRef = React.useRef<any>(null)
  const removeTimeout = () => {
    clearTimeout(timeoutRef.current)
  }

  useInterval(
    () => {
      if (action === "increment") increment()
      if (action === "decrement") decrement()
    },
    isSpinning ? INTERVAL_DURATION : null,
  )

  // Function to activate the spinning and increment the value
  const spinUp = React.useCallback(() => {
    // increment the first fime
    if (runOnce) increment()

    // after a delay, keep incrementing at interval ("spinning up")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false)
      setIsSpinning(true)
      setAction("increment")
    }, TIMEOUT_DURATION)
  }, [increment, runOnce])

  // Function to activate the spinning and increment the value
  const spinDown = React.useCallback(() => {
    // decrement the first fime
    if (runOnce) decrement()

    // after a delay, keep decrementing at interval ("spinning down")
    timeoutRef.current = setTimeout(() => {
      setRunOnce(false)
      setIsSpinning(true)
      setAction("decrement")
    }, TIMEOUT_DURATION)
  }, [decrement, runOnce])

  // Function to stop spinng (useful for mouseup, keyup handlers)
  const stopSpinning = React.useCallback(() => {
    setRunOnce(true)
    setIsSpinning(false)
    removeTimeout()
  }, [])

  React.useEffect(() => {
    return () => {
      removeTimeout()
    }
  }, [])

  // increment using throttle (useful for keydown handlers)
  const incrementWithThrottle = throttle(INTERVAL_DURATION, () =>
    increment(),
  ) as VoidFunction

  // decrement using throttle (useful for keydown handlers)
  const decrementWithThrottle = throttle(INTERVAL_DURATION, () =>
    decrement(),
  ) as VoidFunction
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

  const [isFocused, setIsFocused] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const isInteractive = !(isReadOnly || isDisabled)

  // Focus the input then you use the spinner to change value
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

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      counter.update(event.target.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [counter.update],
  )

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!isAllowedKey(event)) {
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

  const onFocus = () => setIsFocused(true)

  const onBlur = () => {
    setIsFocused(false)
    if (clampValueOnBlur) {
      validateAndClamp()
    }
  }

  return {
    value: counter.value,
    valueAsNumber: counter.valueAsNumber,
    isFocused,
    isDisabled: isDisabled,
    isReadOnly: isReadOnly,
    upSpinner: {
      onMouseDown: counter.keepIncrementing,
      onMouseUp: counter.stop,
      disabled: counter.isAtMax,
    },
    downSpinner: {
      onMouseDown: counter.keepDecrementing,
      onMouseUp: counter.stop,
      disabled: counter.isAtMin,
    },
    upButton: {
      onClick: counter.increment,
      "aria-label": "add",
      ...(keepWithinRange && {
        disabled: counter.isAtMax,
        "aria-disabled": counter.isAtMax,
      }),
    },
    downButton: {
      onClick: counter.decrement,
      "aria-label": "subtract",
      ...(keepWithinRange && {
        disabled: counter.isAtMin,
        "aria-disabled": counter.isAtMin,
      }),
    },
    input: {
      onChange,
      onKeyDown,
      ref: inputRef,
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
      onFocus,
      onBlur,
    },
    hiddenLabel: {
      "aria-live": "polite",
      children: ariaValueText || counter.value,
    },
    htmlProps,
  }
}

export type NumberInputHookReturn = ReturnType<typeof useNumberInput>

/**
 * Checks if the pressed key is a number input related
 *
 * @param event The keyboard event
 * @returns {Boolean} True or false, obviously :)
 */
function isAllowedKey(event: React.KeyboardEvent) {
  const keyCode = event.which ? event.which : event.keyCode

  const allowedKeys = [
    "Delete",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "Meta",
    "Shift",
    "Enter",
    "Escape",
    "Home",
    "End",
    "+",
    "-",
    ".",
  ]

  const key = normalizeEventKey(event)
  const ctrlKey = event.metaKey || event.ctrlKey

  const isCopy = ctrlKey && key === "c"
  const isPaste = ctrlKey && key === "v"
  const isCut = ctrlKey && key === "x"
  const isSelectAll = ctrlKey && key === "a"

  if (allowedKeys.includes(key) || isCopy || isPaste || isCut || isSelectAll)
    return true

  const notTopNumberKeypad = keyCode > 31 && (keyCode < 48 || keyCode > 57)
  const notNumericKeypad = (keyCode < 96 || keyCode > 105) && keyCode !== 110

  if (event.shiftKey || (notTopNumberKeypad && notNumericKeypad)) return false

  return true
}

export default useNumberInput
