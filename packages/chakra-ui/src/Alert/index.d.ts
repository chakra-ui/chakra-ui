import { BoxProps } from "../Box";
import { IconProps } from "../Icon";
import { FC } from "react";

interface IAlert {
  /**
   * The status of the alert
   */
  status?: "error" | "success" | "warning" | "info";
  /**
   * The variant of the alert style to use.
   */
  variant?: "subtle" | "solid" | "left-accent" | "top-accent" | "card";
}

export const AlertTitle: FC<BoxProps>;

export const AlertBody: FC<BoxProps>;

export const AlertIcon: FC<IconProps>;

export type AlertProps = IAlert & BoxProps;

/**
 * Alerts are used to communicate a state that affects a system, feature or page
 */
declare const Alert: FC<AlertProps>;

export default Alert;
