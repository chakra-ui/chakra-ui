import * as React from "react";
import { BoxProps } from "../Box";
import { IRadio } from "../Radio";
import { Omit } from "../common-types";

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
  spacing?: BoxProps["margin"];
  isInline?: boolean;
}

export type RadioGroupProps = IRadioGroup & Omit<BoxProps, "onChange">;
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
