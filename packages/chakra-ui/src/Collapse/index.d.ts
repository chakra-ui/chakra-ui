import { BoxProps } from "../Box";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface ICollapse {
  isOpen?: boolean;
  animateOpacity?: boolean;
  onAnimationEnd?(props: { newHeight: number }): void;
  onAnimationStart?(props: { newHeight: number }): void;
  duration?: number;
  collapsedHeight?: number;
}

export type CollapseProps = ICollapse & BoxProps & RefAttributes<HTMLDivElement>;

declare const Collapse: ForwardRefExoticComponent<CollapseProps>;

export default Collapse;
