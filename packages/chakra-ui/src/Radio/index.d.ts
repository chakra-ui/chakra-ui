import * as React from "react";
import { BoxProps } from "../Box";

export interface IRadio {
  /**
   * id assigned to input
   */
  id?: string;
  /**
   * The name of the input field in a radio
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the radio button.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * The aria-label attribute associated with the radio element
   */
  "aria-label"?: React.AriaAttributes["aria-label"];
  /**
   * The aria-labelledby attribute associated with the radio element
   */
  "aria-labelledby"?: React.AriaAttributes["aria-labelledby"];
  /**
   * The color of the radio when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  color?: string;
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the radio will occupy the full width of it's parent container
   */
  isFullWidth?: boolean;
  size?: "lg" | "md" | "sm";
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

export type RadioProps = IRadio &
  BoxProps &
  React.RefAttributes<HTMLInputElement>;

declare const Radio: React.FC<RadioProps>;
export default Radio;
