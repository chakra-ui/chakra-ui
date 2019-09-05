import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { ICheckbox } from "../Checkbox";

export interface ICheckboxGroup {
  id?: ICheckbox["id"];
  name?: ICheckbox["name"];
  children?: React.ReactNode;
  defaultValue?: Array<ICheckbox["value"]>;
  value?: Array<ICheckbox["value"]>;
  onChange?: (value?: Array<ICheckbox["value"]>) => void;
  spacing?: StyledSystem.MarginProps["margin"];
  isInline?: boolean;
}

export type CheckboxGroupProps = ICheckboxGroup & BoxProps;
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default CheckboxGroup;
