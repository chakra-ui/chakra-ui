import { useCounter, UseCounterProps } from "@chakra-ui/counter"
import {
  useBoolean,
  useCallbackRef,
  useEventListener,
  useSafeLayoutEffect,
} from "@chakra-ui/hooks"
import {
  ariaAttr,
  callAllHandlers,
  focus,
  isBrowser,
  isNull,
  maxSafeInteger,
  minSafeInteger,
  StringOrNumber,
  normalizeEventKey,
} from "@chakra-ui/utils"
import { mergeRefs, PropGetter, EventKeyMap } from "@chakra-ui/react-utils"
import * as React from "react"
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
  isRequired?: boolean
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
  /**
   * If `true`, the input's value will change based on mouse wheel
   */
  allowMouseWheel?: boolean
  /**
   * The HTML `name` attribute used for forms
   */
  name?: string
  "aria-describedby"?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const sanitize = (value: string) =>
  value.split("").filter(isFloatingPointNumericCharacter).join("")

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
    isRequired,
    getAriaValueText,
    isInvalid,
    pattern = "[0-9]*(.[0-9]+)?",
    inputMode = "decimal",
    allowMouseWheel,
    id,
    onChange: _,
    precision,
    name,
    "aria-describedby": ariaDescBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    onFocus,
    onBlur,
    ...htmlProps
  } = props

  const onFocusProp = useCallbackRef(onFocus)
  const onBlurProp = useCallbackRef(onBlur)
  const getAriaValueTextProp = useCallbackRef(getAriaValueText)

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

  const inputRef = React.useRef<HTMLInputElement>(null)

  /**
   * Sync state with uncontrolled form libraries like `react-hook-form`.
   */
  useSafeLayoutEffect(() => {
    if (!inputRef.current) return
    const notInSync = inputRef.current.value != counter.value
    if (notInSync) {
      counter.setValue(sanitize(inputRef.current.value))
    }
  }, [])

  const isInteractive = !(isReadOnly || isDisabled)

  const increment = React.useCallback(
    (step = stepProp) => {
      if (isInteractive) {
        incrementFn(step)
      }
    },
    [incrementFn, isInteractive, stepProp],
  )

  const decrement = React.useCallback(
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
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateFn(sanitize(event.target.value))
    },
    [updateFn],
  )

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
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

      const keyMap: EventKeyMap = {
        ArrowUp: () => increment(stepFactor),
        ArrowDown: () => decrement(stepFactor),
        Home: () => updateFn(min),
        End: () => updateFn(max),
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        action(event)
      }
    },
    [updateFn, decrement, increment, max, min, stepProp],
  )

  const getStepFactor = <Event extends React.KeyboardEvent | React.WheelEvent>(
    event: Event,
  ) => {
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
  const ariaValueText = React.useMemo(() => {
    const text = getAriaValueTextProp?.(counter.value)
    if (!isNull(text)) {
      return text
    }

    const defaultText = counter.value.toString()
    // empty string is an invalid ARIA attribute value
    return !defaultText ? undefined : defaultText
  }, [counter.value, getAriaValueTextProp])

  /**
   * Function that clamps the input's value on blur
   */
  const validateAndClamp = React.useCallback(() => {
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
  }, [counter, max, min])

  const onInputBlur = React.useCallback(() => {
    setFocused.off()

    if (clampValueOnBlur) {
      validateAndClamp()
    }
  }, [clampValueOnBlur, setFocused, validateAndClamp])

  const focusInput = React.useCallback(() => {
    if (focusInputOnChange) {
      focus(inputRef.current, { nextTick: true })
    }
  }, [focusInputOnChange])

  const spinUp = React.useCallback(
    (event: any) => {
      event.preventDefault()
      spinner.up()
      focusInput()
    },
    [focusInput, spinner],
  )

  const spinDown = React.useCallback(
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

  useEventListener(
    "wheel",
    (event) => {
      const isInputFocused = document.activeElement === inputRef.current
      if (!allowMouseWheel || !isInputFocused) return

      event.preventDefault()

      const stepFactor = getStepFactor(event as any) * stepProp
      const direction = Math.sign(event.deltaY)

      if (direction === -1) {
        increment(stepFactor)
      } else if (direction === 1) {
        decrement(stepFactor)
      }
    },
    inputRef.current,
    { passive: false },
  )

  const getIncrementButtonProps: PropGetter = React.useCallback(
    (props = {}, ref = null) => {
      const disabled = isDisabled || (keepWithinRange && counter.isAtMax)
      return {
        ...props,
        ref,
        role: "button",
        tabIndex: -1,
        [pointerDown]: callAllHandlers(props[pointerDown], spinUp),
        onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
        onMouseLeave: callAllHandlers(props.onMouseUp, spinner.stop),
        onTouchEnd: callAllHandlers(props.onTouchEnd, spinner.stop),
        disabled,
        "aria-disabled": ariaAttr(disabled),
      }
    },
    [
      pointerDown,
      counter.isAtMax,
      keepWithinRange,
      spinUp,
      spinner.stop,
      isDisabled,
    ],
  )

  const getDecrementButtonProps: PropGetter = React.useCallback(
    (props = {}, ref = null) => {
      const disabled = isDisabled || (keepWithinRange && counter.isAtMin)
      return {
        ...props,
        ref,
        role: "button",
        tabIndex: -1,
        [pointerDown]: callAllHandlers(props[pointerDown], spinDown),
        onMouseLeave: callAllHandlers(props.onMouseLeave, spinner.stop),
        onMouseUp: callAllHandlers(props.onMouseUp, spinner.stop),
        onTouchEnd: callAllHandlers(props.onTouchEnd, spinner.stop),
        disabled,
        "aria-disabled": ariaAttr(disabled),
      }
    },
    [
      pointerDown,
      counter.isAtMin,
      keepWithinRange,
      spinDown,
      spinner.stop,
      isDisabled,
    ],
  )

  const getInputProps: PropGetter<
    HTMLInputElement,
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      "disabled" | "required" | "readOnly"
    >
  > = React.useCallback(
    (props = {}, ref = null) => ({
      name,
      inputMode,
      type: "text",
      pattern,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescBy,
      id,
      disabled: isDisabled,
      ...props,
      readOnly: props.readOnly ?? isReadOnly,
      "aria-readonly": props.readOnly ?? isReadOnly,
      "aria-required": props.required ?? isRequired,
      required: props.required ?? isRequired,
      ref: mergeRefs(inputRef, ref),
      value: counter.value,
      role: "spinbutton",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": Number.isNaN(counter.valueAsNumber)
        ? undefined
        : counter.valueAsNumber,
      "aria-invalid": ariaAttr(isInvalid ?? counter.isOutOfRange),
      "aria-valuetext": ariaValueText,
      autoComplete: "off",
      autoCorrect: "off",
      onChange: callAllHandlers(props.onChange, onChange),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, onFocusProp, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, onBlurProp, onInputBlur),
    }),
    [
      name,
      inputMode,
      pattern,
      ariaLabelledBy,
      ariaLabel,
      ariaDescBy,
      id,
      isDisabled,
      isRequired,
      isReadOnly,
      isInvalid,
      counter.value,
      counter.valueAsNumber,
      counter.isOutOfRange,
      min,
      max,
      ariaValueText,
      onChange,
      onKeyDown,
      onFocusProp,
      setFocused.on,
      onBlurProp,
      onInputBlur,
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
