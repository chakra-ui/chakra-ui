import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { ICheckbox } from "../Checkbox";
import { Omit } from "../common-types";

export interface ICheckboxGroup {
  /**
   * The id of the checkbox group.
   */
  id?: ICheckbox["id"];
  /**
   * The name of the checkbox group. This prop is passed to each checbox
   */
  name?: ICheckbox["name"];
  /**
   * The content of the checkbox group. Must be the `Checkbox` component
   */
  children?: React.ReactNode;
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: Array<ICheckbox["value"]>;
  /**
   * The value of the checkbox group
   */
  value?: Array<ICheckbox["value"]>;
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?: (value: Array<ICheckbox["value"]>) => void;
  /**
   * The space between each checkbox
   */
  spacing?: StyledSystem.MarginProps["margin"];
  /**
   * If `true`, the checkboxes will aligned horizontally.
   */
  isInline?: boolean;
  /**
   * The color of the checkbox when it's checked.
   */
  variantColor?: ICheckbox["variantColor"];
  /**
   * The size of the checkbox. It's forwarded to all children checkbox
   */
  size?: ICheckbox["size"];
}

export type CheckboxGroupProps = ICheckboxGroup &
  Omit<BoxProps, "onChange" | "size">;
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default CheckboxGroup;
