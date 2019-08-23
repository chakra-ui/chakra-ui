import * as React from "react";
import { BoxProps } from "../Box/index";
import { InputProps } from "../Input/index";

export interface ISelect {
  children?: React.ReactNode;
  placeholder?: string | number;
  wrapperProps?: BoxProps;
}

export type SelectProps = ISelect & InputProps;

declare const Select: React.FC<SelectProps>;
export default Select;
