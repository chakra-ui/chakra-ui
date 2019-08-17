import * as React from "react";
import { BoxProps } from "../Box";

export interface ICollapse {
  /**
   * If `true`, the content will be visible
   */
  isOpen?: boolean;
  /**
   * If `true`, the opacity of the content will be animated
   */
  animateOpacity?: boolean;
  /**
   * The animation duration as it expands
   */
  duration?: number;
  /**
   * The height you want the content to be collapsed to
   */
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
