import { BoxProps } from "../Box";
import * as React from "react";

interface IText {
  /**
   * Boolean prop for text truncation.
   */
  isTruncated?: boolean;
}

export type TextProps = IText & BoxProps;

declare const Text: React.FC<TextProps>;

export default Text;
