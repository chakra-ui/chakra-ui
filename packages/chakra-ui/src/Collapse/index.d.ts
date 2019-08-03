import * as React from "react";
import { BoxProps } from "../Box";

export interface ICollapse {
  isOpen?: boolean;
  animateOpacity?: boolean;
  duration?: number;
  collapsedHeight?: number;
  onAnimationEnd?(props: { newHeight: number }): void;
  onAnimationStart?(props: { newHeight: number }): void;
}

export type CollapseProps = ICollapse &
  BoxProps &
  React.RefAttributes<HTMLDivElement>;

declare const Collapse: React.ForwardRefExoticComponent<CollapseProps>;

export default Collapse;
