import * as React from "react";
import { InputProps } from "../Input";
import { BoxProps } from "../Box";
import { PseudoBoxProps } from "../PseudoBox";
import { FlexProps } from "../Flex";
import { useNumberInputProps } from "../useNumberInput";

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export interface INumberInput extends useNumberInputProps {
  isFullWidth?: boolean;
  size?: InputProps["size"];
}

export type NumberInputProps = INumberInput &
  FlexProps &
  React.RefAttributes<HTMLInputElement>;

export const NumberInput: React.FC<NumberInputProps>;
export const NumberInputField: React.FC<InputProps>;
export const NumberInputStepper: React.FC<FlexProps>;
export const NumberIncrementStepper: React.FC<PseudoBoxProps>;
export const NumberDecrementStepper: React.FC<PseudoBoxProps>;
