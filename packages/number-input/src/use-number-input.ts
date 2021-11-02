import { useCounter, UseCounterProps } from "@chakra-ui/counter"
import {
  useBoolean,
  useCallbackRef,
  useEventListener,
  useSafeLayoutEffect,
  useUpdateEffect,
} from "@chakra-ui/hooks"
import { EventKeyMap, mergeRefs, PropGetter } from "@chakra-ui/react-utils"
import {
  ariaAttr,
  callAllHandlers,
  focus,
  getOwnerDocument,
  isNull,
  maxSafeInteger,
  minSafeInteger,
  normalizeEventKey,
  StringOrNumber,
} from "@chakra-ui/utils"
import * as React from "react"
import { useAttributeObserver } from "./use-attr-observer"
import { useSpinner } from "./use-spinner"

const FLOATING_POINT_REGEX = /^[Ee0-9+\-.]$/

/**
 * Determine if a character is a DOM floating point character
 * @see https://www.w3.org/TR/2012/WD-html-markup-20120329/datatypes.html#common.data.float
 */
function isFloatingPointNumericCharacter(character: string) {
  return FLOATING_POINT_REGEX.test(character)
}

function isValidNumericKeyboardEvent(
  event: React.KeyboardEvent,
  isValid: (key: string) => boolean,
) {
  if (event.key == null) return true
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
  const isSingleCharacterKey = event.key.length === 1
  if (!isSingleCharacterKey || isModifierKey) return true
  return isValid(event.key)
}

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
   * Whether the input should be disabled
   */
  isDisabled?: boolean
  /**
   * Whether the input is required
   */
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
  onInvalid?: (
    message: ValidityState,
    value: string,
    valueAsNumber: number,
  ) => void
  /**
   * Whether the pressed key should be allowed in the input.
   * The default behavior is to allow DOM floating point characters defined by /^[Ee0-9+\-.]$/
   */
  isValidCharacter?: (value: string) => boolean
  /**
   * If using a custom display format, this converts the custom format to a format `parseFloat` understands.
   */
  parse?: (value: string) => string
  /**
   * If using a custom display format, this converts the default format to the custom format.
   */
  format?: (value: StringOrNumber) => StringOrNumber
}

