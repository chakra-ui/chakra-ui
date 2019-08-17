import * as React from "react";
import { BoxProps } from "../Box";

export interface ICollapse {
  isOpen?: boolean;
  animateOpacity?: boolean;
  duration?: number;
  startingHeight?: number | string;
  endingHeight?: number | string;
  onAnimationEnd?(props: { newHeight: number }): void;
  onAnimationStart?(props: { newHeight: number }): void;
}

export type CollapseProps = ICollapse &
  BoxProps &
  React.RefAttributes<HTMLDivElement>;

declare const Collapse: React.ForwardRefExoticComponent<CollapseProps>;

export default Collapse;
