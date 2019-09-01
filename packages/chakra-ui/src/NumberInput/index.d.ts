import * as React from "react";
import { IInput } from "../Input";
import { BoxProps } from "../Box";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface INumberInput {
  onChange?: (value: number) => void;
  isDisabled?: boolean;
  wrapperProps?: BoxProps;
}

type derivedTypes = Omit<IInput, "autoComplete" | "type" | "maxLength">;

export type NumberInputProps = INumberInput &
  derivedTypes &
  React.RefAttributes<HTMLInputElement>;

declare const NumberInput: React.FC<NumberInputProps>;
export default NumberInput;
