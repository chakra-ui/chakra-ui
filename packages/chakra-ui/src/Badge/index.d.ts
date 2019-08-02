import * as React from "react";
import { BoxProps } from "../Box";

export interface BadgeProps extends React.HTMLAttributes<{}>, BoxProps {
  /**
   * The color of the badge
   */
  color: string;
  /**
   * The variant of the badge
   */
  variant: "solid" | "subtle" | "outline";
}

/**
 * The Badge component is used for state, general text, and number labels.
 *
 * This component composes `Box`
 */
declare const Badge: React.FunctionComponent<BadgeProps>;

export default Badge;
