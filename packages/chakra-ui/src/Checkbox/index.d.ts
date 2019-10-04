import * as React from "react";
import { BoxProps } from "../Box";

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export interface ICheckbox {
  /**
   * id assigned to input
   */
  id?: InputAttributes["id"];
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: InputAttributes["name"];
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: InputAttributes["value"];
  /**
   * The color of the checkbox when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  variantColor?: string;
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultIsChecked?: InputAttributes["defaultChecked"];
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: InputAttributes["checked"];
  /**
   * If `true`, the checkbox should take up the full width of the parent.
   */
  isFullWidth?: boolean;
  /**
   * The size (width and height) of the checkbox
   */
  size?: "sm" | "md" | "lg";
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled?: InputAttributes["disabled"];
  /**
   * If `true`, the checkbox will be readonly
   */
  isReadOnly?: InputAttributes["readOnly"];
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid?: boolean;
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate?: boolean;
  /**
   * The children is the label to be displayed to the right of the checkbox.
   */
  children?: React.ReactNode;
}

export type CheckboxProps = ICheckbox &
  React.RefAttributes<HTMLInputElement> &
  BoxProps;

declare const Checkbox: React.FC<CheckboxProps>;

export default Checkbox;
