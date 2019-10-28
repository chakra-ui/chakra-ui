import * as React from "react";
import {
  calculatePrecision,
  roundToPrecision,
  canUseDOM,
  preventNonNumberKey,
} from "@chakra-ui/utils";
import useLongPress from "./useLongPress";

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

type StepperProps =
  | {
      onMouseUp: React.MouseEventHandler<HTMLElement>;
      onMouseLeave: React.MouseEventHandler<HTMLElement>;
      onMouseDown: React.MouseEventHandler<HTMLElement>;
      onTouchEnd: React.TouchEventHandler<HTMLElement>;
    }
  | {
      onMouseUp: React.MouseEventHandler<HTMLElement>;
      onMouseLeave: React.MouseEventHandler<HTMLElement>;
      onTouchStart: React.TouchEventHandler<HTMLElement>;
      onTouchEnd: React.TouchEventHandler<HTMLElement>;
    };

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label": string;
  disabled?: boolean;
  "aria-disabled"?: boolean;
}

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLElement>;
  ref: React.RefObject<HTMLElement>;
  value: number;
  role: string;
  type: string;
  "aria-valuemin": number;
  "aria-valuemax": number;
  "aria-disabled": boolean;
  "aria-valuenow": number;
  "aria-invalid": boolean;
  "aria-valuetext": string;
  readOnly: boolean;
  disabled: boolean;
  autoComplete: string;
  onFocus: React.FocusEventHandler<HTMLElement>;
  onBlur: React.FocusEventHandler<HTMLElement>;
}

interface hiddenLabelProps {
  "aria-live": string;
  children: React.ReactNode;
  style: React.CSSProperties;
}

interface ReturnedValue {
  value: number;
  isFocused: boolean;
  incrementStepper: StepperProps;
  decrementStepper: StepperProps;
  incrementButton: ButtonProps;
  decrementButton: ButtonProps;
  input: InputProps;
  hiddenLabel: hiddenLabelProps;
}

function useNumberInput({
  value: valueProp,
  onChange,
  defaultValue,
  focusInputOnChange = true,
  clampValueOnBlur = true,
  keepWithinRange = true,
  min = -Infinity,
  max = Infinity,
  step: stepProp = 1,
  precision: precisionProp,
  getAriaValueText,
  isReadOnly,
  isInvalid,
  isDisabled,
}: useNumberInputOptions) {
  const { current: isControlled } = React.useRef(valueProp != null);

  const defaultPrecision = Math.max(calculatePrecision(stepProp), 0);
  const precision = precisionProp || defaultPrecision;

  const [value, setValue] = React.useState<string | number>(() => {
    if (defaultValue != null) {
      let nextValue = defaultValue;
      if (keepWithinRange) {
        nextValue = Math.max(Math.min(nextValue, max), min);
      }
      nextValue = roundToPrecision(nextValue, precision);
      return nextValue;
    }
    return 0;
  });

  const [isFocused, setIsFocused] = React.useState(false);

  const _value = isControlled ? valueProp : value;
  const isInteractive = !(isReadOnly || isDisabled);
  const inputRef = React.useRef<HTMLInputElement>();

  const updateValue = (value: string | number) => {
    !isControlled && setValue(value);
    onChange && onChange(value);
  };

  const handleIncrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(_value) + Number(step);

    if (keepWithinRange) {
      nextValue = Math.min(nextValue, max);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const handleDecrement = (step = stepProp) => {
    if (!isInteractive) return;
    let nextValue = Number(_value) - Number(step);

    if (keepWithinRange) {
      nextValue = Math.max(nextValue, min);
    }

    nextValue = roundToPrecision(nextValue, precision);
    updateValue(nextValue);

    focusInput();
  };

  const focusInput = () => {
    if (focusInputOnChange && inputRef.current && canUseDOM) {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  };

  const incrementStepperProps = useLongPress(handleIncrement);
  const decrementStepperProps = useLongPress(handleDecrement);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(event.target.value);
  };

  // TODO: Use createOnKeydown here
  const handleKeyDown = (event: KeyboardEvent) => {
    preventNonNumberKey(event);
    if (!isInteractive) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleIncrement(ratio * stepProp);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const ratio = getIncrementFactor(event);
      handleDecrement(ratio * stepProp);
    }

    if (event.key === "Home") {
      event.preventDefault();
      if (min != null) {
        updateValue(max);
      }
    }

    if (event.key === "End") {
      event.preventDefault();
      if (max != null) {
        updateValue(min);
      }
    }
  };

  const getIncrementFactor = (event: KeyboardEvent) => {
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
    const maxExists = max != null;
    const minExists = min != null;

    if (typeof _value === "number" && maxExists && _value > max) {
      updateValue(max);
    }

    if (typeof _value === "number" && minExists && _value < min) {
      updateValue(min);
    }
  };

  const isOutOfRange =
    typeof _value === "number" && (_value > max || _value < min);

  const ariaValueText =
    getAriaValueText && _value ? getAriaValueText(_value) : null;

  return {
    value: _value,
    isFocused,
    isDisabled,
    isReadOnly,
    incrementStepper: incrementStepperProps,
    decrementStepper: decrementStepperProps,
    incrementButton: {
      onClick: () => handleIncrement(),
      "aria-label": "add",
      ...(keepWithinRange && {
        disabled: _value === max,
        "aria-disabled": _value === max,
      }),
    },
    decrementButton: {
      onClick: () => handleDecrement(),
      "aria-label": "subtract",
      ...(keepWithinRange && {
        disabled: _value === min,
        "aria-disabled": _value === min,
      }),
    },
    input: {
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ref: inputRef,
      value: _value,
      role: "spinbutton",
      type: "text",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-disabled": isDisabled,
      "aria-valuenow": _value,
      "aria-invalid": isInvalid || isOutOfRange,
      ...(getAriaValueText && { "aria-valuetext": ariaValueText }),
      readOnly: isReadOnly,
      disabled: isDisabled,
      autoComplete: "off",
      onFocus: () => {
        setIsFocused(true);
      },
      onBlur: () => {
        setIsFocused(false);
        if (clampValueOnBlur) {
          validateAndClamp();
        }
      },
    },
    hiddenLabel: {
      "aria-live": "polite",
      children: getAriaValueText ? ariaValueText : _value,
      style: {
        position: "absolute",
        clip: "rect(0px, 0px, 0px, 0px)",
        height: 1,
        width: 1,
        margin: -1,
        whiteSpace: "nowrap",
        border: 0,
        overflow: "hidden",
        padding: 0,
      },
    },
  };
}

export default useNumberInput;
