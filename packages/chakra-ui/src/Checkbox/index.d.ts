import * as React from "react";
import { BoxProps } from "../Box";

interface ICheckbox {
  /**
   * id assigned to input
   */
  id: string;
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name: string;
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value: string | number;
  /**
   * The color of the checkbox when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  color: string;
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultChecked: boolean;
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked: boolean;
  /**
   * If `true`, the checkbox should take up the full width of the parent.
   */
  isFullWidth: boolean;
  /**
   * The size (width and height) of the checkbox
   */
  size: "sm" | "md" | "lg";
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled: boolean;
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid: boolean;
  /**
   * Function called whenever the state of the checkbox changes.
   * It will be called with an object containing the react synthetic event.
   */
  onChange: () => void;
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate: boolean;
  /**
   * The children is the label to be displayed to the right of the checkbox.
   */
  children: React.ReactNode;
}

export type CheckboxProps = ICheckbox &
  React.RefAttributes<HTMLDivElement> &
  BoxProps;

declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps>;

export default Checkbox;
