import { ensureFocus, normalizeEventKey } from "@chakra-ui/utils";
import * as React from "react";
import { useCounter, CounterOptions } from "@chakra-ui/counter";
import { useUpdateEffect } from "@chakra-ui/hooks";

export interface UseNumberInputOptions extends CounterOptions {
  /**
   * If `true`, the input will be focused as you increment
   * or decrement the value with the stepper
   *
   * @default true
   */
  focusInputOnChange?: boolean;
  /**
   * This controls the value update when you blur out of the input.
   * - If `true` and the value is greater than `max`, the value will be reset to `max`
   * - Else, the value remains the same.
   *
   * @default true
   */
  clampValueOnBlur?: boolean;
  /**
   * This is used to format the value so that screen readers
   * can speak out a more human-friendly value.
   *
   * It is used to set the `aria-valuetext` property of the input
   */
  getAriaValueText?: (value: number | string) => string;
  /**
   * If `true`, the input will be in readonly mode
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the input will have `aria-invalid` set to `true`
   */
  isInvalid?: boolean;
  /**
   * If `true`, the input will be disabled
   */
  isDisabled?: boolean;
  /**
   * Specifies the value extracted from formatter
   * @default parseFloat
   *
   */
  parse?: (value: string) => number;
  /**
   * Specifies the format of the value presented
   */
  format?: (value: string | number) => string;
  /**
   * decimal separator
   */
  decimalSeparator?: string;
}

// input => input.replace(/[^\w\.-]*/g, '')

const defaultProps = {
  focusInputOnChange: true,
  clampValueOnBlur: true,
  keepWithinRange: true,
  min: -Infinity,
  max: Infinity,
  step: 1,
};

// TODO
// Add Support for `format` and `parse`

export function useNumberInput(_props: UseNumberInputOptions = {}) {
  const props = { ...defaultProps, ..._props };
  const { min, max, step: stepProp } = props;

  const counter = useCounter(props);

  const [isFocused, setIsFocused] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const isInteractive = !(props.isReadOnly || props.isDisabled);

  // Focus the input then you use the spinner to change value
  useUpdateEffect(() => {
    if (props.focusInputOnChange && inputRef.current) {
      ensureFocus(inputRef.current);
    }
  }, [counter.value]);

  const increment = (step = stepProp) => {
    if (!isInteractive) return;
    let valueToUse = +counter.value;
    if (isNaN(valueToUse)) {
      valueToUse = min;
    }
    const nextValue = counter.clamp(valueToUse + step);
    counter.update(nextValue);
  };

  const decrement = (step = stepProp) => {
    if (!isInteractive) return;
    let valueToUse = +counter.value;
    if (isNaN(valueToUse)) {
      valueToUse = min;
    }
    const nextValue = counter.clamp(valueToUse - step);
    counter.update(nextValue);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    counter.update(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!isAllowedKey(event)) {
      event.preventDefault();
    }

    const eventKey = normalizeEventKey(event);
    const factor = getIncrementFactor(event);
    const valueStep = factor * props.step;

    switch (eventKey) {
      case "ArrowUp":
        event.preventDefault();
        increment(valueStep);
        break;
      case "ArrowDown":
        event.preventDefault();
        decrement(valueStep);
        break;
      case "Home":
        event.preventDefault();
        counter.update(props.min);
        break;
      case "End":
        event.preventDefault();
        counter.update(props.max);
        break;
      default:
        break;
    }
  };

  const getIncrementFactor = (event: React.KeyboardEvent) => {
    let ratio = 1;
    if (event.metaKey || event.ctrlKey) {
      ratio = 0.1;
    }
    if (event.shiftKey) {
      ratio = 10;
    }
    return ratio;
  };

  const validateAndClamp = () => {
    if (counter.value > max) counter.update(max);
    if (counter.value < min) counter.update(min);
  };

  const ariaValueText =
    typeof props.getAriaValueText === "function"
      ? props.getAriaValueText(counter.value)
      : undefined;

  const onFocus = () => setIsFocused(true);
  const onBlur = () => {
    setIsFocused(false);
    if (props.clampValueOnBlur) {
      validateAndClamp();
    }
  };

  return {
    value: counter.value,
    valueAsNumber: counter.valueAsNumber,
    isFocused,
    isDisabled: props.isDisabled,
    isReadOnly: props.isReadOnly,
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
      ...(props.keepWithinRange && {
        disabled: counter.isAtMax,
        "aria-disabled": counter.isAtMax,
      }),
    },
    downButton: {
      onClick: counter.decrement,
      "aria-label": "subtract",
      ...(props.keepWithinRange && {
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
      "aria-valuemin": props.min,
      "aria-valuemax": props.max,
      "aria-disabled": props.isDisabled,
      "aria-valuenow": counter.valueAsNumber,
      "aria-invalid": props.isInvalid || counter.isOutOfRange,
      "aria-valuetext": ariaValueText,
      readOnly: props.isReadOnly,
      disabled: props.isDisabled,
      autoComplete: "off",
      onFocus,
      onBlur,
    },
    hiddenLabel: {
      "aria-live": "polite",
      children: ariaValueText || counter.value,
    },
  };
}

/**
 * Checks if the pressed key is a number input related
 *
 * @param event The keyboard event
 * @returns {Boolean} True or false, obviously :)
 */
function isAllowedKey(event: React.KeyboardEvent) {
  const keyCode = event.which ? event.which : event.keyCode;

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
  ];

  const key = normalizeEventKey(event);
  const ctrlKey = event.metaKey || event.ctrlKey;

  const isCopy = ctrlKey && key === "c";
  const isPaste = ctrlKey && key === "v";
  const isCut = ctrlKey && key === "x";
  const isSelectAll = ctrlKey && key === "a";

  if (allowedKeys.includes(key) || isCopy || isPaste || isCut || isSelectAll)
    return true;

  const notTopNumberKeypad = keyCode > 31 && (keyCode < 48 || keyCode > 57);
  const notNumericKeypad = (keyCode < 96 || keyCode > 105) && keyCode !== 110;

  if (event.shiftKey || (notTopNumberKeypad && notNumericKeypad)) return false;

  return true;
}

export default useNumberInput;
