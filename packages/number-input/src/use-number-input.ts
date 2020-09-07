import { useCounter, UseCounterProps } from "@chakra-ui/counter"
import { useBoolean } from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  focus,
  isBrowser,
  isNull,
  maxSafeInteger,
  mergeRefs,
  minSafeInteger,
  normalizeEventKey,
  PropGetter,
  StringOrNumber,
} from "@chakra-ui/utils"
import { ChangeEvent, KeyboardEvent, useCallback, useRef } from "react"
import { useSpinner } from "./use-spinner"
import {
  isFloatingPointNumericCharacter,
  isValidNumericKeyboardEvent,
} from "./utils"

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
  getAriaValueText?(value: StringOrNumber): string
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
   * The `id` to use for the number input field.
   */
  id?: string
  /**
   * The pattern used to check the <input> element's value against on form submission.
   *
   * @default
   * "[0-9]*(.[0-9]+)?"
   */
  pattern?: React.InputHTMLAttributes<any>["pattern"]
  /**
   * Hints at the type of data that might be entered by the user. It also determines
   * the type of keyboard shown to the user on mobile devices
   *
   * @default
   * "decimal"
   */
  inputMode?: React.InputHTMLAttributes<any>["inputMode"]
}

/**
 * React hook that implements the WAI-ARIA Spin Button widget
 * and used to create numeric input fields.
 *
 * It returns prop getters you can use to build your own
 * custom number inputs.
 *
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton
 * @see Docs     https://www.chakra-ui.com/useNumberInput
 * @see WHATWG   https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)
 */
