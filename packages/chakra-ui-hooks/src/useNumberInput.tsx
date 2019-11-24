import { canUseDOM, normalizeEventKey } from "@chakra-ui/utils";
import * as React from "react";
import useCounter from "./useCounter";
import useUpdateEffect from "./useUpdateEffect";

export interface useNumberInputOptions {
  /**
   * The value of the input. Should be less than `max` and greater than `min`
   */
  value?: number;
  /**
   * The initial value of the input. Should be less than `max` and greater than `min`
   */
  defaultValue?: number;
  /**
   * The callback fired when the value changes
   * @param {Number} value - The next value
   */
  onChange?: (value: number | string) => void;
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
   * This controls the value update behavior in general.
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   * - Else, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange?: boolean;
  /**
   * The minimum value of the input
   * @default -Infinity
   */
  min?: number;
  /**
   * The maximum value of the input
   * @default Infinity
   */
  max?: number;
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step?: number;
  /**
   * The number of decimal points used to round the value
   */
  precision?: number;
  /**
   * This is used to format the value so that screen readers
   * can speak out a more human-friendly value.
   *
   * It is used to set the `aria-valuetext` property of the input
   *
   * @param {Number} value - the current value
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
}

const defaultProps = {
  focusInputOnChange: true,
  clampValueOnBlur: true,
  keepWithinRange: true,
  min: -Infinity,
  max: Infinity,
  shouldSpin: true,
  step: 1,
};

function useNumberInput(_props: any) {
  const props = { ...defaultProps, ..._props };
  const counter = useCounter(props);

  const [isFocused, setIsFocused] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const isInteractive = !(props.isReadOnly || props.isDisabled);

  useUpdateEffect(() => {
    focusInput();
  }, [counter.value]);

  const increment = (step = props.step) => {
    if (!isInteractive) return;
    let valueToUse = Number(counter.value);

    if (isNaN(valueToUse)) {
      valueToUse = props.min;
    }
    const nextValue = counter.beforeUpdate(valueToUse + step);
    counter.update(nextValue);
  };

  const decrement = (step = props.step) => {
    if (!isInteractive) return;
    let valueToUse = Number(counter.value);

    if (isNaN(valueToUse)) {
      valueToUse = props.min;
    }
    const nextValue = counter.beforeUpdate(valueToUse - step);
    counter.update(nextValue);
  };

  const focusInput = () => {
    if (props.focusInputOnChange && inputRef.current && canUseDOM) {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
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
        counter.update(props.max);
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
    if (counter.value > props.max) {
      counter.update(props.max);
    }
    if (counter.value < props.min) {
      counter.update(props.min);
    }
  };

  const ariaValueText =
    typeof props.getAriaValueText === "function"
      ? props.getAriaValueText(counter.value)
      : undefined;

  const onFocus = React.useCallback(() => setIsFocused(true), []);
  const onBlur = React.useCallback(() => {
    setIsFocused(false);
    if (props.clampValueOnBlur) {
      validateAndClamp();
    }
  }, [props.clampValueOnBlur, counter.value]);

  return {
    value: counter.value,
    isFocused,
    isDisabled: props.isDisabled,
    isReadOnly: props.isReadOnly,
    incrementStepper: {
      onPointerDown: counter.incOnPointerDown,
      onPointerUp: counter.stop,
      disabled: counter.isAtMax,
    },
    decrementStepper: {
      onPointerDown: counter.decOnPointerDown,
      onPointerUp: counter.stop,
      disabled: counter.isAtMin,
    },
    incrementButton: {
      onClick: counter.inc,
      "aria-label": "add",
      ...(props.keepWithinRange && {
        disabled: counter.isAtMax,
        "aria-disabled": counter.isAtMax,
      }),
    },
    decrementButton: {
      onClick: counter.dec,
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
      "aria-valuenow": counter.value,
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
 * Checks if the pressed key is a number
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
