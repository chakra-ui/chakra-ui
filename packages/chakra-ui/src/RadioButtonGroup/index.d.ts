import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

export interface IRadioButtonGroup {
  id: string;
  name: string;
  children: React.ReactNode;
  defaultValue: string | number;
  value: string | number;
  onChange: (value: string | number) => void;
  spacing: StyledSystem.MarginRightProps;
  isInline: boolean;
}

export type RadioButtonGroupProps = IRadioButtonGroup & BoxProps;
declare const RadioButtonGroup: React.FC<RadioButtonGroupProps>;
export default RadioButtonGroup;
