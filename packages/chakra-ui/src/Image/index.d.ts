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
   * A callback for when the image `src` has been loaded
   */
  onLoad?: () => void;
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: () => void;
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number;
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number;
}

export type ImageProps = IImage & BoxProps;

declare const Image: React.FC<ImageProps>;

export default Image;
