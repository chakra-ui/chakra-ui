import { PseudoBoxProps } from "../PseudoBox";
import * as React from "react";
import { BoxProps } from "../Box";
import { Omit } from "../common-types";
import { VariantColor } from "../theme";

interface ISlider {
  value?: number;
  defaultValue?: number;
  isDisabled?: boolean;
  max?: number;
  min?: number;
  step?: number;
  "aria-labelledby"?: React.AriaAttributes["aria-labelledby"];
  "aria-label"?: React.AriaAttributes["aria-label"];
  "aria-valuetext"?: React.AriaAttributes["aria-valuetext"];
  orientation?: "horizontal" | "vertical";
  getAriaValueText?: (value: number) => string;
  size?: "sm" | "md" | "lg";
  color?: VariantColor | string;
  name?: string;
  id?: string;
  onChange?: (newValue: number) => void;
  children?: React.ReactNode;
}

export const SliderThumb: React.FC<PseudoBoxProps>;

export const SliderTrack: React.FC<BoxProps>;

export const SliderFilledTrack: React.FC<PseudoBoxProps>;

export type SliderProps = ISlider & Omit<BoxProps, "onChange" | "size">;

declare const Slider: React.FC<SliderProps>;

export default Slider;
