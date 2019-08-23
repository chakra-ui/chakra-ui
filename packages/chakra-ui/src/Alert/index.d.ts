import { BoxProps } from "../Box";
import { IconProps } from "../Icon";
import * as React from "react";

export interface IAlert {
  /**
   * The id of the alert
   */
  id?: string;
  /**
   * The status of the alert
   */
  status?: "error" | "success" | "warning" | "info";
  /**
   * The variant of the alert style to use.
   */
  variant?: "subtle" | "solid" | "left-accent" | "top-accent";
}

export const AlertTitle: React.FC<BoxProps>;

export const AlertDescription: React.FC<BoxProps>;

export const AlertIcon: React.FC<IconProps>;

export type AlertProps = IAlert & BoxProps;

/**
 * Alerts are used to communicate a state that affects a system, feature or page
 */
declare const Alert: React.FC<AlertProps>;

export default Alert;
