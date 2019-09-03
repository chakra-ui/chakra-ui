import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { IRadio } from "../Radio";

export interface IRadioButtonGroup {
  name?: IRadio["name"];
  children?: React.ReactNode;
  defaultValue?: IRadio["value"];
  value?: IRadio["value"];
  onChange?: (value: IRadio["value"]) => void;
  spacing?: StyledSystem.MarginRightProps;
  isInline?: boolean;
}

export type RadioButtonGroupProps = IRadioButtonGroup & BoxProps;
declare const RadioButtonGroup: React.FC<RadioButtonGroupProps>;
export default RadioButtonGroup;
