import { PseudoBoxProps } from "../PseudoBox";
import * as React from "react";
import { BoxProps } from "../Box";
import { Omit } from "../common-types";

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
  /**
   * The color of the slider track
   *
   * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
   * @see http://chakra-ui.com/theme#colors
   */
  color?: string;
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
