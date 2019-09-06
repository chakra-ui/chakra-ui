import * as React from "react";
import { BoxProps } from "../Box";

interface IAspectRatio {
  /**
   * The aspect ratio of the Box. Common values are:
   *
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: number;
}

export type AspectRatioBoxProps = IAspectRatio & BoxProps;
declare const AspectRatioBox: React.FC<AspectRatioBoxProps>;

export default AspectRatioBox;
