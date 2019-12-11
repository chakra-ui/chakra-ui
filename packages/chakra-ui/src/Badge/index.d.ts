import * as React from "react";
import { BoxProps } from "../Box";

export interface IBadge {
  /**
   * The color scheme of the badge
   *
   * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
   * @see http://chakra-ui.com/theme#colors
   */
  variantColor?: string;
  /**
   * The variant of the badge
   */
  variant?: "solid" | "subtle" | "outline";
}

export type BadgeProps = IBadge & BoxProps;

/**
 * The Badge component is used for state, general text, and number labels.
 */
declare const Badge: React.FC<BadgeProps>;

export default Badge;
