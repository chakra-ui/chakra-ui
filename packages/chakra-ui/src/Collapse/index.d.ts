import * as React from "react";
import * as AnimateHeight from "react-animate-height";
import { BoxProps } from "../Box";

type AnimateHeightProps = Pick<
  AnimateHeight.AnimateHeightProps,
  | "animationStateClasses"
  | "applyInlineTransitions"
  | "delay"
  | "easing"
  | "style"
  | "children"
>;

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
   * The duration of the animation in `ms`
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
   * The function to be called when the collapse animation starts. It provides the `newHeight` as an argument
   */
  onAnimationEnd?(props: { newHeight: number }): void;
  /**
   * The function to be called when the collapse animation ends. It provides the `newHeight` as an argument
   */
  onAnimationStart?(props: { newHeight: number }): void;
}

export type CollapseProps = AnimateHeightProps & ICollapse & BoxProps;

declare const Collapse: React.FC<CollapseProps>;

export default Collapse;
