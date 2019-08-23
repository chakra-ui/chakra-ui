import { BoxProps } from "../Box";
import * as React from "react";

export interface ISwitch {
  /**
   * The size of the switch
   */
  size?: string;
  /**
   * The background color of the switch when checked
   */
  color?: string;
  /**
   * The input name of the switch when used in a form
   */
  name?: string;
  /**
   * The value of the switch.
   */
  value?: string | boolean;
  /**
   * The children of the switch.
   */
  children: React.ReactNode;
  /**
   * The aria-label of the switch for accessibility.
   */
  "aria-label"?: React.AriaAttributes["aria-label"];
  /**
   * The aria-labelledby of the switch for accessibility.
   */
  "aria-labelledby"?: React.AriaAttributes["aria-labelledby"];
  /**
   * If `true`, set the switch to the checked state.
   */
  isChecked?: boolean;
  /**
   * If `true`, set the disabled to the invalid state.
   */
  isDisabled?: boolean;
  /**
   * If `true`, set the switch to the invalid state.
   */
  isInvalid?: boolean;
}

export type SwitchProps = ISwitch & BoxProps;

declare const Switch: React.FC<SwitchProps>;

export default Switch;
