import * as React from "react";
import { BoxProps } from "../Box";
import { VariantColor } from "../theme";
import { Omit } from "../common-types";

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
  "aria-label"?: string;
  /**
   * The aria-labelledby attribute associated with the radio element
   */
  "aria-labelledby"?: string;
  /**
   * The color of the radio when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  variantColor?: VariantColor;
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the radio will occupy the full width of it's parent container
   */
  isFullWidth?: boolean;
  /**
   * The size of the radio button
   */
  size?: "lg" | "md" | "sm";
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isInvalid?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

export type RadioProps = IRadio &
  Omit<BoxProps, "onChange" | "ref" | "onFocus" | "onBlur" | "size"> &
  React.RefAttributes<HTMLInputElement>;

declare const Radio: React.FC<RadioProps>;
export default Radio;
