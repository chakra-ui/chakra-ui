import { BoxProps } from "../Box";
import * as React from "react";

interface ICollapse {
  isOpen?: boolean;
  animateOpacity?: boolean;
  onAnimationEnd?(props: { newHeight: number }): void;
  onAnimationStart?(props: { newHeight: number }): void;
  duration?: number;
  collapsedHeight?: number;
}

export type CollapseProps = ICollapse &
  BoxProps &
  React.RefAttributes<HTMLDivElement>;

declare const Collapse: React.ForwardRefExoticComponent<CollapseProps>;

export default Collapse;
