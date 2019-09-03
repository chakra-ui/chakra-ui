import * as React from "react";
import * as StyledSystem from "styled-system";
import { IButton } from "../Button";
import { BoxProps } from "../Box";

export interface IButtonGroup {
  size?: IButton["size"];
  color?: string;
  variant?: IButton["variant"];
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean;
  spacing?: StyledSystem.MarginRightProps;
  children?: React.ReactNode;
}

export type ButtonGroupProps = IButtonGroup & BoxProps;

declare const ButtonGroup: React.FC<ButtonGroupProps>;

export default ButtonGroup;
