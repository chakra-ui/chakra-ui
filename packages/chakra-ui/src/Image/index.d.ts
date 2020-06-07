import { BoxProps } from "../Box";
import * as React from "react";

interface IImage {
  /**
   * The path to the image source
   */
  src?: string;
  /**
   * In event there was an error loading the `src`, specify a fallback
   * In most cases, this can be an avatar or image placeholder
   */
  fallbackSrc?: string;
  /**
   * The alt text that describes the image
   */
  alt?: string;
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number;
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number;
  /**
   * Defines loading strategy
   */
  loading?: "eager" | "lazy";
  /**
   * Opt out of the `fallbackSrc` logic and use the `Image` directly
   */
  ignoreFallback?: boolean;
}

export type ImageProps = IImage & BoxProps;

declare const Image: React.FC<ImageProps>;

export default Image;
