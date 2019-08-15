import * as React from "react";
import { BoxProps } from "../Box";

interface ICircularProgress {
  /**
   * The size of the circular progress in CSS units
   */
  size?: string;
  /**
   * Maximum value defining 100% progress made (must be higher than 'min')
   */
  max?: number;
  /**
   * Minimum value defining 'no progress' (must be lower than 'max')
   */
  min?: number;
  /**
   * Put component into 'indeterminate' state; Ignores 'value' prop
   */
  isIndeterminate?: boolean;
  /**
   * The thickness of progress indicator as a ratio of `size`. Must be between `0` and `1`
   */
  thickness?: number;
  /**
   * Current progress (must be between min/max)
   */
  value?: number;
  /**
   * Angle to rotate progress indicator by
   */
  angle?: number;
  /**
   * If `true`, the cap of the progress indicator will be rounded.
   */
  capIsRound?: boolean;
  /**
   * The content of the circular progress bar. If passed, the content will be inside and centered in the progress bar.
   */
  children?: React.ReactNode;
  /**
   * The color name of the progress track. Use a color key in the theme object
   */
  trackColor?: string;
  /**
   * The color of the progress indicator. Use a color key in the theme object
   */
  color?: string;
}

type CircularProgressProps = BoxProps & ICircularProgress;

declare const CircularProgress: React.FC<CircularProgressProps>;

export default CircularProgress;

export const CircularProgressLabel: React.FC<BoxProps>;
