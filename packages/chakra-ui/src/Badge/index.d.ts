import * as React from "react";
import { BoxProps } from "../Box";

export interface BadgeProps extends React.HTMLAttributes<{}>, BoxProps {
  color: string;
  variant: "solid" | "subtle" | "outline";
}

declare const Badge: React.FunctionComponent<BadgeProps>;

export default Badge;
