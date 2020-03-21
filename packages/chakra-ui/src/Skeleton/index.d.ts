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
  /**
   * Render only the children
   */
  isLoaded?: boolean;
  /**
   * The animation speed in seconds
   */
  speed?: number;
  /**
   * The fadeIn duration in seconds
   */
  fadeInDuration?: number;
}

export type SkeletonProps = ISkeleton & BoxProps;

declare const Skeleton: React.FC<SkeletonProps>;

export default Skeleton;
