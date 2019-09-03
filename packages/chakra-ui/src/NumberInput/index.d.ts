import * as React from "react";
import { IInput } from "../Input";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";
import { FlexProps } from "../Flex";

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export interface INumberInput extends IInput {
  form?: InputAttributes["form"];
  pattern?: InputAttributes["pattern"];
  id?: InputAttributes["id"];
  name?: InputAttributes["name"];
  placeholder?: InputAttributes["placeholder"];
  onChange?(value: number): void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  autoFocus?: InputAttributes["autoFocus"];
  min?: InputAttributes["min"];
  max?: InputAttributes["max"];
  step?: InputAttributes["step"];
  "aria-labelledby": InputAttributes["aria-labelledby"];
  value?: InputAttributes["value"];
  defaultValue?: InputAttributes["defaultValue"];
  inputProps?: React.HTMLAttributes<HTMLInputElement> | PseudoBoxProps;
}

export type NumberInputProps = INumberInput &
  FlexProps &
  React.RefAttributes<HTMLInputElement>;

declare const NumberInput: React.FC<NumberInputProps>;
export default NumberInput;