type ValidityState = "rangeUnderflow" | "rangeOverflow"
type InputSelection = { start: number | null; end: number | null }

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
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onInvalid: onInvalidProp,
    getAriaValueText: getAriaValueTextProp,
    isValidCharacter: isValidCharacterProp,
    format: formatValue,
    parse: parseValue,
    ...htmlProps
  } = props

  const onFocus = useCallbackRef(onFocusProp)
  const onBlur = useCallbackRef(onBlurProp)
  const onInvalid = useCallbackRef(onInvalidProp)
  const isValidCharacter = useCallbackRef(
    isValidCharacterProp ?? isFloatingPointNumericCharacter,
  )
  const getAriaValueText = useCallbackRef(getAriaValueTextProp)

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
  const isInteractive = !(isReadOnly || isDisabled)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const inputSelectionRef = React.useRef<InputSelection | null>(null)
  const incrementButtonRef = React.useRef<HTMLButtonElement>(null)
  const decrementButtonRef = React.useRef<HTMLButtonElement>(null)

  const sanitize = React.useCallback(
    (value: string) => value.split("").filter(isValidCharacter).join(""),
    [isValidCharacter],
  )

  const parse = React.useCallback(
    (value: string) => parseValue?.(value) ?? value,
    [parseValue],
  )

  const format = React.useCallback(
    (value: StringOrNumber) => (formatValue?.(value) ?? value).toString(),
    [formatValue],
  )

  useUpdateEffect(() => {
    if (counter.valueAsNumber > max) {
      onInvalid?.("rangeOverflow", format(counter.value), counter.valueAsNumber)
    } else if (counter.valueAsNumber < min) {
      onInvalid?.("rangeOverflow", format(counter.value), counter.valueAsNumber)
    }
  }, [counter.valueAsNumber, counter.value, format, onInvalid])

  /**
   * Sync state with uncontrolled form libraries like `react-hook-form`.
   */
  useSafeLayoutEffect(() => {
    if (!inputRef.current) return
    const notInSync = inputRef.current.value != counter.value
    if (notInSync) {
      const parsedInput = parse(inputRef.current.value)
      counter.setValue(sanitize(parsedInput))
    }
  }, [parse, sanitize])

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

  useAttributeObserver(
    incrementButtonRef,
    "disabled",
    spinner.stop,
    spinner.isSpinning,
  )
  useAttributeObserver(
    decrementButtonRef,
    "disabled",
    spinner.stop,
    spinner.isSpinning,
  )

  /**
   * The `onChange` handler filters out any character typed
   * that isn't floating point compatible.
   */
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const evt = event.nativeEvent as InputEvent
      if (evt.isComposing) return
      const parsedInput = parse(event.currentTarget.value)
      updateFn(sanitize(parsedInput))
      inputSelectionRef.current = {
        start: event.currentTarget.selectionStart,
        end: event.currentTarget.selectionEnd,
      }
    },
    [updateFn, sanitize, parse],
  )

  const _onFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(event)
      if (!inputSelectionRef.current) return
      /**
       * restore selection if custom format string replacement moved it to the end
       */
      event.target.selectionStart =
        inputSelectionRef.current.start ?? event.currentTarget.value?.length
      event.currentTarget.selectionEnd =
        inputSelectionRef.current.end ?? event.currentTarget.selectionStart
    },
    [onFocus],
  )

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.nativeEvent.isComposing) return

      if (!isValidNumericKeyboardEvent(event, isValidCharacter)) {
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
    [isValidCharacter, stepProp, increment, decrement, updateFn, min, max],
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
    const text = getAriaValueText?.(counter.value)
    if (!isNull(text)) return text

    const defaultText = counter.value.toString()
    // empty string is an invalid ARIA attribute value
    return !defaultText ? undefined : defaultText
  }, [counter.value, getAriaValueText])

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

  useEventListener(
    "wheel",
    (event) => {
      const doc = getOwnerDocument(inputRef.current)
      const isInputFocused = doc.activeElement === inputRef.current
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
        ref: mergeRefs(ref, incrementButtonRef),
        role: "button",
        tabIndex: -1,
        onPointerDown: callAllHandlers(props.onPointerDown, (event) => {
          if (!disabled) spinUp(event)
        }),
        onPointerLeave: callAllHandlers(props.onPointerLeave, spinner.stop),
        onPointerUp: callAllHandlers(props.onPointerUp, spinner.stop),
        disabled,
        "aria-disabled": ariaAttr(disabled),
      }
    },
    [counter.isAtMax, keepWithinRange, spinUp, spinner.stop, isDisabled],
  )

  const getDecrementButtonProps: PropGetter = React.useCallback(
    (props = {}, ref = null) => {
      const disabled = isDisabled || (keepWithinRange && counter.isAtMin)
      return {
        ...props,
        ref: mergeRefs(ref, decrementButtonRef),
        role: "button",
        tabIndex: -1,
        onPointerDown: callAllHandlers(props.onPointerDown, (event) => {
          if (!disabled) spinDown(event)
        }),
        onPointerLeave: callAllHandlers(props.onPointerLeave, spinner.stop),
        onPointerUp: callAllHandlers(props.onPointerUp, spinner.stop),
        disabled,
        "aria-disabled": ariaAttr(disabled),
      }
    },
    [counter.isAtMin, keepWithinRange, spinDown, spinner.stop, isDisabled],
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
      value: format(counter.value),
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
      onFocus: callAllHandlers(props.onFocus, _onFocus, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, onBlur, onInputBlur),
    }),
    [
      name,
      inputMode,
      pattern,
      ariaLabelledBy,
      ariaLabel,
      format,
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
      _onFocus,
      setFocused.on,
      onBlur,
      onInputBlur,
    ],
  )

  return {
    value: format(counter.value),
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
