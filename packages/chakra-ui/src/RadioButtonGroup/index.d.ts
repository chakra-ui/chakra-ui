import * as React from "react";
import { BoxProps } from "../Box";
import { IRadio } from "../Radio";
import { Omit } from "../common-types";

export interface IRadioButtonGroup {
  name?: IRadio["name"];
  children?: React.ReactNode;
  defaultValue?: IRadio["value"];
  value?: IRadio["value"];
  onChange?: (value: IRadio["value"]) => void;
  spacing?: BoxProps["margin"];
  isInline?: boolean;
}

export type RadioButtonGroupProps = IRadioButtonGroup &
  Omit<BoxProps, "onChange">;

declare const RadioButtonGroup: React.FC<RadioButtonGroupProps>;
export default RadioButtonGroup;
