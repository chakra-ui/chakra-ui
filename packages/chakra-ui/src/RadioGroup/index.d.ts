import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";
import { IRadio } from "../Radio";

export interface IRadioGroup {
  id?: string;
  name?: string;
  children?: React.ReactNode;
  defaultValue?: IRadio["value"];
  value?: IRadio["value"];
  variantColor?: IRadio["variantColor"];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: IRadio["value"],
  ) => void;
  spacing?: StyledSystem.MarginProps["margin"];
  isInline?: boolean;
}

export type RadioGroupProps = IRadioGroup & BoxProps;
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
