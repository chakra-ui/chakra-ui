import * as React from "react";
import * as StyledSystem from "styled-system";
import { IButton } from "../Button";
import { BoxProps } from "../Box";
import { Omit } from "../common-types";

export interface IButtonGroup {
  size?: IButton["size"];
  color?: string;
  variant?: IButton["variant"];
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean;
  spacing?: StyledSystem.MarginRightProps["marginRight"];
  children?: React.ReactNode;
}

export type ButtonGroupProps = IButtonGroup & Omit<BoxProps, "size">;

declare const ButtonGroup: React.FC<ButtonGroupProps>;

export default ButtonGroup;
