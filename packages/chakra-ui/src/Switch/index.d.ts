import { BoxProps } from "../Box";
import * as React from "react";
import { Omit } from "../common-types";
import { VariantColor } from "../theme";

export interface ISwitch {
  /**
   * The size of the switch
   */
  size?: "sm" | "md" | "lg";
  /**
   * The background color of the switch when checked
   */
  color?: VariantColor;
  /**
   * The input name of the switch when used in a form
   */
  name?: string;
  /**
   * The value of the switch.
   */
  value?: string | number | boolean;
  /**
   * The children of the switch.
   */
  children?: React.ReactNode;
  /**
   * The aria-label of the switch for accessibility.
   */
  "aria-label"?: string;
  /**
   * The aria-labelledby of the switch for accessibility.
   */
  "aria-labelledby"?: string;
  /**
   * If `true`, set the switch to the checked state.
   */
  isChecked?: boolean;
  /**
   * If `true`, the switch will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * If `true`, set the disabled to the invalid state.
   */
  isDisabled?: boolean;
  /**
   * If `true`, set the switch to the invalid state.
   */
  isInvalid?: boolean;
}

export type SwitchProps = ISwitch & Omit<BoxProps, "defaultChecked" | "size">;

declare const Switch: React.FC<SwitchProps>;

export default Switch;
