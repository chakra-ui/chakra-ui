import * as React from "react";
import { BoxProps } from "../Box";

export interface IBadge {
  /**
   * The color of the badge
   */
  color: string;
  /**
   * The variant of the badge
   */
  variant: "solid" | "subtle" | "outline";
}

export type BadgeProps = IBadge & BoxProps

/**
 * The Badge component is used for state, general text, and number labels.
 *
 * This component composes `Box`
 */
declare const Badge: React.FunctionComponent<BadgeProps>;

export default Badge;
