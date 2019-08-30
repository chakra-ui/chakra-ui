import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

export interface ICheckboxGroup {
  id?: string;
  name?: string;
  children?: React.ReactNode;
  defaultValue?: Array<any>;
  value?: Array<any>;
  onChange?: (values?: Array<any>) => void;
  spacing?: StyledSystem.MarginProps;
  isInline?: boolean;
}

export type CheckboxGroupProps = ICheckboxGroup & BoxProps;
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default CheckboxGroup;