export function useNumberInput(props: UseNumberInputProps = {}) {
  const {
    focusInputOnChange = true,
    clampValueOnBlur = true,
    keepWithinRange = true,
    min = minSafeInteger,
    max = maxSafeInteger,
    step: stepProp = 1,
    isReadOnly,
    isDisabled,
    getAriaValueText,
    isInvalid,
    pattern = "[0-9]*(.[0-9]+)?",
    inputMode = "decimal",
    id,
    /**
     * These props are destructured to ensure `htmlProps` resolves to the correct type
     */
    onChange: onChangeProp,
    precision,
    ...htmlProps
  } = props

  /**
   * Leverage the `useCounter` hook since it provides
   * the functionality to `increment`, `decrement` and `update`
   * counter values
   */
  const counter = useCounter(props)
  const {
    update: updateFn,
    increment: incrementFn,
    decrement: decrementFn,
  } = counter

  /**
   * Keep track of the focused state of the input,
   * so user can this to change the styles of the
   * `spinners`, maybe :)
   */
  const [isFocused, setFocused] = useBoolean()

  const inputRef = useRef<HTMLInputElement>(null)

  const isInteractive = !(isReadOnly || isDisabled)

  const increment = useCallback(
    (step = stepProp) => {
      if (isInteractive) {
        incrementFn(step)
      }
    },
    [incrementFn, isInteractive, stepProp],
  )

  const decrement = useCallback(
    (step = stepProp) => {
      if (isInteractive) {
        decrementFn(step)
      }
    },
    [decrementFn, isInteractive, stepProp],
  )

  /**
   * Leverage the `useSpinner` hook to spin the input's value
   * when long press on the up and down buttons.
   *
   * This leverages `setInterval` internally
   */
  const spinner = useSpinner(increment, decrement)

  /**
   * The `onChange` handler filters out any character typed
   * that isn't floating point compatible.
   */
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const valueString = event.target.value
        .split("")
        .filter(isFloatingPointNumericCharacter)
        .join("")
      updateFn(valueString)
    },
    [updateFn],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      /**
       * only allow valid numeric keys
       */
      if (!isValidNumericKeyboardEvent(event)) {
        event.preventDefault()
      }

      /**
       * Keyboard Accessibility
       *
       * We want to increase or decrease the input's value
       * based on if the user the arrow keys.
       *
       * @see https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-17
       */
      const stepFactor = getStepFactor(event) * stepProp

      const eventKey = normalizeEventKey(event)

      switch (eventKey) {
        case "ArrowUp":
          event.preventDefault()
          increment(stepFactor)
          break
        case "ArrowDown":
          event.preventDefault()
          decrement(stepFactor)
          break
        case "Home":
          event.preventDefault()
          updateFn(min)
          break
        case "End":
          event.preventDefault()
          updateFn(max)
          break
        default:
          break
      }
    },
    [updateFn, decrement, increment, max, min, stepProp],
  )

  const getStepFactor = (event: KeyboardEvent) => {
    let ratio = 1
    if (event.metaKey || event.ctrlKey) {
      ratio = 0.1
    }
    if (event.shiftKey) {
      ratio = 10
    }
    return ratio
  }

  /**
   * If user would like to use a human-readable representation
   * of the value, rather than the value itself they can pass `getAriaValueText`
   *
   * @see https://www.w3.org/TR/wai-aria-practices-1.1/#wai-aria-roles-states-and-properties-18
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext
   */
  const _getAriaValueText = () => {
    const text = getAriaValueText?.(counter.value)
    if (!isNull(text)) {
      return text
    }

    const defaultText = counter.value.toString()
    // empty string is an invalid ARIA attribute value
    return !defaultText ? undefined : defaultText
  }

  const ariaValueText = _getAriaValueText()

  /**
   * Function that clamps the input's value on blur
   */
  const validateAndClamp = useCallback(() => {
    let next = counter.value as StringOrNumber

    if (next === "") return

    if (counter.valueAsNumber < min) {
      next = min
    }

    if (counter.valueAsNumber > max) {
      next = max
    }

    /**
     * `counter.cast` does 2 things:
     *
     * - sanitize the value by using parseFloat and some Regex
     * - used to round value to computed precision or decimal points
     */
    if (counter.value !== next) {
      counter.cast(next)
    }
  }, [counter, max, min])

  const onBlur = useCallback(() => {
    setFocused.off()

    if (clampValueOnBlur) {
      validateAndClamp()
    }
  }, [clampValueOnBlur, setFocused, validateAndClamp])

  const focusInput = useCallback(() => {
    if (focusInputOnChange && inputRef.current) {
      focus(inputRef.current)
    }
  }, [focusInputOnChange])

  const spinUp = useCallback(
    (event: any) => {
      event.preventDefault()
      spinner.up()
      focusInput()
    },
    [focusInput, spinner],
  )

  const spinDown = useCallback(
    (event: any) => {
      event.preventDefault()
      spinner.down()
      focusInput()
    },
    [focusInput, spinner],
  )

  const pointerDown =
    isBrowser && !!document.documentElement.ontouchstart
      ? "onTouchStart"
      : "onMouseDown"

  const getIncrementButtonProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      role: "button",
      tabIndex: -1,
      [pointerDown]: callAllHandlers(props[pointerDown], spinUp),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      onMouseLeave: callAllHandlers(props.onMouseUp, spinner.stop),
      onTouchEnd: callAllHandlers(props.onTouchEnd, spinner.stop),
      disabled: keepWithinRange && counter.isAtMax,
      "aria-disabled": ariaAttr(keepWithinRange && counter.isAtMax),
    }),
    [pointerDown, counter.isAtMax, keepWithinRange, spinUp, spinner.stop],
  )

  const getDecrementButtonProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref,
      role: "button",
      tabIndex: -1,
      [pointerDown]: callAllHandlers(props[pointerDown], spinDown),
      onMouseLeave: callAllHandlers(props.onMouseLeave, spinner.stop),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      onTouchEnd: callAllHandlers(props.onTouchEnd, spinner.stop),
      disabled: keepWithinRange && counter.isAtMin,
      "aria-disabled": ariaAttr(keepWithinRange && counter.isAtMin),
    }),
    [pointerDown, counter.isAtMin, keepWithinRange, spinDown, spinner.stop],
  )

  const getInputProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ...props,
      id,
      ref: mergeRefs(inputRef, ref),
      value: counter.value,
      role: "spinbutton",
      type: "text",
      inputMode,
      pattern,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-disabled": isDisabled,
      "aria-valuenow": isNaN(counter.valueAsNumber)
        ? undefined
        : counter.valueAsNumber,
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
    [
      inputMode,
      pattern,
      ariaValueText,
      counter.isOutOfRange,
      counter.value,
      counter.valueAsNumber,
      id,
      isDisabled,
      isInvalid,
      isReadOnly,
      max,
      min,
      onBlur,
      onChange,
      onKeyDown,
      setFocused.on,
    ],
  )

  return {
    value: counter.value,
    valueAsNumber: counter.valueAsNumber,
    isFocused,
    isDisabled,
    isReadOnly,
    getIncrementButtonProps,
    getDecrementButtonProps,
    getInputProps,
    htmlProps,
  }
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>
