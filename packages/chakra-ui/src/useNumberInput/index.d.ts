import * as React from "react";

export interface UseNumberInputProps {
  /**
   * The value of the input. Should be less than `max` and greater than `min`
   */
  value?: string | number;
  /**
   * The initial value of the input. Should be less than `max` and greater than `min`
   */
  defaultValue?: string | number;
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
  getAriaValueText?: (value: string | number) => string;
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

interface UseNumberInputReturn {
  value: number;
  isFocused: boolean;
  incrementStepper: StepperProps;
  decrementStepper: StepperProps;
  incrementButton: ButtonProps;
  decrementButton: ButtonProps;
  input: InputProps;
  hiddenLabel: hiddenLabelProps;
}

declare function useNumberInput(
  props: UseNumberInputProps,
): UseNumberInputReturn;

export default useNumberInput;
