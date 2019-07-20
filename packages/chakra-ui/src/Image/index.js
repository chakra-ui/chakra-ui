/** @jsx jsx */
import { jsx } from "@emotion/core";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import Box from "../Box";

export const useHasImageLoaded = ({ src = "", onLoad, onError }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setHasLoaded(true);
      onLoad && onLoad();
    };
    img.onerror = () => {
      setHasLoaded(false);
      onError && onError();
    };
  }, [src, onLoad, onError]);

  return hasLoaded;
};

// I had to rename this because it clashed with the `new Image()` call in the hook above
const $Image = ({ src, onLoad, onError, fallbackSrc, alt, ...props }) => {
  const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
  return <Box as="img" src={hasLoaded ? src : fallbackSrc} {...props} />;
};

Image.propTypes = {
  /**
   * The path to the image source
   */
  src: propTypes.string,
  /**
   * In event there was an error loading the `src`, specify a fallback
   * In most cases, this can be an avatar or image placeholder
   */
  fallbackSrc: propTypes.string,
  /**
   * The alt text that describes the image
   */
  alt: propTypes.string.isRequired,
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad: propTypes.func,
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError: propTypes.func
};

export default $Image;
