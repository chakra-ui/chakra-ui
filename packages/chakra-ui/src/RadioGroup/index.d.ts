import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

export interface IRadioGroup {
  id?: string;
  name?: string;
  children?: React.ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (
    event?: React.ChangeEventHandler<HTMLInputElement>,
    value?: string | number,
  ) => void;
  spacing?: StyledSystem.MarginProps;
  isInline?: boolean;
}

export type RadioButtonGroupProps = IRadioGroup & BoxProps;
declare const RadioGroup: React.FC<RadioButtonGroupProps>;
export default RadioGroup;
