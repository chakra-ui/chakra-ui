import * as React from "react";
import { BoxProps } from "../Box";

export interface ISkeleton {
  /**
   * The color at the animation start
   */
  colorStart?: string;
  /**
   * The color at the animation end
   */
  colorEnd?: string;
}

export type SkeletonProps = ISkeleton & BoxProps;

declare const Badge: React.FC<SkeletonProps>;

export default Badge;
