import { ForwardRefExoticComponent, RefAttributes, ReactNode, FC } from "react";
import { FlexProps } from "../Flex";

interface IColorSwatch {
  /**
   * If `true` the color swatch has rounded borders.
   */
  isRound: boolean;
  /**
   * Color of the swatch.
   */
  color: string;
  /**
   * Gradient of the swatch.
   */
  gradient: string;
  /**
   * The content of the swatch.
   */
  children: ReactNode;
  /**
   * If `true` the color swatch is in the selected state.
   */
  isSelected: boolean;
}

interface IGradientSwatch extends IColorSwatch {
  /**
   * The gradient value of the swatch.
   */
  gradient: string;
  /**
   * The gradient angle of the swatch.
   */
  angle: string;
  /**
   * The start color of the swatch gradient.
   */
  startColor: string;
  /**
   * The end color of the swatch gradient.
   */
  endColor: string;
}

interface IColorItem extends IColorSwatch {
  /**
   * Function called whenever the color item is clicked.
   */
  onClick: () => void;
}

interface IColorList {
  /**
   * The content of the swatch.
   */
  children: ReactNode;
  /**
   * The selected color in the list.
   */
  selectedColor: string;
  /**
   * Function called whenever the state of the color list is changed.
   */
  onChange: () => void;
  /**
   * If `true` the color swatch has rounded borders.
   */
  isRound: boolean;
}

interface IColorPicker {
  /**
   * The selected color in the color picker.
   */
  selectedColor: string;
  /**
   * Function called whenever the state of the color picker is changing.
   */
  onChanging: () => void;
  /**
   * Function called whenever the state of the color picker is changed.
   */
  onChange: () => void;
  /**
   * List of the color picker's preset colors
   */
  presetColors: string[];
}

interface IColorInput {
  /**
   * The value of the color input
   */
  value: string;
  /**
   * Function called whenever the state of the color input is changed.
   */
  onChange: () => void;
}

export type ColorSwatchProps = FlexProps &
  IColorSwatch &
  RefAttributes<HTMLDivElement>;

export type GradientSwatchProps = IGradientSwatch;

export type ColorItemProps = FlexProps &
  IColorItem &
  RefAttributes<HTMLDivElement>;

export type ColorListProps = FlexProps & IColorList;

export type ColorPickerProps = IColorPicker;

export type ColorInputProps = IColorInput;

export const ColorSwatch: ForwardRefExoticComponent<ColorSwatchProps>;
export const GradientSwatch: FC<GradientSwatchProps>;
export const ColorItem: ForwardRefExoticComponent<ColorItemProps>;
export const ColorList: FC<ColorListProps>;
export const ColorPicker: FC<ColorPickerProps>;
export const ColorInput: FC<ColorInputProps>;
