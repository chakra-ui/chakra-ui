import * as React from "react";
import { BoxProps } from "../Box/index";
import { InputProps } from "../Input/index";
import { IInput } from "../Input";
import { PseudoBoxProps } from "../PseudoBox";

type SelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

export interface ISelect extends IInput<HTMLSelectElement> {
  form?: SelectAttributes["form"];
  id?: SelectAttributes["id"];
  name?: SelectAttributes["name"];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLSelectElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLSelectElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLSelectElement>;
  autoFocus?: SelectAttributes["autoFocus"];
  "aria-labelledby": SelectAttributes["aria-labelledby"];
  value?: SelectAttributes["value"];
  defaultValue?: SelectAttributes["defaultValue"];
  children?: React.ReactNode;
  placeholder?: string | number;
  selectProps?: React.HTMLAttributes<HTMLSelectElement> | PseudoBoxProps;
}

export type SelectProps = ISelect &
  InputProps &
  BoxProps &
  React.RefAttributes<HTMLSelectElement>;

declare const Select: React.FC<SelectProps>;
export default Select;
