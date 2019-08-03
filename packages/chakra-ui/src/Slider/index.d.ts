import { PseudoBoxProps } from "../PseudoBox";
import * as React from "react";
import { BoxProps } from "../Box";

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
  orientation?: string;
  getAriaValueText?: (value: number) => string;
  size?: string;
  color?: string;
  name?: string;
  id?: string;
  children: React.ReactNode;
}

export const SliderThumb: React.ForwardRefExoticComponent<PseudoBoxProps>;

export const SliderTrack: React.FC<BoxProps>;

export const SliderFilledTrack: React.FC<PseudoBoxProps>;

export type SliderProps = ISlider & BoxProps;

declare const Slider: React.ForwardRefExoticComponent<SliderProps>;

export default Slider;
