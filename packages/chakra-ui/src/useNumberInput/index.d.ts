import * as React from "react";

interface Props {
  value?: number;
  onChange?: number;
  defaultValue?: number;
  focusInputOnChange?: boolean;
  clampValueOnBlur?: boolean;
  keepWithinRange?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  getAriaValueText?: (value: number) => string;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

interface SpinnerProps {
  onMouseUp: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
  onMouseDown: React.MouseEventHandler<HTMLElement>;
  onTouchStart: React.TouchEventHandler<HTMLElement>;
  onTouchEnd: React.TouchEventHandler<HTMLElement>;
}

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

interface ReturnValue {
  value: number;
  isFocused: boolean;
  incrementSpinner: SpinnerProps;
  decrementSpinner: SpinnerProps;
  incrementButton: ButtonProps;
  decrementButton: ButtonProps;
  input: InputProps;
  hiddenLabel: hiddenLabelProps;
}

declare function useNumberInput(props: Props): ReturnValue;

export default useNumberInput;
