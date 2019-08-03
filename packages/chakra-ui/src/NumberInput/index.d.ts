import * as React from "react";
import { IInput } from "../Input";
import { BoxProps } from "../Box";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface INumberInput {
  size?: IInput["size"];
  onChange?: (value: number) => void;
  isDisabled?: boolean;
  wrapperProps?: BoxProps;
}

type TypesFromInput = Omit<IInput, "autoComplete" | "type" | "maxLength">;

export type NumberInputProps = INumberInput &
  TypesFromInput &
  React.RefAttributes<HTMLInputElement>;

declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps>;
export default NumberInput;
