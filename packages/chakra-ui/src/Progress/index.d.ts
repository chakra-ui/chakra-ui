import * as React from "react";
import { BoxProps } from "../Box";

export interface IProgress {
  color: string;
  value: number;
  min: number;
  max: number;
  size: "lg" | "md" | "sm";
  hasStripe: boolean;
  isAnimated: boolean;
}

export type ProgressProps = IProgress & BoxProps;
declare const Progress: React.FC<ProgressProps>;

export default Progress;
