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
 */
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

  /**
   * Leverage the `useCounter` hook since it provides
   * the functionality to `increment`, `decrement` and `update`
   * counter values
   */
  const counter = useCounter(props)

  /**
   * Keep track of the focused state of the input,
   * so user can this to change the styles of the
   * `spinners`, maybe :)
   */
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
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const characters = event.target.value
      .split("")
      .filter(isFloatingPointNumericCharacter)
      .join("")
    counter.update(characters)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
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

  const getStepFactor = (event: React.KeyboardEvent) => {
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
  const ariaValueText = getAriaValueText?.(counter.value)

  /**
   * Function that clamps the input's value on blur
   */
  const validateAndClamp = () => {
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
      role: "button",
      tabIndex: -1,
      onMouseDown: callAllHandlers(props.onMouseDown, spinUp),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      onMouseLeave: callAllHandlers(props.onMouseUp, spinner.stop),
      onTouchStart: callAllHandlers(props.onTouchStart, spinUp),
      onTouchEnd: callAllHandlers(props.onTouchEnd, spinner.stop),
      disabled: keepWithinRange && counter.isAtMax,
      "aria-disabled": keepWithinRange && counter.isAtMax,
    }),
    getDecrementButtonProps: (props: Dict = {}) => ({
      ...props,
      role: "button",
      tabIndex: -1,
      onMouseDown: callAllHandlers(props.onMouseDown, spinDown),
      onMouseLeave: callAllHandlers(props.onMouseUp, spinner.stop),
      onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
      onTouchStart: callAllHandlers(props.onTouchStart, spinDown),
      onTouchEnd: callAllHandlers(props.onTouchEnd, spinner.stop),
      disabled: keepWithinRange && counter.isAtMin,
      "aria-disabled": keepWithinRange && counter.isAtMin,
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
