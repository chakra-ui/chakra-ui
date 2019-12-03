import * as React from "react";
import { BoxProps } from "../Box/index";
import { InputProps } from "../Input/index";
import { IInput } from "../Input";
import { PseudoBoxProps } from "../PseudoBox";
import { Omit } from "../common-types";

type SelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

export interface ISelect extends IInput<HTMLSelectElement> {
  form?: string;
  id?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLSelectElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLSelectElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLSelectElement>;
  autoFocus?: boolean;
  "aria-labelledby": string;
  value?: string | number;
  defaultValue?: string | number;
  children?: React.ReactNode;
  placeholder?: string | number;
  selectProps?: React.HTMLAttributes<HTMLSelectElement> & PseudoBoxProps;
}

type Omitted =
  | "onChange"
  | "onBlur"
  | "onFocus"
  | "onKeyDown"
  | "onKeyUp"
  | "onKeyPress";

export type SelectProps = ISelect &
  Omit<InputProps, Omitted | "value" | "defaultValue"> &
  Omit<BoxProps, Omitted | "size"> &
  React.RefAttributes<HTMLSelectElement>;

type xx = SelectProps["value"];

declare const Select: React.FC<SelectProps>;
export default Select;
