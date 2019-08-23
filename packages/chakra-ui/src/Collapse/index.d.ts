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
   * The height you want the content in it's collapsed state. Set to `0` by default
   */
  startingHeight?: number | string;
  /**
   * The height you want the content in it's expanded state. Set to `auto` by default
   */
  endingHeight?: number | string;
  /**
   * The function to be called when the collapse animation starts. It provides the `currentHeight` as an argument
   */
  onAnimationEnd?(props: { newHeight: number }): void;
  /**
   * The function to be called when the collapse animation ends. It provides the `currentHeight` as an argument
   */
  onAnimationStart?(props: { newHeight: number }): void;
}

export type CollapseProps = ICollapse &
  BoxProps &
  React.RefAttributes<HTMLDivElement>;

declare const Collapse: React.FC<CollapseProps>;

export default Collapse;
